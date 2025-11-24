/*
  # Create Shopify Subscriptions System

  ## Overview
  This migration creates the subscription management system for recurring domiciliation products.
  It handles subscription lifecycle, billing, and customer management.

  ## New Tables Created

  ### `shopify_subscriptions`
  Stores all subscription contracts and their status
  - `id` (uuid, primary key) - Internal unique identifier
  - `shopify_subscription_id` (bigint, unique) - Shopify subscription contract ID
  - `shopify_customer_id` (bigint) - Shopify customer ID
  - `customer_email` (text) - Customer email for notifications
  - `customer_name` (text) - Customer full name
  - `product_id` (text) - Internal product ID (e.g., 'domiciliation-starter')
  - `shopify_product_id` (bigint) - Shopify product ID
  - `shopify_variant_id` (bigint) - Shopify variant ID
  - `plan_type` (text) - Plan name: 'starter', 'business', 'scaleup'
  - `billing_interval` (text) - Billing frequency: 'month', 'year'
  - `price` (decimal) - Subscription price
  - `currency` (text) - Currency code (default 'EUR')
  - `status` (text) - Current status: 'active', 'cancelled', 'paused', 'expired', 'pending'
  - `next_billing_date` (timestamptz) - Next billing date
  - `last_billing_date` (timestamptz) - Last successful billing
  - `created_at` (timestamptz) - Subscription creation date
  - `updated_at` (timestamptz) - Last update timestamp
  - `cancelled_at` (timestamptz) - Cancellation date if applicable
  - `cancellation_reason` (text) - Reason for cancellation

  ### `shopify_subscription_billing_attempts`
  Tracks all billing attempts for subscriptions
  - `id` (uuid, primary key)
  - `subscription_id` (uuid, foreign key) - References shopify_subscriptions
  - `shopify_billing_attempt_id` (bigint, unique) - Shopify billing attempt ID
  - `amount` (decimal) - Billed amount
  - `currency` (text) - Currency code
  - `status` (text) - Status: 'success', 'failed', 'pending'
  - `error_message` (text) - Error message if failed
  - `attempted_at` (timestamptz) - Attempt timestamp
  - `next_retry_at` (timestamptz) - Next retry date for failed attempts
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Policies restrict access to authenticated users and their own data
  - Service role can access all data for webhook processing

  ## Indexes
  - Fast lookups by Shopify IDs
  - Efficient filtering by status and dates
  - Optimized joins between tables
*/

-- Create shopify_subscriptions table
CREATE TABLE IF NOT EXISTS shopify_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopify_subscription_id BIGINT UNIQUE NOT NULL,
  shopify_customer_id BIGINT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  product_id TEXT NOT NULL,
  shopify_product_id BIGINT NOT NULL,
  shopify_variant_id BIGINT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('starter', 'business', 'scaleup')),
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('month', 'year')),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'paused', 'expired', 'pending')),
  next_billing_date TIMESTAMPTZ,
  last_billing_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT
);

-- Create shopify_subscription_billing_attempts table
CREATE TABLE IF NOT EXISTS shopify_subscription_billing_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES shopify_subscriptions(id) ON DELETE CASCADE,
  shopify_billing_attempt_id BIGINT UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('success', 'failed', 'pending')),
  error_message TEXT,
  attempted_at TIMESTAMPTZ NOT NULL,
  next_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_shopify_subscriptions_customer_id ON shopify_subscriptions(shopify_customer_id);
CREATE INDEX IF NOT EXISTS idx_shopify_subscriptions_customer_email ON shopify_subscriptions(customer_email);
CREATE INDEX IF NOT EXISTS idx_shopify_subscriptions_status ON shopify_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_shopify_subscriptions_product_id ON shopify_subscriptions(product_id);
CREATE INDEX IF NOT EXISTS idx_shopify_subscriptions_next_billing ON shopify_subscriptions(next_billing_date) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_shopify_subscriptions_created_at ON shopify_subscriptions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_subscription_billing_subscription_id ON shopify_subscription_billing_attempts(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_billing_status ON shopify_subscription_billing_attempts(status);
CREATE INDEX IF NOT EXISTS idx_subscription_billing_attempted_at ON shopify_subscription_billing_attempts(attempted_at DESC);

-- Enable Row Level Security
ALTER TABLE shopify_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_subscription_billing_attempts ENABLE ROW LEVEL SECURITY;

-- Policies for shopify_subscriptions
CREATE POLICY "Service role has full access to subscriptions"
  ON shopify_subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own subscriptions"
  ON shopify_subscriptions
  FOR SELECT
  TO authenticated
  USING (customer_email = auth.jwt()->>'email');

-- Policies for shopify_subscription_billing_attempts
CREATE POLICY "Service role has full access to billing attempts"
  ON shopify_subscription_billing_attempts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own billing attempts"
  ON shopify_subscription_billing_attempts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shopify_subscriptions
      WHERE shopify_subscriptions.id = subscription_id
      AND shopify_subscriptions.customer_email = auth.jwt()->>'email'
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_shopify_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER trigger_update_shopify_subscriptions_updated_at
  BEFORE UPDATE ON shopify_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_shopify_subscriptions_updated_at();

-- Create view for active subscriptions with billing history
CREATE OR REPLACE VIEW active_subscriptions_with_billing AS
SELECT
  s.id,
  s.shopify_subscription_id,
  s.customer_email,
  s.customer_name,
  s.product_id,
  s.plan_type,
  s.billing_interval,
  s.price,
  s.currency,
  s.status,
  s.next_billing_date,
  s.last_billing_date,
  s.created_at,
  COUNT(ba.id) FILTER (WHERE ba.status = 'success') as successful_billings,
  COUNT(ba.id) FILTER (WHERE ba.status = 'failed') as failed_billings,
  SUM(ba.amount) FILTER (WHERE ba.status = 'success') as total_revenue
FROM shopify_subscriptions s
LEFT JOIN shopify_subscription_billing_attempts ba ON s.id = ba.subscription_id
WHERE s.status = 'active'
GROUP BY s.id;

-- Grant access to authenticated users to view their active subscriptions
GRANT SELECT ON active_subscriptions_with_billing TO authenticated;