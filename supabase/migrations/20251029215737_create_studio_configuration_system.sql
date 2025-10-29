/*
  # Studio Configuration System - Enhanced User Experience

  ## Overview
  Creates tables for user configurations, analytics, and reviews to power
  intelligent studio and option recommendations.

  ## New Tables

  ### `studio_configurations`
  Stores user-created studio configurations with pricing and options
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable) - For authenticated users
  - `studio_id` (text) - Studio setup identifier
  - `formula_id` (text) - Service formula (studio, postprod, expert)
  - `duration_hours` (integer) - Booking duration
  - `selected_options` (jsonb) - Array of selected options with quantities
  - `total_price` (decimal) - Calculated total
  - `configuration_name` (text) - User-given name
  - `is_favorite` (boolean) - Favorited by user
  - `share_token` (text, unique) - For sharing configs
  - `created_at`, `updated_at` (timestamptz)

  ### `studio_option_analytics`
  Tracks option selection patterns for recommendations
  - `id` (uuid, primary key)
  - `studio_id` (text) - Studio identifier
  - `option_id` (text) - Option identifier
  - `selection_count` (integer) - Times selected
  - `conversion_rate` (decimal) - Success rate
  - `average_satisfaction` (decimal) - User rating
  - `frequently_paired_with` (jsonb) - Common combinations
  - `updated_at` (timestamptz)

  ### `studio_reviews`
  User reviews for studios and options
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable)
  - `studio_id` (text, nullable)
  - `option_id` (text, nullable)
  - `rating` (integer) - 1-5 stars
  - `comment` (text)
  - `helpful_count` (integer)
  - `created_at` (timestamptz)

  ### `configuration_interactions`
  Tracks user behavior for optimization
  - `id` (uuid, primary key)
  - `session_id` (text) - Anonymous tracking
  - `configuration_id` (uuid, nullable)
  - `action_type` (text) - Interaction type
  - `studio_id` (text)
  - `options_viewed` (jsonb)
  - `time_spent_seconds` (integer)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users manage own configurations
  - Public read for reviews and analytics
  - Anonymous interaction tracking

  ## Performance
  - Indexed on frequently queried fields
  - Automatic timestamp updates
  - Efficient JSONB storage
*/

-- Studio configurations table
CREATE TABLE IF NOT EXISTS studio_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  studio_id text NOT NULL,
  formula_id text NOT NULL,
  duration_hours integer NOT NULL DEFAULT 1,
  selected_options jsonb DEFAULT '[]'::jsonb,
  total_price decimal(10,2) NOT NULL DEFAULT 0,
  configuration_name text,
  is_favorite boolean DEFAULT false,
  share_token text UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Option analytics table
CREATE TABLE IF NOT EXISTS studio_option_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id text NOT NULL,
  option_id text NOT NULL,
  selection_count integer DEFAULT 0,
  conversion_rate decimal(5,2) DEFAULT 0,
  average_satisfaction decimal(3,2) DEFAULT 0,
  frequently_paired_with jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(studio_id, option_id)
);

-- Studio and option reviews
CREATE TABLE IF NOT EXISTS studio_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  studio_id text,
  option_id text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  CHECK (studio_id IS NOT NULL OR option_id IS NOT NULL)
);

-- Configuration interactions tracking
CREATE TABLE IF NOT EXISTS configuration_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  configuration_id uuid REFERENCES studio_configurations(id) ON DELETE SET NULL,
  action_type text NOT NULL,
  studio_id text,
  options_viewed jsonb DEFAULT '[]'::jsonb,
  time_spent_seconds integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_studio_configs_user ON studio_configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_studio_configs_share_token ON studio_configurations(share_token);
CREATE INDEX IF NOT EXISTS idx_studio_configs_created ON studio_configurations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_option_analytics_studio ON studio_option_analytics(studio_id);
CREATE INDEX IF NOT EXISTS idx_reviews_studio ON studio_reviews(studio_id);
CREATE INDEX IF NOT EXISTS idx_reviews_option ON studio_reviews(option_id);
CREATE INDEX IF NOT EXISTS idx_interactions_session ON configuration_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON configuration_interactions(created_at DESC);

-- Enable RLS
ALTER TABLE studio_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_option_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuration_interactions ENABLE ROW LEVEL SECURITY;

-- Configuration policies
CREATE POLICY "Users view own configurations"
  ON studio_configurations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public view shared configurations"
  ON studio_configurations FOR SELECT
  TO anon
  USING (share_token IS NOT NULL);

CREATE POLICY "Users create own configurations"
  ON studio_configurations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous create configurations"
  ON studio_configurations FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users update own configurations"
  ON studio_configurations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own configurations"
  ON studio_configurations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Analytics policies (read-only)
CREATE POLICY "Public view analytics"
  ON studio_option_analytics FOR SELECT
  TO anon, authenticated
  USING (true);

-- Review policies
CREATE POLICY "Public view reviews"
  ON studio_reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated create reviews"
  ON studio_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reviews"
  ON studio_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own reviews"
  ON studio_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Interaction policies (anonymous tracking)
CREATE POLICY "Anyone create interactions"
  ON configuration_interactions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone view interactions"
  ON configuration_interactions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Timestamp triggers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_studio_configurations_updated_at'
  ) THEN
    CREATE TRIGGER update_studio_configurations_updated_at
      BEFORE UPDATE ON studio_configurations
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_studio_option_analytics_updated_at'
  ) THEN
    CREATE TRIGGER update_studio_option_analytics_updated_at
      BEFORE UPDATE ON studio_option_analytics
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
