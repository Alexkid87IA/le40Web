-- ============================================
-- Lead Magnets Table
-- Stocke les emails collectés via les formulaires lead magnet
-- ============================================

-- Table principale
CREATE TABLE IF NOT EXISTS lead_magnets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'domiciliation_guide', 'coworking_checklist', etc.
    source VARCHAR(100), -- page d'origine
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    downloaded BOOLEAN DEFAULT FALSE,
    downloaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherches rapides
CREATE INDEX IF NOT EXISTS idx_lead_magnets_email ON lead_magnets(email);
CREATE INDEX IF NOT EXISTS idx_lead_magnets_type ON lead_magnets(type);
CREATE INDEX IF NOT EXISTS idx_lead_magnets_created_at ON lead_magnets(created_at DESC);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_lead_magnets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_lead_magnets_updated_at ON lead_magnets;
CREATE TRIGGER trigger_lead_magnets_updated_at
    BEFORE UPDATE ON lead_magnets
    FOR EACH ROW
    EXECUTE FUNCTION update_lead_magnets_updated_at();

-- RLS (Row Level Security)
ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;

-- Policy: Tout le monde peut insérer (formulaires publics)
CREATE POLICY "Anyone can insert lead magnets"
    ON lead_magnets
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Policy: Seuls les utilisateurs authentifiés peuvent lire
CREATE POLICY "Authenticated users can read lead magnets"
    ON lead_magnets
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- Table pour les notifications (Club, etc.)
-- ============================================

CREATE TABLE IF NOT EXISTS notification_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    type VARCHAR(100) NOT NULL, -- 'club_launch', 'event_notification', etc.
    source VARCHAR(100),
    notified BOOLEAN DEFAULT FALSE,
    notified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notification_requests_email ON notification_requests(email);
CREATE INDEX IF NOT EXISTS idx_notification_requests_type ON notification_requests(type);

ALTER TABLE notification_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert notification requests"
    ON notification_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can read notification requests"
    ON notification_requests
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- Vue pour analytics des lead magnets
-- ============================================

CREATE OR REPLACE VIEW lead_magnets_stats AS
SELECT
    type,
    source,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN downloaded THEN 1 END) as downloads,
    DATE_TRUNC('day', created_at) as date
FROM lead_magnets
GROUP BY type, source, DATE_TRUNC('day', created_at)
ORDER BY date DESC;

COMMENT ON TABLE lead_magnets IS 'Stocke les emails collectés via les formulaires lead magnet (guides, checklists, etc.)';
COMMENT ON TABLE notification_requests IS 'Stocke les demandes de notification pour les lancements (Club, Events, etc.)';
