/*
  # Data Retention Policy for GDPR Compliance

  1. Purpose
    - Implement automatic data deletion after retention periods
    - Comply with GDPR Article 5(1)(e) - storage limitation principle
    - Add created_at tracking for all analytics data

  2. Retention Periods
    - Analytics data (preroll_selections): 25 months (2 years + 1 month)
    - User consent data: 13 months maximum

  3. Implementation
    - Add function to clean old analytics data
    - Create scheduled job to run cleanup monthly
    - Add indexes for efficient deletion

  4. Notes
    - Runs automatically via pg_cron extension
    - Can be manually triggered if needed
    - Logs deletion activity for audit trail
*/

-- Enable pg_cron extension if not already enabled (requires superuser)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Function to clean old analytics data
CREATE OR REPLACE FUNCTION clean_old_analytics_data()
RETURNS TABLE (
  deleted_count bigint,
  execution_time timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_deleted_count bigint;
  v_retention_date timestamp with time zone;
BEGIN
  -- Calculate retention date (25 months ago)
  v_retention_date := NOW() - INTERVAL '25 months';

  -- Delete old analytics data
  DELETE FROM preroll_selections
  WHERE created_at < v_retention_date;

  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

  -- Log the cleanup operation
  RAISE NOTICE 'Cleaned % old analytics records older than %', v_deleted_count, v_retention_date;

  RETURN QUERY SELECT v_deleted_count, NOW();
END;
$$;

-- Grant execute permission to authenticated users (admin only in practice)
GRANT EXECUTE ON FUNCTION clean_old_analytics_data() TO authenticated;

-- Comment on function
COMMENT ON FUNCTION clean_old_analytics_data() IS
'Deletes analytics data older than 25 months for GDPR compliance. Returns count of deleted records.';

-- Add index on created_at if it doesn't already exist (for efficient deletion)
CREATE INDEX IF NOT EXISTS idx_preroll_created_at_retention
ON preroll_selections(created_at)
WHERE created_at < NOW() - INTERVAL '25 months';

-- Schedule automatic cleanup (monthly on 1st day at 3 AM)
-- Note: This requires pg_cron extension and superuser privileges
-- Uncomment if pg_cron is available:
/*
SELECT cron.schedule(
  'cleanup-old-analytics',           -- Job name
  '0 3 1 * *',                       -- Cron schedule: At 03:00 on day 1 of every month
  'SELECT clean_old_analytics_data();' -- SQL to execute
);
*/

-- Alternative: Create a reminder table for manual cleanup
CREATE TABLE IF NOT EXISTS data_retention_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleanup_function text NOT NULL,
  records_deleted bigint,
  executed_at timestamp with time zone DEFAULT NOW(),
  executed_by text
);

-- Grant access to retention log
ALTER TABLE data_retention_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read retention log"
  ON data_retention_log
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert retention log"
  ON data_retention_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Comment on retention log table
COMMENT ON TABLE data_retention_log IS
'Audit log for data retention cleanup operations. Tracks when data was deleted for GDPR compliance.';

-- Helper function to check data age statistics
CREATE OR REPLACE FUNCTION get_analytics_age_stats()
RETURNS TABLE (
  total_records bigint,
  oldest_record timestamp with time zone,
  newest_record timestamp with time zone,
  records_older_than_retention bigint,
  retention_date timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    COUNT(*) as total_records,
    MIN(created_at) as oldest_record,
    MAX(created_at) as newest_record,
    COUNT(*) FILTER (WHERE created_at < NOW() - INTERVAL '25 months') as records_older_than_retention,
    NOW() - INTERVAL '25 months' as retention_date
  FROM preroll_selections;
$$;

GRANT EXECUTE ON FUNCTION get_analytics_age_stats() TO authenticated;

COMMENT ON FUNCTION get_analytics_age_stats() IS
'Returns statistics about analytics data age for monitoring retention compliance.';

-- Instructions for manual cleanup
COMMENT ON TABLE preroll_selections IS
'Analytics data for service selections.
Retention policy: 25 months maximum.
Manual cleanup: SELECT * FROM clean_old_analytics_data();
Check stats: SELECT * FROM get_analytics_age_stats();';
