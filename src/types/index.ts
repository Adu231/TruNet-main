export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "professional" | "business" | "freelancer" | "recruiter" | "investor" | "expert" | "admin";
  title?: string;
  company?: string;
  location?: string;
  bio?: string;
  trustScore: number;
  isVerified: boolean;
  isKYCVerified: boolean;
  connections: number;
  joinedAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  trustScore: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  image: string;
  slug: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Lead {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: "new" | "contacted" | "qualified" | "proposal" | "closed";
  date: string;
  score: number;
}

export interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  trustScore: number;
  isVerified: boolean;
  mutualConnections: number;
}

export interface Notification {
  id: string;
  type: "connection" | "lead" | "message" | "system" | "verification";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}
