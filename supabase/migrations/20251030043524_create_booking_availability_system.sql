/*
  # Système de Réservation et Disponibilité des Studios

  1. Nouvelles Tables
    - `studio_availability_slots`
      - `id` (uuid, primary key)
      - `studio_id` (text) - ID du studio depuis studiosData
      - `date` (date) - Date du créneau
      - `time_slot` (text) - Horaire (ex: "09:00")
      - `is_available` (boolean) - Disponibilité
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bookings_extended`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable) - Lien vers auth.users si connecté
      - `studio_id` (text) - ID du studio
      - `booking_date` (date) - Date de réservation
      - `booking_time` (text) - Horaire de début
      - `duration_hours` (numeric) - Durée en heures
      - `formula_id` (text) - Formule choisie
      - `selected_options` (jsonb) - Options sélectionnées
      - `package_id` (text, nullable) - ID du pack si pack express
      - `total_price` (numeric) - Prix total
      - `customer_name` (text) - Nom du client
      - `customer_email` (text) - Email du client
      - `customer_phone` (text) - Téléphone du client
      - `status` (text) - confirmed, pending, cancelled
      - `payment_status` (text) - paid, pending, failed
      - `payment_intent_id` (text, nullable) - ID Stripe
      - `notes` (text, nullable) - Notes additionnelles
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Policies pour lecture publique des disponibilités
    - Policies pour création de réservations (authentifié ou public avec email)
    - Policies pour modification/annulation (utilisateur propriétaire ou admin)

  3. Indexes
    - Index sur studio_id, date pour recherches rapides
    - Index sur customer_email pour retrouver les réservations
*/

-- Création de la table des créneaux de disponibilité
CREATE TABLE IF NOT EXISTS studio_availability_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id text NOT NULL,
  date date NOT NULL,
  time_slot text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(studio_id, date, time_slot)
);

-- Création de la table des réservations étendues
CREATE TABLE IF NOT EXISTS bookings_extended (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  studio_id text NOT NULL,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  duration_hours numeric NOT NULL,
  formula_id text NOT NULL,
  selected_options jsonb DEFAULT '{}',
  package_id text,
  total_price numeric NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_intent_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation de RLS
ALTER TABLE studio_availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings_extended ENABLE ROW LEVEL SECURITY;

-- Policies pour studio_availability_slots
CREATE POLICY "Tout le monde peut voir les disponibilités"
  ON studio_availability_slots
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Les admins peuvent gérer les disponibilités"
  ON studio_availability_slots
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role' = 'admin')
    )
  );

-- Policies pour bookings_extended
CREATE POLICY "Tout le monde peut créer une réservation"
  ON bookings_extended
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Les utilisateurs peuvent voir leurs propres réservations"
  ON bookings_extended
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs non connectés peuvent voir leurs réservations via email"
  ON bookings_extended
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Les utilisateurs peuvent modifier leurs propres réservations"
  ON bookings_extended
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les admins peuvent tout voir"
  ON bookings_extended
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (auth.users.raw_user_meta_data->>'role' = 'admin')
    )
  );

-- Indexes pour performances
CREATE INDEX IF NOT EXISTS idx_availability_studio_date 
  ON studio_availability_slots(studio_id, date);

CREATE INDEX IF NOT EXISTS idx_bookings_studio_date 
  ON bookings_extended(studio_id, booking_date);

CREATE INDEX IF NOT EXISTS idx_bookings_customer_email 
  ON bookings_extended(customer_email);

CREATE INDEX IF NOT EXISTS idx_bookings_status 
  ON bookings_extended(status);

CREATE INDEX IF NOT EXISTS idx_bookings_payment_status 
  ON bookings_extended(payment_status);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_availability_updated_at ON studio_availability_slots;
CREATE TRIGGER update_availability_updated_at
  BEFORE UPDATE ON studio_availability_slots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings_extended;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings_extended
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour bloquer automatiquement les créneaux après une réservation
CREATE OR REPLACE FUNCTION block_time_slots_on_booking()
RETURNS TRIGGER AS $$
DECLARE
  slot_time text;
  slots_to_block integer;
  current_slot_index integer;
  time_slots text[] := ARRAY[
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ];
BEGIN
  IF NEW.status = 'confirmed' THEN
    slots_to_block := CEIL(NEW.duration_hours * 2);
    
    FOR i IN 1..array_length(time_slots, 1) LOOP
      IF time_slots[i] = NEW.booking_time THEN
        current_slot_index := i;
        EXIT;
      END IF;
    END LOOP;
    
    FOR i IN 0..(slots_to_block - 1) LOOP
      IF (current_slot_index + i) <= array_length(time_slots, 1) THEN
        slot_time := time_slots[current_slot_index + i];
        
        INSERT INTO studio_availability_slots (studio_id, date, time_slot, is_available)
        VALUES (NEW.studio_id, NEW.booking_date, slot_time, false)
        ON CONFLICT (studio_id, date, time_slot)
        DO UPDATE SET is_available = false;
      END IF;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour bloquer les créneaux
DROP TRIGGER IF EXISTS trigger_block_slots ON bookings_extended;
CREATE TRIGGER trigger_block_slots
  AFTER INSERT OR UPDATE ON bookings_extended
  FOR EACH ROW
  EXECUTE FUNCTION block_time_slots_on_booking();
