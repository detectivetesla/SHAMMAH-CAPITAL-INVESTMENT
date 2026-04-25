export enum KYCStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  NOT_STARTED = 'NOT_STARTED',
}

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  kycStatus: KYCStatus;
  trustScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'LOAN_DISBURSEMENT' | 'LOAN_REPAYMENT' | 'INVESTMENT';
  amount: number;
  senderId?: string;
  receiverId?: string;
  timestamp: Date;
  status: TransactionStatus;
  reference?: string;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  type: 'EMERGENCY' | 'STANDARD';
  interestRate: number;
  repaymentSchedule: Date;
  status: LoanStatus;
  createdAt: Date;
}

export interface Investment {
  id: string;
  userId: string;
  portfolioType: string;
  principalAmount: number;
  currentValue: number;
  expectedROI: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'ACTIVE' | 'MATURED' | 'CLOSED';
  startDate: Date;
  endDate?: Date;
}

export interface TrustScoreHistory {
  id: string;
  userId: string;
  behaviorScore: number;
  riskScore: number;
  identityScore: number;
  totalScore: number;
  updatedAt: Date;
}
