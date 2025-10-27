/*
  # Création de la table analytics pour le préroll

  1. Nouvelle Table
    - `preroll_selections`
      - `id` (uuid, primary key)
      - `session_id` (text) - ID de session unique pour tracker les utilisateurs
      - `selected_service` (text) - Service sélectionné par l'utilisateur
      - `created_at` (timestamp) - Date et heure de la sélection
      - `user_agent` (text) - Information sur le navigateur/appareil
      - `referrer` (text, nullable) - D'où vient l'utilisateur
  
  2. Sécurité
    - Enable RLS sur la table `preroll_selections`
    - Politique permettant l'insertion publique (pour analytics anonymes)
    - Politique de lecture restreinte aux utilisateurs authentifiés (si besoin)

  3. Index
    - Index sur `created_at` pour les requêtes analytics par date
    - Index sur `selected_service` pour les statistiques par service
*/

CREATE TABLE IF NOT EXISTS preroll_selections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  selected_service text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_agent text,
  referrer text
);

ALTER TABLE preroll_selections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for analytics"
  ON preroll_selections
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read analytics"
  ON preroll_selections
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_preroll_created_at ON preroll_selections(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_preroll_service ON preroll_selections(selected_service);
CREATE INDEX IF NOT EXISTS idx_preroll_session ON preroll_selections(session_id);
