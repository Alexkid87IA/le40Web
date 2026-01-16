-- ============================================================
-- FIX RLS POLICIES - Restrict access to data
-- ============================================================

-- Drop overly permissive policies on orders
DROP POLICY IF EXISTS "Public can view orders with email and number" ON orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;

-- Create secure policies for orders
-- Users can only view their own orders (by email match)
CREATE POLICY "Users can view own orders by email"
  ON orders
  FOR SELECT
  TO public
  USING (
    customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    OR
    auth.uid() IS NOT NULL AND EXISTS (
      SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = orders.customer_email
    )
  );

-- Only authenticated users can create orders (or public with valid data)
CREATE POLICY "Authenticated users can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (
    customer_email IS NOT NULL
    AND customer_name IS NOT NULL
    AND total_ttc > 0
  );

-- Only admins or order owner can update
CREATE POLICY "Order owner or admin can update"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IS NOT NULL AND (
      -- Admin check (email contains @le40)
      EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email LIKE '%@le40%')
      OR
      -- Owner check
      EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = orders.customer_email)
    )
  );

-- ============================================================
-- Fix visit_requests policies
-- ============================================================

DROP POLICY IF EXISTS "Authenticated users can view all visit requests" ON visit_requests;
DROP POLICY IF EXISTS "Authenticated users can update visit requests" ON visit_requests;

-- Only admins can view all visit requests
CREATE POLICY "Admins can view all visit requests"
  ON visit_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email LIKE '%@le40%')
  );

-- Public can view their own visit requests by email
CREATE POLICY "Users can view own visit requests"
  ON visit_requests
  FOR SELECT
  TO public
  USING (
    email = current_setting('request.jwt.claims', true)::json->>'email'
  );

-- Only admins can update visit requests
CREATE POLICY "Admins can update visit requests"
  ON visit_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email LIKE '%@le40%')
  );

-- ============================================================
-- Fix contact_messages policies
-- ============================================================

DROP POLICY IF EXISTS "Permettre la lecture aux utilisateurs authentifiés" ON contact_messages;

-- Only admins can view contact messages
CREATE POLICY "Admins can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email LIKE '%@le40%')
  );

-- ============================================================
-- Fix lead_magnets policies
-- ============================================================

DROP POLICY IF EXISTS "Allow public read" ON lead_magnets;

-- Only admins can view lead magnets
CREATE POLICY "Admins can view lead magnets"
  ON lead_magnets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email LIKE '%@le40%')
  );

-- ============================================================
-- Add index for performance on email lookups
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_visit_requests_email ON visit_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
