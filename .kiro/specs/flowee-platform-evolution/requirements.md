# Requirements Document: FLOWEE.ID Platform Evolution

## Introduction

This document defines the requirements for transforming Flowee from a static landing page into a multi-phase florist marketplace/aggregator platform in Indonesia. The evolution follows a phased approach: starting with the current static MVP, progressing through internal operations tooling, then to a managed florist platform, and ultimately to a multi-city marketplace ecosystem.

The platform will serve Indonesian customers seeking flower arrangements for various occasions (graduations, birthdays, anniversaries, condolences, events) while connecting them with verified florist partners across multiple cities.

## Glossary

- **Platform**: The complete FLOWEE.ID system including customer-facing website, admin tools, and partner interfaces
- **Customer**: End-user who orders flowers through the Platform
- **Florist_Partner**: Verified flower shop that fulfills orders through the Platform
- **Order**: A customer request for flower arrangement with specific requirements (occasion, budget, delivery details)
- **Quote**: Price estimate provided by Florist_Partner for a specific Order
- **Lead**: Customer inquiry captured through the Platform requiring manual follow-up
- **Admin**: Internal Flowee team member managing operations
- **Catalog**: Collection of product templates and reference designs available on the Platform
- **Availability_Zone**: Geographic area where the Platform can fulfill orders (city or district level)
- **SLA**: Service Level Agreement defining delivery timeframes and quality standards
- **Managed_Marketplace**: Business model where Platform controls quality, pricing, and customer experience while Florist_Partners fulfill orders
- **Aggregator**: Business model where Platform connects customers to Florist_Partners who manage their own pricing and fulfillment
- **Same_Day_Delivery**: Order fulfillment within the same calendar day as order placement
- **Payment_Gateway**: Third-party service processing customer payments (Midtrans, Xendit)
- **WhatsApp_Business_API**: Official WhatsApp integration for automated messaging
- **CMS**: Content Management System for managing product catalog and content
- **Parser**: Software component that converts structured data format into internal data structures
- **Pretty_Printer**: Software component that formats internal data structures into human-readable or structured format
- **Configuration**: Platform settings including pricing rules, delivery zones, and operational parameters

---

## PART 1: FOUNDATION

### Requirement 1: Executive Summary & Vision

**User Story:** As a founder, I want a clear product vision and business goals, so that the team can align on priorities and measure success.

#### Acceptance Criteria

1. THE Platform SHALL target Indonesian flower customers seeking convenient, reliable flower ordering
2. THE Platform SHALL evolve through four distinct phases: Static MVP → Internal Operations → Managed Platform → Multi-City Marketplace
3. THE Platform SHALL prioritize mobile-first experience for Indonesian market (WhatsApp-first culture)
4. THE Platform SHALL support both aggregator and managed marketplace business models
5. THE Platform SHALL enable city-by-city expansion strategy starting with single-city operations

### Requirement 2: Problem Statement & Market Context

**User Story:** As a customer in Indonesia, I want to easily order fresh flowers with reliable delivery, so that I can celebrate special moments without hassle.

#### Acceptance Criteria

1. THE Platform SHALL address the problem of inconsistent florist quality in Indonesian market
2. THE Platform SHALL address the problem of lack of transparent pricing for flower arrangements
3. THE Platform SHALL address the problem of unreliable same-day delivery expectations
4. THE Platform SHALL address the problem of manual WhatsApp-based ordering inefficiency
5. THE Platform SHALL acknowledge Indonesian market realities: mobile-first usage, WhatsApp preference, city-by-city logistics, cash-on-delivery expectations

### Requirement 3: User Segments & Personas

**User Story:** As a product manager, I want clearly defined user segments, so that features can be prioritized for target audiences.

#### Acceptance Criteria

1. THE Platform SHALL serve "Celebration Seekers" (customers ordering for graduations, birthdays, anniversaries)
2. THE Platform SHALL serve "Corporate Buyers" (businesses ordering for events, condolences, congratulations)
3. THE Platform SHALL serve "Last-Minute Orderers" (customers needing same-day delivery)
4. THE Platform SHALL serve "Budget-Conscious Shoppers" (customers seeking custom arrangements within specific price ranges)
5. THE Platform SHALL serve "Florist Partners" (small to medium flower shops seeking additional order volume)

---

## PART 2: PHASED SCOPE

### Requirement 4: Phase 1 - Static Landing Page MVP (Current State)

**User Story:** As a customer, I want to browse flower options and contact the business via WhatsApp, so that I can inquire about custom arrangements.

#### Acceptance Criteria

1. THE Platform SHALL display product catalog with 6+ flower arrangement categories
2. WHEN a customer clicks a product CTA, THE Platform SHALL open WhatsApp with pre-filled message
3. THE Platform SHALL display pricing starting points for each product category
4. THE Platform SHALL be fully responsive on mobile devices (320px to 1280px viewport)
5. THE Platform SHALL load in under 3 seconds on 3G mobile connections
6. THE Platform SHALL display business contact information (WhatsApp, email, operating hours)
7. THE Platform SHALL display customer testimonials for social proof
8. THE Platform SHALL display FAQ section addressing common customer questions

### Requirement 5: Phase 2 - Lead Management & Internal Operations

**User Story:** As an admin, I want to track customer inquiries and manage orders systematically, so that no leads are lost and fulfillment is organized.

#### Acceptance Criteria

1. WHEN a customer submits an inquiry form, THE Platform SHALL capture lead data (name, phone, occasion, budget, delivery date, location)
2. WHEN a lead is captured, THE Platform SHALL send notification to Admin via WhatsApp or email
3. THE Platform SHALL store leads in a structured database or spreadsheet (Airtable, Google Sheets, or PostgreSQL)
4. THE Admin_Dashboard SHALL display all leads with status tracking (New, Contacted, Quoted, Confirmed, Fulfilled, Cancelled)
5. THE Admin_Dashboard SHALL allow Admin to update lead status and add notes
6. THE Admin_Dashboard SHALL display order pipeline with revenue forecasting
7. WHEN an order is confirmed, THE Platform SHALL generate order confirmation with details (customer info, arrangement specs, delivery address, price, delivery time)
8. THE Platform SHALL track order fulfillment status (Confirmed, In Progress, Out for Delivery, Delivered, Completed)
9. THE Platform SHALL send order status updates to customers via WhatsApp or SMS
10. THE Platform SHALL generate daily/weekly operations reports (orders, revenue, fulfillment rate)


### Requirement 6: Phase 3 - Managed Florist Platform

**User Story:** As a customer, I want to browse available arrangements, get instant quotes, and place orders online, so that I can complete purchases without manual back-and-forth.

#### Acceptance Criteria

1. THE Platform SHALL display real-time product availability based on Florist_Partner inventory
2. WHEN a customer selects a product and delivery location, THE Platform SHALL calculate delivery fee based on distance
3. WHEN a customer provides order details, THE Platform SHALL generate instant price quote
4. THE Platform SHALL support online payment via Payment_Gateway (bank transfer, e-wallet, QRIS)
5. WHEN payment is confirmed, THE Platform SHALL automatically assign order to available Florist_Partner
6. THE Florist_Partner_Dashboard SHALL display assigned orders with customer requirements
7. THE Florist_Partner_Dashboard SHALL allow Florist_Partner to update order status (Accepted, Preparing, Ready for Pickup, Out for Delivery, Delivered)
8. WHEN order status changes, THE Platform SHALL send real-time notification to Customer
9. THE Platform SHALL enforce SLA for order acceptance (15 minutes), preparation time (2-4 hours), and delivery windows
10. THE Platform SHALL collect customer ratings and reviews after order completion
11. THE Platform SHALL calculate and display Florist_Partner performance metrics (acceptance rate, on-time delivery rate, average rating)
12. THE Platform SHALL handle order cancellations and refund processing according to cancellation policy

### Requirement 7: Phase 4 - Multi-City Marketplace Ecosystem

**User Story:** As a customer in any major Indonesian city, I want to order flowers from verified local florists, so that I can get fresh arrangements with reliable delivery.

#### Acceptance Criteria

1. THE Platform SHALL support multiple Availability_Zones across Indonesian cities (Jakarta, Bandung, Surabaya, Bali, Yogyakarta, etc.)
2. WHEN a customer enters delivery location, THE Platform SHALL display only products available in that Availability_Zone
3. THE Platform SHALL allow Florist_Partners to define their service coverage areas
4. THE Platform SHALL implement dynamic pricing based on city, delivery distance, and demand
5. THE Platform SHALL support multiple Florist_Partners per Availability_Zone for redundancy
6. WHEN multiple Florist_Partners can fulfill an order, THE Platform SHALL assign based on proximity, availability, and performance score
7. THE Platform SHALL provide Florist_Partner onboarding workflow (application, verification, training, activation)
8. THE Platform SHALL enforce quality standards through Florist_Partner audits and customer feedback
9. THE Platform SHALL support promotional campaigns (discounts, free delivery, seasonal offers) per Availability_Zone
10. THE Platform SHALL generate marketplace analytics (GMV, order volume, customer acquisition cost, partner performance by city)
11. THE Platform SHALL support customer service escalation for order issues
12. THE Platform SHALL implement fraud detection for suspicious orders or payment patterns

---

## PART 3: FUNCTIONAL REQUIREMENTS BY PHASE

### Requirement 8: Customer-Facing Features (Phase 1-4 Evolution)

**User Story:** As a customer, I want intuitive product browsing and ordering experience, so that I can quickly find and purchase the right arrangement.

#### Acceptance Criteria

1. THE Platform SHALL display product catalog organized by occasion (graduation, birthday, anniversary, condolence, congratulations, custom)
2. THE Platform SHALL display product catalog organized by arrangement type (hand bouquet, standing flower, papan bunga, table arrangement, sympathy flowers)
3. THE Platform SHALL allow customers to filter products by price range
4. THE Platform SHALL allow customers to filter products by delivery date availability
5. WHEN a customer views a product, THE Platform SHALL display high-quality images, description, size options, and starting price
6. THE Platform SHALL allow customers to customize arrangements (flower types, colors, add-ons like greeting cards or chocolates)
7. THE Platform SHALL provide delivery date picker showing available time slots
8. THE Platform SHALL validate delivery addresses and calculate delivery fees before checkout
9. THE Platform SHALL support guest checkout (no account required) with phone number verification
10. THE Platform SHALL support registered user accounts with order history and saved addresses
11. THE Platform SHALL send order confirmation via WhatsApp and email
12. THE Platform SHALL provide order tracking page with real-time status updates
13. THE Platform SHALL allow customers to contact support via in-app chat or WhatsApp
14. THE Platform SHALL display estimated delivery time based on order placement time and delivery location

### Requirement 9: Admin Operations Features (Phase 2-4)

**User Story:** As an admin, I want comprehensive tools to manage orders, partners, and platform operations, so that I can ensure smooth business operations.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL display real-time order pipeline (pending, confirmed, in-progress, delivered, cancelled)
2. THE Admin_Dashboard SHALL allow manual order creation for phone/WhatsApp orders
3. THE Admin_Dashboard SHALL allow order reassignment between Florist_Partners
4. THE Admin_Dashboard SHALL display inventory alerts when products are low stock or unavailable
5. THE Admin_Dashboard SHALL provide customer management (view profiles, order history, support tickets)
6. THE Admin_Dashboard SHALL provide Florist_Partner management (onboarding status, performance metrics, payout tracking)
7. THE Admin_Dashboard SHALL allow content management for product catalog (add/edit/remove products, update images and descriptions)
8. THE Admin_Dashboard SHALL provide pricing management (base prices, delivery fees, promotional discounts)
9. THE Admin_Dashboard SHALL generate financial reports (revenue, costs, profit margins, partner payouts)
10. THE Admin_Dashboard SHALL provide customer support tools (view conversations, respond to inquiries, issue refunds)
11. THE Admin_Dashboard SHALL allow configuration of operational parameters (delivery zones, SLA times, payment methods)
12. THE Admin_Dashboard SHALL provide analytics dashboards (conversion rates, average order value, customer lifetime value, partner performance)

### Requirement 10: Florist Partner Features (Phase 3-4)

**User Story:** As a florist partner, I want clear order information and easy status updates, so that I can fulfill orders efficiently and get paid on time.

#### Acceptance Criteria

1. THE Florist_Partner_Dashboard SHALL display incoming order notifications with sound/visual alerts
2. THE Florist_Partner_Dashboard SHALL display order details (arrangement specs, delivery address, delivery time, special instructions, customer contact)
3. THE Florist_Partner_Dashboard SHALL allow Florist_Partner to accept or reject orders within SLA window (15 minutes)
4. WHEN a Florist_Partner rejects an order, THE Platform SHALL automatically reassign to another available Florist_Partner
5. THE Florist_Partner_Dashboard SHALL allow status updates with photo uploads (arrangement prepared, out for delivery, delivered)
6. THE Florist_Partner_Dashboard SHALL display earnings summary (completed orders, pending payouts, payment history)
7. THE Florist_Partner_Dashboard SHALL allow Florist_Partner to update availability status (available, busy, offline)
8. THE Florist_Partner_Dashboard SHALL allow Florist_Partner to update service coverage areas
9. THE Florist_Partner_Dashboard SHALL display performance metrics (acceptance rate, on-time rate, customer ratings)
10. THE Florist_Partner_Dashboard SHALL provide order history and customer feedback
11. THE Florist_Partner_Dashboard SHALL allow Florist_Partner to request support for order issues
12. THE Florist_Partner_Dashboard SHALL send payout notifications when payments are processed

---

## PART 4: NON-FUNCTIONAL REQUIREMENTS

### Requirement 11: Performance & Scalability

**User Story:** As a customer, I want fast page loads and responsive interactions, so that I can complete orders quickly without frustration.

#### Acceptance Criteria

1. THE Platform SHALL load initial page content within 2 seconds on 4G mobile connections
2. THE Platform SHALL load initial page content within 4 seconds on 3G mobile connections
3. THE Platform SHALL respond to user interactions (clicks, form submissions) within 500 milliseconds
4. THE Platform SHALL support at least 1000 concurrent users without performance degradation
5. THE Platform SHALL support at least 100 orders per hour during peak periods
6. THE Platform SHALL implement image optimization (WebP format, lazy loading, responsive images)
7. THE Platform SHALL implement caching strategies for static content (CDN, browser caching)
8. THE Platform SHALL implement database query optimization for fast data retrieval
9. THE Platform SHALL scale horizontally to handle traffic growth (load balancing, auto-scaling)

### Requirement 12: Security & Privacy

**User Story:** As a customer, I want my personal information and payment details protected, so that I can order with confidence.

#### Acceptance Criteria

1. THE Platform SHALL encrypt all data transmission using HTTPS/TLS
2. THE Platform SHALL store customer passwords using secure hashing (bcrypt, Argon2)
3. THE Platform SHALL comply with PCI DSS standards for payment processing (using certified Payment_Gateway)
4. THE Platform SHALL implement rate limiting to prevent abuse (API endpoints, login attempts)
5. THE Platform SHALL validate and sanitize all user inputs to prevent injection attacks
6. THE Platform SHALL implement authentication for admin and partner dashboards (session management, JWT tokens)
7. THE Platform SHALL implement role-based access control (customer, admin, partner, super-admin)
8. THE Platform SHALL log security events (failed login attempts, suspicious activities)
9. THE Platform SHALL comply with Indonesian data protection regulations (UU PDP)
10. THE Platform SHALL provide privacy policy and terms of service clearly displayed
11. THE Platform SHALL allow customers to request data deletion (GDPR-style right to be forgotten)
12. THE Platform SHALL implement secure payment tokenization (no storage of raw card numbers)

### Requirement 13: Reliability & Availability

**User Story:** As a business owner, I want the platform to be available 24/7 with minimal downtime, so that customers can order anytime and revenue is not lost.

#### Acceptance Criteria

1. THE Platform SHALL maintain 99.5% uptime (excluding planned maintenance)
2. THE Platform SHALL implement automated health checks and monitoring
3. WHEN a critical error occurs, THE Platform SHALL send alerts to technical team
4. THE Platform SHALL implement graceful error handling with user-friendly error messages
5. THE Platform SHALL implement database backups (daily full backups, hourly incremental backups)
6. THE Platform SHALL implement disaster recovery procedures with Recovery Time Objective (RTO) of 4 hours
7. THE Platform SHALL implement failover mechanisms for critical services
8. THE Platform SHALL log all errors and exceptions for debugging
9. THE Platform SHALL implement retry logic for transient failures (payment processing, external API calls)

### Requirement 14: Mobile-First Design

**User Story:** As a customer using a mobile phone, I want a seamless mobile experience, so that I can browse and order easily on my device.

#### Acceptance Criteria

1. THE Platform SHALL be fully responsive across device sizes (320px to 1920px viewport width)
2. THE Platform SHALL implement touch-friendly UI elements (minimum 44x44px tap targets)
3. THE Platform SHALL optimize for mobile data usage (compressed images, minimal JavaScript)
4. THE Platform SHALL support mobile payment methods (GoPay, OVO, ShopeePay, QRIS)
5. THE Platform SHALL integrate with WhatsApp for mobile-first communication
6. THE Platform SHALL implement Progressive Web App (PWA) features (offline support, add to home screen)
7. THE Platform SHALL optimize forms for mobile input (appropriate keyboard types, autofill support)
8. THE Platform SHALL implement mobile-optimized navigation (hamburger menu, bottom navigation)

### Requirement 15: Localization & Indonesian Market Fit

**User Story:** As an Indonesian customer, I want the platform to feel local and familiar, so that I can use it comfortably in my language and payment preferences.

#### Acceptance Criteria

1. THE Platform SHALL display all content in Bahasa Indonesia
2. THE Platform SHALL format currency as Indonesian Rupiah (Rp)
3. THE Platform SHALL format dates and times according to Indonesian conventions
4. THE Platform SHALL support Indonesian phone number format (+62)
5. THE Platform SHALL integrate with popular Indonesian payment methods (bank transfer BCA/Mandiri, e-wallets, QRIS)
6. THE Platform SHALL support Indonesian address format (province, city, district, postal code)
7. THE Platform SHALL use Indonesian cultural references for occasions and celebrations
8. THE Platform SHALL support WhatsApp as primary communication channel
9. THE Platform SHALL accommodate Indonesian business hours and holidays

---

## PART 5: OPERATIONAL REQUIREMENTS

### Requirement 16: Order Management & Fulfillment

**User Story:** As an admin, I want clear order workflows and fulfillment tracking, so that every order is completed successfully and on time.

#### Acceptance Criteria

1. WHEN an order is placed, THE Platform SHALL validate delivery address and availability
2. WHEN an order is confirmed, THE Platform SHALL assign to available Florist_Partner based on proximity and performance
3. WHEN a Florist_Partner accepts an order, THE Platform SHALL send confirmation to Customer
4. WHEN a Florist_Partner rejects an order, THE Platform SHALL reassign to next available Florist_Partner within 5 minutes
5. IF no Florist_Partner accepts within 30 minutes, THE Platform SHALL escalate to Admin for manual handling
6. THE Platform SHALL enforce preparation time SLA (2 hours for standard orders, 4 hours for custom orders)
7. THE Platform SHALL enforce delivery time SLA (within selected time window with 30-minute buffer)
8. WHEN an order is delayed, THE Platform SHALL send proactive notification to Customer with updated ETA
9. WHEN an order is delivered, THE Platform SHALL request customer confirmation and feedback
10. THE Platform SHALL handle order modifications (address change, time change) up to 2 hours before delivery
11. THE Platform SHALL handle order cancellations with refund processing based on cancellation timing
12. THE Platform SHALL track order issues (wrong item, damaged goods, late delivery) and resolution status


### Requirement 17: Payment Processing & Financial Operations

**User Story:** As a customer, I want secure and convenient payment options, so that I can complete purchases using my preferred payment method.

#### Acceptance Criteria

1. THE Platform SHALL integrate with Indonesian Payment_Gateway (Midtrans or Xendit)
2. THE Platform SHALL support bank transfer payment (BCA, Mandiri, BNI, BRI)
3. THE Platform SHALL support e-wallet payment (GoPay, OVO, ShopeePay, Dana)
4. THE Platform SHALL support QRIS payment for universal QR code scanning
5. THE Platform SHALL support credit/debit card payment (Visa, Mastercard)
6. WHEN a customer selects payment method, THE Platform SHALL display payment instructions clearly
7. WHEN payment is received, THE Platform SHALL confirm order automatically within 5 minutes
8. THE Platform SHALL send payment receipt to Customer via email and WhatsApp
9. THE Platform SHALL handle payment failures with retry options and alternative payment methods
10. THE Platform SHALL process refunds within 3-7 business days for cancelled orders
11. THE Platform SHALL calculate Florist_Partner payouts (order value minus platform commission)
12. THE Platform SHALL process Florist_Partner payouts weekly or bi-weekly
13. THE Platform SHALL generate invoices for corporate customers
14. THE Platform SHALL track revenue, costs, and profit margins per order

### Requirement 18: Partner Onboarding & Management

**User Story:** As a florist partner, I want a clear onboarding process and ongoing support, so that I can start fulfilling orders quickly and successfully.

#### Acceptance Criteria

1. THE Platform SHALL provide Florist_Partner application form (business details, location, portfolio, capacity)
2. WHEN a Florist_Partner applies, THE Platform SHALL send application confirmation
3. THE Admin SHALL review applications and verify business credentials (business license, location, quality standards)
4. WHEN a Florist_Partner is approved, THE Platform SHALL send onboarding materials (dashboard guide, quality standards, SLA requirements)
5. THE Platform SHALL provide training resources (video tutorials, documentation, best practices)
6. THE Platform SHALL assign onboarding specialist for partner support during first 30 days
7. THE Platform SHALL conduct quality audits (initial audit before activation, periodic audits quarterly)
8. THE Platform SHALL enforce quality standards (photo quality, arrangement accuracy, delivery timeliness)
9. WHEN a Florist_Partner violates quality standards, THE Platform SHALL issue warnings and improvement plans
10. WHEN a Florist_Partner consistently underperforms, THE Platform SHALL suspend or terminate partnership
11. THE Platform SHALL provide partner support channel (dedicated WhatsApp, email, phone)
12. THE Platform SHALL collect partner feedback for platform improvements

### Requirement 19: Customer Support & Communication

**User Story:** As a customer, I want responsive support when I have questions or issues, so that my concerns are resolved quickly.

#### Acceptance Criteria

1. THE Platform SHALL provide customer support via WhatsApp (primary channel)
2. THE Platform SHALL provide customer support via in-app chat
3. THE Platform SHALL provide customer support via email
4. THE Platform SHALL display support hours clearly (e.g., 8 AM - 8 PM WIB daily)
5. THE Platform SHALL respond to customer inquiries within 15 minutes during support hours
6. THE Platform SHALL provide automated responses for common questions (order status, delivery time, payment confirmation)
7. THE Platform SHALL escalate complex issues to human support agents
8. THE Platform SHALL track support tickets with status (open, in-progress, resolved, closed)
9. THE Platform SHALL send order status updates proactively (order confirmed, preparing, out for delivery, delivered)
10. THE Platform SHALL send delivery reminders 1 hour before delivery window
11. THE Platform SHALL request feedback after order completion
12. THE Platform SHALL handle complaints and issue resolution (refunds, replacements, compensation)

### Requirement 20: Analytics & Reporting

**User Story:** As a business owner, I want comprehensive analytics and reports, so that I can make data-driven decisions and track business performance.

#### Acceptance Criteria

1. THE Platform SHALL track key metrics: GMV (Gross Merchandise Value), order volume, average order value, conversion rate
2. THE Platform SHALL track customer metrics: new customers, returning customers, customer lifetime value, churn rate
3. THE Platform SHALL track partner metrics: active partners, orders per partner, partner earnings, performance scores
4. THE Platform SHALL track operational metrics: order fulfillment rate, on-time delivery rate, cancellation rate, customer satisfaction score
5. THE Platform SHALL provide daily operations dashboard (today's orders, revenue, pending issues)
6. THE Platform SHALL provide weekly business review reports (week-over-week growth, top products, top partners)
7. THE Platform SHALL provide monthly financial reports (revenue, costs, profit, partner payouts)
8. THE Platform SHALL provide city-level analytics for multi-city expansion planning
9. THE Platform SHALL provide cohort analysis for customer retention insights
10. THE Platform SHALL provide funnel analysis for conversion optimization
11. THE Platform SHALL export reports in multiple formats (PDF, Excel, CSV)
12. THE Platform SHALL implement event tracking for user behavior analysis (Google Analytics, Mixpanel)

---

## PART 6: TECHNICAL REQUIREMENTS

### Requirement 21: System Architecture & Technology Stack

**User Story:** As a technical lead, I want a scalable and maintainable architecture, so that the platform can grow with the business.

#### Acceptance Criteria

1. THE Platform SHALL use modern web framework (Next.js, React, or Vue.js) for frontend
2. THE Platform SHALL use RESTful API or GraphQL for backend communication
3. THE Platform SHALL use relational database (PostgreSQL) for transactional data
4. THE Platform SHALL use cloud hosting (Vercel, AWS, or Google Cloud) for scalability
5. THE Platform SHALL use CDN for static asset delivery
6. THE Platform SHALL use object storage (S3, Google Cloud Storage) for images and files
7. THE Platform SHALL use message queue (Redis, RabbitMQ) for asynchronous processing
8. THE Platform SHALL use caching layer (Redis, Memcached) for performance optimization
9. THE Platform SHALL implement API versioning for backward compatibility
10. THE Platform SHALL use environment-based configuration (development, staging, production)
11. THE Platform SHALL implement automated testing (unit tests, integration tests, end-to-end tests)
12. THE Platform SHALL implement CI/CD pipeline for automated deployment

### Requirement 22: Data Model & Domain Entities

**User Story:** As a developer, I want a clear data model, so that I can implement features consistently and maintain data integrity.

#### Acceptance Criteria

1. THE Platform SHALL model Customer entity (id, name, phone, email, addresses, order_history, created_at)
2. THE Platform SHALL model Product entity (id, name, description, category, occasion, base_price, images, availability)
3. THE Platform SHALL model Order entity (id, customer_id, product_id, customization, delivery_address, delivery_date, delivery_time, status, total_price, created_at)
4. THE Platform SHALL model Florist_Partner entity (id, business_name, owner_name, phone, email, address, service_areas, status, performance_metrics, created_at)
5. THE Platform SHALL model Quote entity (id, order_id, florist_id, quoted_price, valid_until, status)
6. THE Platform SHALL model Payment entity (id, order_id, amount, method, status, transaction_id, paid_at)
7. THE Platform SHALL model Delivery entity (id, order_id, florist_id, pickup_time, delivery_time, status, proof_photo, delivered_at)
8. THE Platform SHALL model Review entity (id, order_id, customer_id, florist_id, rating, comment, created_at)
9. THE Platform SHALL model Availability_Zone entity (id, city, districts, active_partners, delivery_fee_rules)
10. THE Platform SHALL model Configuration entity (key, value, description) for operational parameters
11. THE Platform SHALL enforce referential integrity between related entities
12. THE Platform SHALL implement soft deletes for audit trail preservation

### Requirement 23: Integration Requirements

**User Story:** As a product manager, I want seamless integrations with third-party services, so that the platform can leverage existing tools and services.

#### Acceptance Criteria

1. THE Platform SHALL integrate with WhatsApp Business API for automated messaging
2. THE Platform SHALL integrate with Payment_Gateway (Midtrans or Xendit) for payment processing
3. THE Platform SHALL integrate with SMS gateway for delivery notifications
4. THE Platform SHALL integrate with Google Maps API for address validation and distance calculation
5. THE Platform SHALL integrate with email service (SendGrid, AWS SES) for transactional emails
6. THE Platform SHALL integrate with cloud storage (S3, Google Cloud Storage) for image uploads
7. THE Platform SHALL integrate with analytics platform (Google Analytics, Mixpanel) for user tracking
8. THE Platform SHALL integrate with customer support platform (Zendesk, Intercom) for ticket management
9. THE Platform SHALL integrate with accounting software (Xero, QuickBooks) for financial management
10. THE Platform SHALL provide webhook endpoints for real-time event notifications
11. THE Platform SHALL implement API authentication for third-party integrations (API keys, OAuth)
12. THE Platform SHALL handle integration failures gracefully with retry logic and fallback mechanisms

### Requirement 24: Configuration Management

**User Story:** As an admin, I want to configure operational parameters without code changes, so that I can adapt to business needs quickly.

#### Acceptance Criteria

1. THE Platform SHALL provide Configuration interface for delivery zone management (add/edit/remove zones, set delivery fees)
2. THE Platform SHALL provide Configuration interface for pricing rules (base prices, seasonal adjustments, promotional discounts)
3. THE Platform SHALL provide Configuration interface for SLA parameters (acceptance time, preparation time, delivery windows)
4. THE Platform SHALL provide Configuration interface for payment methods (enable/disable methods, set transaction fees)
5. THE Platform SHALL provide Configuration interface for notification templates (WhatsApp messages, email templates, SMS templates)
6. THE Platform SHALL provide Configuration interface for business hours (operating hours, holiday calendar)
7. THE Platform SHALL provide Configuration interface for partner commission rates (percentage or fixed amount per order)
8. THE Platform SHALL provide Configuration interface for quality standards (minimum rating, maximum late deliveries)
9. THE Platform SHALL validate Configuration changes before applying
10. THE Platform SHALL log Configuration changes with timestamp and admin user
11. THE Platform SHALL support Configuration export and import for backup and migration
12. THE Parser SHALL convert Configuration files (JSON, YAML) into internal Configuration objects
13. THE Pretty_Printer SHALL format Configuration objects into human-readable JSON or YAML format
14. FOR ALL valid Configuration objects, parsing then printing then parsing SHALL produce equivalent Configuration object (round-trip property)

---

## PART 7: WHAT NOT TO BUILD YET

### Requirement 25: Deferred Features (Future Phases)

**User Story:** As a product manager, I want clarity on what features are explicitly out of scope for initial phases, so that the team stays focused on core functionality.

#### Acceptance Criteria

1. THE Platform SHALL NOT implement subscription or membership programs in Phase 1-3
2. THE Platform SHALL NOT implement loyalty points or rewards program in Phase 1-3
3. THE Platform SHALL NOT implement social features (user profiles, following, sharing) in Phase 1-3
4. THE Platform SHALL NOT implement marketplace for flower-related products (vases, cards, gifts) in Phase 1-3
5. THE Platform SHALL NOT implement international delivery in Phase 1-4
6. THE Platform SHALL NOT implement white-label solutions for other businesses in Phase 1-4
7. THE Platform SHALL NOT implement AI-powered design recommendations in Phase 1-3
8. THE Platform SHALL NOT implement augmented reality (AR) preview features in Phase 1-4
9. THE Platform SHALL NOT implement blockchain or cryptocurrency payments in Phase 1-4
10. THE Platform SHALL NOT implement own delivery fleet management in Phase 1-3 (rely on Florist_Partner delivery)

---

## PART 8: FEATURE PRIORITIZATION (MoSCoW)

### Requirement 26: Must Have (Phase 1-2)

**User Story:** As a founder, I want to identify critical features for MVP launch, so that we can validate the business model quickly.

#### Acceptance Criteria

1. THE Platform MUST have product catalog display with images and pricing
2. THE Platform MUST have WhatsApp integration for customer inquiries
3. THE Platform MUST have lead capture form with basic customer information
4. THE Platform MUST have mobile-responsive design
5. THE Platform MUST have admin dashboard for lead management
6. THE Platform MUST have order tracking spreadsheet or simple database
7. THE Platform MUST have payment confirmation workflow (manual or automated)
8. THE Platform MUST have customer notification system (WhatsApp or SMS)

### Requirement 27: Should Have (Phase 2-3)

**User Story:** As a product manager, I want to identify important features for platform growth, so that we can scale operations efficiently.

#### Acceptance Criteria

1. THE Platform SHOULD have online payment integration (Payment_Gateway)
2. THE Platform SHOULD have automated order assignment to Florist_Partners
3. THE Platform SHOULD have Florist_Partner dashboard for order management
4. THE Platform SHOULD have real-time order status tracking
5. THE Platform SHOULD have customer review and rating system
6. THE Platform SHOULD have inventory management for products
7. THE Platform SHOULD have delivery zone configuration
8. THE Platform SHOULD have analytics dashboard for business metrics

### Requirement 28: Could Have (Phase 3-4)

**User Story:** As a product manager, I want to identify nice-to-have features, so that we can enhance user experience when resources allow.

#### Acceptance Criteria

1. THE Platform COULD have saved addresses and order history for registered users
2. THE Platform COULD have promotional discount codes
3. THE Platform COULD have gift message customization
4. THE Platform COULD have delivery photo proof
5. THE Platform COULD have in-app chat support
6. THE Platform COULD have push notifications for mobile app
7. THE Platform COULD have advanced search and filtering
8. THE Platform COULD have recommended products based on occasion

### Requirement 29: Won't Have (Explicitly Deferred)

**User Story:** As a product manager, I want to explicitly defer certain features, so that scope creep is prevented.

#### Acceptance Criteria

1. THE Platform WON'T have social media integration (Facebook, Instagram login) in Phase 1-3
2. THE Platform WON'T have video content or live streaming in Phase 1-4
3. THE Platform WON'T have gamification features in Phase 1-3
4. THE Platform WON'T have multi-language support (English, Chinese) in Phase 1-3
5. THE Platform WON'T have B2B wholesale marketplace in Phase 1-3
6. THE Platform WON'T have flower care guides or educational content in Phase 1-2
7. THE Platform WON'T have community forum or user-generated content in Phase 1-4
8. THE Platform WON'T have advanced AI features (chatbot, image recognition) in Phase 1-3

---

## PART 9: SUCCESS METRICS & KPIs

### Requirement 30: Business Metrics

**User Story:** As a founder, I want clear success metrics for each phase, so that I can measure progress and make informed decisions.

#### Acceptance Criteria

1. THE Platform SHALL track Phase 1 success metric: 100+ WhatsApp inquiries per month
2. THE Platform SHALL track Phase 1 success metric: 20%+ inquiry-to-order conversion rate
3. THE Platform SHALL track Phase 2 success metric: 200+ orders per month
4. THE Platform SHALL track Phase 2 success metric: Rp 50M+ monthly GMV
5. THE Platform SHALL track Phase 3 success metric: 5+ active Florist_Partners
6. THE Platform SHALL track Phase 3 success metric: 90%+ order fulfillment rate
7. THE Platform SHALL track Phase 3 success metric: 4.0+ average customer rating
8. THE Platform SHALL track Phase 4 success metric: 3+ active cities
9. THE Platform SHALL track Phase 4 success metric: 1000+ orders per month
10. THE Platform SHALL track Phase 4 success metric: 30%+ month-over-month growth rate
11. THE Platform SHALL track customer acquisition cost (CAC) per channel
12. THE Platform SHALL track customer lifetime value (LTV) and LTV:CAC ratio

### Requirement 31: Operational Metrics

**User Story:** As an operations manager, I want operational metrics to ensure service quality, so that customers receive excellent experience.

#### Acceptance Criteria

1. THE Platform SHALL track order fulfillment rate (target: 95%+)
2. THE Platform SHALL track on-time delivery rate (target: 90%+)
3. THE Platform SHALL track average order preparation time (target: < 3 hours)
4. THE Platform SHALL track customer support response time (target: < 15 minutes)
5. THE Platform SHALL track order cancellation rate (target: < 5%)
6. THE Platform SHALL track payment success rate (target: 95%+)
7. THE Platform SHALL track Florist_Partner acceptance rate (target: 90%+)
8. THE Platform SHALL track customer satisfaction score (target: 4.5+/5.0)
9. THE Platform SHALL track repeat customer rate (target: 30%+)
10. THE Platform SHALL track platform uptime (target: 99.5%+)

---

## PART 10: RISK ANALYSIS & DEPENDENCIES

### Requirement 32: Technical Risks

**User Story:** As a technical lead, I want to identify technical risks early, so that mitigation strategies can be planned.

#### Acceptance Criteria

1. THE Platform SHALL mitigate risk of payment gateway integration failures by supporting multiple Payment_Gateway providers
2. THE Platform SHALL mitigate risk of WhatsApp API limitations by implementing fallback to SMS notifications
3. THE Platform SHALL mitigate risk of database performance issues by implementing caching and query optimization
4. THE Platform SHALL mitigate risk of third-party service downtime by implementing circuit breakers and fallback mechanisms
5. THE Platform SHALL mitigate risk of security vulnerabilities by conducting regular security audits
6. THE Platform SHALL mitigate risk of data loss by implementing automated backups and disaster recovery
7. THE Platform SHALL mitigate risk of scalability bottlenecks by designing for horizontal scaling from Phase 2
8. THE Platform SHALL mitigate risk of mobile performance issues by implementing progressive enhancement and lazy loading

### Requirement 33: Business Risks

**User Story:** As a founder, I want to identify business risks, so that contingency plans can be prepared.

#### Acceptance Criteria

1. THE Platform SHALL mitigate risk of low Florist_Partner adoption by providing clear value proposition and onboarding support
2. THE Platform SHALL mitigate risk of inconsistent florist quality by implementing quality audits and performance monitoring
3. THE Platform SHALL mitigate risk of customer acquisition cost exceeding LTV by tracking unit economics per channel
4. THE Platform SHALL mitigate risk of seasonal demand fluctuations by diversifying product offerings and occasions
5. THE Platform SHALL mitigate risk of competitor entry by building strong brand and customer loyalty
6. THE Platform SHALL mitigate risk of regulatory changes by monitoring Indonesian e-commerce and data protection laws
7. THE Platform SHALL mitigate risk of payment fraud by implementing fraud detection and verification
8. THE Platform SHALL mitigate risk of delivery failures by maintaining backup Florist_Partners per zone

### Requirement 34: Dependencies & Prerequisites

**User Story:** As a project manager, I want to identify critical dependencies, so that project planning accounts for external factors.

#### Acceptance Criteria

1. THE Platform SHALL require Payment_Gateway account approval (Midtrans or Xendit) before Phase 2 launch
2. THE Platform SHALL require WhatsApp Business API approval before automated messaging implementation
3. THE Platform SHALL require business entity registration (PT or CV) for payment gateway and legal compliance
4. THE Platform SHALL require initial Florist_Partner recruitment (minimum 2-3 partners) before Phase 3 launch
5. THE Platform SHALL require cloud hosting account setup (Vercel, AWS, or Google Cloud) before Phase 2 deployment
6. THE Platform SHALL require domain name registration and SSL certificate before public launch
7. THE Platform SHALL require Google Maps API key for address validation and distance calculation
8. THE Platform SHALL require initial product photography and catalog content before Phase 1 launch
9. THE Platform SHALL require customer support team training before Phase 2 launch
10. THE Platform SHALL require legal documents (terms of service, privacy policy, partner agreement) before Phase 2 launch

---

## PART 11: DELIVERY ROADMAP

### Requirement 35: Phase 1 Timeline (Month 1-2)

**User Story:** As a founder, I want a realistic timeline for Phase 1 delivery, so that launch can be planned effectively.

#### Acceptance Criteria

1. THE Platform SHALL complete product catalog content creation (photos, descriptions, pricing) in Week 1-2
2. THE Platform SHALL complete static landing page development in Week 2-3
3. THE Platform SHALL complete mobile responsiveness testing in Week 3
4. THE Platform SHALL complete WhatsApp integration and testing in Week 3
5. THE Platform SHALL complete domain setup and deployment in Week 4
6. THE Platform SHALL complete pre-launch testing (cross-browser, mobile devices) in Week 4
7. THE Platform SHALL launch Phase 1 publicly by end of Month 2
8. THE Platform SHALL collect user feedback and analytics for 2-4 weeks post-launch

### Requirement 36: Phase 2 Timeline (Month 3-5)

**User Story:** As a product manager, I want a realistic timeline for Phase 2 delivery, so that internal operations can be systematized.

#### Acceptance Criteria

1. THE Platform SHALL complete lead capture form development in Month 3 Week 1-2
2. THE Platform SHALL complete admin dashboard development in Month 3 Week 3-4
3. THE Platform SHALL complete database setup and migration in Month 3 Week 2-3
4. THE Platform SHALL complete payment gateway integration in Month 4 Week 1-2
5. THE Platform SHALL complete order management workflow in Month 4 Week 2-3
6. THE Platform SHALL complete notification system (WhatsApp/SMS) in Month 4 Week 3-4
7. THE Platform SHALL complete internal testing and bug fixes in Month 5 Week 1-2
8. THE Platform SHALL launch Phase 2 internally by end of Month 5
9. THE Platform SHALL train operations team on new tools in Month 5 Week 3
10. THE Platform SHALL monitor operations and iterate based on feedback in Month 5-6

### Requirement 37: Phase 3 Timeline (Month 6-9)

**User Story:** As a product manager, I want a realistic timeline for Phase 3 delivery, so that managed platform can launch successfully.

#### Acceptance Criteria

1. THE Platform SHALL complete Florist_Partner recruitment (2-3 initial partners) in Month 6
2. THE Platform SHALL complete Florist_Partner dashboard development in Month 6-7
3. THE Platform SHALL complete order assignment and routing logic in Month 7
4. THE Platform SHALL complete real-time status tracking in Month 7
5. THE Platform SHALL complete review and rating system in Month 8
6. THE Platform SHALL complete SLA monitoring and enforcement in Month 8
7. THE Platform SHALL complete partner onboarding and training in Month 8
8. THE Platform SHALL conduct beta testing with limited customers in Month 9 Week 1-2
9. THE Platform SHALL launch Phase 3 publicly by end of Month 9
10. THE Platform SHALL monitor partner performance and customer satisfaction in Month 9-10

### Requirement 38: Phase 4 Timeline (Month 10-12)

**User Story:** As a founder, I want a realistic timeline for Phase 4 expansion, so that multi-city launch can be executed systematically.

#### Acceptance Criteria

1. THE Platform SHALL complete city expansion planning (target cities, partner requirements) in Month 10
2. THE Platform SHALL complete multi-zone architecture implementation in Month 10
3. THE Platform SHALL recruit Florist_Partners in 2nd city in Month 10-11
4. THE Platform SHALL complete dynamic pricing and delivery fee calculation in Month 11
5. THE Platform SHALL complete city-specific configuration management in Month 11
6. THE Platform SHALL launch 2nd city in Month 11 Week 3-4
7. THE Platform SHALL monitor 2nd city performance and optimize in Month 12
8. THE Platform SHALL plan 3rd city expansion based on learnings in Month 12
9. THE Platform SHALL establish playbook for future city launches in Month 12
10. THE Platform SHALL achieve 3+ active cities by end of Month 12

---

## PART 12: OPEN QUESTIONS & FOUNDER DECISIONS

### Requirement 39: Business Model Decisions

**User Story:** As a founder, I want clarity on key business model decisions, so that the platform can be built accordingly.

#### Acceptance Criteria

1. THE Founder SHALL decide: Aggregator model (partners set prices) vs Managed marketplace (platform sets prices)
2. THE Founder SHALL decide: Platform commission structure (percentage vs fixed fee per order)
3. THE Founder SHALL decide: Who handles delivery - Florist_Partners or third-party delivery service
4. THE Founder SHALL decide: Pricing strategy - premium positioning vs competitive pricing
5. THE Founder SHALL decide: Customer acquisition strategy - paid ads vs organic/referral
6. THE Founder SHALL decide: Initial city for launch and expansion sequence
7. THE Founder SHALL decide: Minimum order value and delivery fee structure
8. THE Founder SHALL decide: Refund and cancellation policy
9. THE Founder SHALL decide: Partner exclusivity requirements (can partners sell on other platforms?)
10. THE Founder SHALL decide: Brand positioning - artisan/premium vs affordable/accessible

### Requirement 40: Product Decisions

**User Story:** As a founder, I want clarity on key product decisions, so that development priorities are clear.

#### Acceptance Criteria

1. THE Founder SHALL decide: Build custom platform vs use existing marketplace solution (Shopify, WooCommerce)
2. THE Founder SHALL decide: Native mobile app vs Progressive Web App (PWA)
3. THE Founder SHALL decide: Real-time chat support vs WhatsApp-only support
4. THE Founder SHALL decide: User accounts required vs guest checkout only
5. THE Founder SHALL decide: Product customization depth (simple vs advanced customization options)
6. THE Founder SHALL decide: Photo proof of delivery required vs optional
7. THE Founder SHALL decide: Scheduled delivery (specific time slots) vs same-day delivery only
8. THE Founder SHALL decide: Corporate account features (invoicing, bulk orders) in Phase 2 or Phase 3
9. THE Founder SHALL decide: Promotional strategy (discounts, free delivery, referral bonuses)
10. THE Founder SHALL decide: Content strategy (blog, flower care guides, social media)

---

## Summary

This requirements document defines the complete scope for transforming Flowee from a static landing page into a multi-phase florist marketplace platform. The requirements are organized into four phases:

- **Phase 1 (NOW)**: Static landing page with WhatsApp integration - validate demand
- **Phase 2 (NEXT)**: Internal operations tools - systematize order management
- **Phase 3 (LATER)**: Managed florist platform - scale fulfillment with partners
- **Phase 4 (FUTURE)**: Multi-city marketplace - expand nationally

All requirements follow EARS patterns and INCOSE quality rules for clarity, testability, and completeness. The document provides clear acceptance criteria for each requirement, enabling systematic implementation and validation.

**Next Steps:**
1. Founder review and decision on open questions (Requirement 39-40)
2. Design document creation with technical architecture and system design
3. Task breakdown and sprint planning for Phase 1 implementation
