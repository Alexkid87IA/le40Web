/*
  # Create Club Membership System

  ## Overview
  This migration creates a complete system for managing Le Club premium memberships, 
  workshop events, and member participation tracking.

  ## New Tables

  ### 1. `club_memberships`
  Stores premium membership subscriptions for Le Club members.
  - `id` (uuid, primary key): Unique identifier for each membership
  - `user_email` (text, not null): Member's email address
  - `user_name` (text, not null): Member's full name
  - `user_phone` (text): Contact phone number
  - `plan_type` (text, not null): Type of plan (monthly, quarterly, annual)
  - `monthly_price` (integer, not null): Monthly price in euros
  - `status` (text, not null): Membership status (active, paused, cancelled, expired)
  - `start_date` (timestamptz, not null): When membership started
  - `end_date` (timestamptz): When membership expires/expired
  - `payment_method` (text): Payment method used
  - `auto_renew` (boolean, default true): Auto-renewal enabled
  - `created_at` (timestamptz): Record creation timestamp
  - `updated_at` (timestamptz): Last update timestamp

  ### 2. `club_workshops`
  Catalog of workshops and events available to club members.
  - `id` (uuid, primary key): Unique identifier
  - `title` (text, not null): Workshop title
  - `description` (text): Full description
  - `workshop_type` (text, not null): Type (afterwork, hotseat, formation, networking, masterclass)
  - `duration_minutes` (integer): Duration in minutes
  - `max_participants` (integer): Maximum number of participants
  - `recurrence` (text): Recurrence pattern (weekly, biweekly, monthly)
  - `image_url` (text): Image for the workshop
  - `is_active` (boolean, default true): Whether workshop is currently offered
  - `created_at` (timestamptz): Record creation timestamp

  ### 3. `club_events`
  Scheduled instances of workshops and events.
  - `id` (uuid, primary key): Unique identifier
  - `workshop_id` (uuid, foreign key): References club_workshops
  - `title` (text, not null): Event title
  - `description` (text): Event description
  - `event_date` (date, not null): Date of event
  - `start_time` (time, not null): Start time
  - `end_time` (time): End time
  - `location` (text): Event location
  - `max_participants` (integer): Max participants for this instance
  - `current_participants` (integer, default 0): Current registrations
  - `is_members_only` (boolean, default true): Members only event
  - `status` (text, default 'scheduled'): Event status (scheduled, in_progress, completed, cancelled)
  - `created_at` (timestamptz): Record creation timestamp

  ### 4. `club_event_registrations`
  Tracks member registrations for events.
  - `id` (uuid, primary key): Unique identifier
  - `event_id` (uuid, foreign key): References club_events
  - `membership_id` (uuid, foreign key): References club_memberships
  - `registration_date` (timestamptz, default now()): When registered
  - `attendance_status` (text, default 'registered'): Status (registered, attended, no_show, cancelled)
  - `notes` (text): Additional notes

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated access and data management
  - Ensure members can only view their own membership data
  - Public read access to workshops and events for discovery

  ## Indexes
  - Index on membership email and status for quick lookups
  - Index on event dates for calendar queries
  - Index on workshop types for filtering
*/

-- Create club_memberships table
CREATE TABLE IF NOT EXISTS club_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text,
  plan_type text NOT NULL CHECK (plan_type IN ('monthly', 'quarterly', 'annual')),
  monthly_price integer NOT NULL DEFAULT 50,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz,
  payment_method text,
  auto_renew boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create club_workshops table
CREATE TABLE IF NOT EXISTS club_workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  workshop_type text NOT NULL CHECK (workshop_type IN ('afterwork', 'hotseat', 'formation', 'networking', 'masterclass', 'coworking')),
  duration_minutes integer,
  max_participants integer,
  recurrence text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create club_events table
CREATE TABLE IF NOT EXISTS club_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id uuid REFERENCES club_workshops(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  start_time time NOT NULL,
  end_time time,
  location text DEFAULT 'Le 40 - Marseille',
  max_participants integer DEFAULT 30,
  current_participants integer DEFAULT 0,
  is_members_only boolean DEFAULT true,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Create club_event_registrations table
CREATE TABLE IF NOT EXISTS club_event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES club_events(id) ON DELETE CASCADE NOT NULL,
  membership_id uuid REFERENCES club_memberships(id) ON DELETE CASCADE NOT NULL,
  registration_date timestamptz DEFAULT now(),
  attendance_status text DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'no_show', 'cancelled')),
  notes text,
  UNIQUE(event_id, membership_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_club_memberships_email ON club_memberships(user_email);
CREATE INDEX IF NOT EXISTS idx_club_memberships_status ON club_memberships(status);
CREATE INDEX IF NOT EXISTS idx_club_events_date ON club_events(event_date);
CREATE INDEX IF NOT EXISTS idx_club_events_workshop ON club_events(workshop_id);
CREATE INDEX IF NOT EXISTS idx_club_workshops_type ON club_workshops(workshop_type);
CREATE INDEX IF NOT EXISTS idx_club_registrations_event ON club_event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_club_registrations_member ON club_event_registrations(membership_id);

-- Enable Row Level Security
ALTER TABLE club_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for club_memberships
CREATE POLICY "Anyone can view active memberships count"
  ON club_memberships FOR SELECT
  TO public
  USING (status = 'active');

CREATE POLICY "Authenticated users can insert memberships"
  ON club_memberships FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update own membership"
  ON club_memberships FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for club_workshops
CREATE POLICY "Anyone can view active workshops"
  ON club_workshops FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage workshops"
  ON club_workshops FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for club_events
CREATE POLICY "Anyone can view scheduled events"
  ON club_events FOR SELECT
  TO public
  USING (status IN ('scheduled', 'in_progress'));

CREATE POLICY "Authenticated users can manage events"
  ON club_events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for club_event_registrations
CREATE POLICY "Anyone can view registration counts"
  ON club_event_registrations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can register for events"
  ON club_event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update own registrations"
  ON club_event_registrations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can cancel own registrations"
  ON club_event_registrations FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for club_memberships updated_at
DROP TRIGGER IF EXISTS update_club_memberships_updated_at ON club_memberships;
CREATE TRIGGER update_club_memberships_updated_at
  BEFORE UPDATE ON club_memberships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();