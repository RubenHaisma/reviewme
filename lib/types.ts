// lib/types.ts

export interface Appointment {
    id: string;
    companyId: string;
    customerName: string;
    date: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FeedbackItem {
    id: string;
    comment?: string | null | undefined;
    score: number;
    createdAt: string;
    updatedAt: string;
    appointment: Appointment;
    response?: string | null;
    read?: boolean; // Added from Prisma schema
  }
  
  export interface StatItem {
    score: number;
    _count: number;
  }
  
  export interface CompanyData {
    remainingFreeCustomers: number | null;
    subscriptionStatus: string | null; // Changed to string | null to match Prisma schema
    stripeCustomerId: string | null;
  }
  
  export interface DashboardData {
    feedback: FeedbackItem[];
    stats: StatItem[];
    company: CompanyData | null;
    totalCustomers: number;
    usagePercentage: number;
  }