import { ReactNode } from 'react';

export interface LocalizedString {
  en: string;
  es: string;
}

export interface KeyFeature {
  icon: string; // Changed from ReactNode to string
  title: LocalizedString;
  description: LocalizedString;
}

export interface ServiceItem {
  id: string;
  brandColor: 'blue' | 'orange' | 'green';
  icon: string; // Changed from ReactNode to string
  title: LocalizedString;
  description: LocalizedString;
  details: LocalizedString;
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
  id?: string;
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

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    message?: string;
    coverage?: string;
    type: 'General' | 'Agent' | 'Service';
    target?: string; // Agent name or Service name for leads
    timestamp: string;
    source?: string;
}

export interface ApplicationSubmission {
    id: string;
    data: AgentApplicationData;
    timestamp: string;
}

export interface Appointment {
    id: string;
    timestamp: string;
    name: string;
    email: string;
    phone: string;
    serviceOfInterest: string;
}