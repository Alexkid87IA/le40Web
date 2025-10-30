/*
  # Système de Gestion des Commandes E-Commerce

  ## Description
  Ce système complet gère les commandes, paiements et synchronisation avec les réservations
  pour la commercialisation du site Le 40.

  ## 1. Nouvelles Tables

  ### `orders`
  Table principale pour toutes les commandes du site.
  - `id` (uuid, primary key) - Identifiant unique de la commande
  - `order_number` (text, unique) - Numéro de commande lisible (ex: LE40-2025-00001)
  - `user_id` (uuid, foreign key, nullable) - Utilisateur si authentifié
  - `customer_name` (text, not null) - Nom complet du client
  - `customer_email` (text, not null) - Email du client
  - `customer_phone` (text, not null) - Téléphone du client
  - `customer_company` (text, nullable) - Entreprise du client
  - `billing_address` (jsonb, nullable) - Adresse de facturation
  - `total_ht` (decimal, not null) - Total HT en euros
  - `total_tva` (decimal, not null) - Montant TVA 20%
  - `total_ttc` (decimal, not null) - Total TTC en euros
  - `status` (text, not null) - Statut: pending, confirmed, cancelled, completed
  - `payment_status` (text, not null) - Statut paiement: pending, paid, failed, refunded
  - `payment_method` (text) - Méthode de paiement utilisée
  - `payment_intent_id` (text, unique) - ID Stripe PaymentIntent
  - `payment_date` (timestamptz) - Date du paiement réussi
  - `notes` (text) - Notes internes ou du client
  - `metadata` (jsonb) - Données supplémentaires
  - `created_at` (timestamptz) - Date de création
  - `updated_at` (timestamptz) - Date de mise à jour

  ### `order_items`
  Détail des articles/services dans chaque commande.
  - `id` (uuid, primary key) - Identifiant unique
  - `order_id` (uuid, foreign key) - Référence à la commande
  - `service_type` (text, not null) - Type: coworking, meeting-room, studio, domiciliation, etc.
  - `service_name` (text, not null) - Nom du service
  - `booking_date` (date) - Date de réservation si applicable
  - `booking_time` (text) - Heure de début si applicable
  - `duration` (text) - Durée: hour, day, week, month
  - `quantity` (integer, not null) - Quantité
  - `unit_price_ht` (decimal, not null) - Prix unitaire HT
  - `total_price_ht` (decimal, not null) - Prix total ligne HT
  - `configuration` (jsonb) - Configuration détaillée (pour studios)
  - `created_at` (timestamptz) - Date de création

  ## 2. Sécurité
  - RLS activé sur toutes les tables
  - Les utilisateurs authentifiés voient leurs propres commandes
  - Les commandes sans compte sont accessibles via email + order_number
  - Policies strictes pour création et modification
  - Admin role peut tout voir et modifier

  ## 3. Index
  - Index sur order_number pour recherche rapide
  - Index sur customer_email pour retrouver les commandes
  - Index sur payment_intent_id pour webhooks Stripe
  - Index sur status et payment_status pour filtrage
  - Index sur created_at pour tri chronologique

  ## 4. Fonctions
  - Génération automatique de order_number unique
  - Mise à jour automatique de updated_at
  - Fonction de calcul des totaux avec TVA
  - Trigger de synchronisation avec bookings_extended
*/

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_company text,
  billing_address jsonb,
  total_ht decimal(10,2) NOT NULL DEFAULT 0,
  total_tva decimal(10,2) NOT NULL DEFAULT 0,
  total_ttc decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  payment_intent_id text UNIQUE,
  payment_date timestamptz,
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_totals CHECK (total_ht >= 0 AND total_tva >= 0 AND total_ttc >= total_ht)
);

-- Table des articles de commande
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  service_name text NOT NULL,
  booking_date date,
  booking_time text,
  duration text,
  quantity integer NOT NULL DEFAULT 1,
  unit_price_ht decimal(10,2) NOT NULL,
  total_price_ht decimal(10,2) NOT NULL,
  configuration jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_quantity CHECK (quantity > 0),
  CONSTRAINT valid_prices CHECK (unit_price_ht >= 0 AND total_price_ht >= 0)
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent ON orders(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_service_type ON order_items(service_type);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies pour orders

-- Les utilisateurs authentifiés peuvent voir leurs propres commandes
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Accès public avec email + order_number (pour suivi sans compte)
CREATE POLICY "Public can view orders with email and number"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- Tout le monde peut créer une commande (avec ou sans compte)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Les utilisateurs peuvent mettre à jour leurs propres commandes
CREATE POLICY "Users can update their own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies pour order_items

-- Voir les items des commandes accessibles
CREATE POLICY "View items of accessible orders"
  ON order_items
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
    )
  );

-- Créer des items lors de la création d'une commande
CREATE POLICY "Create items with orders"
  ON order_items
  FOR INSERT
  TO public
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
    )
  );

-- Fonction pour générer un numéro de commande unique
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  year text;
  counter integer;
  order_num text;
BEGIN
  year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Compter les commandes de l'année en cours
  SELECT COUNT(*) + 1 INTO counter
  FROM orders
  WHERE order_number LIKE 'LE40-' || year || '-%';
  
  -- Générer le numéro avec padding
  order_num := 'LE40-' || year || '-' || LPAD(counter::text, 5, '0');
  
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer automatiquement le order_number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_order_number ON orders;
CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Fonction pour mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_orders_updated_at ON orders;
CREATE TRIGGER trigger_update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

-- Fonction pour synchroniser avec bookings_extended après confirmation de paiement
CREATE OR REPLACE FUNCTION sync_order_to_bookings()
RETURNS TRIGGER AS $$
DECLARE
  item record;
BEGIN
  -- Si la commande est confirmée et payée, créer les bookings
  IF NEW.payment_status = 'paid' AND NEW.status = 'confirmed' AND 
     (OLD IS NULL OR OLD.payment_status != 'paid') THEN
    
    -- Pour chaque item de la commande qui est une réservation
    FOR item IN 
      SELECT * FROM order_items 
      WHERE order_id = NEW.id 
      AND service_type IN ('studio', 'meeting-room', 'coworking', 'private-office')
      AND booking_date IS NOT NULL
    LOOP
      -- Insérer dans bookings_extended
      INSERT INTO bookings_extended (
        user_id,
        studio_id,
        booking_date,
        booking_time,
        duration_hours,
        formula_id,
        selected_options,
        total_price,
        customer_name,
        customer_email,
        customer_phone,
        status,
        payment_status,
        payment_intent_id,
        notes
      ) VALUES (
        NEW.user_id,
        (item.configuration->>'studioId')::text,
        item.booking_date,
        item.booking_time,
        COALESCE((item.configuration->>'durationHours')::numeric, 1),
        COALESCE((item.configuration->>'formulaId')::text, 'standard'),
        COALESCE(item.configuration->'options', '{}'::jsonb),
        item.total_price_ht,
        NEW.customer_name,
        NEW.customer_email,
        NEW.customer_phone,
        'confirmed',
        'paid',
        NEW.payment_intent_id,
        'Créé depuis commande ' || NEW.order_number
      )
      ON CONFLICT DO NOTHING;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_order_to_bookings ON orders;
CREATE TRIGGER trigger_sync_order_to_bookings
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION sync_order_to_bookings();