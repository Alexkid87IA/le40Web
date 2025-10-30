/*
  # Create Visit Requests System

  1. New Tables
    - `visit_requests`
      - `id` (uuid, primary key)
      - `name` (text) - Visitor's full name
      - `email` (text) - Visitor's email address
      - `phone` (text) - Visitor's phone number
      - `preferred_date` (date) - Requested visit date
      - `preferred_time` (text) - Requested visit time slot
      - `office_title` (text, nullable) - Specific office they want to visit
      - `office_price` (text, nullable) - Price of the office
      - `message` (text, nullable) - Additional message from visitor
      - `status` (text) - Request status: 'pending', 'confirmed', 'completed', 'cancelled'
      - `created_at` (timestamptz) - When request was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `visit_requests` table
    - Add policy for public inserts (anyone can request a visit)
    - Add policy for authenticated admin reads

  3. Important Notes
    - Public can insert visit requests
    - Only authenticated users can view/manage requests
    - Status tracking for visit management
*/

CREATE TABLE IF NOT EXISTS visit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  office_title text,
  office_price text,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE visit_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit visit requests"
  ON visit_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all visit requests"
  ON visit_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update visit requests"
  ON visit_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_visit_requests_status ON visit_requests(status);
CREATE INDEX IF NOT EXISTS idx_visit_requests_date ON visit_requests(preferred_date);
CREATE INDEX IF NOT EXISTS idx_visit_requests_created_at ON visit_requests(created_at DESC);
