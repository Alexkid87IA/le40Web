# GDPR/RGPD Compliance Guide - Le 40 Coworking

This document outlines all GDPR (General Data Protection Regulation) / RGPD (Règlement Général sur la Protection des Données) compliance measures implemented in this project.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Data Collected](#data-collected)
3. [Legal Basis](#legal-basis)
4. [Cookie Consent](#cookie-consent)
5. [Privacy Policy](#privacy-policy)
6. [Data Retention](#data-retention)
7. [User Rights](#user-rights)
8. [Security Measures](#security-measures)
9. [Compliance Checklist](#compliance-checklist)

---

## 🔍 Overview

**Regulation**: GDPR (EU) 2016/679
**Scope**: European Union + EEA
**Penalties**: Up to €20 million or 4% of global annual revenue
**Effective Date**: May 25, 2018

### Implementation Status

| Requirement | Status | Location |
|-------------|--------|----------|
| Cookie consent banner | ✅ Implemented | `src/components/GDPR/CookieConsent.tsx` |
| Privacy policy | ✅ Implemented | `src/pages/PrivacyPolicy.tsx` |
| Data retention policy | ✅ Implemented | `supabase/migrations/20251028_data_retention_policy.sql` |
| Right to access | ✅ Manual process | Email: contact@le40.fr |
| Right to deletion | ✅ Manual process | Email: contact@le40.fr |
| Right to portability | ✅ Manual process | Email: contact@le40.fr |
| Data breach procedures | 🔄 To be documented | - |
| DPO appointed | 🔄 Required if applicable | - |

---

## 📊 Data Collected

### 1. Analytics Data (Preroll Selections)

**Table**: `preroll_selections`

```sql
{
  id: uuid,
  session_id: text,           // Anonymous session identifier
  selected_service: text,     // Service selected by user
  created_at: timestamptz,    // Time of selection
  user_agent: text,           // Browser/device info (personal data)
  referrer: text,             // Where user came from
  screen_width: integer,      // Device screen width
  screen_height: integer,     // Device screen height
  timestamp: timestamptz,     // Explicit timestamp
  interaction_data: jsonb     // Additional metrics
}
```

**Legal Basis**: Consent (via cookie banner)
**Retention Period**: 25 months maximum
**Purpose**: Improve user experience, analyze traffic patterns

### 2. Cart Data (LocalStorage)

**Location**: Browser localStorage (`le40-cart`)

```typescript
{
  id: string,
  serviceType: string,
  serviceName: string,
  date: string,
  startTime?: string,
  endTime?: string,
  duration: string,
  price: number,
  quantity: number
}
```

**Legal Basis**: Legitimate interest (necessary for service)
**Retention Period**: Until user clears browser data
**Purpose**: Maintain shopping cart functionality

### 3. Cookie Consent Data (LocalStorage)

**Location**: Browser localStorage (`le40_cookie_consent`)

```typescript
{
  version: string,
  preferences: {
    necessary: boolean,
    analytics: boolean,
    marketing: boolean
  },
  timestamp: string
}
```

**Legal Basis**: Legal obligation (GDPR Article 7)
**Retention Period**: 13 months
**Purpose**: Store user consent preferences

### 4. Contact Form Data (If Submitted)

**Data**: Name, email, phone, message
**Legal Basis**: Consent + Contract execution
**Retention Period**: 3 years after last contact
**Purpose**: Respond to user inquiries

---

## ⚖️ Legal Basis

According to GDPR Article 6, processing is lawful if at least one applies:

### 1. Consent (Article 6(1)(a))
- **Applies to**: Analytics cookies, marketing cookies
- **Implementation**: Cookie consent banner
- **Withdrawal**: User can revoke anytime via banner

### 2. Contract (Article 6(1)(b))
- **Applies to**: Booking/reservation data
- **Implementation**: Necessary to fulfill service
- **Note**: Cannot be revoked if booking is active

### 3. Legitimate Interest (Article 6(1)(f))
- **Applies to**: Cart functionality, essential cookies
- **Implementation**: Necessary for site operation
- **Balancing test**: User expects cart to work

### 4. Legal Obligation (Article 6(1)(c))
- **Applies to**: Accounting records, tax documents
- **Implementation**: 10-year retention for bookings
- **Authority**: French tax law

---

## 🍪 Cookie Consent

### Implementation

**Location**: `src/components/GDPR/CookieConsent.tsx`

**Features**:
- ✅ Shown before any non-necessary tracking
- ✅ Clear explanation of cookie purposes
- ✅ Granular consent (analytics, marketing separate)
- ✅ Easy to accept or reject
- ✅ Easy to change preferences later
- ✅ Version tracking for consent updates

### Cookie Categories

#### 1. Necessary Cookies (Always Active)
- **Purpose**: Essential site functionality
- **Examples**: Cart data, session management
- **Cannot be disabled**

#### 2. Analytics Cookies (Opt-in Required)
- **Purpose**: Understand site usage, improve UX
- **Examples**: Preroll selections, page views
- **Controlled via consent banner**

#### 3. Marketing Cookies (Opt-in Required)
- **Purpose**: Targeted advertising, campaign tracking
- **Examples**: Facebook Pixel, Google Ads (if implemented)
- **Controlled via consent banner**

### Consent Storage

```typescript
{
  version: "1.0",                    // Update if consent form changes
  preferences: {
    necessary: true,                 // Always true
    analytics: true/false,           // User choice
    marketing: true/false            // User choice
  },
  timestamp: "2025-10-28T12:00:00Z"  // When consent was given
}
```

### Consent Actions

```typescript
// Accept all cookies
handleAcceptAll() → Sets all to true

// Accept only necessary
handleAcceptNecessary() → Sets analytics/marketing to false

// Customize preferences
handleSavePreferences() → Saves custom preferences

// Reject all
handleReject() → Same as handleAcceptNecessary()
```

---

## 📜 Privacy Policy

**Location**: `/politique-confidentialite` (`src/pages/PrivacyPolicy.tsx`)

### Sections Included

1. **Introduction** - Who we are, scope of policy
2. **Data Collection** - What data we collect and why
3. **Data Usage** - How we use collected data
4. **Legal Basis** - GDPR Article 6 justifications
5. **User Rights** - GDPR Articles 15-22
6. **Data Retention** - How long we keep data
7. **Security Measures** - How we protect data
8. **Cookies** - Cookie policy integrated
9. **Contact Information** - How to reach DPO/contact
10. **Modifications** - How policy updates are handled

### User Rights Explained

| Right | Article | Description | How to Exercise |
|-------|---------|-------------|-----------------|
| **Access** | 15 | Get copy of your data | Email contact@le40.fr |
| **Rectification** | 16 | Correct inaccurate data | Email contact@le40.fr |
| **Erasure** | 17 | "Right to be forgotten" | Email contact@le40.fr |
| **Portability** | 20 | Receive data in structured format | Email contact@le40.fr |
| **Object** | 21 | Object to processing | Email contact@le40.fr |
| **Withdraw Consent** | 7(3) | Revoke consent anytime | Cookie banner settings |

---

## ⏰ Data Retention

### Automated Retention Policy

**Location**: `supabase/migrations/20251028_data_retention_policy.sql`

#### Function: `clean_old_analytics_data()`

```sql
-- Deletes analytics data older than 25 months
SELECT * FROM clean_old_analytics_data();

-- Returns:
{
  deleted_count: bigint,
  execution_time: timestamp
}
```

#### Monitoring: `get_analytics_age_stats()`

```sql
-- Check data age statistics
SELECT * FROM get_analytics_age_stats();

-- Returns:
{
  total_records: bigint,
  oldest_record: timestamp,
  newest_record: timestamp,
  records_older_than_retention: bigint,
  retention_date: timestamp
}
```

### Retention Periods by Data Type

| Data Type | Retention Period | Legal Basis | Automated Deletion |
|-----------|------------------|-------------|-------------------|
| Analytics (preroll) | 25 months | Consent | ✅ SQL function |
| Contact form data | 3 years | Legitimate interest | 🔄 Manual |
| Booking data | 10 years | Legal obligation | 🔄 Manual |
| Cookie consent | 13 months | Legal obligation | ✅ Browser-based |
| Cart data | Until cleared | Legitimate interest | ✅ Browser-based |

### Cleanup Schedule

**Recommended**: Monthly on 1st at 3:00 AM

```sql
-- Option 1: pg_cron (requires superuser)
SELECT cron.schedule(
  'cleanup-old-analytics',
  '0 3 1 * *',
  'SELECT clean_old_analytics_data();'
);

-- Option 2: Manual execution
SELECT * FROM clean_old_analytics_data();
```

---

## 🛡️ Security Measures

### Technical Measures

1. **HTTPS Encryption**
   - All communications encrypted in transit
   - TLS 1.2+ required

2. **Input Validation**
   - Zod schemas for all user input
   - XSS protection on localStorage
   - SQL injection prevention (Supabase RLS)

3. **Access Control**
   - Row Level Security on Supabase
   - Analytics: Public INSERT, Authenticated SELECT
   - Principle of least privilege

4. **Data Minimization**
   - Only collect necessary data
   - Anonymous session IDs
   - No PII in analytics by default

5. **Secure Storage**
   - Passwords hashed (if auth implemented)
   - Environment variables validated
   - Sensitive data redacted in logs

### Organizational Measures

1. **Data Protection by Design**
   - Privacy considered from start
   - Default to minimum data collection
   - User controls built-in

2. **Staff Training**
   - 🔄 TODO: GDPR awareness training
   - 🔄 TODO: Incident response procedures

3. **Data Processing Agreements**
   - ✅ Supabase (EU data centers)
   - 🔄 TODO: Other processors if added

4. **Audit Trail**
   - `data_retention_log` table
   - Logger tracking consent changes
   - Git history for compliance changes

---

## ✅ Compliance Checklist

### Lawfulness of Processing (Article 6)

- [x] Legal basis identified for each type of processing
- [x] Cookie consent obtained before analytics tracking
- [x] Legitimate interest balancing test documented
- [x] Contract necessity clear for bookings

### Transparency (Articles 12-14)

- [x] Privacy policy accessible and clear
- [x] Information provided before data collection
- [x] Privacy policy in plain language (French)
- [x] Contact information for DPO/data controller

### Data Subject Rights (Articles 15-22)

- [x] Process to handle access requests
- [x] Process to handle erasure requests
- [x] Process to handle portability requests
- [x] Consent can be easily withdrawn
- [ ] Automated response to right requests (optional)

### Data Security (Article 32)

- [x] Appropriate technical measures (encryption, validation)
- [x] Appropriate organizational measures (RLS, access control)
- [x] Regular testing of security measures
- [ ] Data breach notification procedure (24-72 hours)

### Data Protection by Design & Default (Article 25)

- [x] Privacy considered in system design
- [x] Default to minimal data collection
- [x] Pseudonymization where possible (session IDs)
- [x] User controls for privacy settings

### Records of Processing Activities (Article 30)

- [x] Data inventory documented (this file)
- [x] Processing purposes documented
- [x] Data retention periods documented
- [x] Security measures documented

### Data Protection Impact Assessment (Article 35)

- [ ] DPIA for high-risk processing (if applicable)
- [ ] Regular reviews of DPIA
- [ ] Consultation with DPO

### Data Breach Notification (Articles 33-34)

- [ ] Procedure to detect breaches
- [ ] Procedure to notify authority (72 hours)
- [ ] Procedure to notify data subjects
- [ ] Breach register maintained

---

## 🚨 Data Breach Procedures

### Detection

1. **Monitoring**:
   - Error logs (via logger)
   - Unusual access patterns
   - User reports

2. **Definition**: Breach = unauthorized access, loss, or destruction of personal data

### Response (72-hour timeline)

#### Hour 0-4: Assessment
- [ ] Confirm breach occurred
- [ ] Assess scope (how many users affected)
- [ ] Assess risk (low, medium, high)
- [ ] Document everything

#### Hour 4-24: Containment
- [ ] Stop the breach
- [ ] Secure affected systems
- [ ] Preserve evidence
- [ ] Notify internal stakeholders

#### Hour 24-72: Notification
- [ ] If high risk: Notify CNIL (French authority)
- [ ] If very high risk: Notify affected users
- [ ] Submit breach notification form
- [ ] Update breach register

#### Post-breach
- [ ] Root cause analysis
- [ ] Implement fixes
- [ ] Update security measures
- [ ] Review and improve procedures

### Contact Information

- **CNIL**: https://www.cnil.fr
- **Breach notification**: https://www.cnil.fr/fr/notifier-une-violation-de-donnees-personnelles
- **Emergency**: dpo@le40.fr (if DPO appointed)

---

## 📞 Data Protection Officer (DPO)

### When DPO is Required (Article 37)

A DPO must be appointed if:
- [x] Processing by public authority
- [ ] Regular, systematic monitoring at large scale
- [ ] Large-scale processing of sensitive data

### DPO Responsibilities

If appointed:
- Monitor GDPR compliance
- Advise on data protection
- Cooperate with supervisory authority (CNIL)
- Act as contact point for data subjects

### Contact

**Current**: No dedicated DPO appointed
**Alternative**: contact@le40.fr for data protection inquiries

---

## 🔄 Compliance Maintenance

### Monthly Tasks

- [ ] Review cookie consent rates
- [ ] Check data retention cleanup logs
- [ ] Monitor error logs for issues

### Quarterly Tasks

- [ ] Review and update privacy policy if needed
- [ ] Audit data processing activities
- [ ] Test data subject request procedures

### Annual Tasks

- [ ] Full GDPR compliance audit
- [ ] Review data processing agreements
- [ ] Update risk assessments
- [ ] Staff training refresher

---

## 📚 Resources

- **GDPR Full Text**: https://gdpr.eu/tag/gdpr/
- **CNIL (French Authority)**: https://www.cnil.fr
- **ICO Guidance**: https://ico.org.uk/for-organisations/guide-to-data-protection/
- **EU Commission**: https://commission.europa.eu/law/law-topic/data-protection_en

---

**Last Updated**: 2025-10-28
**Next Review**: 2026-01-28
**Version**: 1.0

---

## ⚠️ Disclaimer

This document provides guidance based on GDPR requirements as of October 2025. It is not legal advice. Consult with a qualified data protection lawyer for specific legal guidance.
