/*
  # Système de Réservation Studios
  
  1. Nouvelles Tables
    - `studio_bookings` : Gestion des réservations de studios
      - `id` (uuid, primary key) : Identifiant unique de la réservation
      - `user_id` (uuid, foreign key vers auth.users) : Utilisateur ayant effectué la réservation
      - `studio_id` (text) : Identifiant du studio réservé (correspond aux IDs dans setups.ts)
      - `booking_date` (date) : Date de la réservation
      - `start_time` (time) : Heure de début
      - `end_time` (time) : Heure de fin
      - `duration_hours` (decimal) : Durée en heures
      - `base_price` (decimal) : Prix de base du studio
      - `options` (jsonb) : Options sélectionnées (stockées en JSON)
      - `total_price` (decimal) : Prix total incluant options
      - `status` (text) : Statut de la réservation (pending, confirmed, cancelled, completed)
      - `notes` (text, nullable) : Notes spéciales pour la réservation
      - `created_at` (timestamptz) : Date de création
      - `updated_at` (timestamptz) : Date de dernière mise à jour
      
    - `studio_availability` : Gestion de la disponibilité des studios
      - `id` (uuid, primary key) : Identifiant unique
      - `studio_id` (text) : Identifiant du studio
      - `date` (date) : Date
      - `available_slots` (jsonb) : Créneaux disponibles (format JSON avec heures)
      - `is_closed` (boolean) : Studio fermé pour la journée
      - `created_at` (timestamptz) : Date de création
      - `updated_at` (timestamptz) : Date de dernière mise à jour
      
  2. Sécurité (RLS)
    - Activer RLS sur toutes les tables
    - Politiques pour studio_bookings :
      - Les utilisateurs authentifiés peuvent voir leurs propres réservations
      - Les utilisateurs authentifiés peuvent créer des réservations
      - Les utilisateurs peuvent modifier/annuler leurs réservations futures uniquement
    - Politiques pour studio_availability :
      - Lecture publique (pour afficher les disponibilités)
      - Modification réservée aux admins (via service_role)
      
  3. Index
    - Index sur studio_bookings(user_id) pour performances
    - Index sur studio_bookings(booking_date, studio_id) pour requêtes de disponibilité
    - Index sur studio_availability(studio_id, date) pour recherches rapides
    
  4. Fonctions
    - Fonction pour vérifier les conflits de réservation
    - Trigger pour mettre à jour updated_at automatiquement
*/

CREATE TABLE IF NOT EXISTS studio_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  studio_id text NOT NULL,
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  duration_hours decimal NOT NULL DEFAULT 1,
  base_price decimal NOT NULL,
  options jsonb DEFAULT '[]'::jsonb,
  total_price decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  CONSTRAINT valid_time_range CHECK (end_time > start_time),
  CONSTRAINT valid_duration CHECK (duration_hours > 0),
  CONSTRAINT valid_prices CHECK (base_price > 0 AND total_price >= base_price)
);

CREATE TABLE IF NOT EXISTS studio_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id text NOT NULL,
  date date NOT NULL,
  available_slots jsonb DEFAULT '[]'::jsonb,
  is_closed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(studio_id, date)
);

ALTER TABLE studio_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
  ON studio_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON studio_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their future bookings"
  ON studio_bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND booking_date >= CURRENT_DATE);

CREATE POLICY "Users can delete their future bookings"
  ON studio_bookings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND booking_date >= CURRENT_DATE);

CREATE POLICY "Anyone can view availability"
  ON studio_availability
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON studio_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date_studio ON studio_bookings(booking_date, studio_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON studio_bookings(status);
CREATE INDEX IF NOT EXISTS idx_availability_studio_date ON studio_availability(studio_id, date);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_studio_bookings_updated_at'
  ) THEN
    CREATE TRIGGER update_studio_bookings_updated_at
      BEFORE UPDATE ON studio_bookings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_studio_availability_updated_at'
  ) THEN
    CREATE TRIGGER update_studio_availability_updated_at
      BEFORE UPDATE ON studio_availability
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

CREATE OR REPLACE FUNCTION check_booking_conflicts(
  p_studio_id text,
  p_booking_date date,
  p_start_time time,
  p_end_time time,
  p_exclude_booking_id uuid DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM studio_bookings
    WHERE studio_id = p_studio_id
      AND booking_date = p_booking_date
      AND status IN ('pending', 'confirmed')
      AND (id IS DISTINCT FROM p_exclude_booking_id)
      AND (
        (start_time, end_time) OVERLAPS (p_start_time, p_end_time)
      )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
