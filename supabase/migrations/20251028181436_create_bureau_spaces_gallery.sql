/*
  # Bureau Spaces Gallery Schema

  ## Description
  This migration creates the database schema for bureau spaces and their associated image galleries.
  It enables dynamic content management for the "Visitez Nos Espaces" section.

  ## New Tables

  ### `bureau_spaces`
  Main table for storing bureau space information
  - `id` (uuid, primary key): Unique identifier for each space
  - `title` (text): Space name/title (e.g., "Bureau Startup 20m²")
  - `category` (text): Space category (e.g., "Bureau 2-4 personnes")
  - `description` (text): Short description for card display
  - `long_description` (text): Detailed description for modal view
  - `capacity` (text): Capacity information (e.g., "2-4 pers.")
  - `surface` (text): Surface area (e.g., "20m²")
  - `price_from` (text): Starting price (e.g., "699€")
  - `features` (jsonb): Array of feature strings
  - `equipments` (jsonb): Array of equipment strings
  - `tags` (jsonb): Array of tag strings
  - `availability` (text): Availability status
  - `display_order` (integer): Order for display
  - `is_active` (boolean): Whether space is active/published
  - `created_at` (timestamptz): Creation timestamp
  - `updated_at` (timestamptz): Last update timestamp

  ### `bureau_space_images`
  Table for storing multiple images per space
  - `id` (uuid, primary key): Unique identifier for each image
  - `space_id` (uuid, foreign key): Reference to bureau_spaces table
  - `image_url` (text): URL to the image (Supabase Storage or external)
  - `alt_text` (text): Alternative text for accessibility
  - `display_order` (integer): Order for display in gallery
  - `is_primary` (boolean): Whether this is the primary/thumbnail image
  - `created_at` (timestamptz): Creation timestamp

  ## Security
  - Row Level Security (RLS) enabled on both tables
  - Public read access for all active spaces and their images
  - Authenticated admin access for write operations

  ## Important Notes
  - Uses JSONB for flexible array storage of features, equipments, and tags
  - Supports multiple images per space with ordering
  - Designed for easy content management and scalability
  - Includes soft delete capability via is_active flag
*/

-- Create bureau_spaces table
CREATE TABLE IF NOT EXISTS bureau_spaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  capacity text NOT NULL,
  surface text NOT NULL,
  price_from text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  equipments jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  availability text NOT NULL DEFAULT 'Disponible sur demande',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bureau_space_images table
CREATE TABLE IF NOT EXISTS bureau_space_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES bureau_spaces(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bureau_spaces_category ON bureau_spaces(category);
CREATE INDEX IF NOT EXISTS idx_bureau_spaces_active ON bureau_spaces(is_active);
CREATE INDEX IF NOT EXISTS idx_bureau_spaces_order ON bureau_spaces(display_order);
CREATE INDEX IF NOT EXISTS idx_bureau_space_images_space_id ON bureau_space_images(space_id);
CREATE INDEX IF NOT EXISTS idx_bureau_space_images_order ON bureau_space_images(display_order);
CREATE INDEX IF NOT EXISTS idx_bureau_space_images_primary ON bureau_space_images(is_primary);

-- Enable Row Level Security
ALTER TABLE bureau_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE bureau_space_images ENABLE ROW LEVEL SECURITY;

-- Create policies for bureau_spaces
CREATE POLICY "Anyone can view active bureau spaces"
  ON bureau_spaces FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert bureau spaces"
  ON bureau_spaces FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bureau spaces"
  ON bureau_spaces FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bureau spaces"
  ON bureau_spaces FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for bureau_space_images
CREATE POLICY "Anyone can view images for active spaces"
  ON bureau_space_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bureau_spaces
      WHERE bureau_spaces.id = bureau_space_images.space_id
      AND bureau_spaces.is_active = true
    )
  );

CREATE POLICY "Authenticated users can insert images"
  ON bureau_space_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images"
  ON bureau_space_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete images"
  ON bureau_space_images FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bureau_spaces_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at update
DROP TRIGGER IF EXISTS bureau_spaces_updated_at ON bureau_spaces;
CREATE TRIGGER bureau_spaces_updated_at
  BEFORE UPDATE ON bureau_spaces
  FOR EACH ROW
  EXECUTE FUNCTION update_bureau_spaces_updated_at();
