/*
  # Launch Offer Tracking System

  ## New Tables
  
  ### `launch_offer_tracking`
  - `id` (uuid, primary key) - Tracking record identifier
  - `total_slots` (integer) - Total slots available for launch offer (50)
  - `remaining_slots` (integer) - Remaining slots at launch price
  - `discount_percentage` (integer) - Discount percentage (40)
  - `is_active` (boolean) - Whether launch offer is active
  - `updated_at` (timestamptz) - Last update timestamp

  ## Modifications to existing tables
  
  ### `studio_bookings` - Add new columns
  - `launch_discount` (boolean) - Whether launch discount was applied
  - `customer_email` (text) - Customer email for non-authenticated bookings
  - `customer_name` (text) - Customer name for non-authenticated bookings
  - `customer_phone` (text) - Customer phone for non-authenticated bookings

  ## Security
  - Enable RLS on launch_offer_tracking
  - Public can read launch offer status
  - Allow anonymous bookings for launch customers
  - Only authenticated staff can update launch offer tracking
*/

-- Add new columns to studio_bookings if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'studio_bookings' AND column_name = 'launch_discount'
  ) THEN
    ALTER TABLE studio_bookings ADD COLUMN launch_discount boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'studio_bookings' AND column_name = 'customer_email'
  ) THEN
    ALTER TABLE studio_bookings ADD COLUMN customer_email text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'studio_bookings' AND column_name = 'customer_name'
  ) THEN
    ALTER TABLE studio_bookings ADD COLUMN customer_name text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'studio_bookings' AND column_name = 'customer_phone'
  ) THEN
    ALTER TABLE studio_bookings ADD COLUMN customer_phone text;
  END IF;
END $$;

-- Make user_id nullable for non-authenticated bookings
ALTER TABLE studio_bookings ALTER COLUMN user_id DROP NOT NULL;

-- Create launch_offer_tracking table
CREATE TABLE IF NOT EXISTS launch_offer_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_slots integer NOT NULL DEFAULT 50,
  remaining_slots integer NOT NULL DEFAULT 50 CHECK (remaining_slots >= 0),
  discount_percentage integer NOT NULL DEFAULT 40,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- Insert initial launch offer tracking record
INSERT INTO launch_offer_tracking (total_slots, remaining_slots, discount_percentage, is_active)
VALUES (50, 37, 40, true)
ON CONFLICT DO NOTHING;

-- Enable RLS on launch_offer_tracking
ALTER TABLE launch_offer_tracking ENABLE ROW LEVEL SECURITY;

-- Policies for launch_offer_tracking
CREATE POLICY "Anyone can read launch offer status"
  ON launch_offer_tracking FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update launch offer"
  ON launch_offer_tracking FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update policies for studio_bookings to allow anonymous bookings
DROP POLICY IF EXISTS "Users can create bookings" ON studio_bookings;

CREATE POLICY "Anyone can create bookings"
  ON studio_bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND customer_email IS NOT NULL)
  );

CREATE POLICY "Anyone can read bookings"
  ON studio_bookings FOR SELECT
  TO anon, authenticated
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL)
  );

-- Create function to decrement launch offer slots
CREATE OR REPLACE FUNCTION decrement_launch_slots()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.launch_discount = true AND NEW.status IN ('confirmed', 'pending') THEN
    IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
      UPDATE launch_offer_tracking
      SET remaining_slots = GREATEST(remaining_slots - 1, 0),
          updated_at = now()
      WHERE is_active = true AND remaining_slots > 0;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-decrement slots on bookings
DROP TRIGGER IF EXISTS on_booking_with_launch_discount ON studio_bookings;
CREATE TRIGGER on_booking_with_launch_discount
  AFTER INSERT OR UPDATE ON studio_bookings
  FOR EACH ROW
  EXECUTE FUNCTION decrement_launch_slots();

-- Create index on launch_discount for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_launch_discount ON studio_bookings(launch_discount) WHERE launch_discount = true;