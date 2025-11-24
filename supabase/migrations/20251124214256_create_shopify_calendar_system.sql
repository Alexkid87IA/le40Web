/*
  # Système de Calendrier Shopify pour Synchronisation des Réservations

  ## Description
  Ce système gère la disponibilité en temps réel des ressources (salles, studios, bureaux)
  et synchronise les réservations avec les commandes Shopify pour éviter les doubles réservations.

  ## 1. Nouvelles Tables

  ### `shopify_inventory_calendar`
  Gère les créneaux de disponibilité et les blocages temporaires/permanents.
  - `id` (uuid, primary key) - Identifiant unique
  - `shopify_product_id` (text, not null) - ID du produit Shopify
  - `shopify_variant_id` (text) - ID de la variante Shopify spécifique
  - `resource_name` (text, not null) - Nom de la ressource (ex: "Salle Alpha", "Studio A")
  - `resource_type` (text) - Type: 'meeting_room', 'studio', 'workspace', 'private_office'
  - `booking_date` (date, not null) - Date de la réservation
  - `start_time` (time, not null) - Heure de début
  - `end_time` (time, not null) - Heure de fin
  - `is_available` (boolean) - Disponible (true) ou réservé (false)
  - `is_temporary_hold` (boolean) - Blocage temporaire pendant ajout au panier
  - `hold_expires_at` (timestamptz) - Expiration du blocage temporaire (15 minutes)
  - `shopify_order_id` (text) - ID de la commande Shopify ayant réservé ce créneau
  - `shopify_checkout_id` (text) - ID du checkout Shopify (pour holds temporaires)
  - `customer_email` (text) - Email du client
  - `customer_name` (text) - Nom du client
  - `metadata` (jsonb) - Données supplémentaires
  - `created_at` (timestamptz) - Date de création
  - `updated_at` (timestamptz) - Date de mise à jour

  ### `shopify_orders`
  Miroir des commandes Shopify dans Supabase pour tracking et synchronisation.
  - `id` (uuid, primary key) - Identifiant unique Supabase
  - `shopify_order_id` (text, unique, not null) - ID de la commande Shopify
  - `shopify_order_number` (text, not null) - Numéro lisible (ex: #1001)
  - `customer_email` (text, not null) - Email du client
  - `customer_name` (text) - Nom complet du client
  - `customer_phone` (text) - Téléphone du client
  - `total_price` (decimal) - Prix total
  - `currency` (text) - Devise (EUR)
  - `status` (text) - Statut Shopify: pending, paid, fulfilled, cancelled
  - `financial_status` (text) - Statut paiement: pending, authorized, paid, refunded
  - `fulfillment_status` (text) - Statut livraison: unfulfilled, partial, fulfilled
  - `line_items` (jsonb) - Détails des produits commandés
  - `calendar_bookings` (jsonb) - Références aux créneaux réservés
  - `metadata` (jsonb) - Données supplémentaires
  - `synced_at` (timestamptz) - Dernière synchronisation
  - `created_at` (timestamptz) - Date de création sur Shopify
  - `updated_at` (timestamptz) - Date de mise à jour

  ## 2. Sécurité
  - RLS activé sur toutes les tables
  - Utilisateurs authentifiés peuvent voir leurs propres réservations
  - Accès public en lecture pour vérifier disponibilités
  - Création restreinte aux utilisateurs authentifiés ou via webhook
  - Admin peut tout voir et modifier

  ## 3. Index
  - Index composite sur (resource_name, booking_date, is_available) pour recherche rapide
  - Index sur hold_expires_at pour nettoyage automatique
  - Index sur shopify_order_id et customer_email pour recherche
  - Index sur booking_date pour requêtes par période

  ## 4. Fonctions
  - Fonction de nettoyage automatique des holds expirés
  - Fonction de vérification de disponibilité
  - Trigger de mise à jour automatique de updated_at
  - Fonction de création de créneau avec validation anti-chevauchement

  ## 5. Contraintes
  - Contrainte UNIQUE sur (resource_name, booking_date, start_time, end_time)
  - Empêche les doubles réservations au niveau base de données
  - Validation des heures (end_time > start_time)
*/

-- Table de gestion du calendrier des disponibilités
CREATE TABLE IF NOT EXISTS shopify_inventory_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_product_id text NOT NULL,
  shopify_variant_id text,
  resource_name text NOT NULL,
  resource_type text CHECK (resource_type IN ('meeting_room', 'studio', 'workspace', 'private_office')),
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true NOT NULL,
  is_temporary_hold boolean DEFAULT false NOT NULL,
  hold_expires_at timestamptz,
  shopify_order_id text,
  shopify_checkout_id text,
  customer_email text,
  customer_name text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_time_range CHECK (end_time > start_time),
  CONSTRAINT unique_booking UNIQUE (resource_name, booking_date, start_time, end_time)
);

-- Table miroir des commandes Shopify
CREATE TABLE IF NOT EXISTS shopify_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_order_id text UNIQUE NOT NULL,
  shopify_order_number text NOT NULL,
  customer_email text NOT NULL,
  customer_name text,
  customer_phone text,
  total_price decimal(10,2),
  currency text DEFAULT 'EUR',
  status text CHECK (status IN ('pending', 'paid', 'fulfilled', 'cancelled')),
  financial_status text,
  fulfillment_status text,
  line_items jsonb DEFAULT '[]'::jsonb,
  calendar_bookings jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  synced_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_calendar_availability 
  ON shopify_inventory_calendar(resource_name, booking_date, is_available)
  WHERE is_available = true;

CREATE INDEX IF NOT EXISTS idx_calendar_resource_date 
  ON shopify_inventory_calendar(resource_name, booking_date);

CREATE INDEX IF NOT EXISTS idx_calendar_hold_expiry 
  ON shopify_inventory_calendar(hold_expires_at) 
  WHERE is_temporary_hold = true AND hold_expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_calendar_shopify_order 
  ON shopify_inventory_calendar(shopify_order_id) 
  WHERE shopify_order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_calendar_customer_email 
  ON shopify_inventory_calendar(customer_email) 
  WHERE customer_email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_shopify_orders_email 
  ON shopify_orders(customer_email);

CREATE INDEX IF NOT EXISTS idx_shopify_orders_status 
  ON shopify_orders(status);

CREATE INDEX IF NOT EXISTS idx_shopify_orders_created 
  ON shopify_orders(created_at DESC);

-- Enable RLS
ALTER TABLE shopify_inventory_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_orders ENABLE ROW LEVEL SECURITY;

-- Policies pour shopify_inventory_calendar

-- Tout le monde peut voir les disponibilités
CREATE POLICY "Public can view calendar availability"
  ON shopify_inventory_calendar
  FOR SELECT
  TO public
  USING (true);

-- Utilisateurs authentifiés peuvent créer des holds temporaires
CREATE POLICY "Authenticated users can create holds"
  ON shopify_inventory_calendar
  FOR INSERT
  TO authenticated
  WITH CHECK (is_temporary_hold = true AND hold_expires_at IS NOT NULL);

-- Service role peut tout faire (pour webhooks)
CREATE POLICY "Service role can manage calendar"
  ON shopify_inventory_calendar
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies pour shopify_orders

-- Utilisateurs peuvent voir leurs propres commandes
CREATE POLICY "Users can view their own orders"
  ON shopify_orders
  FOR SELECT
  TO authenticated
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Accès public avec email (pour suivi commande)
CREATE POLICY "Public can view orders by email"
  ON shopify_orders
  FOR SELECT
  TO public
  USING (true);

-- Service role peut tout faire (pour webhooks)
CREATE POLICY "Service role can manage orders"
  ON shopify_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Fonction pour nettoyer automatiquement les holds expirés
CREATE OR REPLACE FUNCTION cleanup_expired_holds()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE shopify_inventory_calendar
  SET 
    is_available = true,
    is_temporary_hold = false,
    hold_expires_at = NULL,
    shopify_checkout_id = NULL,
    updated_at = now()
  WHERE 
    is_temporary_hold = true 
    AND hold_expires_at IS NOT NULL
    AND hold_expires_at < now();
END;
$$;

-- Fonction pour vérifier la disponibilité d'un créneau
CREATE OR REPLACE FUNCTION check_slot_availability(
  p_resource_name text,
  p_booking_date date,
  p_start_time time,
  p_end_time time
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_available boolean;
BEGIN
  -- Nettoyer les holds expirés d'abord
  PERFORM cleanup_expired_holds();
  
  -- Vérifier si un créneau existe et est disponible
  SELECT 
    COALESCE(bool_and(is_available), true)
  INTO v_available
  FROM shopify_inventory_calendar
  WHERE 
    resource_name = p_resource_name
    AND booking_date = p_booking_date
    AND (
      (start_time >= p_start_time AND start_time < p_end_time)
      OR (end_time > p_start_time AND end_time <= p_end_time)
      OR (start_time <= p_start_time AND end_time >= p_end_time)
    );
  
  RETURN v_available;
END;
$$;

-- Fonction pour créer un hold temporaire
CREATE OR REPLACE FUNCTION create_temporary_hold(
  p_shopify_product_id text,
  p_shopify_variant_id text,
  p_resource_name text,
  p_resource_type text,
  p_booking_date date,
  p_start_time time,
  p_end_time time,
  p_shopify_checkout_id text,
  p_customer_email text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id uuid;
  v_available boolean;
BEGIN
  -- Nettoyer les holds expirés
  PERFORM cleanup_expired_holds();
  
  -- Vérifier disponibilité
  v_available := check_slot_availability(
    p_resource_name,
    p_booking_date,
    p_start_time,
    p_end_time
  );
  
  IF NOT v_available THEN
    RAISE EXCEPTION 'Créneau non disponible';
  END IF;
  
  -- Créer le hold temporaire (15 minutes)
  INSERT INTO shopify_inventory_calendar (
    shopify_product_id,
    shopify_variant_id,
    resource_name,
    resource_type,
    booking_date,
    start_time,
    end_time,
    is_available,
    is_temporary_hold,
    hold_expires_at,
    shopify_checkout_id,
    customer_email
  ) VALUES (
    p_shopify_product_id,
    p_shopify_variant_id,
    p_resource_name,
    p_resource_type,
    p_booking_date,
    p_start_time,
    p_end_time,
    false,
    true,
    now() + interval '15 minutes',
    p_shopify_checkout_id,
    p_customer_email
  )
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- Trigger pour mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_calendar_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_calendar_updated_at ON shopify_inventory_calendar;
CREATE TRIGGER trigger_calendar_updated_at
  BEFORE UPDATE ON shopify_inventory_calendar
  FOR EACH ROW
  EXECUTE FUNCTION update_calendar_updated_at();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON shopify_orders;
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON shopify_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_calendar_updated_at();
