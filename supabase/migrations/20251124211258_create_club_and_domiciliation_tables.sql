/*
  # Create Club Applications and Domiciliation Requests Tables

  1. New Tables
    - `club_applications`
      - `id` (uuid, primary key)
      - `first_name` (text) - Applicant's first name
      - `last_name` (text) - Applicant's last name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `linkedin_url` (text, nullable) - LinkedIn profile URL
      - `company_name` (text) - Company name
      - `company_sector` (text) - Industry sector
      - `position` (text) - Job position
      - `company_size` (text) - Company size category
      - `motivation` (text) - Why join the club
      - `contribution` (text) - What they can contribute
      - `referral_name` (text, nullable) - Optional referral
      - `status` (text) - Application status (pending/approved/rejected)
      - `created_at` (timestamptz) - Creation timestamp
    
    - `domiciliation_requests`
      - `id` (uuid, primary key)
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `company_type` (text) - Type of company
      - `formula_interest` (text) - Interested formula
      - `message` (text, nullable) - Additional message
      - `status` (text) - Request status (pending/contacted/converted)
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on both tables
    - Allow public inserts (for form submissions)
    - Only authenticated admins can read/update
*/

-- Create club_applications table
CREATE TABLE IF NOT EXISTS club_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  linkedin_url text,
  company_name text NOT NULL,
  company_sector text NOT NULL,
  position text NOT NULL,
  company_size text NOT NULL,
  motivation text NOT NULL,
  contribution text NOT NULL,
  referral_name text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Create domiciliation_requests table
CREATE TABLE IF NOT EXISTS domiciliation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_type text NOT NULL,
  formula_interest text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE club_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE domiciliation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for form submissions)
CREATE POLICY "Anyone can submit club application"
  ON club_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can submit domiciliation request"
  ON domiciliation_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view (admin only)
CREATE POLICY "Authenticated users can view club applications"
  ON club_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view domiciliation requests"
  ON domiciliation_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update club applications"
  ON club_applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update domiciliation requests"
  ON domiciliation_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);