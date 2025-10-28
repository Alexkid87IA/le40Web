/*
  # Enhancement of Preroll Analytics Table

  1. Modifications
    - Add `screen_width` (integer) - Screen width for device analytics
    - Add `screen_height` (integer) - Screen height for device analytics  
    - Add `timestamp` (timestamptz) - Explicit timestamp field
    - Add `interaction_data` (jsonb) - Flexible field for additional metrics

  2. Notes
    - Uses IF NOT EXISTS to safely add columns
    - Maintains existing RLS policies
    - Adds new indexes for performance optimization
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'preroll_selections' AND column_name = 'screen_width'
  ) THEN
    ALTER TABLE preroll_selections ADD COLUMN screen_width integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'preroll_selections' AND column_name = 'screen_height'
  ) THEN
    ALTER TABLE preroll_selections ADD COLUMN screen_height integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'preroll_selections' AND column_name = 'timestamp'
  ) THEN
    ALTER TABLE preroll_selections ADD COLUMN timestamp timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'preroll_selections' AND column_name = 'interaction_data'
  ) THEN
    ALTER TABLE preroll_selections ADD COLUMN interaction_data jsonb;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_preroll_interaction_type ON preroll_selections ((interaction_data->>'interaction_type'));
CREATE INDEX IF NOT EXISTS idx_preroll_screen_width ON preroll_selections(screen_width);