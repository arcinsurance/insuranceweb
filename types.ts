import { ReactNode } from 'react';

export interface LocalizedString {
  en: string;
  es: string;
}

export interface KeyFeature {
  icon: ReactNode;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ServiceItem {
  id: string;
  brandColor: 'blue' | 'orange' | 'green';
  icon: ReactNode;
  title: LocalizedString;
  description: LocalizedString;
  details: LocalizedString; // Kept for any legacy use, but new pages use structured content
  // New structured content for dedicated service pages
  pageHeroImage: string;
  pageSubtitle: LocalizedString;
  keyFeatures: KeyFeature[];
  whoIsThisFor: LocalizedString[];
  howItWorks: LocalizedString[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Agent {
  name: string;
  location: LocalizedString;
  avatarUrl: string;
  title?: LocalizedString;
  email: string;
  phone: string;
  npn: string;
  states: string[];
}

export interface Review {
  stars: number;
  quote: LocalizedString;
  name: string;
  agent: string;
  service: LocalizedString;
}

export interface AgentApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  // Address
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  // Professional Profile
  isLicensed: string;
  npn?: string;
  licenseNumber?: string;
  licenseStatus?: string;
  licenseState?: string;
  licenseExpiration?: string;
  // Submission
  availabilityDate: string;
  howDidYouHear: string;
  referredBy?: string;
  preferredLanguage: string;
  certifyInfo: boolean;
  consentContact: boolean;
}