# Design Document: FLOWEE.ID Platform Evolution

## Overview

This design document provides a comprehensive technical blueprint for transforming Flowee from a static landing page into a multi-city florist marketplace platform in Indonesia. The design follows a phased evolution strategy that prioritizes startup execution, manual operations in early phases, and progressive automation as the business scales.

### Design Philosophy

1. **Start Simple, Scale Smart**: Begin with manual processes and spreadsheets; automate only when volume justifies the complexity
2. **WhatsApp-First**: Embrace WhatsApp as a primary channel throughout all phases, not just MVP
3. **Mobile-First**: Optimize for Indonesian mobile users with limited bandwidth
4. **City-by-City**: Design for incremental geographic expansion rather than nationwide launch
5. **Graceful Degradation**: Ensure the platform remains functional even when components fail

### Phase Evolution Summary

| Phase | Timeline | Focus | Tech Stack | Team Size |
|-------|----------|-------|------------|-----------|
| **Phase 1: Static MVP** | Current | Brand presence, lead capture | HTML/CSS/JS, Vercel | 1-2 people |
| **Phase 2: Operations** | Months 1-3 | Manual order management | Airtable/Sheets, WhatsApp API | 2-4 people |
| **Phase 3: Platform** | Months 4-12 | Automated ordering, single city | Next.js, PostgreSQL, Redis | 4-8 people |
| **Phase 4: Marketplace** | Year 2+ | Multi-city, partner network | Microservices, queues, CDN | 10+ people |

---

## 1. Capability Map

The platform capabilities are organized into six core domains:

### 1.1 Customer Experience Domain

**Purpose**: Enable customers to discover, customize, and order flower arrangements

**Capabilities**:
- **Product Discovery**: Browse catalog by occasion, type, price range
- **Product Customization**: Select flowers, colors, add-ons, delivery details
- **Order Placement**: Submit orders with delivery requirements
- **Order Tracking**: Monitor order status in real-time
- **Payment Processing**: Complete payment via multiple methods
- **Customer Support**: Get help via WhatsApp, chat, email
- **Review & Feedback**: Rate orders and provide feedback

**Phase Evolution**:
- Phase 1: Static catalog + WhatsApp inquiry
- Phase 2: Web forms + manual quote generation
- Phase 3: Real-time pricing + online checkout
- Phase 4: Personalized recommendations + loyalty program

### 1.2 Order Management Domain

**Purpose**: Manage the complete order lifecycle from inquiry to delivery

**Capabilities**:
- **Lead Capture**: Collect customer inquiries from multiple channels
- **Quote Generation**: Calculate pricing based on requirements
- **Order Confirmation**: Validate and confirm customer orders
- **Order Assignment**: Route orders to appropriate florist partners
- **Status Tracking**: Monitor order progress through fulfillment stages
- **Delivery Coordination**: Schedule and track deliveries
- **Issue Resolution**: Handle cancellations, modifications, complaints

**Phase Evolution**:
- Phase 1: Manual WhatsApp conversations
- Phase 2: Spreadsheet tracking + status updates
- Phase 3: Automated assignment + real-time tracking
- Phase 4: AI-powered routing + predictive delivery

### 1.3 Partner Management Domain

**Purpose**: Onboard, manage, and optimize florist partner network

**Capabilities**:
- **Partner Onboarding**: Application, verification, training
- **Partner Dashboard**: Order notifications, status updates, earnings
- **Quality Control**: Monitor performance, enforce standards
- **Payout Management**: Calculate and process partner payments
- **Capacity Management**: Track partner availability and workload
- **Performance Analytics**: Measure and report partner metrics

**Phase Evolution**:
- Phase 1: N/A (self-fulfillment)
- Phase 2: Manual partner coordination via WhatsApp
- Phase 3: Partner dashboard + automated assignment
- Phase 4: Multi-partner marketplace + dynamic pricing

### 1.4 Operations & Admin Domain

**Purpose**: Provide internal tools for business operations

**Capabilities**:
- **Admin Dashboard**: Central operations command center
- **Inventory Management**: Track product availability
- **Content Management**: Update catalog, pricing, promotions
- **Customer Management**: View profiles, history, support tickets
- **Financial Management**: Revenue tracking, cost analysis, reporting
- **Configuration Management**: Set operational parameters
- **Analytics & Reporting**: Business intelligence and insights

**Phase Evolution**:
- Phase 1: Manual tracking in notebooks/spreadsheets
- Phase 2: Airtable/Sheets dashboards
- Phase 3: Custom admin panel with automation
- Phase 4: Advanced analytics + AI insights

### 1.5 Communication & Notifications Domain

**Purpose**: Keep all stakeholders informed throughout order lifecycle

**Capabilities**:
- **Customer Notifications**: Order confirmations, status updates, delivery alerts
- **Partner Notifications**: New order alerts, deadline reminders
- **Admin Alerts**: System issues, escalations, performance alerts
- **Marketing Communications**: Promotions, newsletters, re-engagement
- **Multi-Channel Delivery**: WhatsApp, SMS, email, push notifications

**Phase Evolution**:
- Phase 1: Manual WhatsApp messages
- Phase 2: WhatsApp Business API + email templates
- Phase 3: Automated notification engine
- Phase 4: Personalized, AI-driven communications

### 1.6 Platform Infrastructure Domain

**Purpose**: Provide reliable, secure, scalable technical foundation

**Capabilities**:
- **Authentication & Authorization**: Secure access control
- **Payment Gateway Integration**: Process payments securely
- **Data Storage & Backup**: Reliable data persistence
- **API Management**: Expose and consume APIs
- **Monitoring & Logging**: Track system health and issues
- **Security & Compliance**: Protect data and meet regulations

**Phase Evolution**:
- Phase 1: Static hosting (Vercel)
- Phase 2: Form backend + database (Airtable/Sheets)
- Phase 3: Full-stack application (Next.js + PostgreSQL)
- Phase 4: Microservices + cloud infrastructure

---

## 2. Business Capability Evolution

This section maps how each capability evolves across the four phases:

### 2.1 Phase 1: Static Landing Page (Current State)

**Business Model**: Lead generation → Manual WhatsApp sales

**Active Capabilities**:
- Product Discovery (static catalog)
- Customer Support (manual WhatsApp)
- Basic content management (HTML editing)

**Manual Processes**:
- All customer inquiries handled via WhatsApp
- Order tracking in personal notes or spreadsheets
- Payment via manual bank transfer confirmation
- Self-fulfillment or single partner relationship

**Limitations**:
- No order history or customer database
- No automated pricing or availability
- No scalable partner management
- High manual effort per order

**Success Metrics**:
- Website traffic and engagement
- WhatsApp inquiry volume
- Conversion rate (inquiry → order)
- Customer satisfaction (informal feedback)

### 2.2 Phase 2: Internal Operations Tools

**Business Model**: Lead management → Structured fulfillment

**New Capabilities Activated**:
- Lead Capture (web forms)
- Order Confirmation (structured data)
- Status Tracking (spreadsheet-based)
- Customer Notifications (automated WhatsApp)
- Basic Admin Dashboard (Airtable/Sheets)

**Automation Introduced**:
- Form submissions auto-populate database
- WhatsApp Business API for order confirmations
- Email notifications for status updates
- Basic reporting from spreadsheet data

**Still Manual**:
- Quote generation (admin calculates pricing)
- Order assignment (admin selects partner)
- Delivery coordination (phone calls/WhatsApp)
- Payment confirmation (manual verification)

**Technology Stack**:
- Frontend: Static site + embedded forms (Typeform, Google Forms)
- Backend: Airtable or Google Sheets as database
- Communication: WhatsApp Business API, SendGrid
- Payments: Manual bank transfer + Midtrans payment links

**Success Metrics**:
- Lead response time (target: < 15 minutes)
- Order fulfillment rate (target: > 95%)
- Customer satisfaction score (target: > 4.5/5)
- Revenue per order (track pricing effectiveness)

### 2.3 Phase 3: Managed Florist Platform

**Business Model**: Automated marketplace → Commission-based revenue

**New Capabilities Activated**:
- Real-time Product Availability
- Automated Quote Generation
- Online Payment Processing
- Order Assignment Algorithm
- Partner Dashboard
- Quality Control System
- Performance Analytics

**Automation Introduced**:
- Instant pricing based on product + delivery location
- Automatic order routing to available partners
- Real-time order tracking with status updates
- Automated partner payouts
- Customer review collection

**Still Manual**:
- Partner onboarding and verification
- Complex customization requests
- Dispute resolution
- Quality audits

**Technology Stack**:
- Frontend: Next.js (React) with TypeScript
- Backend: Node.js (Express/NestJS) or Python (FastAPI)
- Database: PostgreSQL (primary), Redis (cache)
- Storage: AWS S3 or Google Cloud Storage
- Payments: Midtrans or Xendit integration
- Hosting: Vercel (frontend), AWS/GCP (backend)

**Success Metrics**:
- Order volume (target: 100+ orders/week)
- Conversion rate (target: > 15%)
- Partner acceptance rate (target: > 90%)
- On-time delivery rate (target: > 95%)
- Platform commission revenue

### 2.4 Phase 4: Multi-City Marketplace

**Business Model**: Scaled marketplace → Multiple revenue streams

**New Capabilities Activated**:
- Multi-City Operations
- Dynamic Pricing Engine
- Partner Onboarding Workflow
- Advanced Analytics & BI
- Marketing Automation
- Fraud Detection
- API for Third-Party Integration

**Automation Introduced**:
- AI-powered order routing optimization
- Predictive demand forecasting
- Automated partner quality scoring
- Dynamic pricing based on demand/supply
- Personalized product recommendations
- Automated marketing campaigns

**Still Manual**:
- Strategic partner relationships
- Complex dispute escalations
- Market expansion decisions
- Brand partnerships

**Technology Stack**:
- Frontend: Next.js with micro-frontends
- Backend: Microservices (Node.js, Python, Go)
- Database: PostgreSQL (sharded), MongoDB (logs)
- Cache: Redis Cluster
- Queue: RabbitMQ or AWS SQS
- Search: Elasticsearch
- Analytics: Data warehouse (BigQuery, Redshift)
- Hosting: Multi-region cloud deployment

**Success Metrics**:
- GMV (Gross Merchandise Value)
- Active cities and partners
- Customer lifetime value
- Partner retention rate
- Platform profitability

---

## 3. Service Boundaries

The platform is decomposed into logical services/modules with clear responsibilities:

### 3.1 Phase 2-3 Monolithic Architecture

In early phases, services are implemented as modules within a monolithic application:

```
flowee-platform/
├── customer-service/          # Customer-facing features
│   ├── catalog/              # Product browsing
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Order placement
│   └── account/              # Customer profile
├── order-service/            # Order management
│   ├── order-creation/       # New order processing
│   ├── order-tracking/       # Status updates
│   ├── order-assignment/     # Partner routing
│   └── order-fulfillment/    # Delivery coordination
├── partner-service/          # Partner management
│   ├── partner-dashboard/    # Partner interface
│   ├── partner-onboarding/   # Application workflow
│   └── partner-analytics/    # Performance tracking
├── payment-service/          # Payment processing
│   ├── payment-gateway/      # External integration
│   ├── payment-verification/ # Confirmation handling
│   └── refund-processing/    # Refund workflow
├── notification-service/     # Communications
│   ├── whatsapp/            # WhatsApp messaging
│   ├── email/               # Email delivery
│   └── sms/                 # SMS notifications
└── admin-service/           # Internal operations
    ├── dashboard/           # Operations UI
    ├── content-management/  # Catalog updates
    └── analytics/           # Reporting
```

**Service Communication**: Direct function calls within monolith

**Data Access**: Shared PostgreSQL database with module-specific schemas

### 3.2 Phase 4 Microservices Architecture

In Phase 4, services are decomposed into independent microservices:

#### Customer Service
**Responsibility**: Handle all customer-facing interactions

**Endpoints**:
- `GET /api/products` - List products with filters
- `GET /api/products/:id` - Product details
- `POST /api/cart` - Add to cart
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Order details
- `GET /api/orders/:id/track` - Order tracking

**Data Owned**: Customer profiles, cart sessions, browsing history

**Dependencies**: Order Service, Payment Service, Notification Service

#### Order Service
**Responsibility**: Manage order lifecycle and fulfillment

**Endpoints**:
- `POST /api/orders` - Create order (internal)
- `PUT /api/orders/:id/status` - Update status
- `POST /api/orders/:id/assign` - Assign to partner
- `GET /api/orders/:id/timeline` - Order history

**Data Owned**: Orders, order items, order status history

**Dependencies**: Partner Service, Notification Service, Payment Service

#### Partner Service
**Responsibility**: Manage florist partner network

**Endpoints**:
- `POST /api/partners` - Partner application
- `GET /api/partners/:id` - Partner profile
- `PUT /api/partners/:id/availability` - Update availability
- `GET /api/partners/:id/orders` - Partner orders
- `GET /api/partners/:id/earnings` - Earnings summary

**Data Owned**: Partner profiles, service areas, performance metrics

**Dependencies**: Order Service, Payment Service, Notification Service

#### Payment Service
**Responsibility**: Process payments and manage financial transactions

**Endpoints**:
- `POST /api/payments` - Initiate payment
- `POST /api/payments/webhook` - Payment gateway callback
- `GET /api/payments/:id` - Payment status
- `POST /api/refunds` - Process refund

**Data Owned**: Payment transactions, refund records

**Dependencies**: External payment gateway (Midtrans/Xendit)

#### Notification Service
**Responsibility**: Deliver notifications across channels

**Endpoints**:
- `POST /api/notifications/send` - Send notification
- `GET /api/notifications/:id/status` - Delivery status

**Data Owned**: Notification templates, delivery logs

**Dependencies**: WhatsApp API, SendGrid, SMS gateway

#### Analytics Service
**Responsibility**: Aggregate data and generate insights

**Endpoints**:
- `GET /api/analytics/dashboard` - Key metrics
- `GET /api/analytics/reports/:type` - Generate report
- `POST /api/analytics/events` - Track event

**Data Owned**: Aggregated metrics, reports, event logs

**Dependencies**: All services (read-only access)

**Service Communication**: REST APIs + Message Queue (RabbitMQ/SQS) for async events

**Data Strategy**: Each service owns its database; shared data via APIs

---

## 4. Core Data Entities and Relationships

### 4.1 Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  Customer   │────────>│    Order    │<────────│   Partner   │
│             │ places  │             │ fulfills│             │
│ - id        │         │ - id        │         │ - id        │
│ - name      │         │ - customer_id│        │ - name      │
│ - phone     │         │ - partner_id│         │ - phone     │
│ - email     │         │ - product_id│         │ - email     │
│ - addresses │         │ - status    │         │ - areas     │
└─────────────┘         │ - total     │         │ - rating    │
                        └─────────────┘         └─────────────┘
                              │                        │
                              │                        │
                              v                        v
                        ┌─────────────┐         ┌─────────────┐
                        │   Payment   │         │   Review    │
                        │             │         │             │
                        │ - id        │         │ - id        │
                        │ - order_id  │         │ - order_id  │
                        │ - amount    │         │ - partner_id│
                        │ - method    │         │ - rating    │
                        │ - status    │         │ - comment   │
                        └─────────────┘         └─────────────┘

┌─────────────┐         ┌─────────────┐
│   Product   │────────>│  OrderItem  │
│             │ contains│             │
│ - id        │         │ - id        │
│ - name      │         │ - order_id  │
│ - category  │         │ - product_id│
│ - base_price│         │ - quantity  │
│ - images    │         │ - price     │
└─────────────┘         └─────────────┘
```

### 4.2 Detailed Entity Schemas

#### Customer Entity
```typescript
interface Customer {
  id: string;                    // UUID
  name: string;
  phone: string;                 // +62 format
  email?: string;
  addresses: Address[];
  created_at: Date;
  updated_at: Date;
  metadata: {
    total_orders: number;
    total_spent: number;
    last_order_date?: Date;
  };
}

interface Address {
  id: string;
  label: string;                 // "Home", "Office", etc.
  recipient_name: string;
  phone: string;
  street: string;
  district: string;              // Kecamatan
  city: string;
  province: string;
  postal_code: string;
  notes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  is_default: boolean;
}
```

#### Product Entity
```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;     // enum
  occasion: Occasion[];          // enum array
  base_price: number;            // in Rupiah
  images: ProductImage[];
  customization_options: CustomizationOption[];
  availability: {
    is_available: boolean;
    cities: string[];            // Available cities
    lead_time_hours: number;     // Preparation time
  };
  created_at: Date;
  updated_at: Date;
}

enum ProductCategory {
  HAND_BOUQUET = "hand_bouquet",
  STANDING_FLOWER = "standing_flower",
  PAPAN_BUNGA = "papan_bunga",
  TABLE_ARRANGEMENT = "table_arrangement",
  SYMPATHY = "sympathy",
  CUSTOM = "custom"
}

enum Occasion {
  GRADUATION = "graduation",
  BIRTHDAY = "birthday",
  ANNIVERSARY = "anniversary",
  WEDDING = "wedding",
  CONDOLENCE = "condolence",
  CONGRATULATIONS = "congratulations",
  ROMANTIC = "romantic"
}

interface CustomizationOption {
  id: string;
  name: string;
  type: "color" | "size" | "addon";
  options: {
    value: string;
    label: string;
    price_adjustment: number;
  }[];
}
```

#### Order Entity
```typescript
interface Order {
  id: string;
  order_number: string;          // Human-readable: FLW-20240115-001
  customer_id: string;
  partner_id?: string;           // Assigned partner
  status: OrderStatus;
  
  // Order details
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  
  // Delivery information
  delivery_address: Address;
  delivery_date: Date;
  delivery_time_slot: TimeSlot;
  delivery_notes?: string;
  
  // Customization
  customization: {
    color_preference?: string;
    message_card?: string;
    special_requests?: string;
  };
  
  // Tracking
  timeline: OrderEvent[];
  
  // Metadata
  created_at: Date;
  updated_at: Date;
  confirmed_at?: Date;
  completed_at?: Date;
  cancelled_at?: Date;
  cancellation_reason?: string;
}

enum OrderStatus {
  PENDING = "pending",           // Awaiting confirmation
  CONFIRMED = "confirmed",       // Payment confirmed
  ASSIGNED = "assigned",         // Partner assigned
  PREPARING = "preparing",       // Being arranged
  READY = "ready",              // Ready for delivery
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  COMPLETED = "completed",       // Customer confirmed
  CANCELLED = "cancelled",
  REFUNDED = "refunded"
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;          // Snapshot at order time
  quantity: number;
  unit_price: number;
  customizations: Record<string, any>;
  subtotal: number;
}

interface OrderEvent {
  id: string;
  timestamp: Date;
  status: OrderStatus;
  actor: string;                 // "customer", "partner", "admin", "system"
  notes?: string;
  metadata?: Record<string, any>;
}

interface TimeSlot {
  start: string;                 // "09:00"
  end: string;                   // "12:00"
  label: string;                 // "Morning (9 AM - 12 PM)"
}
```

#### Partner Entity
```typescript
interface Partner {
  id: string;
  business_name: string;
  owner_name: string;
  phone: string;
  email: string;
  
  // Location
  address: Address;
  service_areas: ServiceArea[];
  
  // Status
  status: PartnerStatus;
  onboarding_status: OnboardingStatus;
  
  // Performance
  metrics: {
    total_orders: number;
    completed_orders: number;
    acceptance_rate: number;      // %
    on_time_rate: number;         // %
    average_rating: number;       // 0-5
    total_reviews: number;
  };
  
  // Financial
  commission_rate: number;        // % platform takes
  payout_schedule: "weekly" | "biweekly";
  bank_account: {
    bank_name: string;
    account_number: string;
    account_holder: string;
  };
  
  // Operational
  availability: {
    is_available: boolean;
    working_hours: WorkingHours[];
    capacity_per_day: number;
    current_load: number;
  };
  
  created_at: Date;
  updated_at: Date;
  verified_at?: Date;
}

enum PartnerStatus {
  PENDING = "pending",           // Application submitted
  UNDER_REVIEW = "under_review", // Being verified
  APPROVED = "approved",         // Verified, not yet active
  ACTIVE = "active",            // Accepting orders
  SUSPENDED = "suspended",       // Temporarily disabled
  DEACTIVATED = "deactivated"   // Permanently disabled
}

interface ServiceArea {
  city: string;
  districts: string[];           // Kecamatan list
  delivery_radius_km: number;
}

interface WorkingHours {
  day: number;                   // 0-6 (Sunday-Saturday)
  open: string;                  // "08:00"
  close: string;                 // "20:00"
  is_closed: boolean;
}
```

#### Payment Entity
```typescript
interface Payment {
  id: string;
  order_id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  
  // Gateway details
  gateway: "midtrans" | "xendit";
  transaction_id?: string;       // Gateway transaction ID
  payment_url?: string;          // For redirect methods
  
  // Timestamps
  created_at: Date;
  paid_at?: Date;
  expired_at?: Date;
  
  // Metadata
  metadata: Record<string, any>;
}

enum PaymentMethod {
  BANK_TRANSFER = "bank_transfer",
  EWALLET_GOPAY = "ewallet_gopay",
  EWALLET_OVO = "ewallet_ovo",
  EWALLET_SHOPEEPAY = "ewallet_shopeepay",
  EWALLET_DANA = "ewallet_dana",
  QRIS = "qris",
  CREDIT_CARD = "credit_card"
}

enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  PAID = "paid",
  FAILED = "failed",
  EXPIRED = "expired",
  REFUNDED = "refunded"
}
```

#### Review Entity
```typescript
interface Review {
  id: string;
  order_id: string;
  customer_id: string;
  partner_id: string;
  
  rating: number;                // 1-5
  comment?: string;
  
  // Detailed ratings
  ratings: {
    quality: number;             // 1-5
    presentation: number;        // 1-5
    delivery: number;            // 1-5
    communication: number;       // 1-5
  };
  
  images?: string[];             // Photo URLs
  
  // Moderation
  is_verified: boolean;          // Customer actually ordered
  is_visible: boolean;           // Not hidden by admin
  
  created_at: Date;
  updated_at: Date;
}
```

### 4.3 Database Schema (PostgreSQL)

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(email);

-- Addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  label VARCHAR(50),
  recipient_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  street TEXT NOT NULL,
  district VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10),
  notes TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_addresses_customer ON addresses(customer_id);
CREATE INDEX idx_addresses_city ON addresses(city);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  occasions TEXT[], -- Array of occasion enums
  base_price INTEGER NOT NULL,
  images JSONB,
  customization_options JSONB,
  is_available BOOLEAN DEFAULT TRUE,
  available_cities TEXT[],
  lead_time_hours INTEGER DEFAULT 4,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  partner_id UUID REFERENCES partners(id),
  status VARCHAR(50) NOT NULL,
  subtotal INTEGER NOT NULL,
  delivery_fee INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  delivery_address JSONB NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_time_slot JSONB NOT NULL,
  delivery_notes TEXT,
  customization JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP,
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_partner ON orders(partner_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_delivery_date ON orders(delivery_date);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  customizations JSONB,
  subtotal INTEGER NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Order events table (timeline)
CREATE TABLE order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) NOT NULL,
  actor VARCHAR(50) NOT NULL,
  notes TEXT,
  metadata JSONB
);

CREATE INDEX idx_order_events_order ON order_events(order_id);
CREATE INDEX idx_order_events_timestamp ON order_events(timestamp DESC);

-- Partners table
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  address JSONB NOT NULL,
  service_areas JSONB NOT NULL,
  status VARCHAR(50) NOT NULL,
  onboarding_status VARCHAR(50) NOT NULL,
  metrics JSONB,
  commission_rate DECIMAL(5, 2) NOT NULL,
  payout_schedule VARCHAR(20) NOT NULL,
  bank_account JSONB NOT NULL,
  availability JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP
);

CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_phone ON partners(phone);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  amount INTEGER NOT NULL,
  method VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  gateway VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(255),
  payment_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  expired_at TIMESTAMP
);

CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  customer_id UUID REFERENCES customers(id),
  partner_id UUID REFERENCES partners(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  ratings JSONB,
  images TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_partner ON reviews(partner_id);
CREATE INDEX idx_reviews_order ON reviews(order_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

---

## 5. Order Lifecycle Design

### 5.1 Order State Machine

```
                    ┌─────────────┐
                    │   PENDING   │ (Order created, awaiting payment)
                    └──────┬──────┘
                           │
                    [Payment Confirmed]
                           │
                           v
                    ┌─────────────┐
                    │  CONFIRMED  │ (Payment received, ready for assignment)
                    └──────┬──────┘
                           │
                    [Partner Assigned]
                           │
                           v
                    ┌─────────────┐
                    │  ASSIGNED   │ (Partner notified, awaiting acceptance)
                    └──────┬──────┘
                           │
                    [Partner Accepts]
                           │
                           v
                    ┌─────────────┐
                    │  PREPARING  │ (Arrangement being made)
                    └──────┬──────┘
                           │
                    [Arrangement Complete]
                           │
                           v
                    ┌─────────────┐
                    │    READY    │ (Ready for pickup/delivery)
                    └──────┬──────┘
                           │
                    [Out for Delivery]
                           │
                           v
                    ┌─────────────┐
                    │OUT_FOR_DELIV│ (Driver en route)
                    └──────┬──────┘
                           │
                    [Delivered]
                           │
                           v
                    ┌─────────────┐
                    │  DELIVERED  │ (Customer received)
                    └──────┬──────┘
                           │
                    [Customer Confirms]
                           │
                           v
                    ┌─────────────┐
                    │  COMPLETED  │ (Order closed successfully)
                    └─────────────┘

                    [Cancellation Paths]
                    
    PENDING ──────> CANCELLED (Before payment)
    CONFIRMED ────> CANCELLED (Before assignment, full refund)
    ASSIGNED ─────> CANCELLED (Partner rejects, reassign or refund)
    PREPARING ────> CANCELLED (Emergency only, full refund)
```

### 5.2 State Transition Rules

| From State | To State | Trigger | Actor | Conditions | Side Effects |
|------------|----------|---------|-------|------------|--------------|
| PENDING | CONFIRMED | Payment received | System | Payment status = PAID | Send confirmation to customer, notify admin |
| CONFIRMED | ASSIGNED | Partner assigned | System/Admin | Partner available | Notify partner, start acceptance timer |
| ASSIGNED | PREPARING | Partner accepts | Partner | Within 15 min SLA | Notify customer, start preparation timer |
| ASSIGNED | CONFIRMED | Partner rejects | Partner | Within 15 min SLA | Reassign to next partner |
| PREPARING | READY | Arrangement done | Partner | Photo uploaded | Notify customer with photo |
| READY | OUT_FOR_DELIVERY | Delivery started | Partner | - | Send tracking link to customer |
| OUT_FOR_DELIVERY | DELIVERED | Delivery complete | Partner | Photo proof uploaded | Request customer confirmation |
| DELIVERED | COMPLETED | Customer confirms | Customer/System | After 24h auto-confirm | Trigger review request, process payout |
| Any | CANCELLED | Cancellation request | Customer/Admin | Refund policy check | Process refund, notify all parties |

### 5.3 Order Lifecycle Workflows by Phase

#### Phase 1: Manual WhatsApp Flow

```
Customer                    Admin                       Florist
   │                          │                            │
   │ 1. Browse website        │                            │
   │ 2. Click WhatsApp CTA    │                            │
   ├─────────────────────────>│                            │
   │ 3. Send inquiry          │                            │
   │    (occasion, budget,    │                            │
   │     delivery details)    │                            │
   │                          │ 4. Receive inquiry         │
   │                          │ 5. Check availability      │
   │                          │ 6. Calculate price         │
   │<─────────────────────────┤                            │
   │ 7. Receive quote         │                            │
   │ 8. Confirm order         │                            │
   ├─────────────────────────>│                            │
   │                          │ 9. Send payment details    │
   │<─────────────────────────┤                            │
   │ 10. Make payment         │                            │
   │ 11. Send proof           │                            │
   ├─────────────────────────>│                            │
   │                          │ 12. Verify payment         │
   │                          │ 13. Coordinate with florist│
   │                          ├───────────────────────────>│
   │                          │                            │ 14. Prepare arrangement
   │                          │<───────────────────────────┤
   │                          │ 15. Receive ready photo    │
   │<─────────────────────────┤                            │
   │ 16. Receive update       │                            │
   │                          │                            │ 17. Deliver
   │<───────────────────────────────────────────────────────┤
   │ 18. Receive delivery     │                            │
   │ 19. Send feedback        │                            │
   ├─────────────────────────>│                            │
```

**Pain Points**: High manual effort, no tracking, prone to errors, doesn't scale

#### Phase 2: Structured Lead Management

```
Customer                    System                      Admin                    Florist
   │                          │                            │                         │
   │ 1. Fill inquiry form     │                            │                         │
   ├─────────────────────────>│                            │                         │
   │                          │ 2. Save to Airtable        │                         │
   │                          │ 3. Send WhatsApp notif     │                         │
   │                          ├───────────────────────────>│                         │
   │                          │                            │ 4. Review inquiry       │
   │                          │                            │ 5. Generate quote       │
   │                          │<───────────────────────────┤                         │
   │<─────────────────────────┤ 6. Send quote via WhatsApp │                         │
   │ 7. Receive quote         │                            │                         │
   │ 8. Confirm via WhatsApp  │                            │                         │
   ├─────────────────────────────────────────────────────>│                         │
   │                          │                            │ 9. Update status        │
   │                          │                            │ 10. Send payment link   │
   │<───────────────────────────────────────────────────────┤                         │
   │ 11. Pay via Midtrans     │                            │                         │
   ├─────────────────────────>│                            │                         │
   │                          │ 12. Webhook: payment OK    │                         │
   │                          ├───────────────────────────>│                         │
   │                          │                            │ 13. Assign to florist   │
   │                          │                            ├────────────────────────>│
   │                          │                            │                         │ 14. Prepare
   │                          │                            │<────────────────────────┤
   │                          │                            │ 15. Update status       │
   │<───────────────────────────────────────────────────────┤ 16. Send update        │
   │ 17. Receive status       │                            │                         │
```

**Improvements**: Structured data, automated notifications, payment gateway, less manual work

**Still Manual**: Quote generation, partner assignment, delivery coordination

#### Phase 3: Automated Platform

```
Customer                    System                      Partner
   │                          │                            │
   │ 1. Browse catalog        │                            │
   │ 2. Add to cart           │                            │
   │ 3. Enter delivery info   │                            │
   ├─────────────────────────>│                            │
   │                          │ 4. Calculate price         │
   │<─────────────────────────┤    (product + delivery)    │
   │ 5. See instant quote     │                            │
   │ 6. Proceed to payment    │                            │
   ├─────────────────────────>│                            │
   │                          │ 7. Create payment          │
   │<─────────────────────────┤    (Midtrans)              │
   │ 8. Complete payment      │                            │
   ├─────────────────────────>│                            │
   │                          │ 9. Webhook: payment OK     │
   │                          │ 10. Create order           │
   │                          │ 11. Run assignment algo    │
   │                          │     (find best partner)    │
   │                          ├───────────────────────────>│
   │                          │ 12. Send order notification│
   │                          │                            │ 13. Accept order
   │                          │<───────────────────────────┤
   │<─────────────────────────┤ 14. Notify customer        │
   │ 15. Receive confirmation │                            │
   │                          │                            │ 16. Update status: PREPARING
   │                          │<───────────────────────────┤
   │<─────────────────────────┤ 17. Push notification      │
   │ 18. Track order          │                            │
   │                          │                            │ 19. Upload ready photo
   │                          │<───────────────────────────┤
   │<─────────────────────────┤ 20. Show photo             │
   │                          │                            │ 21. Out for delivery
   │                          │<───────────────────────────┤
   │<─────────────────────────┤ 22. Real-time tracking     │
   │                          │                            │ 23. Upload delivery proof
   │                          │<───────────────────────────┤
   │<─────────────────────────┤ 24. Request review         │
   │ 25. Submit review        │                            │
   ├─────────────────────────>│                            │
   │                          │ 26. Process payout         │
   │                          ├───────────────────────────>│
```

**Improvements**: Instant pricing, automated assignment, real-time tracking, integrated payments

**Still Manual**: Complex customizations, dispute resolution, quality audits

### 5.4 SLA Definitions

| Stage | SLA | Measurement | Penalty |
|-------|-----|-------------|---------|
| Payment Confirmation | 5 minutes | Time from payment to order confirmation | System alert if > 10 min |
| Partner Assignment | 15 minutes | Time from confirmation to partner assigned | Admin escalation |
| Partner Acceptance | 15 minutes | Time from assignment to partner accepts | Auto-reassign |
| Preparation (Standard) | 2 hours | Time from acceptance to ready | Partner warning |
| Preparation (Custom) | 4 hours | Time from acceptance to ready | Partner warning |
| Delivery Window | ±30 minutes | Actual delivery vs scheduled time | Compensation to customer |
| Customer Response | 24 hours | Time to confirm delivery | Auto-confirm |

### 5.5 Error Handling & Recovery

#### Scenario 1: Payment Confirmed but No Available Partners

**Detection**: Assignment algorithm returns no matches

**Recovery Flow**:
1. System logs error and creates admin alert
2. Admin dashboard shows "Unassigned Orders" widget
3. Admin manually contacts partner network
4. If no partner found within 2 hours:
   - Notify customer of delay
   - Offer alternatives: reschedule, different product, refund
5. If still no partner after 4 hours:
   - Automatic refund initiation
   - Apologetic email/WhatsApp to customer

#### Scenario 2: Partner Accepts but Doesn't Update Status

**Detection**: Order stuck in PREPARING for > SLA time

**Recovery Flow**:
1. System sends reminder notification to partner (at SLA + 30 min)
2. System sends escalation to admin (at SLA + 1 hour)
3. Admin calls partner to check status
4. If partner unresponsive:
   - Reassign to backup partner
   - Mark original partner for review
5. Notify customer of delay with updated ETA

#### Scenario 3: Delivery Failed (Customer Not Home)

**Detection**: Partner reports delivery failure

**Recovery Flow**:
1. Partner updates status with reason
2. System notifies customer immediately
3. Customer options:
   - Reschedule delivery (same day if possible)
   - Change delivery address
   - Arrange pickup from partner location
4. If customer unresponsive for 4 hours:
   - Partner stores arrangement
   - Customer charged storage fee after 24 hours
5. If unresolved after 48 hours:
   - Order cancelled, partial refund (minus costs)

#### Scenario 4: Customer Disputes Quality

**Detection**: Customer submits complaint or low rating

**Recovery Flow**:
1. System creates support ticket
2. Admin reviews complaint and order photos
3. Admin contacts partner for explanation
4. Resolution options:
   - Partial refund (if minor issue)
   - Full refund (if major quality issue)
   - Replacement arrangement (if time permits)
5. Partner quality score adjusted
6. If pattern of complaints: partner suspended pending review

---

## 6. Florist Partner Lifecycle

### 6.1 Partner Journey Stages

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ DISCOVERY    │───>│ APPLICATION  │───>│ VERIFICATION │───>│  ONBOARDING  │
│              │    │              │    │              │    │              │
│ - Learn about│    │ - Submit form│    │ - Doc review │    │ - Training   │
│   platform   │    │ - Portfolio  │    │ - Site visit │    │ - Dashboard  │
│ - Benefits   │    │ - Business   │    │ - Quality    │    │ - Test order │
│              │    │   details    │    │   check      │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                     │
                                                                     v
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  CHURNED     │<───│  SUSPENDED   │<───│   ACTIVE     │<───│  ACTIVATION  │
│              │    │              │    │              │    │              │
│ - Voluntary  │    │ - Quality    │    │ - Fulfilling │    │ - First order│
│   exit       │    │   issues     │    │   orders     │    │ - Go live    │
│ - Terminated │    │ - Temp pause │    │ - Growing    │    │              │
│              │    │              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### 6.2 Partner Onboarding Workflow

#### Step 1: Application Submission

**Partner Actions**:
- Fill application form with:
  - Business name and owner details
  - Business registration documents
  - Location and service areas
  - Portfolio (photos of past work)
  - Capacity (orders per day)
  - Operating hours

**System Actions**:
- Validate form completeness
- Send confirmation email/WhatsApp
- Create partner record with status = PENDING
- Notify admin team

**Timeline**: 10-15 minutes

#### Step 2: Admin Review & Verification

**Admin Actions**:
- Review application documents
- Check business registration validity
- Assess portfolio quality
- Schedule site visit (if needed)
- Verify location and service areas
- Check references (if provided)

**Decision Points**:
- **Approve**: Move to onboarding
- **Request More Info**: Send back to partner
- **Reject**: Send rejection email with reason

**Timeline**: 2-5 business days

#### Step 3: Onboarding & Training

**Partner Actions**:
- Attend online training session (1 hour)
- Watch tutorial videos
- Read partner handbook
- Set up dashboard account
- Configure availability and service areas
- Add bank account for payouts

**System Actions**:
- Send onboarding materials
- Create dashboard credentials
- Assign onboarding specialist
- Track training completion

**Timeline**: 1-2 days

#### Step 4: Test Order & Quality Check

**Admin Actions**:
- Place test order with partner
- Evaluate arrangement quality
- Check delivery timeliness
- Assess communication responsiveness

**Partner Actions**:
- Fulfill test order as if real
- Upload photos
- Complete delivery

**Decision Points**:
- **Pass**: Activate partner
- **Fail**: Provide feedback and retry
- **Major Issues**: Reject application

**Timeline**: 1-2 days

#### Step 5: Activation

**System Actions**:
- Change partner status to ACTIVE
- Enable order assignment
- Send activation confirmation
- Add to partner network

**Partner Actions**:
- Set availability to "available"
- Start receiving real orders

**Timeline**: Immediate

### 6.3 Partner Performance Metrics

#### Key Performance Indicators (KPIs)

| Metric | Calculation | Target | Impact |
|--------|-------------|--------|--------|
| **Acceptance Rate** | (Accepted Orders / Assigned Orders) × 100% | > 90% | Order assignment priority |
| **On-Time Rate** | (On-Time Deliveries / Total Deliveries) × 100% | > 95% | Customer satisfaction |
| **Average Rating** | Sum of ratings / Number of reviews | > 4.5/5 | Visibility in marketplace |
| **Response Time** | Avg time to accept/reject order | < 10 min | Assignment priority |
| **Completion Rate** | (Completed Orders / Accepted Orders) × 100% | > 98% | Trust score |
| **Cancellation Rate** | (Cancelled Orders / Accepted Orders) × 100% | < 2% | Penalty threshold |

#### Performance Scoring Algorithm

```typescript
function calculatePartnerScore(partner: Partner): number {
  const weights = {
    acceptanceRate: 0.25,
    onTimeRate: 0.30,
    averageRating: 0.25,
    responseTime: 0.10,
    completionRate: 0.10
  };
  
  const scores = {
    acceptanceRate: partner.metrics.acceptance_rate / 100,
    onTimeRate: partner.metrics.on_time_rate / 100,
    averageRating: partner.metrics.average_rating / 5,
    responseTime: Math.max(0, 1 - (partner.metrics.avg_response_minutes / 15)),
    completionRate: partner.metrics.completion_rate / 100
  };
  
  let totalScore = 0;
  for (const [metric, weight] of Object.entries(weights)) {
    totalScore += scores[metric] * weight;
  }
  
  return Math.round(totalScore * 100); // 0-100 score
}
```

#### Performance Tiers

| Tier | Score Range | Benefits | Requirements |
|------|-------------|----------|--------------|
| **Platinum** | 90-100 | Priority assignment, 15% commission, featured badge | > 100 orders, > 4.8 rating |
| **Gold** | 80-89 | Standard assignment, 18% commission | > 50 orders, > 4.5 rating |
| **Silver** | 70-79 | Standard assignment, 20% commission | > 20 orders, > 4.0 rating |
| **Bronze** | 60-69 | Lower priority, 20% commission, improvement plan | < 20 orders or < 4.0 rating |
| **At Risk** | < 60 | Suspended, requires review | Consistent underperformance |

### 6.4 Partner Quality Control

#### Quality Audit Process

**Frequency**: 
- New partners: After first 10 orders
- Active partners: Quarterly
- At-risk partners: Monthly

**Audit Components**:
1. **Photo Review**: Check arrangement quality from order photos
2. **Customer Feedback**: Analyze reviews and ratings
3. **Timeliness**: Check on-time delivery rate
4. **Communication**: Review response times and customer interactions
5. **Mystery Shop**: Place anonymous test order

**Audit Scoring**:
- Each component scored 1-5
- Overall score = average of components
- Pass threshold: 4.0/5

**Actions Based on Score**:
- **4.5-5.0**: Excellent, consider tier upgrade
- **4.0-4.4**: Good, maintain current tier
- **3.5-3.9**: Warning, improvement plan required
- **< 3.5**: Suspension, mandatory retraining

#### Quality Issue Escalation

```
Minor Issue (1-2 complaints)
    │
    ├─> Warning email
    ├─> Improvement tips
    └─> Monitor next 10 orders
    
Moderate Issue (3-5 complaints or pattern)
    │
    ├─> Formal warning
    ├─> Mandatory training session
    ├─> Probation period (30 days)
    └─> Reduced assignment priority
    
Major Issue (> 5 complaints or severe violation)
    │
    ├─> Immediate suspension
    ├─> Investigation
    ├─> Decision: Retraining or Termination
    └─> If terminated: Final payout, account closure
```

---

## 7. Lead-to-Order Workflow (Phase 1-2)

### 7.1 Phase 1: Manual WhatsApp Workflow

**Current State**: All interactions happen via WhatsApp with manual tracking

#### Workflow Steps

1. **Customer Inquiry**
   - Customer clicks WhatsApp button on website
   - Pre-filled message opens: "Halo, saya tertarik dengan [Product Name]"
   - Customer adds details: occasion, budget, delivery date/location

2. **Admin Response** (Target: < 5 minutes)
   - Admin receives WhatsApp notification
   - Admin asks clarifying questions:
     - Exact delivery date and time preference
     - Delivery address (full address)
     - Color preferences
     - Message for card (if any)
     - Budget range
   - Admin notes inquiry in personal notebook/spreadsheet

3. **Quote Generation** (Manual calculation)
   - Admin calculates:
     - Base product price (based on size/complexity)
     - Delivery fee (based on distance)
     - Any add-ons (card, chocolates, etc.)
   - Admin sends quote via WhatsApp with breakdown
   - Admin sends reference photos if available

4. **Order Confirmation**
   - Customer agrees to quote
   - Admin sends payment details:
     - Bank account number (BCA/Mandiri)
     - Amount to transfer
     - Payment deadline (usually 2 hours)
   - Admin notes "Awaiting Payment" in tracking

5. **Payment Verification**
   - Customer sends payment proof screenshot
   - Admin checks bank account
   - Admin confirms payment received
   - Admin updates tracking to "Paid - To Fulfill"

6. **Fulfillment Coordination**
   - Admin coordinates with florist (self or partner):
     - Shares order details
     - Confirms delivery time
   - Florist prepares arrangement
   - Florist sends photo to admin
   - Admin forwards photo to customer

7. **Delivery**
   - Florist delivers to address
   - Florist sends delivery proof photo
   - Admin forwards to customer
   - Admin updates tracking to "Delivered"

8. **Follow-up**
   - Admin asks for feedback via WhatsApp
   - Admin notes feedback in tracking
   - Admin thanks customer

**Pain Points**:
- High manual effort (10-15 minutes per order)
- No centralized tracking (easy to lose track)
- Difficult to scale (1 admin can handle ~10 orders/day)
- No automated reminders
- Payment verification is manual and slow
- No order history for repeat customers

### 7.2 Phase 2: Structured Lead Management

**Improvement**: Web forms + Airtable/Sheets + WhatsApp Business API

#### Technology Setup

**Tools Required**:
- **Typeform** or **Google Forms**: Inquiry form
- **Airtable** or **Google Sheets**: Lead database
- **WhatsApp Business API**: Automated messaging
- **Midtrans**: Payment gateway
- **Zapier** or **Make**: Workflow automation

#### Workflow Steps

1. **Lead Capture** (Automated)
   - Customer fills inquiry form on website:
     - Name, phone, email
     - Occasion, product interest
     - Budget range
     - Delivery date, delivery address
     - Special requests
   - Form submission triggers:
     - New row in Airtable/Sheets
     - WhatsApp notification to admin
     - Auto-reply to customer: "Terima kasih! Kami akan merespons dalam 15 menit"

2. **Lead Qualification** (Manual, 5 minutes)
   - Admin opens Airtable/Sheets dashboard
   - Admin reviews lead details
   - Admin checks:
     - Is delivery date feasible?
     - Is location within service area?
     - Is budget realistic?
   - Admin updates lead status: "Qualified" or "Unqualified"

3. **Quote Generation** (Semi-automated, 5 minutes)
   - Admin uses pricing calculator (spreadsheet formula):
     ```
     Base Price = VLOOKUP(Product, PriceTable)
     Delivery Fee = IF(Distance < 5km, 0, 25000)
     Total = Base Price + Delivery Fee + Add-ons
     ```
   - Admin sends quote via WhatsApp (template message):
     ```
     Halo [Name]! 
     
     Terima kasih atas minat Anda pada [Product].
     
     Berikut rincian harga:
     - [Product]: Rp [Base Price]
     - Ongkir: Rp [Delivery Fee]
     - Total: Rp [Total]
     
     Untuk melanjutkan, silakan klik link pembayaran:
     [Midtrans Payment Link]
     
     Link berlaku 2 jam.
     ```
   - Admin updates lead status: "Quoted"

4. **Payment Processing** (Automated)
   - Customer clicks payment link
   - Customer selects payment method (bank transfer, e-wallet, QRIS)
   - Customer completes payment
   - Midtrans sends webhook to system
   - System updates Airtable/Sheets: Status = "Paid"
   - System sends WhatsApp confirmation:
     ```
     Pembayaran berhasil! 
     
     Order #[Order Number]
     Total: Rp [Amount]
     
     Pesanan Anda sedang diproses. Kami akan update status via WhatsApp.
     ```

5. **Order Assignment** (Manual, 2 minutes)
   - Admin sees "Paid" orders in dashboard
   - Admin assigns to florist partner:
     - Checks partner availability
     - Sends order details via WhatsApp
     - Updates Airtable: Partner = [Partner Name], Status = "Assigned"

6. **Fulfillment Tracking** (Semi-automated)
   - Partner receives order details via WhatsApp
   - Partner confirms acceptance
   - Admin updates status: "Preparing"
   - System sends customer update:
     ```
     Pesanan Anda sedang disiapkan oleh florist kami.
     Estimasi selesai: [Time]
     ```
   - Partner sends ready photo via WhatsApp
   - Admin uploads to Airtable, updates status: "Ready"
   - System sends photo to customer

7. **Delivery Tracking** (Manual)
   - Partner updates "Out for Delivery" via WhatsApp
   - Admin updates Airtable status
   - System sends customer update with estimated arrival
   - Partner sends delivery proof photo
   - Admin updates status: "Delivered"
   - System sends delivery confirmation to customer

8. **Review Collection** (Automated)
   - 2 hours after delivery, system sends WhatsApp:
     ```
     Terima kasih sudah memesan di Flowee!
     
     Bagaimana pengalaman Anda? Berikan rating:
     ⭐⭐⭐⭐⭐ (klik untuk rating)
     
     [Link to review form]
     ```
   - Customer submits review
   - Review saved to Airtable
   - Admin sees review in dashboard

#### Airtable Schema

**Leads Table**:
| Field | Type | Description |
|-------|------|-------------|
| ID | Auto-number | Unique lead ID |
| Created | Date | Submission timestamp |
| Name | Text | Customer name |
| Phone | Phone | Customer phone |
| Email | Email | Customer email |
| Occasion | Single Select | Graduation, Birthday, etc. |
| Product Interest | Single Select | Hand Bouquet, Papan Bunga, etc. |
| Budget | Number | Budget in Rupiah |
| Delivery Date | Date | Requested delivery date |
| Delivery Address | Long Text | Full address |
| Special Requests | Long Text | Customization notes |
| Status | Single Select | New, Qualified, Quoted, Paid, Assigned, Preparing, Ready, Delivered, Completed, Cancelled |
| Quoted Price | Number | Final quoted price |
| Payment Link | URL | Midtrans payment URL |
| Assigned Partner | Link to Partners | Partner fulfilling order |
| Notes | Long Text | Admin notes |

**Partners Table**:
| Field | Type | Description |
|-------|------|-------------|
| ID | Auto-number | Unique partner ID |
| Business Name | Text | Partner business name |
| Contact Person | Text | Owner name |
| Phone | Phone | Partner phone |
| Service Areas | Multiple Select | Districts served |
| Status | Single Select | Active, Inactive, Suspended |
| Total Orders | Rollup | Count of orders |
| Average Rating | Rollup | Avg customer rating |

**Orders View** (Filtered view of Leads where Status >= Paid):
- Shows only paid orders
- Grouped by Status
- Sorted by Delivery Date

#### Automation Rules (Zapier/Make)

1. **New Lead → WhatsApp Notification**
   - Trigger: New row in Airtable
   - Action: Send WhatsApp to admin

2. **Payment Confirmed → Update Status**
   - Trigger: Midtrans webhook
   - Action: Update Airtable status to "Paid"
   - Action: Send WhatsApp confirmation to customer

3. **Status Change → Customer Notification**
   - Trigger: Status field updated
   - Action: Send WhatsApp with status-specific message

4. **Delivery Completed → Review Request**
   - Trigger: Status = "Delivered" + 2 hours delay
   - Action: Send WhatsApp with review link

**Benefits Over Phase 1**:
- Structured data (easy to analyze)
- Automated notifications (less manual work)
- Payment gateway (faster confirmation)
- Centralized tracking (no lost orders)
- Scalable to 50-100 orders/week with 2-3 admins

**Limitations**:
- Still requires manual quote generation
- Manual partner assignment
- No real-time customer tracking
- Limited reporting capabilities

---

## 8. Quote and Pricing Workflow

### 8.1 Pricing Model Evolution

#### Phase 1-2: Manual Pricing

**Pricing Components**:
1. **Base Product Price**: Fixed price per product category
2. **Size Adjustment**: Small (-20%), Medium (base), Large (+30%)
3. **Delivery Fee**: Distance-based
4. **Add-ons**: Optional extras

**Pricing Table** (Example):

| Product Category | Small | Medium | Large |
|------------------|-------|--------|-------|
| Hand Bouquet | Rp 250k | Rp 350k | Rp 500k |
| Papan Bunga | Rp 400k | Rp 500k | Rp 700k |
| Standing Flower | Rp 500k | Rp 650k | Rp 900k |
| Table Arrangement | Rp 300k | Rp 450k | Rp 600k |

**Delivery Fee**:
- 0-5 km: Free
- 5-10 km: Rp 25,000
- 10-15 km: Rp 50,000
- 15-20 km: Rp 75,000
- > 20 km: Rp 100,000 or quote

**Add-ons**:
- Greeting card: Rp 10,000
- Chocolates: Rp 50,000
- Teddy bear: Rp 75,000

**Manual Calculation Process**:
1. Admin identifies product category and size
2. Admin looks up base price in table
3. Admin calculates delivery distance (Google Maps)
4. Admin looks up delivery fee
5. Admin adds any requested add-ons
6. Admin applies discount if applicable (promo code, bulk order)
7. Admin sends quote to customer

**Limitations**:
- Time-consuming (3-5 minutes per quote)
- Prone to human error
- Inconsistent pricing (different admins may quote differently)
- No dynamic pricing based on demand

#### Phase 3: Automated Pricing Engine

**Pricing Algorithm**:

```typescript
interface PricingInput {
  product_id: string;
  size: "small" | "medium" | "large";
  delivery_address: Address;
  delivery_date: Date;
  add_ons: string[];
  promo_code?: string;
}

interface PricingOutput {
  base_price: number;
  size_adjustment: number;
  delivery_fee: number;
  add_ons_total: number;
  discount: number;
  subtotal: number;
  tax: number;
  total: number;
  breakdown: PriceBreakdown[];
}

async function calculatePrice(input: PricingInput): Promise<PricingOutput> {
  // 1. Get base product price
  const product = await getProduct(input.product_id);
  let basePrice = product.base_price;
  
  // 2. Apply size adjustment
  const sizeMultiplier = {
    small: 0.8,
    medium: 1.0,
    large: 1.3
  };
  const sizeAdjustment = basePrice * (sizeMultiplier[input.size] - 1);
  basePrice = basePrice * sizeMultiplier[input.size];
  
  // 3. Calculate delivery fee
  const deliveryFee = await calculateDeliveryFee(
    product.location,
    input.delivery_address
  );
  
  // 4. Calculate add-ons
  const addOnsTotal = await calculateAddOns(input.add_ons);
  
  // 5. Calculate subtotal
  const subtotal = basePrice + deliveryFee + addOnsTotal;
  
  // 6. Apply discount
  const discount = await applyDiscount(subtotal, input.promo_code);
  
  // 7. Calculate tax (if applicable)
  const tax = 0; // Indonesia: no VAT on flowers
  
  // 8. Calculate total
  const total = subtotal - discount + tax;
  
  return {
    base_price: product.base_price,
    size_adjustment: sizeAdjustment,
    delivery_fee: deliveryFee,
    add_ons_total: addOnsTotal,
    discount: discount,
    subtotal: subtotal,
    tax: tax,
    total: total,
    breakdown: [
      { label: "Base Price", amount: product.base_price },
      { label: `Size (${input.size})`, amount: sizeAdjustment },
      { label: "Delivery", amount: deliveryFee },
      { label: "Add-ons", amount: addOnsTotal },
      { label: "Discount", amount: -discount },
      { label: "Total", amount: total, is_total: true }
    ]
  };
}

async function calculateDeliveryFee(
  origin: Address,
  destination: Address
): Promise<number> {
  // Use Google Maps Distance Matrix API
  const distance = await getDistance(origin, destination);
  
  if (distance <= 5) return 0;
  if (distance <= 10) return 25000;
  if (distance <= 15) return 50000;
  if (distance <= 20) return 75000;
  return 100000;
}
```

**Dynamic Pricing Factors** (Phase 4):

```typescript
function applyDynamicPricing(basePrice: number, factors: DynamicFactors): number {
  let finalPrice = basePrice;
  
  // 1. Demand surge (Valentine's Day, Mother's Day)
  if (factors.is_peak_season) {
    finalPrice *= 1.2; // 20% surge
  }
  
  // 2. Time urgency (same-day delivery)
  if (factors.is_same_day) {
    finalPrice *= 1.15; // 15% urgency fee
  }
  
  // 3. Partner availability (low supply)
  if (factors.available_partners < 3) {
    finalPrice *= 1.1; // 10% scarcity premium
  }
  
  // 4. Customer loyalty (repeat customer)
  if (factors.customer_tier === "gold") {
    finalPrice *= 0.95; // 5% loyalty discount
  }
  
  return Math.round(finalPrice);
}
```

### 8.2 Quote Approval Workflow

#### Phase 2: Manual Quote Approval

```
Customer                    Admin
   │                          │
   │ 1. Submit inquiry        │
   ├─────────────────────────>│
   │                          │ 2. Calculate quote
   │                          │ 3. Send quote
   │<─────────────────────────┤
   │ 4. Review quote          │
   │                          │
   │ 5a. Accept quote         │
   ├─────────────────────────>│
   │                          │ 6. Send payment link
   │<─────────────────────────┤
   │                          │
   │ 5b. Request changes      │
   ├─────────────────────────>│
   │                          │ 7. Revise quote
   │<─────────────────────────┤
   │ 8. Accept revised quote  │
   ├─────────────────────────>│
```

**Quote Validity**: 2 hours (after which prices may change)

**Revision Limit**: Up to 3 revisions per inquiry

#### Phase 3: Instant Quote with Confirmation

```
Customer                    System
   │                          │
   │ 1. Select product        │
   │ 2. Choose size           │
   │ 3. Enter delivery info   │
   ├─────────────────────────>│
   │                          │ 4. Calculate price (instant)
   │<─────────────────────────┤
   │ 5. See price breakdown   │
   │                          │
   │ 6. Adjust options        │
   ├─────────────────────────>│
   │                          │ 7. Recalculate (instant)
   │<─────────────────────────┤
   │ 8. Satisfied with price  │
   │                          │
   │ 9. Proceed to payment    │
   ├─────────────────────────>│
```

**Benefits**:
- Instant pricing (no waiting)
- Transparent breakdown
- Customer can self-adjust
- No manual admin work

---

## 9. Payment and Confirmation Workflow

### 9.1 Payment Methods by Phase

#### Phase 1: Manual Bank Transfer

**Supported Methods**:
- Bank transfer (BCA, Mandiri)

**Workflow**:
1. Admin sends bank account details via WhatsApp
2. Customer transfers money
3. Customer sends screenshot proof
4. Admin checks bank account (manual)
5. Admin confirms payment via WhatsApp

**Pain Points**:
- Slow verification (10-30 minutes)
- Requires manual checking
- No automated confirmation
- Prone to errors (wrong amount, wrong account)

#### Phase 2: Payment Gateway Integration

**Supported Methods**:
- Bank transfer (BCA, Mandiri, BNI, BRI) - virtual account
- E-wallets (GoPay, OVO, ShopeePay, Dana)
- QRIS (universal QR code)

**Payment Gateway**: Midtrans or Xendit

**Workflow**:
1. System generates payment link
2. Customer clicks link, selects payment method
3. Customer completes payment
4. Payment gateway sends webhook to system
5. System auto-confirms order
6. System sends confirmation to customer

**Benefits**:
- Instant confirmation (< 1 minute)
- Multiple payment methods
- Automated reconciliation
- Reduced fraud risk

### 9.2 Payment Flow Diagram

```
Customer                    System                      Payment Gateway
   │                          │                              │
   │ 1. Complete checkout     │                              │
   ├─────────────────────────>│                              │
   │                          │ 2. Create payment            │
   │                          ├─────────────────────────────>│
   │                          │                              │ 3. Generate payment URL
   │                          │<─────────────────────────────┤
   │<─────────────────────────┤ 4. Return payment URL        │
   │ 5. Redirect to payment   │                              │
   ├──────────────────────────────────────────────────────────>│
   │                          │                              │ 6. Show payment options
   │ 7. Select method         │                              │
   │ 8. Complete payment      │                              │
   ├──────────────────────────────────────────────────────────>│
   │                          │                              │ 9. Process payment
   │                          │<─────────────────────────────┤ 10. Send webhook
   │                          │ 11. Update order status      │
   │                          │ 12. Send confirmation        │
   │<─────────────────────────┤     (WhatsApp + Email)       │
   │ 13. Receive confirmation │                              │
```

### 9.3 Payment Webhook Handling

```typescript
interface PaymentWebhook {
  order_id: string;
  transaction_id: string;
  status: "pending" | "success" | "failed" | "expired";
  payment_method: string;
  amount: number;
  paid_at?: Date;
}

async function handlePaymentWebhook(webhook: PaymentWebhook) {
  // 1. Verify webhook signature (security)
  if (!verifyWebhookSignature(webhook)) {
    throw new Error("Invalid webhook signature");
  }
  
  // 2. Find order
  const order = await getOrder(webhook.order_id);
  if (!order) {
    throw new Error("Order not found");
  }
  
  // 3. Check if already processed (idempotency)
  if (order.payment_status === "paid") {
    return; // Already processed
  }
  
  // 4. Update payment record
  await updatePayment(webhook.order_id, {
    transaction_id: webhook.transaction_id,
    status: webhook.status,
    paid_at: webhook.paid_at
  });
  
  // 5. Handle based on status
  switch (webhook.status) {
    case "success":
      await handlePaymentSuccess(order);
      break;
    case "failed":
      await handlePaymentFailed(order);
      break;
    case "expired":
      await handlePaymentExpired(order);
      break;
  }
}

async function handlePaymentSuccess(order: Order) {
  // 1. Update order status
  await updateOrderStatus(order.id, "confirmed");
  
  // 2. Send confirmation to customer
  await sendWhatsApp(order.customer.phone, {
    template: "payment_confirmed",
    params: {
      order_number: order.order_number,
      total: formatCurrency(order.total)
    }
  });
  
  // 3. Notify admin
  await sendAdminNotification({
    type: "new_order",
    order_id: order.id
  });
  
  // 4. Trigger order assignment (Phase 3+)
  await assignOrderToPartner(order.id);
}
```

### 9.4 Order Confirmation Message Templates

#### WhatsApp Confirmation (Indonesian)

```
✅ Pembayaran Berhasil!

Order #{{order_number}}
Total: Rp {{total}}

Detail Pesanan:
📦 {{product_name}}
📅 Pengiriman: {{delivery_date}}
📍 Alamat: {{delivery_address}}

Status pesanan Anda akan diupdate via WhatsApp.

Terima kasih telah memesan di Flowee! 🌸
```

#### Email Confirmation

**Subject**: Pesanan Anda Dikonfirmasi - Order #{{order_number}}

**Body**:
```html
<h2>Terima Kasih atas Pesanan Anda!</h2>

<p>Pembayaran Anda telah kami terima. Berikut detail pesanan:</p>

<table>
  <tr><td>Order Number:</td><td><strong>{{order_number}}</strong></td></tr>
  <tr><td>Produk:</td><td>{{product_name}}</td></tr>
  <tr><td>Tanggal Pengiriman:</td><td>{{delivery_date}}</td></tr>
  <tr><td>Alamat Pengiriman:</td><td>{{delivery_address}}</td></tr>
  <tr><td>Total Pembayaran:</td><td><strong>Rp {{total}}</strong></td></tr>
</table>

<p>Pesanan Anda sedang diproses. Kami akan mengirimkan update status via WhatsApp.</p>

<p>Jika ada pertanyaan, hubungi kami di WhatsApp: {{support_phone}}</p>

<p>Salam hangat,<br>Tim Flowee</p>
```

---

## 10. Delivery Coordination Workflow

### 10.1 Delivery Scheduling

#### Time Slot System

**Available Time Slots**:
| Slot ID | Time Range | Label | Capacity |
|---------|------------|-------|----------|
| MORNING | 09:00-12:00 | Pagi (9 AM - 12 PM) | 10 orders |
| AFTERNOON | 12:00-15:00 | Siang (12 PM - 3 PM) | 10 orders |
| EVENING | 15:00-18:00 | Sore (3 PM - 6 PM) | 10 orders |
| NIGHT | 18:00-21:00 | Malam (6 PM - 9 PM) | 5 orders |

**Slot Availability Logic**:
```typescript
async function getAvailableSlots(deliveryDate: Date, city: string): Promise<TimeSlot[]> {
  const slots = await getTimeSlots();
  const bookedOrders = await getOrdersByDate(deliveryDate, city);
  
  return slots.map(slot => {
    const ordersInSlot = bookedOrders.filter(order => 
      order.delivery_time_slot.id === slot.id
    ).length;
    
    return {
      ...slot,
      available: ordersInSlot < slot.capacity,
      remaining: slot.capacity - ordersInSlot
    };
  }).filter(slot => slot.available);
}
```

#### Same-Day Delivery Rules

**Cutoff Times**:
- Morning slot (9-12): Order by 7 AM
- Afternoon slot (12-3): Order by 10 AM
- Evening slot (3-6): Order by 1 PM
- Night slot (6-9): Order by 4 PM

**Same-Day Surcharge**: +15% of base price

**Validation**:
```typescript
function canDeliverSameDay(orderTime: Date, requestedSlot: TimeSlot): boolean {
  const cutoffTimes = {
    MORNING: 7,
    AFTERNOON: 10,
    EVENING: 13,
    NIGHT: 16
  };
  
  const cutoff = cutoffTimes[requestedSlot.id];
  const orderHour = orderTime.getHours();
  
  return orderHour < cutoff;
}
```

### 10.2 Delivery Tracking (Phase 3+)

#### Real-Time Tracking System

**Tracking States**:
1. **Preparing**: Florist is arranging flowers
2. **Ready for Pickup**: Arrangement complete, awaiting driver
3. **Picked Up**: Driver has collected arrangement
4. **In Transit**: Driver en route to customer
5. **Nearby**: Driver within 1 km of destination
6. **Delivered**: Arrangement delivered to customer

**Tracking Page UI**:
```
┌─────────────────────────────────────┐
│  Order #FLW-20240115-001            │
│  Status: In Transit 🚚              │
├─────────────────────────────────────┤
│                                     │
│  [Map showing driver location]      │
│                                     │
│  📍 Estimated arrival: 2:30 PM      │
│     (15 minutes)                    │
│                                     │
├─────────────────────────────────────┤
│  Timeline:                          │
│  ✅ Order Confirmed - 10:00 AM      │
│  ✅ Preparing - 10:15 AM            │
│  ✅ Ready - 1:45 PM                 │
│  ✅ Picked Up - 2:00 PM             │
│  🔵 In Transit - 2:15 PM            │
│  ⚪ Delivered - Pending             │
├─────────────────────────────────────┤
│  Delivery Details:                  │
│  📦 Hand Bouquet Romantis           │
│  📅 Today, 2:00 PM - 3:00 PM        │
│  📍 Jl. Sudirman No. 123, Jakarta   │
│                                     │
│  [Contact Driver] [Need Help?]      │
└─────────────────────────────────────┘
```

#### Driver Location Updates

**Technology Options**:
- **Phase 3**: Manual updates by partner (status only)
- **Phase 4**: GPS tracking via mobile app

**Manual Update Flow** (Phase 3):
```typescript
// Partner updates status via dashboard
async function updateDeliveryStatus(
  orderId: string,
  status: DeliveryStatus,
  photo?: File
) {
  // 1. Update order status
  await updateOrder(orderId, { status });
  
  // 2. Upload photo if provided
  let photoUrl;
  if (photo) {
    photoUrl = await uploadToS3(photo);
    await updateOrder(orderId, { proof_photo: photoUrl });
  }
  
  // 3. Send customer notification
  await sendCustomerUpdate(orderId, status, photoUrl);
  
  // 4. Log event
  await createOrderEvent(orderId, {
    status,
    actor: "partner",
    timestamp: new Date()
  });
}
```

**GPS Tracking Flow** (Phase 4):
```typescript
// Mobile app sends location updates
async function updateDriverLocation(
  orderId: string,
  location: { lat: number; lng: number }
) {
  // 1. Store location in Redis (temporary)
  await redis.setex(
    `driver:location:${orderId}`,
    300, // 5 minutes TTL
    JSON.stringify(location)
  );
  
  // 2. Calculate ETA
  const order = await getOrder(orderId);
  const eta = await calculateETA(location, order.delivery_address);
  
  // 3. Check if nearby (< 1 km)
  const distance = calculateDistance(location, order.delivery_address);
  if (distance < 1 && order.status !== "nearby") {
    await updateOrder(orderId, { status: "nearby" });
    await sendCustomerNotification(orderId, "Driver is nearby!");
  }
  
  // 4. Broadcast to customer (WebSocket)
  await broadcastLocationUpdate(orderId, { location, eta });
}
```

### 10.3 Delivery Proof & Confirmation

#### Photo Proof Requirements

**Required Photos**:
1. **Arrangement Ready**: Photo of completed arrangement before delivery
2. **Delivery Proof**: Photo of arrangement at delivery location (with recipient if possible)

**Photo Validation**:
```typescript
async function validateDeliveryPhoto(photo: File): Promise<boolean> {
  // 1. Check file size (max 5 MB)
  if (photo.size > 5 * 1024 * 1024) {
    throw new Error("Photo too large");
  }
  
  // 2. Check file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(photo.type)) {
    throw new Error("Invalid file type");
  }
  
  // 3. Check image dimensions (min 800x600)
  const dimensions = await getImageDimensions(photo);
  if (dimensions.width < 800 || dimensions.height < 600) {
    throw new Error("Photo resolution too low");
  }
  
  return true;
}
```

#### Customer Confirmation Flow

**Automatic Confirmation**:
- If customer doesn't respond within 24 hours, order auto-confirms
- Prevents indefinite pending state

**Manual Confirmation**:
```
Customer receives WhatsApp:

"Pesanan Anda telah diterima oleh {{recipient_name}}.

[Photo of delivery]

Apakah pesanan sudah sesuai?
✅ Ya, sesuai
❌ Ada masalah

Jika tidak ada respons dalam 24 jam, pesanan otomatis dikonfirmasi."
```

**Confirmation Actions**:
```typescript
async function handleCustomerConfirmation(
  orderId: string,
  confirmed: boolean,
  issue?: string
) {
  if (confirmed) {
    // Happy path
    await updateOrder(orderId, { 
      status: "completed",
      completed_at: new Date()
    });
    
    // Request review
    await sendReviewRequest(orderId);
    
    // Trigger partner payout
    await processPayout(orderId);
    
  } else {
    // Issue reported
    await createSupportTicket({
      order_id: orderId,
      type: "delivery_issue",
      description: issue,
      status: "open"
    });
    
    // Notify admin
    await sendAdminAlert({
      type: "delivery_issue",
      order_id: orderId,
      issue: issue
    });
    
    // Hold payout until resolved
    await holdPayout(orderId);
  }
}
```

### 10.4 Delivery Failure Scenarios

#### Scenario 1: Customer Not Home

**Partner Actions**:
1. Call customer (via app or phone)
2. Wait 10 minutes
3. If no response, update status: "Delivery Failed - Customer Not Home"
4. Upload photo proof of attempt

**System Actions**:
1. Send WhatsApp to customer: "Driver mencoba mengirim pesanan Anda tapi tidak ada yang menerima. Silakan hubungi driver: {{driver_phone}}"
2. Offer options:
   - Reschedule delivery (same day if before 6 PM)
   - Change delivery address
   - Pick up from partner location
3. If no response in 2 hours, partner returns arrangement to shop
4. Customer charged storage fee after 24 hours (Rp 25,000/day)

#### Scenario 2: Wrong Address

**Partner Actions**:
1. Contact customer to verify address
2. If address is far from original (> 5 km), request additional delivery fee
3. Update delivery address in system

**System Actions**:
1. Calculate additional delivery fee
2. Send payment link for additional fee
3. Once paid, update delivery address and resume delivery

#### Scenario 3: Damaged During Delivery

**Partner Actions**:
1. Take photo of damage
2. Contact admin immediately
3. Offer to return and remake (if time permits)

**System Actions**:
1. Create incident report
2. Admin reviews photos
3. Decision:
   - Minor damage: Partial refund (20-30%)
   - Major damage: Full refund + remake or full refund
4. Partner penalized (quality score reduced)

---

## 11. Order Routing Logic

### 11.1 Partner Assignment Algorithm (Phase 3)

**Assignment Criteria** (in priority order):
1. **Availability**: Partner is active and available
2. **Service Area**: Partner serves the delivery location
3. **Capacity**: Partner has capacity for the delivery date/time
4. **Performance Score**: Partner has good performance metrics
5. **Proximity**: Partner is closest to delivery location
6. **Workload Balance**: Distribute orders evenly

**Algorithm**:
```typescript
interface AssignmentCriteria {
  delivery_address: Address;
  delivery_date: Date;
  delivery_time_slot: TimeSlot;
  product_category: string;
}

async function assignOrderToPartner(
  orderId: string,
  criteria: AssignmentCriteria
): Promise<Partner | null> {
  // 1. Get all active partners
  const partners = await getActivePartners();
  
  // 2. Filter by service area
  const eligiblePartners = partners.filter(partner =>
    servesArea(partner, criteria.delivery_address)
  );
  
  if (eligiblePartners.length === 0) {
    return null; // No partners available
  }
  
  // 3. Filter by capacity
  const availablePartners = await Promise.all(
    eligiblePartners.map(async partner => {
      const capacity = await getPartnerCapacity(
        partner.id,
        criteria.delivery_date,
        criteria.delivery_time_slot
      );
      return capacity.available ? partner : null;
    })
  ).then(results => results.filter(p => p !== null));
  
  if (availablePartners.length === 0) {
    return null; // No capacity
  }
  
  // 4. Score each partner
  const scoredPartners = await Promise.all(
    availablePartners.map(async partner => {
      const score = await calculateAssignmentScore(partner, criteria);
      return { partner, score };
    })
  );
  
  // 5. Sort by score (highest first)
  scoredPartners.sort((a, b) => b.score - a.score);
  
  // 6. Assign to top partner
  const selectedPartner = scoredPartners[0].partner;
  
  await updateOrder(orderId, {
    partner_id: selectedPartner.id,
    status: "assigned"
  });
  
  await notifyPartner(selectedPartner.id, orderId);
  
  return selectedPartner;
}

async function calculateAssignmentScore(
  partner: Partner,
  criteria: AssignmentCriteria
): Promise<number> {
  let score = 0;
  
  // 1. Performance score (0-40 points)
  score += partner.metrics.average_rating * 8; // 5.0 rating = 40 points
  
  // 2. Acceptance rate (0-20 points)
  score += partner.metrics.acceptance_rate * 0.2; // 100% = 20 points
  
  // 3. On-time rate (0-20 points)
  score += partner.metrics.on_time_rate * 0.2; // 100% = 20 points
  
  // 4. Proximity (0-15 points)
  const distance = await calculateDistance(
    partner.address,
    criteria.delivery_address
  );
  const proximityScore = Math.max(0, 15 - distance); // Closer = higher score
  score += proximityScore;
  
  // 5. Workload balance (0-5 points)
  const currentLoad = await getPartnerCurrentLoad(
    partner.id,
    criteria.delivery_date
  );
  const loadScore = Math.max(0, 5 - currentLoad); // Less load = higher score
  score += loadScore;
  
  return score;
}

function servesArea(partner: Partner, address: Address): boolean {
  return partner.service_areas.some(area =>
    area.city === address.city &&
    area.districts.includes(address.district)
  );
}
```

### 11.2 Fallback & Escalation

**Fallback Strategy**:
```typescript
async function assignWithFallback(orderId: string): Promise<void> {
  const order = await getOrder(orderId);
  
  // Attempt 1: Automatic assignment
  let partner = await assignOrderToPartner(orderId, {
    delivery_address: order.delivery_address,
    delivery_date: order.delivery_date,
    delivery_time_slot: order.delivery_time_slot,
    product_category: order.product.category
  });
  
  if (partner) {
    // Wait for partner acceptance (15 minutes)
    await waitForAcceptance(orderId, 15 * 60 * 1000);
    
    const updatedOrder = await getOrder(orderId);
    if (updatedOrder.status === "preparing") {
      return; // Success!
    }
  }
  
  // Attempt 2: Expand search radius
  partner = await assignOrderToPartner(orderId, {
    ...order,
    expanded_radius: true // Search up to 20 km
  });
  
  if (partner) {
    await waitForAcceptance(orderId, 15 * 60 * 1000);
    
    const updatedOrder = await getOrder(orderId);
    if (updatedOrder.status === "preparing") {
      return; // Success!
    }
  }
  
  // Attempt 3: Admin escalation
  await escalateToAdmin(orderId, "No partner available or accepted");
}
```

**Admin Escalation Dashboard**:
```
┌─────────────────────────────────────────────────┐
│  ⚠️  Unassigned Orders (Requires Attention)     │
├─────────────────────────────────────────────────┤
│  Order #FLW-001                                 │
│  Customer: John Doe                             │
│  Delivery: Today, 2-3 PM                        │
│  Location: Jakarta Selatan                      │
│  Issue: No partner accepted (2 attempts)        │
│  [Manually Assign] [Contact Customer] [Refund]  │
├─────────────────────────────────────────────────┤
│  Order #FLW-002                                 │
│  Customer: Jane Smith                           │
│  Delivery: Tomorrow, 9-12 AM                    │
│  Location: Tangerang                            │
│  Issue: No partner in service area              │
│  [Manually Assign] [Contact Customer] [Refund]  │
└─────────────────────────────────────────────────┘
```

### 11.3 Multi-Partner Routing (Phase 4)

**Batch Delivery Optimization**:

When a partner has multiple orders for the same time slot, optimize delivery route:

```typescript
async function optimizeDeliveryRoute(
  partnerId: string,
  deliveryDate: Date,
  timeSlot: TimeSlot
): Promise<Order[]> {
  // 1. Get all orders for partner in time slot
  const orders = await getPartnerOrders(partnerId, deliveryDate, timeSlot);
  
  if (orders.length <= 1) {
    return orders; // No optimization needed
  }
  
  // 2. Get partner location (starting point)
  const partner = await getPartner(partnerId);
  const startLocation = partner.address;
  
  // 3. Extract delivery locations
  const locations = orders.map(order => ({
    order_id: order.id,
    location: order.delivery_address
  }));
  
  // 4. Use Google Maps Directions API to optimize route
  const optimizedRoute = await optimizeRoute(startLocation, locations);
  
  // 5. Reorder orders based on optimized route
  const orderedOrders = optimizedRoute.map(stop =>
    orders.find(order => order.id === stop.order_id)
  );
  
  // 6. Update order sequence
  await Promise.all(
    orderedOrders.map((order, index) =>
      updateOrder(order.id, { delivery_sequence: index + 1 })
    )
  );
  
  return orderedOrders;
}
```

---

## 12. Catalog and Availability Management

### 12.1 Product Catalog Structure

**Product Hierarchy**:
```
Category (e.g., Hand Bouquet)
  └─ Product (e.g., "Romantic Rose Bouquet")
      └─ Variants (e.g., Small, Medium, Large)
          └─ Customization Options (e.g., Red, Pink, White)
```

**Product Data Model** (Expanded):
```typescript
interface Product {
  // Basic info
  id: string;
  name: string;
  slug: string;
  description: string;
  
  // Categorization
  category: ProductCategory;
  occasions: Occasion[];
  tags: string[]; // "romantic", "elegant", "tropical", etc.
  
  // Pricing
  base_price: number;
  variants: ProductVariant[];
  
  // Media
  images: ProductImage[];
  video_url?: string;
  
  // Availability
  is_active: boolean;
  available_cities: string[];
  lead_time_hours: number;
  
  // Customization
  customization_options: CustomizationOption[];
  allows_custom_message: boolean;
  allows_add_ons: boolean;
  
  // SEO
  meta_title: string;
  meta_description: string;
  
  // Metadata
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

interface ProductVariant {
  id: string;
  name: string; // "Small", "Medium", "Large"
  price_adjustment: number; // -50000, 0, +100000
  dimensions?: {
    height_cm: number;
    width_cm: number;
  };
  is_available: boolean;
}

interface ProductImage {
  id: string;
  url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

interface CustomizationOption {
  id: string;
  name: string; // "Flower Color", "Wrapping Style"
  type: "single_select" | "multi_select" | "text_input";
  is_required: boolean;
  options: CustomizationChoice[];
}

interface CustomizationChoice {
  id: string;
  label: string; // "Red Roses", "Pink Roses"
  price_adjustment: number;
  image_url?: string;
  is_available: boolean;
}
```

### 12.2 Inventory Management

#### Phase 1-2: No Inventory Tracking

- Products are always "available"
- Admin manually checks with florist before confirming order
- Risk: Accepting orders that can't be fulfilled

#### Phase 3: Simple Availability Flags

**Product-Level Availability**:
```typescript
interface ProductAvailability {
  product_id: string;
  is_available: boolean;
  unavailable_reason?: string; // "Out of season", "Supplier issue"
  available_from?: Date; // When it will be available again
}

// Admin can toggle availability
async function toggleProductAvailability(
  productId: string,
  isAvailable: boolean,
  reason?: string
) {
  await updateProduct(productId, {
    is_available: isAvailable,
    unavailable_reason: reason
  });
  
  // If making unavailable, notify customers with pending carts
  if (!isAvailable) {
    await notifyCustomersWithProductInCart(productId);
  }
}
```

**City-Level Availability**:
```typescript
// Product available in some cities but not others
interface CityAvailability {
  product_id: string;
  city: string;
  is_available: boolean;
  partner_count: number; // How many partners can fulfill this
}

// Check if product available for delivery location
async function isProductAvailable(
  productId: string,
  deliveryCity: string
): Promise<boolean> {
  const product = await getProduct(productId);
  
  if (!product.is_active) {
    return false;
  }
  
  if (!product.available_cities.includes(deliveryCity)) {
    return false;
  }
  
  // Check if any partner in city can fulfill
  const partners = await getPartnersInCity(deliveryCity);
  const capablePartners = partners.filter(partner =>
    partner.capabilities.includes(product.category)
  );
  
  return capablePartners.length > 0;
}
```

#### Phase 4: Real-Time Inventory Tracking

**Partner Inventory System**:
```typescript
interface PartnerInventory {
  partner_id: string;
  flower_type: string; // "Red Roses", "White Lilies"
  quantity: number;
  unit: "stems" | "bunches";
  last_updated: Date;
}

// Partners update their inventory
async function updatePartnerInventory(
  partnerId: string,
  inventory: PartnerInventory[]
) {
  await savePartnerInventory(partnerId, inventory);
  
  // Recalculate product availability
  await recalculateProductAvailability();
}

// System calculates if order can be fulfilled
async function canFulfillOrder(
  orderId: string
): Promise<{ canFulfill: boolean; partnerId?: string }> {
  const order = await getOrder(orderId);
  const requiredFlowers = await getRequiredFlowers(order.product_id);
  
  // Find partners with sufficient inventory
  const partners = await getPartnersInCity(order.delivery_address.city);
  
  for (const partner of partners) {
    const inventory = await getPartnerInventory(partner.id);
    const hasSufficient = requiredFlowers.every(required =>
      inventory.some(item =>
        item.flower_type === required.type &&
        item.quantity >= required.quantity
      )
    );
    
    if (hasSufficient) {
      return { canFulfill: true, partnerId: partner.id };
    }
  }
  
  return { canFulfill: false };
}
```

### 12.3 Seasonal & Dynamic Catalog

**Seasonal Products**:
```typescript
interface SeasonalProduct extends Product {
  season: {
    start_date: Date; // e.g., Feb 1 (Valentine's)
    end_date: Date;   // e.g., Feb 15
    is_recurring: boolean; // Repeat every year
  };
}

// Automatically activate/deactivate seasonal products
async function updateSeasonalProducts() {
  const today = new Date();
  const seasonalProducts = await getSeasonalProducts();
  
  for (const product of seasonalProducts) {
    const isInSeason = isDateInRange(
      today,
      product.season.start_date,
      product.season.end_date
    );
    
    if (isInSeason && !product.is_active) {
      await activateProduct(product.id);
      await sendMarketingCampaign(product.id);
    } else if (!isInSeason && product.is_active) {
      await deactivateProduct(product.id);
    }
  }
}
```

**Dynamic Pricing for Peak Seasons**:
```typescript
interface PricingRule {
  id: string;
  name: string; // "Valentine's Day Surge"
  start_date: Date;
  end_date: Date;
  price_multiplier: number; // 1.2 = 20% increase
  applies_to: {
    categories?: ProductCategory[];
    products?: string[];
    occasions?: Occasion[];
  };
}

async function getProductPrice(
  productId: string,
  date: Date
): Promise<number> {
  const product = await getProduct(productId);
  let price = product.base_price;
  
  // Check for active pricing rules
  const rules = await getActivePricingRules(date);
  
  for (const rule of rules) {
    if (ruleApplies(rule, product)) {
      price *= rule.price_multiplier;
    }
  }
  
  return Math.round(price);
}
```

### 12.4 Content Management System (CMS)

#### Admin CMS Features

**Product Management**:
- Create/edit/delete products
- Upload and manage product images
- Set pricing and variants
- Configure customization options
- Set availability by city
- Schedule seasonal products

**Category Management**:
- Create product categories
- Set category images and descriptions
- Reorder categories for display

**Promotion Management**:
- Create discount codes
- Set promotion periods
- Configure discount rules (percentage, fixed amount, free delivery)
- Track promotion usage

**Content Pages**:
- Edit homepage content
- Manage FAQ
- Update about us, terms, privacy policy

#### CMS UI (Phase 3+)

```
┌─────────────────────────────────────────────────┐
│  Product Management                             │
├─────────────────────────────────────────────────┤
│  [+ Add New Product]                            │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ 🌹 Romantic Rose Bouquet                │   │
│  │ Category: Hand Bouquet                  │   │
│  │ Base Price: Rp 350,000                  │   │
│  │ Status: ✅ Active                        │   │
│  │ Cities: Jakarta, Bandung, Surabaya      │   │
│  │ [Edit] [Duplicate] [Deactivate]         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ 🎓 Graduation Bouquet Tropical          │   │
│  │ Category: Hand Bouquet                  │   │
│  │ Base Price: Rp 250,000                  │   │
│  │ Status: ✅ Active                        │   │
│  │ Cities: Jakarta, Bali                   │   │
│  │ [Edit] [Duplicate] [Deactivate]         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**Product Edit Form**:
```
┌─────────────────────────────────────────────────┐
│  Edit Product: Romantic Rose Bouquet            │
├─────────────────────────────────────────────────┤
│  Basic Information                              │
│  Name: [Romantic Rose Bouquet            ]      │
│  Slug: [romantic-rose-bouquet            ]      │
│  Category: [Hand Bouquet ▼]                     │
│  Occasions: [☑ Romantic ☑ Anniversary ☐ Birthday]│
│                                                 │
│  Description:                                   │
│  [Rich text editor with formatting]             │
│                                                 │
│  Pricing                                        │
│  Base Price: [350000]                           │
│  Variants:                                      │
│    ☑ Small (-Rp 100,000)                        │
│    ☑ Medium (Base price)                        │
│    ☑ Large (+Rp 150,000)                        │
│                                                 │
│  Images                                         │
│  [Upload Images] [Drag to reorder]              │
│  [Image 1] [Image 2] [Image 3]                  │
│                                                 │
│  Availability                                   │
│  Status: [Active ▼]                             │
│  Available Cities:                              │
│    ☑ Jakarta  ☑ Bandung  ☑ Surabaya             │
│    ☐ Bali     ☐ Yogyakarta                      │
│  Lead Time: [4] hours                           │
│                                                 │
│  Customization Options                          │
│  [+ Add Option]                                 │
│  - Flower Color (Single Select, Required)       │
│    • Red Roses (+Rp 0)                          │
│    • Pink Roses (+Rp 0)                         │
│    • White Roses (+Rp 0)                        │
│  - Wrapping Style (Single Select, Optional)     │
│    • Classic (+Rp 0)                            │
│    • Premium (+Rp 25,000)                       │
│                                                 │
│  [Save] [Save & Continue] [Cancel]              │
└─────────────────────────────────────────────────┘
```

---

## 13. Admin Operations Design

### 13.1 Admin Dashboard Overview

**Dashboard Sections**:

1. **Today's Overview** (Top metrics)
2. **Order Pipeline** (Status breakdown)
3. **Alerts & Actions Required** (Urgent items)
4. **Performance Metrics** (Charts and trends)
5. **Quick Actions** (Common tasks)

#### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Flowee Admin Dashboard                    👤 Admin  [Logout]   │
├─────────────────────────────────────────────────────────────────┤
│  📅 Today: Monday, January 15, 2024                             │
├─────────────────────────────────────────────────────────────────┤
│  TODAY'S OVERVIEW                                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐│
│  │ 📦 Orders    │ │ 💰 Revenue   │ │ ⭐ Avg Rating│ │ 🚚 OTD  ││
│  │    24        │ │  Rp 8.4M     │ │    4.8/5.0   │ │   96%   ││
│  │  +20% vs ytd │ │  +15% vs ytd │ │  +0.2 vs ytd │ │  +2%    ││
│  └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ⚠️  ALERTS & ACTIONS REQUIRED (3)                              │
│  • 2 orders awaiting partner assignment                         │
│  • 1 customer complaint pending review                          │
│  • 5 partners pending verification                              │
│  [View All Alerts]                                              │
├─────────────────────────────────────────────────────────────────┤
│  ORDER PIPELINE                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Pending (3) → Confirmed (5) → Assigned (8) →            │   │
│  │ Preparing (6) → Ready (2) → Out for Delivery (4) →      │   │
│  │ Delivered (12) → Completed (18)                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│  [View Orders]                                                  │
├─────────────────────────────────────────────────────────────────┤
│  PERFORMANCE TRENDS (Last 7 Days)                               │
│  [Chart: Orders per day]                                        │
│  [Chart: Revenue per day]                                       │
│  [Chart: Partner performance]                                   │
├─────────────────────────────────────────────────────────────────┤
│  QUICK ACTIONS                                                  │
│  [+ Create Manual Order] [View Unassigned] [Partner List]      │
│  [Product Catalog] [Reports] [Settings]                        │
└─────────────────────────────────────────────────────────────────┘
```

### 13.2 Order Management Interface

#### Order List View

**Filters**:
- Status (dropdown)
- Date range (date picker)
- City (dropdown)
- Partner (dropdown)
- Search (order number, customer name, phone)

**Columns**:
| Order # | Customer | Product | Delivery Date | Status | Partner | Total | Actions |
|---------|----------|---------|---------------|--------|---------|-------|---------|
| FLW-001 | John Doe | Hand Bouquet | Jan 15, 2PM | Preparing | Florist A | Rp 350k | [View] [Edit] |
| FLW-002 | Jane Smith | Papan Bunga | Jan 15, 5PM | Assigned | Florist B | Rp 500k | [View] [Edit] |

**Bulk Actions**:
- Export to CSV
- Send status update (bulk)
- Reassign partner (bulk)

#### Order Detail View

```
┌─────────────────────────────────────────────────────────────────┐
│  Order #FLW-20240115-001                                        │
│  Status: Preparing 🔄                    [Change Status ▼]      │
├─────────────────────────────────────────────────────────────────┤
│  CUSTOMER INFORMATION                                           │
│  Name: John Doe                                                 │
│  Phone: +62 812-3456-7890                                       │
│  Email: john@example.com                                        │
│  [Contact via WhatsApp] [Send Email]                            │
├─────────────────────────────────────────────────────────────────┤
│  ORDER DETAILS                                                  │
│  Product: Romantic Rose Bouquet (Medium)                        │
│  Customization:                                                 │
│    - Color: Red Roses                                           │
│    - Wrapping: Premium                                          │
│    - Message Card: "Happy Anniversary, Love!"                   │
│  Add-ons: Chocolates (Rp 50,000)                                │
│                                                                 │
│  Subtotal: Rp 350,000                                           │
│  Delivery Fee: Rp 25,000                                        │
│  Add-ons: Rp 50,000                                             │
│  Total: Rp 425,000                                              │
├─────────────────────────────────────────────────────────────────┤
│  DELIVERY INFORMATION                                           │
│  Date: January 15, 2024                                         │
│  Time Slot: 2:00 PM - 3:00 PM                                   │
│  Address: Jl. Sudirman No. 123, Jakarta Selatan                 │
│  Recipient: Jane Doe (Wife)                                     │
│  Phone: +62 812-9876-5432                                       │
│  Notes: Please call before delivery                             │
│  [View on Map]                                                  │
├─────────────────────────────────────────────────────────────────┤
│  PARTNER INFORMATION                                            │
│  Assigned to: Florist A (Jakarta Selatan)                       │
│  Phone: +62 821-1111-2222                                       │
│  Status: Accepted at 10:15 AM                                   │
│  [Contact Partner] [Reassign]                                   │
├─────────────────────────────────────────────────────────────────┤
│  PAYMENT INFORMATION                                            │
│  Method: GoPay                                                  │
│  Status: Paid ✅                                                 │
│  Transaction ID: TRX-123456789                                  │
│  Paid at: Jan 15, 2024 10:00 AM                                 │
│  [View Receipt]                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ORDER TIMELINE                                                 │
│  ✅ Jan 15, 09:45 AM - Order created                            │
│  ✅ Jan 15, 10:00 AM - Payment confirmed                        │
│  ✅ Jan 15, 10:05 AM - Assigned to Florist A                    │
│  ✅ Jan 15, 10:15 AM - Partner accepted                         │
│  🔵 Jan 15, 10:20 AM - Preparing (current)                      │
│  ⚪ Pending - Ready for delivery                                │
│  ⚪ Pending - Out for delivery                                  │
│  ⚪ Pending - Delivered                                         │
├─────────────────────────────────────────────────────────────────┤
│  PHOTOS                                                         │
│  [No photos yet]                                                │
├─────────────────────────────────────────────────────────────────┤
│  ADMIN NOTES                                                    │
│  [Add internal note...]                                         │
│                                                                 │
│  [Save] [Cancel Order] [Issue Refund]                           │
└─────────────────────────────────────────────────────────────────┘
```

### 13.3 Partner Management Interface

#### Partner List View

**Filters**:
- Status (Active, Pending, Suspended)
- City
- Performance tier (Platinum, Gold, Silver, Bronze)
- Search (business name, owner name)

**Columns**:
| Business Name | City | Status | Orders | Rating | On-Time % | Actions |
|---------------|------|--------|--------|--------|-----------|---------|
| Florist A | Jakarta | Active | 245 | 4.8 | 96% | [View] [Edit] |
| Florist B | Bandung | Active | 189 | 4.6 | 94% | [View] [Edit] |

#### Partner Detail View

```
┌─────────────────────────────────────────────────────────────────┐
│  Florist A                                                      │
│  Status: Active ✅                       [Change Status ▼]      │
│  Tier: Gold 🥇                                                  │
├─────────────────────────────────────────────────────────────────┤
│  BUSINESS INFORMATION                                           │
│  Business Name: Florist A                                       │
│  Owner: Ahmad Wijaya                                            │
│  Phone: +62 821-1111-2222                                       │
│  Email: florist.a@example.com                                   │
│  Address: Jl. Melawai No. 45, Jakarta Selatan                   │
│  [Contact via WhatsApp] [Send Email]                            │
├─────────────────────────────────────────────────────────────────┤
│  SERVICE AREAS                                                  │
│  City: Jakarta                                                  │
│  Districts: Jakarta Selatan, Jakarta Pusat, Tangerang Selatan   │
│  Delivery Radius: 15 km                                         │
│  [Edit Service Areas]                                           │
├─────────────────────────────────────────────────────────────────┤
│  PERFORMANCE METRICS                                            │
│  Total Orders: 245                                              │
│  Completed Orders: 238                                          │
│  Acceptance Rate: 92% (Target: >90%) ✅                         │
│  On-Time Delivery: 96% (Target: >95%) ✅                        │
│  Average Rating: 4.8/5.0 (Target: >4.5) ✅                      │
│  Response Time: 8 min (Target: <10 min) ✅                      │
│  Performance Score: 87/100 (Gold Tier)                          │
├─────────────────────────────────────────────────────────────────┤
│  FINANCIAL INFORMATION                                          │
│  Commission Rate: 18%                                           │
│  Total Earnings: Rp 45,600,000                                  │
│  Pending Payout: Rp 2,340,000                                   │
│  Next Payout: January 20, 2024                                  │
│  Bank: BCA - 1234567890 (Ahmad Wijaya)                          │
│  [View Payout History] [Process Payout]                         │
├─────────────────────────────────────────────────────────────────┤
│  AVAILABILITY                                                   │
│  Current Status: Available ✅                                   │
│  Capacity: 8/10 orders today                                    │
│  Working Hours:                                                 │
│    Mon-Fri: 8:00 AM - 8:00 PM                                   │
│    Sat-Sun: 9:00 AM - 6:00 PM                                   │
│  [Edit Availability]                                            │
├─────────────────────────────────────────────────────────────────┤
│  RECENT ORDERS                                                  │
│  [List of recent orders with this partner]                      │
│  [View All Orders]                                              │
├─────────────────────────────────────────────────────────────────┤
│  REVIEWS & FEEDBACK                                             │
│  [List of customer reviews]                                     │
│  [View All Reviews]                                             │
├─────────────────────────────────────────────────────────────────┤
│  QUALITY AUDITS                                                 │
│  Last Audit: December 15, 2023                                  │
│  Score: 4.5/5.0 (Pass)                                          │
│  Next Audit: March 15, 2024                                     │
│  [View Audit History] [Schedule Audit]                          │
├─────────────────────────────────────────────────────────────────┤
│  ADMIN NOTES                                                    │
│  [Add internal note...]                                         │
│                                                                 │
│  [Save] [Suspend Partner] [Deactivate]                          │
└─────────────────────────────────────────────────────────────────┘
```

### 13.4 Analytics & Reporting

#### Key Reports

**1. Daily Operations Report**
- Orders by status
- Revenue breakdown
- Partner performance
- Customer satisfaction
- Issues and resolutions

**2. Weekly Business Review**
- Week-over-week growth
- Top products
- Top partners
- Customer acquisition
- Conversion funnel

**3. Monthly Financial Report**
- Total revenue
- Cost breakdown (partner payouts, delivery, operations)
- Profit margin
- Outstanding payments
- Refunds and cancellations

**4. Partner Performance Report**
- Partner rankings
- Performance trends
- Quality issues
- Payout summary

**5. Customer Analytics**
- New vs returning customers
- Customer lifetime value
- Churn rate
- Popular products by segment

#### Analytics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Analytics Dashboard                                            │
│  Date Range: [Last 30 Days ▼]                                   │
├─────────────────────────────────────────────────────────────────┤
│  KEY METRICS                                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐│
│  │ GMV          │ │ Orders       │ │ AOV          │ │ Conv.   ││
│  │ Rp 125M      │ │    1,245     │ │  Rp 400k     │ │  12.5%  ││
│  │ +25% MoM     │ │  +18% MoM    │ │  +6% MoM     │ │  +2.1%  ││
│  └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ORDERS TREND                                                   │
│  [Line chart showing daily orders over time]                    │
├─────────────────────────────────────────────────────────────────┤
│  REVENUE BREAKDOWN                                              │
│  [Pie chart: By product category]                               │
│  [Bar chart: By city]                                           │
├─────────────────────────────────────────────────────────────────┤
│  TOP PRODUCTS (Last 30 Days)                                    │
│  1. Romantic Rose Bouquet - 245 orders (Rp 85.7M)               │
│  2. Graduation Bouquet - 189 orders (Rp 47.2M)                  │
│  3. Papan Bunga Selamat - 156 orders (Rp 78.0M)                 │
│  [View Full Report]                                             │
├─────────────────────────────────────────────────────────────────┤
│  TOP PARTNERS (Last 30 Days)                                    │
│  1. Florist A - 245 orders (4.8★, 96% OTD)                      │
│  2. Florist B - 189 orders (4.6★, 94% OTD)                      │
│  3. Florist C - 156 orders (4.7★, 95% OTD)                      │
│  [View Full Report]                                             │
├─────────────────────────────────────────────────────────────────┤
│  CUSTOMER INSIGHTS                                              │
│  New Customers: 456 (37%)                                       │
│  Returning Customers: 789 (63%)                                 │
│  Average Orders per Customer: 2.3                               │
│  Customer Lifetime Value: Rp 920,000                            │
│  [View Full Report]                                             │
└─────────────────────────────────────────────────────────────────┘
```

### 13.5 Configuration Management

**Configurable Parameters**:

1. **Operational Settings**
   - Business hours
   - Order cutoff times
   - Same-day delivery rules
   - Delivery time slots
   - Service areas (cities/districts)

2. **Pricing Settings**
   - Delivery fee structure
   - Commission rates by partner tier
   - Surge pricing rules
   - Discount limits

3. **SLA Settings**
   - Partner acceptance timeout
   - Preparation time limits
   - Delivery window buffer
   - Auto-confirmation delay

4. **Notification Settings**
   - WhatsApp templates
   - Email templates
   - SMS templates
   - Notification triggers

5. **Payment Settings**
   - Payment gateway credentials
   - Supported payment methods
   - Payment expiry time
   - Refund policy

6. **Quality Settings**
   - Minimum partner rating
   - Audit frequency
   - Performance thresholds
   - Suspension criteria

**Configuration UI**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Platform Configuration                                         │
├─────────────────────────────────────────────────────────────────┤
│  [Operational] [Pricing] [SLA] [Notifications] [Payment]       │
│  [Quality]                                                      │
├─────────────────────────────────────────────────────────────────┤
│  OPERATIONAL SETTINGS                                           │
│                                                                 │
│  Business Hours                                                 │
│  Monday - Friday: [08:00] to [20:00]                            │
│  Saturday - Sunday: [09:00] to [18:00]                          │
│                                                                 │
│  Same-Day Delivery                                              │
│  ☑ Enable same-day delivery                                    │
│  Cutoff time: [14:00] (2:00 PM)                                 │
│  Surcharge: [15] %                                              │
│                                                                 │
│  Delivery Time Slots                                            │
│  ☑ Morning (09:00 - 12:00) - Capacity: [10] orders             │
│  ☑ Afternoon (12:00 - 15:00) - Capacity: [10] orders           │
│  ☑ Evening (15:00 - 18:00) - Capacity: [10] orders             │
│  ☑ Night (18:00 - 21:00) - Capacity: [5] orders                │
│                                                                 │
│  Service Areas                                                  │
│  ☑ Jakarta (All districts)                                     │
│  ☑ Bandung (Selected districts)                                │
│  ☐ Surabaya (Coming soon)                                      │
│  [Manage Service Areas]                                         │
│                                                                 │
│  [Save Changes] [Reset to Default]                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 14. Customer Support Workflow

### 14.1 Support Channels

**Available Channels**:
1. **WhatsApp** (Primary) - 8 AM - 8 PM daily
2. **In-App Chat** (Phase 3+) - 8 AM - 8 PM daily
3. **Email** - support@flowee.id (24-48 hour response)
4. **Phone** - Emergency only

### 14.2 Support Ticket System

**Ticket Categories**:
- Order inquiry
- Payment issue
- Delivery problem
- Product quality complaint
- Cancellation request
- Refund request
- General question

**Ticket Priority**:
- **Critical**: Order not delivered, payment charged but order not created
- **High**: Delivery delayed, quality issue, urgent cancellation
- **Medium**: General inquiry, modification request
- **Low**: Feedback, suggestion

**Ticket Lifecycle**:
```
NEW → ASSIGNED → IN_PROGRESS → RESOLVED → CLOSED
                      ↓
                  ESCALATED
```

#### Support Ticket Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  Support Tickets                                                │
│  [All] [Open] [In Progress] [Resolved] [Closed]                 │
├─────────────────────────────────────────────────────────────────┤
│  🔴 CRITICAL (2)                                                │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ #SUP-001 - Order not delivered                            │ │
│  │ Customer: John Doe | Order: #FLW-001                      │ │
│  │ Created: 2 hours ago | Assigned to: Sarah                 │ │
│  │ [View Details] [Resolve]                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🟠 HIGH (5)                                                    │
│  [List of high priority tickets]                                │
│                                                                 │
│  🟡 MEDIUM (12)                                                 │
│  [List of medium priority tickets]                              │
└─────────────────────────────────────────────────────────────────┘
```

**Ticket Detail View**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Ticket #SUP-001                                                │
│  Status: In Progress 🔄        Priority: Critical 🔴            │
├─────────────────────────────────────────────────────────────────┤
│  TICKET INFORMATION                                             │
│  Category: Delivery Problem                                     │
│  Created: Jan 15, 2024 2:00 PM                                  │
│  Assigned to: Sarah (Support Agent)                             │
│  Related Order: #FLW-001                                        │
│  [View Order Details]                                           │
├─────────────────────────────────────────────────────────────────┤
│  CUSTOMER INFORMATION                                           │
│  Name: John Doe                                                 │
│  Phone: +62 812-3456-7890                                       │
│  Email: john@example.com                                        │
│  [Contact Customer]                                             │
├─────────────────────────────────────────────────────────────────┤
│  ISSUE DESCRIPTION                                              │
│  "Order was supposed to be delivered at 2 PM but it's now 4 PM │
│  and still not delivered. Partner is not responding to calls."  │
├─────────────────────────────────────────────────────────────────┤
│  CONVERSATION HISTORY                                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 2:00 PM - Customer: [Issue description]                   │ │
│  │ 2:05 PM - Sarah: "I'm looking into this now..."           │ │
│  │ 2:10 PM - Sarah: "I've contacted the partner..."          │ │
│  │ 2:15 PM - Customer: "Any update?"                         │ │
│  └───────────────────────────────────────────────────────────┘ │
│  [Add Response]                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ACTIONS TAKEN                                                  │
│  • 2:05 PM - Contacted partner via WhatsApp                     │
│  • 2:10 PM - Partner responded: traffic delay                   │
│  • 2:15 PM - Updated customer with ETA                          │
│  [Add Action]                                                   │
├─────────────────────────────────────────────────────────────────┤
│  RESOLUTION                                                     │
│  Resolution Type: [Select ▼]                                    │
│    - Issue resolved                                             │
│    - Refund issued                                              │
│    - Replacement sent                                           │
│    - Compensation provided                                      │
│  Resolution Notes:                                              │
│  [Text area for resolution details]                             │
│                                                                 │
│  [Resolve Ticket] [Escalate] [Close]                            │
└─────────────────────────────────────────────────────────────────┘
```

### 14.3 Common Support Scenarios & Responses

#### Scenario 1: "Where is my order?"

**Response Template**:
```
Hi {{customer_name}},

I've checked your order #{{order_number}}.

Current status: {{status}}
{{#if out_for_delivery}}
Your order is currently out for delivery. 
Estimated arrival: {{eta}}
Driver contact: {{driver_phone}}
{{/if}}

{{#if preparing}}
Your order is being prepared by our florist.
Expected ready time: {{ready_time}}
We'll notify you when it's out for delivery.
{{/if}}

Is there anything else I can help you with?
```

#### Scenario 2: "I want to cancel my order"

**Response Flow**:
1. Check order status
2. If status = PENDING or CONFIRMED:
   - Full refund available
   - Process cancellation immediately
3. If status = PREPARING:
   - Check with partner if cancellation possible
   - If yes: Full refund
   - If no: Offer 50% refund or reschedule
4. If status >= READY:
   - Cancellation not possible
   - Offer to refuse delivery for partial refund

**Response Template**:
```
Hi {{customer_name}},

I understand you'd like to cancel order #{{order_number}}.

{{#if can_cancel}}
I can process the cancellation for you right away.
You'll receive a full refund of Rp {{amount}} within 3-7 business days.

Shall I proceed with the cancellation?
{{/if}}

{{#if cannot_cancel}}
Unfortunately, your order is already {{status}}.
At this stage, we cannot cancel the order.

However, I can offer:
- Refuse delivery for 50% refund
- Reschedule to a different date (no charge)

Which would you prefer?
{{/if}}
```

#### Scenario 3: "The flowers don't look like the photo"

**Response Flow**:
1. Request customer to send photo
2. Compare with order details
3. Assess severity:
   - Minor difference: Apologize, offer 10-20% refund
   - Major difference: Offer replacement or full refund
4. Document issue for partner quality review

**Response Template**:
```
Hi {{customer_name}},

I'm sorry to hear the arrangement doesn't meet your expectations.

Could you please send me a photo so I can better understand the issue?

Once I see the photo, I'll work with you to make this right.
We take quality very seriously.
```

### 14.4 Escalation Process

**Escalation Triggers**:
- Ticket open > 2 hours without response
- Customer requests escalation
- Critical issue (order not delivered, major quality issue)
- Refund amount > Rp 500,000

**Escalation Levels**:
1. **Level 1**: Support Agent (handles 90% of tickets)
2. **Level 2**: Support Lead (complex issues, refunds)
3. **Level 3**: Operations Manager (critical issues, partner disputes)
4. **Level 4**: Founder/CEO (major incidents, legal issues)

**Escalation SLA**:
- Level 1 → Level 2: Within 2 hours
- Level 2 → Level 3: Within 4 hours
- Level 3 → Level 4: Within 24 hours

---

## 15. Vendor Quality Control Workflow

### 15.1 Quality Monitoring System

**Quality Dimensions**:
1. **Arrangement Quality**: Freshness, design accuracy, presentation
2. **Timeliness**: On-time acceptance, preparation, delivery
3. **Communication**: Response time, professionalism
4. **Customer Satisfaction**: Ratings, reviews, complaints

**Monitoring Methods**:
- Automated metrics tracking
- Customer feedback analysis
- Photo review (arrangement quality)
- Mystery shopping (quarterly)
- Periodic audits

### 15.2 Quality Score Calculation

```typescript
interface QualityMetrics {
  arrangement_quality: number;  // 0-100 (from photo reviews)
  timeliness_score: number;     // 0-100 (from SLA compliance)
  communication_score: number;  // 0-100 (from response times)
  customer_satisfaction: number; // 0-100 (from ratings)
}

function calculateQualityScore(metrics: QualityMetrics): number {
  const weights = {
    arrangement_quality: 0.35,
    timeliness_score: 0.25,
    communication_score: 0.15,
    customer_satisfaction: 0.25
  };
  
  let totalScore = 0;
  for (const [metric, weight] of Object.entries(weights)) {
    totalScore += metrics[metric] * weight;
  }
  
  return Math.round(totalScore);
}

// Calculate timeliness score
function calculateTimelinessScore(partner: Partner): number {
  const metrics = partner.metrics;
  
  // Factors:
  // - Acceptance rate (30%)
  // - On-time preparation (35%)
  // - On-time delivery (35%)
  
  const acceptanceScore = metrics.acceptance_rate;
  const preparationScore = metrics.on_time_preparation_rate;
  const deliveryScore = metrics.on_time_delivery_rate;
  
  return (
    acceptanceScore * 0.30 +
    preparationScore * 0.35 +
    deliveryScore * 0.35
  );
}

// Calculate arrangement quality from photos
async function assessArrangementQuality(orderId: string): Promise<number> {
  const order = await getOrder(orderId);
  const photos = order.photos.filter(p => p.type === "arrangement_ready");
  
  if (photos.length === 0) {
    return 0; // No photo = quality issue
  }
  
  // Phase 3: Manual admin review
  // Phase 4: AI-powered image analysis
  
  // For now, use customer rating as proxy
  const review = await getReview(orderId);
  if (review) {
    return review.ratings.quality * 20; // Convert 1-5 to 0-100
  }
  
  return 80; // Default if no review yet
}
```

### 15.3 Quality Issue Detection

**Automated Detection**:
```typescript
interface QualityIssue {
  partner_id: string;
  issue_type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detected_at: Date;
  orders_affected: string[];
}

async function detectQualityIssues(partnerId: string): Promise<QualityIssue[]> {
  const issues: QualityIssue[] = [];
  const partner = await getPartner(partnerId);
  const recentOrders = await getPartnerOrders(partnerId, { last_30_days: true });
  
  // Issue 1: Low acceptance rate
  if (partner.metrics.acceptance_rate < 80) {
    issues.push({
      partner_id: partnerId,
      issue_type: "low_acceptance_rate",
      severity: "high",
      description: `Acceptance rate is ${partner.metrics.acceptance_rate}% (target: >90%)`,
      detected_at: new Date(),
      orders_affected: []
    });
  }
  
  // Issue 2: Multiple late deliveries
  const lateDeliveries = recentOrders.filter(o => o.was_late);
  if (lateDeliveries.length > 5) {
    issues.push({
      partner_id: partnerId,
      issue_type: "frequent_late_delivery",
      severity: "high",
      description: `${lateDeliveries.length} late deliveries in last 30 days`,
      detected_at: new Date(),
      orders_affected: lateDeliveries.map(o => o.id)
    });
  }
  
  // Issue 3: Low ratings
  const lowRatedOrders = recentOrders.filter(o => o.review && o.review.rating < 3);
  if (lowRatedOrders.length > 3) {
    issues.push({
      partner_id: partnerId,
      issue_type: "low_customer_ratings",
      severity: "critical",
      description: `${lowRatedOrders.length} orders rated below 3 stars`,
      detected_at: new Date(),
      orders_affected: lowRatedOrders.map(o => o.id)
    });
  }
  
  // Issue 4: Missing photos
  const missingPhotos = recentOrders.filter(o => !o.photos || o.photos.length === 0);
  if (missingPhotos.length > 10) {
    issues.push({
      partner_id: partnerId,
      issue_type: "missing_photos",
      severity: "medium",
      description: `${missingPhotos.length} orders without arrangement photos`,
      detected_at: new Date(),
      orders_affected: missingPhotos.map(o => o.id)
    });
  }
  
  return issues;
}
```

### 15.4 Quality Enforcement Actions

**Action Matrix**:

| Quality Score | Action | Frequency |
|---------------|--------|-----------|
| 90-100 | Reward (tier upgrade, bonus) | Quarterly |
| 80-89 | Monitor (no action) | Monthly |
| 70-79 | Warning + Improvement Plan | Immediate |
| 60-69 | Probation (30 days) | Immediate |
| < 60 | Suspension pending review | Immediate |

**Improvement Plan Template**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Partner Improvement Plan                                       │
│  Partner: Florist A                                             │
│  Issue: Low acceptance rate (78%)                               │
│  Target: Achieve >90% acceptance rate within 30 days            │
├─────────────────────────────────────────────────────────────────┤
│  ROOT CAUSE ANALYSIS                                            │
│  • Partner reports capacity issues during peak hours            │
│  • Unclear order requirements leading to rejections             │
├─────────────────────────────────────────────────────────────────┤
│  ACTION ITEMS                                                   │
│  1. Reduce daily capacity from 10 to 8 orders                   │
│  2. Provide clearer order specifications                        │
│  3. Weekly check-in calls with support team                     │
│  4. Review progress after 2 weeks                               │
├─────────────────────────────────────────────────────────────────┤
│  SUCCESS CRITERIA                                               │
│  • Acceptance rate >90% for 2 consecutive weeks                 │
│  • No customer complaints about quality                         │
│  • Positive feedback from support team                          │
├─────────────────────────────────────────────────────────────────┤
│  CONSEQUENCES                                                   │
│  • If successful: Return to normal status                       │
│  • If unsuccessful: Suspension for 30 days                      │
└─────────────────────────────────────────────────────────────────┘
```

### 15.5 Partner Suspension & Termination

**Suspension Triggers**:
- Quality score < 60 for 2 consecutive weeks
- 3+ critical customer complaints in 30 days
- Fraudulent activity detected
- Violation of terms of service

**Suspension Process**:
1. Immediate suspension (no new orders assigned)
2. Notification to partner with reason
3. Investigation period (3-7 days)
4. Decision: Reinstate with improvement plan OR Terminate

**Termination Process**:
1. Final notification to partner
2. Complete all pending orders
3. Process final payout
4. Deactivate account
5. Document reason for future reference

---

## 16. Review and Dispute Workflow

### 16.1 Review Collection System

**Review Request Timing**:
- 2 hours after delivery confirmation
- If no response, reminder after 24 hours
- Review window closes after 7 days

**Review Request Message**:
```
Terima kasih sudah memesan di Flowee! 🌸

Bagaimana pengalaman Anda dengan pesanan #{{order_number}}?

Berikan rating Anda:
⭐⭐⭐⭐⭐ (Tap to rate)

[Link to review form]

Feedback Anda membantu kami meningkatkan layanan.
```

**Review Form**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Review Your Order                                              │
│  Order #FLW-001 - Romantic Rose Bouquet                         │
├─────────────────────────────────────────────────────────────────┤
│  Overall Rating *                                               │
│  ⭐⭐⭐⭐⭐ (5 stars)                                              │
├─────────────────────────────────────────────────────────────────┤
│  Detailed Ratings                                               │
│  Quality: ⭐⭐⭐⭐⭐                                                │
│  Presentation: ⭐⭐⭐⭐⭐                                           │
│  Delivery: ⭐⭐⭐⭐⭐                                               │
│  Communication: ⭐⭐⭐⭐⭐                                          │
├─────────────────────────────────────────────────────────────────┤
│  Your Comments (Optional)                                       │
│  [Text area]                                                    │
├─────────────────────────────────────────────────────────────────┤
│  Upload Photos (Optional)                                       │
│  [Upload button]                                                │
├─────────────────────────────────────────────────────────────────┤
│  [Submit Review]                                                │
└─────────────────────────────────────────────────────────────────┘
```

### 16.2 Review Moderation

**Moderation Rules**:
- All reviews visible by default
- Admin can hide reviews that violate policy
- Partner can respond to reviews (not edit/delete)

**Review Policy Violations**:
- Profanity or offensive language
- Personal attacks
- Spam or promotional content
- Fake reviews (detected by system)
- Unrelated to order experience

**Moderation Workflow**:
```typescript
async function moderateReview(reviewId: string): Promise<void> {
  const review = await getReview(reviewId);
  
  // 1. Automated checks
  const violations = [];
  
  // Check for profanity
  if (containsProfanity(review.comment)) {
    violations.push("profanity");
  }
  
  // Check for spam patterns
  if (isSpam(review.comment)) {
    violations.push("spam");
  }
  
  // Check if verified purchase
  const order = await getOrder(review.order_id);
  if (!order || order.customer_id !== review.customer_id) {
    violations.push("unverified_purchase");
  }
  
  // 2. If violations found, flag for admin review
  if (violations.length > 0) {
    await flagReview(reviewId, violations);
    await notifyAdmin({
      type: "review_flagged",
      review_id: reviewId,
      violations: violations
    });
  }
  
  // 3. Update review status
  await updateReview(reviewId, {
    is_verified: order && order.status === "completed",
    moderation_status: violations.length > 0 ? "flagged" : "approved"
  });
}
```

### 16.3 Dispute Resolution Process

**Dispute Types**:
1. **Quality Dispute**: Arrangement doesn't match description/photo
2. **Delivery Dispute**: Late delivery, wrong address, not delivered
3. **Payment Dispute**: Charged wrong amount, double charge
4. **Cancellation Dispute**: Refund not received, partial refund disagreement

**Dispute Lifecycle**:
```
FILED → UNDER_REVIEW → EVIDENCE_GATHERING → DECISION → RESOLVED
```

**Dispute Resolution SLA**:
- Acknowledge: Within 2 hours
- Initial review: Within 24 hours
- Resolution: Within 3-5 business days

**Dispute Filing**:
```
┌─────────────────────────────────────────────────────────────────┐
│  File a Dispute                                                 │
│  Order #FLW-001                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Dispute Type *                                                 │
│  [Quality Issue ▼]                                              │
├─────────────────────────────────────────────────────────────────┤
│  Description *                                                  │
│  Please describe the issue in detail:                           │
│  [Text area]                                                    │
├─────────────────────────────────────────────────────────────────┤
│  Evidence                                                       │
│  Upload photos or documents:                                    │
│  [Upload button]                                                │
├─────────────────────────────────────────────────────────────────┤
│  Desired Resolution *                                           │
│  ○ Full refund                                                  │
│  ○ Partial refund                                               │
│  ○ Replacement                                                  │
│  ○ Other: [Text input]                                          │
├─────────────────────────────────────────────────────────────────┤
│  [Submit Dispute]                                               │
└─────────────────────────────────────────────────────────────────┘
```

**Dispute Resolution Matrix**:

| Dispute Type | Evidence Required | Typical Resolution | Timeline |
|--------------|-------------------|-------------------|----------|
| Quality Issue | Photos from both parties | Partial refund (20-50%) or replacement | 2-3 days |
| Late Delivery | Delivery timestamp | Partial refund (10-20%) or discount code | 1-2 days |
| Not Delivered | Delivery proof (or lack thereof) | Full refund | 1-2 days |
| Wrong Item | Photos | Replacement or full refund | 2-3 days |
| Payment Error | Transaction records | Refund difference | 1-2 days |

**Resolution Decision Process**:
```typescript
async function resolveDispute(disputeId: string): Promise<DisputeResolution> {
  const dispute = await getDispute(disputeId);
  const order = await getOrder(dispute.order_id);
  
  // Gather evidence
  const customerEvidence = dispute.customer_evidence;
  const partnerEvidence = await getPartnerEvidence(dispute.partner_id);
  const orderPhotos = order.photos;
  const deliveryProof = order.delivery_proof;
  
  // Analyze evidence
  let resolution: DisputeResolution;
  
  switch (dispute.type) {
    case "quality_issue":
      // Compare customer photo with order photo
      const qualityGap = await assessQualityGap(
        orderPhotos,
        customerEvidence.photos
      );
      
      if (qualityGap > 50) {
        // Major quality issue
        resolution = {
          decision: "favor_customer",
          action: "full_refund",
          amount: order.total,
          reason: "Significant quality discrepancy"
        };
      } else if (qualityGap > 20) {
        // Minor quality issue
        resolution = {
          decision: "partial_favor_customer",
          action: "partial_refund",
          amount: order.total * 0.3,
          reason: "Minor quality discrepancy"
        };
      } else {
        // No significant issue
        resolution = {
          decision: "favor_partner",
          action: "no_refund",
          amount: 0,
          reason: "Quality meets standards"
        };
      }
      break;
      
    case "late_delivery":
      const delayMinutes = calculateDelay(
        order.delivery_time_slot,
        order.delivered_at
      );
      
      if (delayMinutes > 60) {
        resolution = {
          decision: "favor_customer",
          action: "partial_refund",
          amount: order.total * 0.2,
          reason: `Delivery delayed by ${delayMinutes} minutes`
        };
      } else {
        resolution = {
          decision: "favor_partner",
          action: "discount_code",
          amount: 50000,
          reason: "Minor delay within acceptable range"
        };
      }
      break;
      
    // ... other dispute types
  }
  
  // Apply resolution
  await applyResolution(disputeId, resolution);
  
  // Notify parties
  await notifyCustomer(dispute.customer_id, resolution);
  await notifyPartner(dispute.partner_id, resolution);
  
  return resolution;
}
```

---

## 17. Notifications and Messaging Design

### 17.1 Multi-Channel Notification System

**Notification Channels**:
1. **WhatsApp** (Primary) - High priority, transactional
2. **Email** - Confirmations, receipts, reports
3. **SMS** - Backup for critical notifications
4. **Push Notifications** (Phase 3+) - Real-time updates in app
5. **In-App Notifications** (Phase 3+) - Non-urgent updates

**Channel Selection Logic**:
```typescript
interface NotificationPreferences {
  whatsapp: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
}

async function sendNotification(
  userId: string,
  notification: Notification
): Promise<void> {
  const user = await getUser(userId);
  const preferences = user.notification_preferences;
  
  // Determine channels based on priority and preferences
  const channels: string[] = [];
  
  if (notification.priority === "critical") {
    // Critical: Send via all available channels
    if (preferences.whatsapp) channels.push("whatsapp");
    if (preferences.sms) channels.push("sms");
    if (preferences.push) channels.push("push");
  } else if (notification.priority === "high") {
    // High: WhatsApp + Push
    if (preferences.whatsapp) channels.push("whatsapp");
    if (preferences.push) channels.push("push");
  } else {
    // Normal: User preference
    if (preferences.whatsapp) channels.push("whatsapp");
    else if (preferences.push) channels.push("push");
    else if (preferences.email) channels.push("email");
  }
  
  // Send via selected channels
  await Promise.all(
    channels.map(channel => sendViaChannel(channel, userId, notification))
  );
  
  // Log notification
  await logNotification(userId, notification, channels);
}
```

### 17.2 Notification Templates

**Order Confirmation**:
```
WhatsApp:
✅ Pembayaran Berhasil!

Order #{{order_number}}
{{product_name}}
Total: Rp {{total}}

Pengiriman: {{delivery_date}}, {{delivery_time}}
Alamat: {{delivery_address}}

Kami akan update status pesanan Anda via WhatsApp.

Terima kasih! 🌸
```

**Order Assigned to Partner**:
```
WhatsApp (to Partner):
🔔 Pesanan Baru!

Order #{{order_number}}
{{product_name}}
Pengiriman: {{delivery_date}}, {{delivery_time}}
Lokasi: {{delivery_city}}

Terima pesanan dalam 15 menit:
[Terima] [Tolak]

[Lihat Detail]
```

**Order Preparing**:
```
WhatsApp (to Customer):
👨‍🍳 Pesanan Sedang Disiapkan

Order #{{order_number}}
Florist kami sedang merangkai bunga Anda dengan penuh perhatian.

Estimasi selesai: {{ready_time}}

Kami akan kirim foto saat sudah siap! 📸
```

**Order Ready**:
```
WhatsApp (to Customer):
✨ Pesanan Siap!

Order #{{order_number}}
Rangkaian bunga Anda sudah siap dan cantik!

[Photo of arrangement]

Akan segera dikirim ke alamat Anda.
Estimasi tiba: {{eta}}
```

**Out for Delivery**:
```
WhatsApp (to Customer):
🚚 Pesanan Dalam Perjalanan

Order #{{order_number}}
Driver sedang menuju lokasi Anda.

Estimasi tiba: {{eta}}
Kontak driver: {{driver_phone}}

[Track Order]
```

**Delivered**:
```
WhatsApp (to Customer):
✅ Pesanan Terkirim!

Order #{{order_number}}
Pesanan Anda telah diterima oleh {{recipient_name}}.

[Photo of delivery]

Apakah semuanya sesuai?
[Ya, Sempurna!] [Ada Masalah]

Berikan rating Anda:
⭐⭐⭐⭐⭐
```

### 17.3 WhatsApp Business API Integration

**Setup Requirements**:
- WhatsApp Business Account
- Facebook Business Manager
- Verified business
- WhatsApp Business API access (via provider like Twilio, MessageBird, or official Meta)

**Message Types**:
1. **Template Messages**: Pre-approved messages for transactional notifications
2. **Session Messages**: Free-form messages within 24-hour window after customer initiates

**Template Message Example**:
```json
{
  "messaging_product": "whatsapp",
  "to": "6281234567890",
  "type": "template",
  "template": {
    "name": "order_confirmed",
    "language": {
      "code": "id"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "FLW-001"
          },
          {
            "type": "text",
            "text": "Romantic Rose Bouquet"
          },
          {
            "type": "text",
            "text": "425000"
          }
        ]
      }
    ]
  }
}
```

**Interactive Buttons**:
```json
{
  "messaging_product": "whatsapp",
  "to": "6281234567890",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "Pesanan Anda telah terkirim! Apakah semuanya sesuai?"
    },
    "action": {
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "confirm_ok",
            "title": "Ya, Sempurna!"
          }
        },
        {
          "type": "reply",
          "reply": {
            "id": "report_issue",
            "title": "Ada Masalah"
          }
        }
      ]
    }
  }
}
```

### 17.4 Email Notification System

**Email Service Provider**: SendGrid or AWS SES

**Email Types**:
1. **Transactional**: Order confirmations, receipts, status updates
2. **Marketing**: Promotions, newsletters, re-engagement
3. **Operational**: Reports, alerts (for admin/partners)

**Email Template Structure**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{subject}}</title>
  <style>
    /* Responsive email styles */
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <!-- Header -->
    <tr>
      <td align="center" bgcolor="#173901" style="padding: 20px;">
        <h1 style="color: #ffffff; font-family: 'Playfair Display', serif;">
          🌸 Flowee
        </h1>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 20px;">
        {{content}}
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td align="center" bgcolor="#f1ede7" style="padding: 20px;">
        <p style="color: #73796c; font-size: 12px;">
          © 2024 Flowee. All rights reserved.
        </p>
        <p style="color: #73796c; font-size: 12px;">
          <a href="{{unsubscribe_url}}">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
```

### 17.5 Notification Preferences

**User Preferences**:
```typescript
interface NotificationPreferences {
  // Channels
  whatsapp_enabled: boolean;
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  
  // Notification types
  order_updates: boolean;
  promotional: boolean;
  newsletter: boolean;
  partner_updates: boolean; // For partners only
  
  // Frequency
  digest_frequency: "realtime" | "daily" | "weekly";
}
```

**Preference Management UI**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Notification Preferences                                       │
├─────────────────────────────────────────────────────────────────┤
│  CHANNELS                                                       │
│  ☑ WhatsApp (+62 812-3456-7890)                                 │
│  ☑ Email (john@example.com)                                     │
│  ☐ SMS                                                          │
│  ☑ Push Notifications                                           │
├─────────────────────────────────────────────────────────────────┤
│  NOTIFICATION TYPES                                             │
│  ☑ Order Updates (Recommended)                                  │
│  ☑ Delivery Notifications (Recommended)                         │
│  ☑ Promotional Offers                                           │
│  ☐ Newsletter                                                   │
├─────────────────────────────────────────────────────────────────┤
│  FREQUENCY                                                      │
│  ○ Real-time (Immediate notifications)                          │
│  ● Daily Digest (Once per day summary)                          │
│  ○ Weekly Digest (Once per week summary)                        │
├─────────────────────────────────────────────────────────────────┤
│  [Save Preferences]                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 18. Analytics and Reporting

### 18.1 Data Warehouse Design

**Architecture** (Phase 4):
```
Operational DB (PostgreSQL)
        │
        ├─> ETL Pipeline (Daily)
        │
        v
Data Warehouse (BigQuery/Redshift)
        │
        ├─> BI Tool (Metabase/Looker)
        │
        v
   Dashboards & Reports
```

**Fact Tables**:
1. **fact_orders**: Order transactions
2. **fact_payments**: Payment transactions
3. **fact_deliveries**: Delivery events
4. **fact_reviews**: Customer reviews

**Dimension Tables**:
1. **dim_customers**: Customer attributes
2. **dim_partners**: Partner attributes
3. **dim_products**: Product catalog
4. **dim_date**: Date dimension
5. **dim_location**: Geographic data

### 18.2 Key Metrics & KPIs

#### Business Metrics

**Revenue Metrics**:
- **GMV** (Gross Merchandise Value): Total order value
- **Net Revenue**: GMV - Refunds - Discounts
- **Commission Revenue**: Platform commission from partners
- **Average Order Value (AOV)**: Total revenue / Number of orders
- **Revenue per Customer**: Total revenue / Number of customers

**Growth Metrics**:
- **Order Growth Rate**: (Current period orders - Previous period orders) / Previous period orders
- **Revenue Growth Rate**: Month-over-month, year-over-year
- **Customer Growth Rate**: New customers per period
- **Partner Growth Rate**: New partners per period

**Operational Metrics**:
- **Order Fulfillment Rate**: Completed orders / Total orders
- **On-Time Delivery Rate**: On-time deliveries / Total deliveries
- **Order Cancellation Rate**: Cancelled orders / Total orders
- **Average Delivery Time**: Time from order to delivery

**Customer Metrics**:
- **Customer Acquisition Cost (CAC)**: Marketing spend / New customers
- **Customer Lifetime Value (CLV)**: Average revenue per customer over lifetime
- **Repeat Purchase Rate**: Customers with 2+ orders / Total customers
- **Customer Satisfaction Score (CSAT)**: Average rating
- **Net Promoter Score (NPS)**: Likelihood to recommend

**Partner Metrics**:
- **Active Partners**: Partners with orders in last 30 days
- **Average Orders per Partner**: Total orders / Active partners
- **Partner Retention Rate**: Partners active after 6 months
- **Average Partner Rating**: Average of all partner ratings

#### Conversion Funnel

```
Website Visitors (100%)
        │
        ├─> Product Views (40%)
        │
        ├─> Add to Cart (15%)
        │
        ├─> Checkout Started (12%)
        │
        ├─> Payment Completed (10%)
        │
        v
    Orders (10%)
```

**Funnel Metrics**:
- **Visit-to-Order Conversion**: Orders / Visitors
- **Cart Abandonment Rate**: (Carts - Orders) / Carts
- **Checkout Abandonment Rate**: (Checkouts - Orders) / Checkouts

### 18.3 Analytics Dashboards

#### Executive Dashboard

**Purpose**: High-level business overview for founders/executives

**Metrics**:
- GMV (current month, YTD)
- Order volume (current month, YTD)
- Active customers
- Active partners
- Customer satisfaction
- Key trends (charts)

**Refresh**: Real-time

#### Operations Dashboard

**Purpose**: Daily operations monitoring for ops team

**Metrics**:
- Today's orders by status
- Pending actions (unassigned orders, support tickets)
- Partner availability
- Delivery performance
- Issues and alerts

**Refresh**: Real-time

#### Marketing Dashboard

**Purpose**: Campaign performance and customer insights

**Metrics**:
- Traffic sources
- Conversion rates by channel
- Customer acquisition cost
- Campaign ROI
- Customer segments
- Repeat purchase rate

**Refresh**: Daily

#### Partner Dashboard

**Purpose**: Partner performance and earnings

**Metrics** (per partner):
- Orders completed
- Earnings (current period, total)
- Performance score
- Customer ratings
- On-time delivery rate
- Upcoming payouts

**Refresh**: Real-time

### 18.4 Reporting System

#### Automated Reports

**Daily Operations Report** (Email to ops team, 8 AM):
```
Flowee Daily Report - {{date}}

ORDERS
- Total: 24 (+20% vs yesterday)
- Completed: 18
- In Progress: 6
- Cancelled: 0

REVENUE
- Total: Rp 8,400,000 (+15% vs yesterday)
- AOV: Rp 350,000

PERFORMANCE
- On-Time Delivery: 96%
- Avg Rating: 4.8/5.0
- Customer Satisfaction: 95%

ISSUES
- 1 customer complaint (resolved)
- 2 late deliveries (within SLA)

TOP PRODUCTS
1. Romantic Rose Bouquet - 8 orders
2. Graduation Bouquet - 6 orders
3. Papan Bunga - 4 orders

[View Full Dashboard]
```

**Weekly Business Review** (Email to founders, Monday 9 AM):
```
Flowee Weekly Review - Week of {{date}}

HIGHLIGHTS
✅ 168 orders (+18% WoW)
✅ Rp 58.8M revenue (+15% WoW)
✅ 4.8/5.0 avg rating (stable)
⚠️ 3 partner quality issues (under review)

GROWTH
- New customers: 45 (+12% WoW)
- Repeat customers: 123 (73% of orders)
- New partners: 2 (Jakarta, Bandung)

OPERATIONS
- Fulfillment rate: 97%
- On-time delivery: 96%
- Cancellation rate: 2%

TOP PERFORMERS
- Partner: Florist A (45 orders, 4.9★)
- Product: Romantic Rose Bouquet (Rp 15.7M)
- City: Jakarta (120 orders)

AREAS FOR IMPROVEMENT
- Bandung delivery times (avg 15 min late)
- Product photos (10% missing)

[View Detailed Report]
```

**Monthly Financial Report** (Email to founders, 1st of month):
```
Flowee Monthly Financial Report - {{month}}

REVENUE
- GMV: Rp 245M (+25% MoM)
- Net Revenue: Rp 220M (after refunds/discounts)
- Commission Revenue: Rp 44M (20% avg commission)

COSTS
- Partner Payouts: Rp 196M (80% of GMV)
- Marketing: Rp 15M (CAC: Rp 32,000)
- Operations: Rp 8M (salaries, tools, overhead)
- Technology: Rp 3M (hosting, services)
- Total Costs: Rp 222M

PROFIT
- Gross Profit: Rp 49M (20% margin)
- Net Profit: Rp 18M (7.3% margin)

CASH FLOW
- Beginning Balance: Rp 50M
- Cash In: Rp 220M
- Cash Out: Rp 222M
- Ending Balance: Rp 48M

METRICS
- Orders: 1,245 (+18% MoM)
- AOV: Rp 400k (+6% MoM)
- CAC: Rp 32k (-5% MoM)
- CLV: Rp 920k (+8% MoM)
- CLV/CAC Ratio: 28.75 (healthy)

[View Detailed Breakdown]
```

### 18.5 Event Tracking

**Key Events to Track**:

**Customer Journey**:
- `page_view`: User views page
- `product_view`: User views product detail
- `add_to_cart`: User adds product to cart
- `checkout_start`: User starts checkout
- `payment_method_selected`: User selects payment method
- `order_placed`: Order successfully created
- `order_paid`: Payment confirmed

**Order Lifecycle**:
- `order_assigned`: Order assigned to partner
- `order_accepted`: Partner accepts order
- `order_preparing`: Partner starts preparation
- `order_ready`: Arrangement ready
- `order_out_for_delivery`: Delivery started
- `order_delivered`: Order delivered
- `order_completed`: Customer confirms
- `order_cancelled`: Order cancelled

**Engagement**:
- `review_submitted`: Customer submits review
- `support_ticket_created`: Customer creates support ticket
- `whatsapp_message_sent`: WhatsApp notification sent
- `email_opened`: Customer opens email
- `link_clicked`: Customer clicks link in notification

**Event Schema**:
```typescript
interface AnalyticsEvent {
  event_name: string;
  timestamp: Date;
  user_id?: string;
  session_id: string;
  properties: Record<string, any>;
  context: {
    page_url?: string;
    referrer?: string;
    user_agent: string;
    ip_address: string;
    device_type: "mobile" | "tablet" | "desktop";
    os: string;
    browser: string;
  };
}

// Example: Track order placed
trackEvent({
  event_name: "order_placed",
  timestamp: new Date(),
  user_id: "customer_123",
  session_id: "session_456",
  properties: {
    order_id: "FLW-001",
    product_id: "prod_123",
    product_name: "Romantic Rose Bouquet",
    category: "hand_bouquet",
    price: 425000,
    delivery_city: "Jakarta",
    payment_method: "gopay"
  },
  context: {
    page_url: "/checkout/success",
    referrer: "/checkout",
    user_agent: "...",
    ip_address: "...",
    device_type: "mobile",
    os: "Android",
    browser: "Chrome"
  }
});
```

---

## 19. Security and Access Control

### 19.1 Authentication System

**Authentication Methods**:

**Phase 1-2**: No authentication (WhatsApp-based)

**Phase 3**: 
- **Customers**: Phone number + OTP (passwordless)
- **Partners**: Email + Password
- **Admin**: Email + Password + 2FA

**Phase 4**:
- **Customers**: Phone OTP, Google Sign-In, Apple Sign-In
- **Partners**: Email + Password + 2FA
- **Admin**: SSO (Single Sign-On) + 2FA

#### Phone OTP Flow (Customers)

```
Customer                    System                      SMS Gateway
   │                          │                              │
   │ 1. Enter phone number    │                              │
   ├─────────────────────────>│                              │
   │                          │ 2. Generate OTP (6 digits)   │
   │                          │ 3. Store OTP (5 min expiry)  │
   │                          │ 4. Send OTP                  │
   │                          ├─────────────────────────────>│
   │                          │                              │ 5. Deliver SMS
   │<──────────────────────────────────────────────────────────┤
   │ 6. Receive OTP           │                              │
   │ 7. Enter OTP             │                              │
   ├─────────────────────────>│                              │
   │                          │ 8. Verify OTP                │
   │                          │ 9. Create session            │
   │<─────────────────────────┤ 10. Return JWT token         │
   │ 11. Authenticated        │                              │
```

**OTP Implementation**:
```typescript
async function sendOTP(phone: string): Promise<void> {
  // 1. Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // 2. Store in Redis with 5-minute expiry
  await redis.setex(`otp:${phone}`, 300, otp);
  
  // 3. Send via SMS
  await sendSMS(phone, `Kode OTP Flowee: ${otp}. Berlaku 5 menit.`);
  
  // 4. Rate limit: Max 3 OTPs per phone per hour
  await incrementRateLimit(`otp_requests:${phone}`, 3600, 3);
}

async function verifyOTP(phone: string, otp: string): Promise<string> {
  // 1. Get stored OTP
  const storedOTP = await redis.get(`otp:${phone}`);
  
  if (!storedOTP) {
    throw new Error("OTP expired or not found");
  }
  
  if (storedOTP !== otp) {
    throw new Error("Invalid OTP");
  }
  
  // 2. Delete OTP (one-time use)
  await redis.del(`otp:${phone}`);
  
  // 3. Find or create customer
  let customer = await getCustomerByPhone(phone);
  if (!customer) {
    customer = await createCustomer({ phone });
  }
  
  // 4. Create session and return JWT
  const token = await createJWT({
    user_id: customer.id,
    role: "customer",
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
  });
  
  return token;
}
```

### 19.2 Authorization & Role-Based Access Control (RBAC)

**Roles**:
1. **Customer**: Can place orders, view own orders, submit reviews
2. **Partner**: Can view assigned orders, update status, manage profile
3. **Admin**: Can manage orders, partners, products, view analytics
4. **Super Admin**: Full access including configuration, user management

**Permissions Matrix**:

| Resource | Customer | Partner | Admin | Super Admin |
|----------|----------|---------|-------|-------------|
| View own orders | ✅ | ✅ | ✅ | ✅ |
| View all orders | ❌ | ❌ | ✅ | ✅ |
| Create order | ✅ | ❌ | ✅ | ✅ |
| Update order status | ❌ | ✅ | ✅ | ✅ |
| Cancel order | ✅ (own) | ❌ | ✅ | ✅ |
| View products | ✅ | ✅ | ✅ | ✅ |
| Manage products | ❌ | ❌ | ✅ | ✅ |
| View partners | ❌ | ❌ | ✅ | ✅ |
| Manage partners | ❌ | ❌ | ✅ | ✅ |
| View analytics | ❌ | ✅ (own) | ✅ | ✅ |
| Manage configuration | ❌ | ❌ | ❌ | ✅ |

**Authorization Middleware**:
```typescript
function requireRole(allowedRoles: string[]) {
  return async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const decoded = await verifyJWT(token);
      
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

// Usage
app.get("/api/orders", requireRole(["admin", "super_admin"]), async (req, res) => {
  // Only admins can access
  const orders = await getAllOrders();
  res.json(orders);
});

app.get("/api/orders/:id", requireRole(["customer", "partner", "admin"]), async (req, res) => {
  const order = await getOrder(req.params.id);
  
  // Additional check: customers can only view their own orders
  if (req.user.role === "customer" && order.customer_id !== req.user.user_id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  
  res.json(order);
});
```

### 19.3 Data Security

**Encryption**:
- **In Transit**: TLS 1.3 for all API communication
- **At Rest**: Database encryption (PostgreSQL encryption)
- **Sensitive Fields**: Additional encryption for PII (phone, email, address)

**PII Encryption**:
```typescript
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32-byte key
const ALGORITHM = "aes-256-gcm";

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag();
  
  // Return: iv:authTag:encrypted
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

function decrypt(encryptedText: string): string {
  const [ivHex, authTagHex, encrypted] = encryptedText.split(":");
  
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}

// Usage
const customer = {
  id: "cust_123",
  name: "John Doe",
  phone: encrypt("+6281234567890"),
  email: encrypt("john@example.com")
};
```

**Password Hashing** (for partners/admins):
```typescript
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
```

### 19.4 API Security

**Rate Limiting**:
```typescript
import rateLimit from "express-rate-limit";

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests, please try again later"
});

// Strict rate limit for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: "Too many login attempts, please try again later"
});

app.use("/api/", apiLimiter);
app.use("/api/auth/", authLimiter);
```

**Input Validation**:
```typescript
import { z } from "zod";

const CreateOrderSchema = z.object({
  product_id: z.string().uuid(),
  delivery_address: z.object({
    street: z.string().min(10).max(200),
    city: z.string().min(2).max(50),
    postal_code: z.string().regex(/^\d{5}$/)
  }),
  delivery_date: z.string().datetime(),
  customization: z.object({
    color: z.string().optional(),
    message: z.string().max(200).optional()
  }).optional()
});

app.post("/api/orders", async (req, res) => {
  try {
    const data = CreateOrderSchema.parse(req.body);
    const order = await createOrder(data);
    res.json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    throw error;
  }
});
```

**SQL Injection Prevention**:
```typescript
// ❌ BAD: String concatenation
const query = `SELECT * FROM orders WHERE customer_id = '${customerId}'`;

// ✅ GOOD: Parameterized queries
const query = "SELECT * FROM orders WHERE customer_id = $1";
const result = await db.query(query, [customerId]);
```

**CORS Configuration**:
```typescript
import cors from "cors";

const corsOptions = {
  origin: [
    "https://flowee.id",
    "https://www.flowee.id",
    "https://admin.flowee.id"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### 19.5 Compliance & Privacy

**Indonesian Data Protection (UU PDP)**:
- Obtain consent for data collection
- Provide privacy policy
- Allow data access and deletion requests
- Secure data storage and transmission
- Report data breaches within 72 hours

**PCI DSS Compliance** (Payment Card Industry):
- Never store raw card numbers
- Use certified payment gateway (Midtrans/Xendit)
- Tokenize payment methods
- Maintain secure network
- Regular security audits

**Privacy Policy Requirements**:
- What data is collected
- How data is used
- Who data is shared with
- How long data is retained
- User rights (access, deletion, correction)
- Contact information for privacy concerns

**Data Retention Policy**:
- **Active customers**: Indefinite (while account active)
- **Inactive customers**: 2 years after last activity
- **Deleted accounts**: 30 days (soft delete), then permanent deletion
- **Order data**: 7 years (tax compliance)
- **Payment data**: 7 years (financial compliance)
- **Logs**: 90 days

**Right to be Forgotten**:
```typescript
async function deleteCustomerData(customerId: string): Promise<void> {
  // 1. Soft delete customer account
  await updateCustomer(customerId, {
    status: "deleted",
    deleted_at: new Date()
  });
  
  // 2. Anonymize personal data
  await updateCustomer(customerId, {
    name: "Deleted User",
    phone: null,
    email: null,
    addresses: []
  });
  
  // 3. Keep order history (anonymized) for business records
  // Orders remain but customer info is removed
  
  // 4. Schedule permanent deletion after 30 days
  await scheduleJob("permanent_delete_customer", {
    customer_id: customerId,
    execute_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });
}
```

---

## 20. Failure Scenarios and Recovery Flows

### 20.1 System Failure Scenarios

#### Scenario 1: Database Outage

**Detection**: Health check fails, database connection errors

**Impact**: 
- Cannot create new orders
- Cannot update order status
- Cannot access customer/partner data

**Recovery Flow**:
1. **Immediate**: Switch to read-only mode
   - Display cached data
   - Show maintenance message for write operations
2. **Within 5 minutes**: Failover to replica database
   - Promote read replica to primary
   - Update application connection string
3. **Within 30 minutes**: Restore primary database
   - Investigate root cause
   - Sync data from replica
   - Switch back to primary

**Graceful Degradation**:
- Allow order browsing (cached catalog)
- Block new orders with message: "We're experiencing technical difficulties. Please try again in a few minutes or contact us via WhatsApp."
- Queue order submissions for processing when database recovers

#### Scenario 2: Payment Gateway Outage

**Detection**: Payment webhook failures, API timeouts

**Impact**:
- Cannot process new payments
- Cannot confirm existing payments

**Recovery Flow**:
1. **Immediate**: Display alternative payment methods
   - Show bank transfer instructions
   - Provide WhatsApp contact for manual payment
2. **Within 15 minutes**: Switch to backup payment gateway
   - If Midtrans down, use Xendit
   - Update payment flow
3. **Post-recovery**: Reconcile pending payments
   - Check payment status for all pending orders
   - Confirm orders that were paid during outage

**Customer Communication**:
```
Maaf, sistem pembayaran sedang mengalami gangguan.

Silakan pilih metode alternatif:
1. Transfer bank manual (BCA/Mandiri)
2. Hubungi kami via WhatsApp untuk bantuan

Kami mohon maaf atas ketidaknyamanan ini.
```

#### Scenario 3: WhatsApp API Outage

**Detection**: Message delivery failures, API errors

**Impact**:
- Cannot send order notifications
- Cannot communicate with customers/partners

**Recovery Flow**:
1. **Immediate**: Fallback to SMS and email
   - Send critical notifications via SMS
   - Send detailed updates via email
2. **Queue messages**: Store failed WhatsApp messages
   - Retry when service recovers
   - Prevent duplicate notifications
3. **Manual outreach**: For urgent orders
   - Admin team calls customers/partners directly

#### Scenario 4: Partner Unavailability (All Partners Offline)

**Detection**: No partners available for order assignment

**Impact**:
- Cannot fulfill new orders
- Orders stuck in "confirmed" status

**Recovery Flow**:
1. **Immediate**: Notify admin team
   - Alert sent to all admins
   - Display unassigned orders dashboard
2. **Within 30 minutes**: Manual partner outreach
   - Admin calls partners to check availability
   - Offer incentives for urgent orders
3. **Within 2 hours**: Customer communication
   - Notify customers of delay
   - Offer options: wait, reschedule, or refund
4. **If unresolved**: Automatic refund after 4 hours

**Prevention**:
- Maintain minimum 3 partners per city
- Monitor partner availability in real-time
- Alert when available partners < 2

### 20.2 Business Continuity Planning

**Critical Functions** (must remain operational):
1. Order placement
2. Payment processing
3. Order tracking
4. Customer support
5. Partner communication

**Backup Systems**:
- **Database**: Automated daily backups + real-time replication
- **Application**: Multi-region deployment (Phase 4)
- **Payment**: Multiple payment gateway integrations
- **Communication**: WhatsApp + SMS + Email redundancy

**Disaster Recovery Objectives**:
- **RTO** (Recovery Time Objective): 4 hours
- **RPO** (Recovery Point Objective): 1 hour (max data loss)

**Incident Response Team**:
- **On-call engineer**: 24/7 availability
- **Operations manager**: Business continuity decisions
- **Founder**: Major incident escalation

### 20.3 Error Handling Best Practices

**User-Facing Errors**:
```typescript
// ❌ BAD: Technical error message
throw new Error("Database connection failed: ECONNREFUSED");

// ✅ GOOD: User-friendly error message
throw new AppError(
  "We're having trouble processing your request. Please try again in a moment.",
  500,
  "DB_CONNECTION_ERROR"
);
```

**Error Response Format**:
```typescript
interface ErrorResponse {
  error: {
    message: string;        // User-friendly message
    code: string;           // Error code for debugging
    details?: any;          // Additional context (dev mode only)
    timestamp: Date;
    request_id: string;     // For support tracking
  };
}

// Example
{
  "error": {
    "message": "Pesanan tidak ditemukan",
    "code": "ORDER_NOT_FOUND",
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_abc123"
  }
}
```

**Retry Logic**:
```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error; // Last attempt failed
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }
  
  throw new Error("Max retries exceeded");
}

// Usage
const order = await retryWithBackoff(() => createOrder(orderData));
```

---

## 21. Integration Opportunities

### 21.1 Third-Party Integrations

#### Payment Gateways

**Midtrans** (Primary):
- Bank transfer (virtual account)
- E-wallets (GoPay, OVO, ShopeePay, Dana)
- QRIS
- Credit/debit cards
- Installments

**Xendit** (Backup):
- Similar payment methods
- Better for B2B payments
- Invoice generation

**Integration Pattern**:
```typescript
interface PaymentGateway {
  createPayment(order: Order): Promise<PaymentResponse>;
  verifyPayment(transactionId: string): Promise<PaymentStatus>;
  processRefund(transactionId: string, amount: number): Promise<RefundResponse>;
}

class MidtransGateway implements PaymentGateway {
  async createPayment(order: Order): Promise<PaymentResponse> {
    const response = await midtrans.charge({
      transaction_details: {
        order_id: order.id,
        gross_amount: order.total
      },
      customer_details: {
        first_name: order.customer.name,
        phone: order.customer.phone,
        email: order.customer.email
      }
    });
    
    return {
      payment_url: response.redirect_url,
      transaction_id: response.transaction_id,
      expires_at: response.expiry_time
    };
  }
  
  // ... other methods
}

// Factory pattern for switching gateways
function getPaymentGateway(): PaymentGateway {
  const gateway = process.env.PAYMENT_GATEWAY || "midtrans";
  
  switch (gateway) {
    case "midtrans":
      return new MidtransGateway();
    case "xendit":
      return new XenditGateway();
    default:
      throw new Error(`Unknown payment gateway: ${gateway}`);
  }
}
```

#### Logistics & Delivery

**GoSend / GrabExpress Integration** (Phase 4):
- On-demand delivery for urgent orders
- Real-time driver tracking
- Proof of delivery

**Integration Benefits**:
- Faster delivery (1-2 hours)
- Professional drivers
- Insurance coverage
- Real-time tracking

**Integration Flow**:
```typescript
async function bookDelivery(order: Order): Promise<DeliveryBooking> {
  const partner = await getPartner(order.partner_id);
  
  const booking = await gosend.createBooking({
    pickup: {
      address: partner.address,
      contact: partner.phone,
      notes: `Order #${order.order_number}`
    },
    dropoff: {
      address: order.delivery_address,
      contact: order.customer.phone,
      notes: order.delivery_notes
    },
    item: {
      name: order.product.name,
      description: "Flower arrangement",
      value: order.total
    }
  });
  
  return {
    booking_id: booking.id,
    driver: booking.driver,
    tracking_url: booking.tracking_url,
    estimated_arrival: booking.eta
  };
}
```

#### Marketing & Analytics

**Google Analytics 4**:
- Website traffic analysis
- Conversion tracking
- User behavior insights

**Facebook Pixel**:
- Ad campaign tracking
- Retargeting audiences
- Conversion optimization

**Google Tag Manager**:
- Centralized tag management
- Event tracking
- A/B testing

**Mixpanel / Amplitude**:
- Product analytics
- Funnel analysis
- Cohort analysis
- User segmentation

#### Customer Support

**Zendesk / Intercom**:
- Ticketing system
- Live chat
- Knowledge base
- Customer profiles

**WhatsApp Business API**:
- Automated notifications
- Chatbot for FAQs
- Human handoff

#### Accounting & Finance

**Xero / QuickBooks**:
- Automated bookkeeping
- Invoice generation
- Financial reporting
- Tax compliance

**Integration Flow**:
```typescript
// Sync orders to accounting system
async function syncOrderToAccounting(order: Order): Promise<void> {
  await xero.createInvoice({
    invoice_number: order.order_number,
    date: order.created_at,
    due_date: order.delivery_date,
    customer: {
      name: order.customer.name,
      email: order.customer.email
    },
    line_items: [
      {
        description: order.product.name,
        quantity: 1,
        unit_price: order.subtotal,
        tax_type: "NONE"
      },
      {
        description: "Delivery Fee",
        quantity: 1,
        unit_price: order.delivery_fee,
        tax_type: "NONE"
      }
    ],
    total: order.total,
    status: "PAID"
  });
}
```

### 21.2 API Design for Third-Party Integration

**Public API** (Phase 4):

Allow third-party developers to integrate with Flowee:

**Use Cases**:
- Corporate clients placing bulk orders
- Event planners integrating flower ordering
- Gift platforms offering flowers as add-on

**API Endpoints**:
```
POST /api/v1/orders          # Create order
GET  /api/v1/orders/:id      # Get order details
GET  /api/v1/products        # List products
GET  /api/v1/availability    # Check delivery availability
POST /api/v1/webhooks        # Register webhook
```

**Authentication**: API keys + OAuth 2.0

**Rate Limiting**: 100 requests/minute per API key

**Webhook Events**:
- `order.created`
- `order.confirmed`
- `order.delivered`
- `order.cancelled`

**API Documentation**: OpenAPI/Swagger spec

---

## 22. Scalability Risks

### 22.1 Performance Bottlenecks

#### Database Query Performance

**Risk**: Slow queries as data grows

**Indicators**:
- Query time > 1 second
- Database CPU > 80%
- Connection pool exhaustion

**Mitigation**:
1. **Indexing**: Add indexes on frequently queried columns
   ```sql
   CREATE INDEX idx_orders_customer_created ON orders(customer_id, created_at DESC);
   CREATE INDEX idx_orders_status_delivery ON orders(status, delivery_date);
   ```

2. **Query Optimization**: Use EXPLAIN to analyze slow queries
   ```sql
   EXPLAIN ANALYZE
   SELECT * FROM orders
   WHERE customer_id = 'cust_123'
   ORDER BY created_at DESC
   LIMIT 10;
   ```

3. **Caching**: Cache frequently accessed data
   ```typescript
   async function getProduct(productId: string): Promise<Product> {
     // Check cache first
     const cached = await redis.get(`product:${productId}`);
     if (cached) {
       return JSON.parse(cached);
     }
     
     // Fetch from database
     const product = await db.query("SELECT * FROM products WHERE id = $1", [productId]);
     
     // Cache for 1 hour
     await redis.setex(`product:${productId}`, 3600, JSON.stringify(product));
     
     return product;
   }
   ```

4. **Read Replicas**: Separate read and write traffic
   - Write to primary database
   - Read from replicas
   - Reduces load on primary

#### Image Loading Performance

**Risk**: Slow page loads due to large images

**Mitigation**:
1. **Image Optimization**:
   - Convert to WebP format
   - Generate multiple sizes (thumbnail, medium, large)
   - Compress images (80-85% quality)

2. **CDN**: Serve images from CDN (Cloudflare, AWS CloudFront)

3. **Lazy Loading**: Load images as user scrolls
   ```html
   <img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" />
   ```

4. **Responsive Images**:
   ```html
   <img
     srcset="
       image-small.jpg 400w,
       image-medium.jpg 800w,
       image-large.jpg 1200w
     "
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     src="image-medium.jpg"
     alt="Product"
   />
   ```

### 22.2 Scaling Strategies

#### Horizontal Scaling (Phase 4)

**Application Servers**:
- Deploy multiple instances behind load balancer
- Auto-scaling based on CPU/memory usage
- Stateless application design (session in Redis)

**Database Scaling**:
- **Vertical**: Increase server resources (CPU, RAM)
- **Horizontal**: Sharding by city or customer ID
- **Read Replicas**: Multiple read-only copies

**Caching Layer**:
- Redis cluster for distributed caching
- Cache frequently accessed data (products, partners)
- Cache invalidation strategy

#### Geographic Distribution

**Multi-Region Deployment**:
- Deploy in multiple Indonesian regions (Jakarta, Surabaya, Bali)
- Route users to nearest region
- Reduce latency

**CDN for Static Assets**:
- Images, CSS, JavaScript served from CDN
- Edge caching for faster delivery

### 22.3 Capacity Planning

**Growth Projections**:

| Metric | Month 1 | Month 6 | Month 12 | Month 24 |
|--------|---------|---------|----------|----------|
| Orders/day | 10 | 50 | 200 | 500 |
| Customers | 100 | 1,000 | 5,000 | 20,000 |
| Partners | 3 | 10 | 30 | 100 |
| Cities | 1 | 2 | 5 | 10 |
| Database Size | 100 MB | 500 MB | 2 GB | 10 GB |
| Image Storage | 1 GB | 10 GB | 50 GB | 200 GB |

**Infrastructure Scaling Plan**:

**Phase 2** (Months 1-3):
- Airtable/Sheets (free tier)
- Vercel (hobby plan)
- WhatsApp Business API (pay-per-message)
- **Cost**: ~$50/month

**Phase 3** (Months 4-12):
- AWS/GCP (t3.medium instance)
- PostgreSQL (db.t3.small)
- Redis (cache.t3.micro)
- S3 storage (50 GB)
- **Cost**: ~$200/month

**Phase 4** (Months 13-24):
- AWS/GCP (multiple t3.large instances)
- PostgreSQL (db.t3.large + read replicas)
- Redis Cluster
- S3 storage (200 GB)
- CDN (CloudFront)
- **Cost**: ~$1,000/month

**Monitoring & Alerts**:
- CPU usage > 80% → Scale up
- Database connections > 80% → Add replica
- Response time > 2s → Investigate
- Error rate > 1% → Alert team

---

## 23. Suggested Implementation Milestones

### 23.1 Phase 1: Static MVP (Current State)

**Duration**: Completed

**Deliverables**:
- ✅ Static landing page
- ✅ Product catalog (6 products)
- ✅ WhatsApp integration
- ✅ Mobile-responsive design
- ✅ Deployed to Vercel

**Team**: 1 person (founder/developer)

**Cost**: $0/month (free hosting)

---

### 23.2 Phase 2: Operations Tools (Months 1-3)

**Goal**: Systematize manual operations, handle 50-100 orders/month

#### Sprint 1: Lead Capture (Week 1-2)

**Deliverables**:
- [ ] Inquiry form on website (Typeform/Google Forms)
- [ ] Airtable/Sheets database setup
- [ ] Zapier automation: Form → Database → WhatsApp notification
- [ ] Admin dashboard view (Airtable interface)

**Team**: 1 developer + 1 operations person

**Success Criteria**:
- All inquiries captured in database
- Admin notified within 1 minute
- Zero lost leads

#### Sprint 2: Payment Integration (Week 3-4)

**Deliverables**:
- [ ] Midtrans account setup
- [ ] Payment link generation workflow
- [ ] Webhook handler for payment confirmation
- [ ] Automated order confirmation (WhatsApp + Email)

**Success Criteria**:
- Payment confirmation within 5 minutes
- 100% payment tracking accuracy
- Zero manual payment verification

#### Sprint 3: Order Tracking (Week 5-6)

**Deliverables**:
- [ ] Order status tracking in Airtable
- [ ] Status update workflow (manual)
- [ ] Customer notification templates (WhatsApp)
- [ ] Partner coordination workflow

**Success Criteria**:
- All orders tracked from inquiry to delivery
- Customers receive status updates
- Admin can see order pipeline

#### Sprint 4: Reporting & Optimization (Week 7-8)

**Deliverables**:
- [ ] Daily operations report (automated)
- [ ] Weekly business review (automated)
- [ ] Partner performance tracking
- [ ] Customer feedback collection

**Success Criteria**:
- Reports generated automatically
- Key metrics tracked (orders, revenue, satisfaction)
- Insights for improvement identified

**Phase 2 Metrics**:
- Orders: 50-100/month
- Revenue: Rp 15-30M/month
- Team: 2-3 people
- Cost: ~$50/month

---

### 23.3 Phase 3: Platform Launch (Months 4-12)

**Goal**: Launch automated platform, scale to 200+ orders/month, expand to 2-3 cities

#### Sprint 5-6: Technical Foundation (Week 9-12)

**Deliverables**:
- [ ] Next.js frontend setup
- [ ] Node.js/Python backend setup
- [ ] PostgreSQL database design
- [ ] Redis caching layer
- [ ] Authentication system (phone OTP)
- [ ] Admin dashboard (basic)

**Team**: 2 developers + 1 designer

#### Sprint 7-8: Customer Experience (Week 13-16)

**Deliverables**:
- [ ] Product catalog (dynamic)
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Payment integration (Midtrans)
- [ ] Order tracking page
- [ ] Customer account

**Success Criteria**:
- End-to-end order flow works
- Instant pricing calculation
- Real-time order tracking

#### Sprint 9-10: Partner Platform (Week 17-20)

**Deliverables**:
- [ ] Partner dashboard
- [ ] Order assignment algorithm
- [ ] Partner onboarding workflow
- [ ] Performance tracking
- [ ] Payout management

**Success Criteria**:
- Partners can accept/reject orders
- Automated order assignment
- Partner performance visible

#### Sprint 11-12: Operations & Quality (Week 21-24)

**Deliverables**:
- [ ] Admin operations dashboard
- [ ] Support ticket system
- [ ] Quality control workflow
- [ ] Analytics & reporting
- [ ] Notification system (WhatsApp API)

**Success Criteria**:
- Admin can manage all operations
- Quality issues detected and resolved
- Comprehensive analytics available

#### Sprint 13-14: Testing & Launch (Week 25-28)

**Deliverables**:
- [ ] End-to-end testing
- [ ] Load testing
- [ ] Security audit
- [ ] Soft launch (limited users)
- [ ] Public launch

**Success Criteria**:
- All critical bugs fixed
- Platform handles 50 orders/day
- Positive user feedback

**Phase 3 Metrics**:
- Orders: 200-500/month
- Revenue: Rp 80-200M/month
- Team: 5-8 people
- Cost: ~$200/month (infrastructure)

---

### 23.4 Phase 4: Marketplace Scale (Months 13-24)

**Goal**: Scale to 500+ orders/month, expand to 5-10 cities, build partner network

#### Quarter 5: Multi-City Expansion (Months 13-15)

**Deliverables**:
- [ ] City-based routing
- [ ] Partner network expansion (10+ partners per city)
- [ ] City-specific pricing
- [ ] Local marketing campaigns
- [ ] Logistics optimization

**Target Cities**: Jakarta, Bandung, Surabaya, Bali, Yogyakarta

#### Quarter 6: Advanced Features (Months 16-18)

**Deliverables**:
- [ ] Dynamic pricing engine
- [ ] Personalized recommendations
- [ ] Loyalty program
- [ ] Corporate accounts
- [ ] Bulk ordering
- [ ] API for third-party integration

#### Quarter 7: Optimization & Scale (Months 19-21)

**Deliverables**:
- [ ] Microservices architecture
- [ ] Multi-region deployment
- [ ] Advanced analytics (data warehouse)
- [ ] AI-powered routing
- [ ] Predictive demand forecasting

#### Quarter 8: Ecosystem & Growth (Months 22-24)

**Deliverables**:
- [ ] Partner marketplace (partners can list own products)
- [ ] Subscription flowers
- [ ] Event planning services
- [ ] B2B platform
- [ ] Mobile apps (iOS/Android)

**Phase 4 Metrics**:
- Orders: 500-1,000/month
- Revenue: Rp 200-400M/month
- Team: 10-15 people
- Cost: ~$1,000/month (infrastructure)

---

### 23.5 Team Structure by Phase

**Phase 1** (Current):
- 1 Founder/Developer

**Phase 2** (Months 1-3):
- 1 Founder/Developer
- 1 Operations Manager
- 1 Part-time Customer Support

**Phase 3** (Months 4-12):
- 1 Founder/CEO
- 2 Full-stack Developers
- 1 UI/UX Designer
- 1 Operations Manager
- 2 Customer Support
- 1 Marketing Manager

**Phase 4** (Months 13-24):
- 1 Founder/CEO
- 1 CTO
- 3 Backend Developers
- 2 Frontend Developers
- 1 DevOps Engineer
- 1 Product Manager
- 1 Operations Manager
- 3 Customer Support
- 1 Marketing Manager
- 1 Data Analyst

---

## Conclusion

This design document provides a comprehensive blueprint for evolving Flowee from a static landing page into a scalable multi-city florist marketplace. The phased approach prioritizes:

1. **Start Simple**: Begin with manual processes and proven tools (Airtable, WhatsApp)
2. **Validate Demand**: Prove the business model before heavy tech investment
3. **Scale Gradually**: Add automation and complexity only when volume justifies it
4. **Stay Lean**: Keep team small and costs low in early phases
5. **Focus on Indonesia**: Optimize for local market (WhatsApp, mobile-first, local payments)

**Key Success Factors**:
- Strong partner relationships (quality florists)
- Excellent customer experience (fast response, reliable delivery)
- Operational efficiency (automation where it matters)
- Data-driven decisions (analytics and metrics)
- Sustainable unit economics (profitable per order)

**Next Steps**:
1. Review and approve this design
2. Prioritize Phase 2 features
3. Set up development environment
4. Begin Sprint 1 implementation

**Questions for Stakeholders**:
1. Which Phase 2 features are highest priority?
2. What is the budget for Phase 2-3?
3. When do we want to launch Phase 3 platform?
4. Which cities should we expand to first in Phase 4?

---

*This design document is a living document and should be updated as the platform evolves and new requirements emerge.*

