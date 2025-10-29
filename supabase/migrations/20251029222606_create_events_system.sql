/*
  # Create Events Management System

  ## Overview
  Comprehensive event management system for Le 40 coworking space with support for
  event categories, speakers, registrations, and analytics.

  ## New Tables
  
  ### `event_categories`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name (Networking, Formation, Conférence, etc.)
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - Category description
  - `icon_name` (text) - Lucide icon name
  - `color_gradient` (text) - Tailwind gradient classes
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Creation timestamp

  ### `event_speakers`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Speaker full name
  - `title` (text) - Professional title
  - `bio` (text) - Biography
  - `photo_url` (text) - Profile photo URL
  - `expertise_areas` (text[]) - Array of expertise areas
  - `linkedin_url` (text, nullable) - LinkedIn profile
  - `twitter_url` (text, nullable) - Twitter profile
  - `website_url` (text, nullable) - Personal website
  - `rating` (numeric) - Average rating (0-5)
  - `total_events` (integer) - Number of events hosted
  - `created_at` (timestamptz) - Creation timestamp

  ### `events`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Event title
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - Full description
  - `short_description` (text) - Brief description for cards
  - `category_id` (uuid, foreign key) - References event_categories
  - `event_date` (timestamptz) - Event date and time
  - `duration_minutes` (integer) - Event duration
  - `location` (text) - Physical location or "Online"
  - `image_url` (text) - Event image URL
  - `max_attendees` (integer) - Maximum capacity
  - `current_attendees` (integer) - Current registration count
  - `price_member` (numeric) - Price for members
  - `price_non_member` (numeric) - Price for non-members
  - `is_featured` (boolean) - Featured event flag
  - `is_published` (boolean) - Published status
  - `difficulty_level` (text) - "Débutant", "Intermédiaire", "Avancé", "Tous niveaux"
  - `tags` (text[]) - Array of tags
  - `prerequisites` (text, nullable) - Prerequisites text
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `event_speakers_junction`
  - `event_id` (uuid, foreign key) - References events
  - `speaker_id` (uuid, foreign key) - References event_speakers
  - `role` (text) - "host", "speaker", "moderator"
  - Primary key on (event_id, speaker_id)

  ### `event_registrations`
  - `id` (uuid, primary key) - Unique identifier
  - `event_id` (uuid, foreign key) - References events
  - `user_email` (text) - Registrant email
  - `user_name` (text) - Registrant name
  - `user_phone` (text, nullable) - Phone number
  - `company_name` (text, nullable) - Company name
  - `num_attendees` (integer) - Number of seats booked
  - `is_member` (boolean) - Member status at registration time
  - `total_price` (numeric) - Total price paid
  - `payment_status` (text) - "pending", "completed", "refunded"
  - `registration_date` (timestamptz) - Registration timestamp
  - `attendance_confirmed` (boolean) - Check-in status
  - `special_requirements` (text, nullable) - Special needs/requirements
  - `created_at` (timestamptz) - Creation timestamp

  ### `event_waitlist`
  - `id` (uuid, primary key) - Unique identifier
  - `event_id` (uuid, foreign key) - References events
  - `user_email` (text) - Email address
  - `user_name` (text) - Full name
  - `position` (integer) - Position in waitlist
  - `notified` (boolean) - Whether user was notified of availability
  - `created_at` (timestamptz) - Creation timestamp

  ### `past_events_feedback`
  - `id` (uuid, primary key) - Unique identifier
  - `event_id` (uuid, foreign key) - References events
  - `user_email` (text) - Feedback submitter email
  - `rating` (integer) - Rating 1-5
  - `testimonial` (text, nullable) - Written feedback
  - `would_recommend` (boolean) - Recommendation flag
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - RLS enabled on all tables
  - Public read access for published events and categories
  - Authenticated users can register for events
  - Only admins can create/modify events (service role)

  ## Indexes
  - Events by date for calendar queries
  - Events by category for filtering
  - Registrations by event for capacity tracking
*/

-- Create event_categories table
CREATE TABLE IF NOT EXISTS event_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Calendar',
  color_gradient text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create event_speakers table
CREATE TABLE IF NOT EXISTS event_speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  photo_url text NOT NULL,
  expertise_areas text[] DEFAULT '{}',
  linkedin_url text,
  twitter_url text,
  website_url text,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_events integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  category_id uuid REFERENCES event_categories(id) ON DELETE SET NULL,
  event_date timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 120,
  location text NOT NULL DEFAULT 'Le 40 - Marseille',
  image_url text NOT NULL,
  max_attendees integer NOT NULL DEFAULT 50,
  current_attendees integer NOT NULL DEFAULT 0,
  price_member numeric DEFAULT 0,
  price_non_member numeric DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  difficulty_level text DEFAULT 'Tous niveaux',
  tags text[] DEFAULT '{}',
  prerequisites text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_speakers_junction table
CREATE TABLE IF NOT EXISTS event_speakers_junction (
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  speaker_id uuid REFERENCES event_speakers(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'speaker',
  PRIMARY KEY (event_id, speaker_id)
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text,
  company_name text,
  num_attendees integer DEFAULT 1,
  is_member boolean DEFAULT false,
  total_price numeric DEFAULT 0,
  payment_status text DEFAULT 'pending',
  registration_date timestamptz DEFAULT now(),
  attendance_confirmed boolean DEFAULT false,
  special_requirements text,
  created_at timestamptz DEFAULT now()
);

-- Create event_waitlist table
CREATE TABLE IF NOT EXISTS event_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_email text NOT NULL,
  user_name text NOT NULL,
  position integer NOT NULL,
  notified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create past_events_feedback table
CREATE TABLE IF NOT EXISTS past_events_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  testimonial text,
  would_recommend boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category_id);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published, event_date);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_event ON event_waitlist(event_id, position);

-- Enable Row Level Security
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_speakers_junction ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_events_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for event_categories (public read)
CREATE POLICY "Anyone can view event categories"
  ON event_categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for event_speakers (public read)
CREATE POLICY "Anyone can view event speakers"
  ON event_speakers FOR SELECT
  TO public
  USING (true);

-- RLS Policies for events (public read for published events)
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  TO public
  USING (is_published = true);

-- RLS Policies for event_speakers_junction (public read)
CREATE POLICY "Anyone can view event speakers"
  ON event_speakers_junction FOR SELECT
  TO public
  USING (true);

-- RLS Policies for event_registrations (users can view their own)
CREATE POLICY "Users can view own registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = user_email);

CREATE POLICY "Users can create registrations"
  ON event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'email' = user_email);

-- RLS Policies for event_waitlist (users can view their own)
CREATE POLICY "Users can view own waitlist entries"
  ON event_waitlist FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = user_email);

CREATE POLICY "Users can join waitlist"
  ON event_waitlist FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'email' = user_email);

-- RLS Policies for past_events_feedback (users can create, everyone can read)
CREATE POLICY "Anyone can view feedback"
  ON past_events_feedback FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create feedback"
  ON past_events_feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'email' = user_email);

-- Function to update event attendee count
CREATE OR REPLACE FUNCTION update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET current_attendees = current_attendees + NEW.num_attendees
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET current_attendees = GREATEST(0, current_attendees - OLD.num_attendees)
    WHERE id = OLD.event_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE events 
    SET current_attendees = current_attendees - OLD.num_attendees + NEW.num_attendees
    WHERE id = NEW.event_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update attendee count
DROP TRIGGER IF EXISTS trigger_update_attendee_count ON event_registrations;
CREATE TRIGGER trigger_update_attendee_count
  AFTER INSERT OR UPDATE OR DELETE ON event_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_event_attendee_count();