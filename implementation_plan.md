# Revised Implementation Plan - Shammah Capital Investment

Following the "Security-by-Design" and "Zero Trust" principles outlined in the SRS, we will build the platform incrementally. Each step will include security verification to ensure no vulnerabilities are introduced.

## Phase 1: Foundation & Project Structure (Step 1)
Establish the monorepo structure and core security utilities.

### Initial Setup
#### [NEW] Monorepo Setup
- Initialize Workspace (Lerna or Turborepo style for shared types).
- **Backend**: NestJS initialization (API Gateway + Core Services).
- **Frontend**: Next.js initialization (Dashboard + Authentication).

#### [NEW] [core-security-lib](./packages/core-security)
- **CryptoService**: Implementation of AES-256-GCM for field-level encryption.
- **HashingService**: Implementation of Argon2id for secure password storage.
- **ValidationPipe**: Global input validation using `class-validator` and `zod`.

## Phase 2: Domain Layer & Database (Step 2)
Defining the business entities and secure data persistence.

#### [NEW] [domain-entities](./packages/domain)
- Shared TypeScript interfaces for `User`, `Wallet`, `Loan`, `Investment`.
- Trust scoring logic definitions.

#### [NEW] Supabase/PostgreSQL Integration
- Schema migrations for core tables.
- **Row-Level Security (RLS)** configuration: Ensuring users can only access their own financial data.

## Phase 3: Identity & Authentication (Step 3) - CRITICAL SECURITY STEP
- JWT Implementation with rotation and short-lived tokens.
- MFA (Multi-Factor Authentication) integration (OTP/Email).
- KYC (Know Your Customer) workflow definition.

## Phase 4: Financial Core (Step 4)
- Wallet operations (Deposits, Withdrawals, Transfers).
- Transactions Audit Log (Immutable records).

## User Review Required

> [!IMPORTANT]
> **Security Audit Point**: Before moving to Phase 2, we will perform a code review of the `CryptoService` and `HashingService` to ensure they follow NIST standards.

> [!WARNING]
> **Tech Stack Confirmation**: I have selected **NestJS** for the backend (as allowed by the "OR" in your doc) to maintain TypeScript consistency across the stack. Please confirm if this is acceptable or if you'd prefer **Spring Boot**.

## Open Questions
- Do you want to start with the **Backend (NestJS)** folder initialization first, or the **Core Security** utility library?
- For the mobile aspect (Flutter), should we focus on the Web/Next.js dashboard as the primary interface for now?

## Verification Plan
### Automated Tests
- Unit tests for `HashingService` (verifying salt uniqueness and argon2 parameters).
- Unit tests for `CryptoService` (verifying decrypt(encrypt(x)) == x).
### Security Checks
- Run `npm audit` and `snyk` (if available) on every dependency addition.
