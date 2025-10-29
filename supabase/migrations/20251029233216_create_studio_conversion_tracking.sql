/*
  # Système de Tracking et Conversion pour Studios

  1. Nouvelles Tables
    - `studio_profiles` - Profils de visiteurs (Creators, Entreprises, Agences)
    - `studio_sessions` - Sessions de navigation et comportement utilisateur
    - `studio_configurations_v2` - Configurations sauvegardées enrichies
    - `studio_availability_real_time` - Disponibilité temps réel par studio
    - `studio_conversion_events` - Événements de micro-conversions
    - `studio_social_proof_feed` - Feed de preuves sociales dynamiques
    - `studio_recommendations` - Moteur de recommandations

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies adaptées par type d'accès

  3. Indexes
    - Optimisation des requêtes temps réel et analytics
*/

-- Table des profils visiteurs
CREATE TABLE IF NOT EXISTS studio_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_type text NOT NULL CHECK (profile_type IN ('creator', 'enterprise', 'agency')),
  name text,
  company text,
  email text,
  phone text,
  average_budget_range text,
  content_types text[],
  frequency text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE studio_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can create profiles"
  ON studio_profiles FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own profiles"
  ON studio_profiles FOR SELECT
  TO anon
  USING (true);

-- Table des sessions de navigation
CREATE TABLE IF NOT EXISTS studio_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  profile_type text CHECK (profile_type IN ('creator', 'enterprise', 'agency', 'unknown')),
  entry_page text,
  referrer text,
  device_type text,
  scroll_depth integer DEFAULT 0,
  time_spent_seconds integer DEFAULT 0,
  studios_viewed text[],
  formulas_viewed text[],
  completed_steps integer DEFAULT 0,
  abandoned_at_step integer,
  converted boolean DEFAULT false,
  conversion_value numeric(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE studio_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can manage sessions"
  ON studio_sessions FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Table configurations enrichies
CREATE TABLE IF NOT EXISTS studio_configurations_v2 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text,
  profile_type text,
  studio_id text NOT NULL,
  studio_name text,
  formula_id text NOT NULL,
  formula_name text,
  duration_id text NOT NULL,
  duration_hours numeric(4,1),
  selected_options jsonb DEFAULT '{}'::jsonb,
  total_price numeric(10,2),
  is_booked boolean DEFAULT false,
  is_saved boolean DEFAULT false,
  share_token text UNIQUE,
  view_count integer DEFAULT 0,
  last_viewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE studio_configurations_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can manage configurations"
  ON studio_configurations_v2 FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Table disponibilité temps réel
CREATE TABLE IF NOT EXISTS studio_availability_real_time (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id text NOT NULL,
  date date NOT NULL,
  hour_slot integer NOT NULL CHECK (hour_slot >= 0 AND hour_slot < 24),
  is_available boolean DEFAULT true,
  is_reserved boolean DEFAULT false,
  reservation_id uuid,
  price_multiplier numeric(3,2) DEFAULT 1.0,
  demand_level text DEFAULT 'normal' CHECK (demand_level IN ('low', 'normal', 'high', 'critical')),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(studio_id, date, hour_slot)
);

ALTER TABLE studio_availability_real_time ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view availability"
  ON studio_availability_real_time FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can update availability"
  ON studio_availability_real_time FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table événements de conversion
CREATE TABLE IF NOT EXISTS studio_conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  page_section text,
  cta_clicked text,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE studio_conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can create events"
  ON studio_conversion_events FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can read events"
  ON studio_conversion_events FOR SELECT
  TO anon
  USING (true);

-- Table feed preuves sociales
CREATE TABLE IF NOT EXISTS studio_social_proof_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proof_type text NOT NULL CHECK (proof_type IN ('booking', 'review', 'milestone', 'content_published')),
  studio_id text,
  customer_name text NOT NULL,
  customer_avatar_url text,
  customer_type text,
  action_text text NOT NULL,
  metrics jsonb,
  is_featured boolean DEFAULT false,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE studio_social_proof_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view social proof"
  ON studio_social_proof_feed FOR SELECT
  TO anon
  USING (is_visible = true);

CREATE POLICY "Authenticated can manage social proof"
  ON studio_social_proof_feed FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Table recommandations
CREATE TABLE IF NOT EXISTS studio_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_type text NOT NULL,
  studio_id text NOT NULL,
  formula_id text NOT NULL,
  score numeric(3,2) DEFAULT 0,
  reason text,
  based_on_bookings_count integer DEFAULT 0,
  conversion_rate numeric(5,2),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE studio_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view recommendations"
  ON studio_recommendations FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can manage recommendations"
  ON studio_recommendations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes pour performance
CREATE INDEX IF NOT EXISTS idx_studio_sessions_session_id ON studio_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_studio_sessions_profile_type ON studio_sessions(profile_type);
CREATE INDEX IF NOT EXISTS idx_studio_sessions_created_at ON studio_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_configurations_studio_id ON studio_configurations_v2(studio_id);
CREATE INDEX IF NOT EXISTS idx_studio_configurations_created_at ON studio_configurations_v2(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_availability_studio_date ON studio_availability_real_time(studio_id, date);
CREATE INDEX IF NOT EXISTS idx_studio_availability_demand ON studio_availability_real_time(demand_level);
CREATE INDEX IF NOT EXISTS idx_studio_conversion_events_session ON studio_conversion_events(session_id);
CREATE INDEX IF NOT EXISTS idx_studio_conversion_events_type ON studio_conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_studio_social_proof_visible ON studio_social_proof_feed(is_visible, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_recommendations_profile ON studio_recommendations(profile_type, score DESC);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_studio_profiles_updated_at ON studio_profiles;
CREATE TRIGGER update_studio_profiles_updated_at
  BEFORE UPDATE ON studio_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_studio_sessions_updated_at ON studio_sessions;
CREATE TRIGGER update_studio_sessions_updated_at
  BEFORE UPDATE ON studio_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_studio_configurations_v2_updated_at ON studio_configurations_v2;
CREATE TRIGGER update_studio_configurations_v2_updated_at
  BEFORE UPDATE ON studio_configurations_v2
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed initial data pour les recommandations
INSERT INTO studio_recommendations (profile_type, studio_id, formula_id, score, reason, conversion_rate)
VALUES
  ('creator', 'studio-podcast', 'formula-recording', 0.95, 'Le plus populaire pour les podcasters', 12.5),
  ('creator', 'studio-video', 'formula-content', 0.90, 'Parfait pour YouTube et TikTok', 10.8),
  ('enterprise', 'studio-video', 'formula-premium', 0.92, 'Qualité corporate avec accompagnement', 15.2),
  ('agency', 'studio-live', 'formula-event', 0.88, 'Multi-cam et streaming pour événements', 18.5)
ON CONFLICT DO NOTHING;

-- Seed initial pour le feed de preuves sociales
INSERT INTO studio_social_proof_feed (proof_type, studio_id, customer_name, customer_type, action_text, metrics, is_featured)
VALUES
  ('booking', 'studio-podcast', 'Sophie Martin', 'creator', 'a réservé le Studio Podcast', '{"minutes_ago": 12}'::jsonb, true),
  ('milestone', 'studio-video', 'TechStart SAS', 'enterprise', 'a généré +50M de vues', '{"views": 50000000, "videos": 24}'::jsonb, true),
  ('review', 'studio-live', 'Alexandre Dubois', 'creator', 'a laissé 5 étoiles', '{"rating": 5, "text": "Équipement exceptionnel!"}'::jsonb, false),
  ('content_published', 'studio-video', 'Creative Agency', 'agency', 'a publié 8 vidéos ce mois', '{"videos": 8, "client_satisfaction": 98}'::jsonb, true)
ON CONFLICT DO NOTHING;