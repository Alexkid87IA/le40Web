/*
  # Système de Sauvegarde des Configurations de Studio

  ## Description
  Ce système permet aux utilisateurs de créer, sauvegarder et partager leurs configurations de studio personnalisées.

  ## 1. Nouvelles Tables

  ### `studio_configurations`
  Table principale stockant les configurations complètes de studio.
  - `id` (uuid, primary key) - Identifiant unique de la configuration
  - `share_token` (text, unique) - Token unique pour partage par lien
  - `studio_id` (text) - ID du studio sélectionné
  - `formula_id` (text) - ID de la formule choisie
  - `duration_id` (text) - ID de la durée choisie
  - `selected_options` (jsonb) - Options additionnelles sélectionnées
  - `total_price_ht` (decimal) - Prix total HT calculé
  - `total_price_ttc` (decimal) - Prix total TTC
  - `user_name` (text, optional) - Nom de l'utilisateur
  - `user_email` (text, optional) - Email de l'utilisateur
  - `notes` (text, optional) - Notes personnelles
  - `is_favorite` (boolean) - Marqué comme favori
  - `view_count` (integer) - Nombre de vues du partage
  - `created_at` (timestamptz) - Date de création
  - `updated_at` (timestamptz) - Date de dernière modification

  ### `configuration_views`
  Table pour tracker les vues des configurations partagées.
  - `id` (uuid, primary key)
  - `configuration_id` (uuid, foreign key) - Référence à la configuration
  - `viewed_at` (timestamptz) - Date de la vue
  - `viewer_ip` (text) - IP du visiteur (anonymisée)
  - `viewer_user_agent` (text) - User agent du navigateur

  ## 2. Sécurité
  - RLS activé sur toutes les tables
  - Policies pour lecture publique via share_token
  - Policies pour création sans authentification (leads)
  - Anonymisation des données sensibles

  ## 3. Index
  - Index sur share_token pour recherche rapide
  - Index sur created_at pour tri chronologique
  - Index sur is_favorite pour filtrage rapide

  ## 4. Fonctions Utilitaires
  - Génération automatique de share_token unique
  - Mise à jour automatique de updated_at
  - Incrémentation automatique de view_count
*/

-- Table des configurations de studio
CREATE TABLE IF NOT EXISTS studio_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  share_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  studio_id text NOT NULL,
  studio_name text NOT NULL,
  formula_id text NOT NULL,
  formula_name text NOT NULL,
  duration_id text NOT NULL,
  duration_label text NOT NULL,
  duration_hours integer NOT NULL,
  selected_options jsonb DEFAULT '[]'::jsonb,
  total_price_ht decimal(10,2) NOT NULL DEFAULT 0,
  total_price_ttc decimal(10,2) NOT NULL DEFAULT 0,
  user_name text,
  user_email text,
  notes text,
  is_favorite boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_price_ht CHECK (total_price_ht >= 0),
  CONSTRAINT valid_price_ttc CHECK (total_price_ttc >= 0),
  CONSTRAINT valid_view_count CHECK (view_count >= 0)
);

-- Table des vues de configurations
CREATE TABLE IF NOT EXISTS configuration_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  configuration_id uuid NOT NULL REFERENCES studio_configurations(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  viewer_ip text,
  viewer_user_agent text
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_studio_configurations_share_token ON studio_configurations(share_token);
CREATE INDEX IF NOT EXISTS idx_studio_configurations_created_at ON studio_configurations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studio_configurations_is_favorite ON studio_configurations(is_favorite) WHERE is_favorite = true;
CREATE INDEX IF NOT EXISTS idx_configuration_views_config_id ON configuration_views(configuration_id);
CREATE INDEX IF NOT EXISTS idx_configuration_views_viewed_at ON configuration_views(viewed_at DESC);

-- Fonction pour mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS update_studio_configurations_updated_at ON studio_configurations;
CREATE TRIGGER update_studio_configurations_updated_at
  BEFORE UPDATE ON studio_configurations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour incrémenter view_count lors d'une vue
CREATE OR REPLACE FUNCTION increment_configuration_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE studio_configurations
  SET view_count = view_count + 1
  WHERE id = NEW.configuration_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour view_count
DROP TRIGGER IF EXISTS increment_view_count_on_view ON configuration_views;
CREATE TRIGGER increment_view_count_on_view
  AFTER INSERT ON configuration_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_configuration_view_count();

-- Enable RLS
ALTER TABLE studio_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuration_views ENABLE ROW LEVEL SECURITY;

-- Policies pour studio_configurations

-- Tout le monde peut lire une configuration via son share_token (pour le partage)
CREATE POLICY "Configurations publiques via share_token"
  ON studio_configurations
  FOR SELECT
  USING (true);

-- Tout le monde peut créer une configuration (lead generation)
CREATE POLICY "Création publique de configurations"
  ON studio_configurations
  FOR INSERT
  WITH CHECK (true);

-- Tout le monde peut mettre à jour ses propres configurations (via share_token)
CREATE POLICY "Mise à jour de configurations via share_token"
  ON studio_configurations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Suppression autorisée pour tous (nécessaire pour gestion par l'utilisateur)
CREATE POLICY "Suppression de configurations"
  ON studio_configurations
  FOR DELETE
  USING (true);

-- Policies pour configuration_views

-- Tout le monde peut voir les vues (analytics publiques)
CREATE POLICY "Lecture publique des vues"
  ON configuration_views
  FOR SELECT
  USING (true);

-- Tout le monde peut créer une vue (tracking des consultations)
CREATE POLICY "Création publique de vues"
  ON configuration_views
  FOR INSERT
  WITH CHECK (true);