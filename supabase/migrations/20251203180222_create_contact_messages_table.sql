/*
  # Table des messages de contact

  1. Nouvelle Table
    - `contact_messages`
      - `id` (uuid, clé primaire)
      - `first_name` (text) - Prénom du contact
      - `last_name` (text) - Nom du contact
      - `email` (text) - Email du contact
      - `phone` (text, optionnel) - Téléphone du contact
      - `company` (text, optionnel) - Entreprise du contact
      - `service` (text) - Service d'intérêt
      - `message` (text) - Message du contact
      - `status` (text) - Statut du message (nouveau, en cours, traité)
      - `created_at` (timestamptz) - Date de création
      - `updated_at` (timestamptz) - Date de mise à jour

  2. Sécurité
    - Activer RLS sur la table
    - Permettre l'insertion publique (pour le formulaire de contact)
    - Restreindre la lecture aux utilisateurs authentifiés
*/

-- Créer la table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'nouveau',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique
CREATE POLICY "Permettre l'insertion publique de messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "Permettre la lecture aux utilisateurs authentifiés"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "Permettre la mise à jour aux utilisateurs authentifiés"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement updated_at
DROP TRIGGER IF EXISTS update_contact_messages_updated_at_trigger ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at_trigger
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_messages_updated_at();