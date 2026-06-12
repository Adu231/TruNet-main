import { useState, useEffect } from "react";
import type { User } from "@/types";

export const DEMO_ACCOUNTS: Record<string, User & { password: string }> = {
  "professional@trunet.demo": {
    id: "usr_pro_001",
    name: "Alex Johnson",
    email: "professional@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    role: "professional",
    title: "Senior Product Manager",
    company: "InnovateTech Corp",
    location: "San Francisco, CA",
    bio: "Product leader with 8+ years building B2B SaaS platforms. Passionate about AI-driven growth and verified professional networks.",
    trustScore: 92,
    isVerified: true,
    isKYCVerified: true,
    connections: 847,
    joinedAt: "2024-03-15",
  },
  "business@trunet.demo": {
    id: "usr_biz_002",
    name: "Sarah Mitchell",
    email: "business@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    role: "business",
    title: "Founder & CEO",
    company: "Apex Ventures",
    location: "New York, NY",
    bio: "Serial entrepreneur building enterprise SaaS solutions for global markets. Focused on verified business partnerships and sustainable revenue growth.",
    trustScore: 94,
    isVerified: true,
    isKYCVerified: true,
    connections: 1240,
    joinedAt: "2023-11-01",
  },
  "freelancer@trunet.demo": {
    id: "usr_free_003",
    name: "Marcus Chen",
    email: "freelancer@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    role: "freelancer",
    title: "Independent Strategy Consultant",
    company: "Chen Strategy Group",
    location: "Singapore",
    bio: "Boutique strategy consultant with 10+ years helping tech startups scale. Specializing in go-to-market strategy, fundraising narratives, and growth architecture.",
    trustScore: 96,
    isVerified: true,
    isKYCVerified: true,
    connections: 412,
    joinedAt: "2024-01-20",
  },
  "recruiter@trunet.demo": {
    id: "usr_rec_004",
    name: "Priya Sharma",
    email: "recruiter@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    role: "recruiter",
    title: "Senior Talent Acquisition Lead",
    company: "HireForce Pro",
    location: "Toronto, CA",
    bio: "Specialized in tech and product roles across Series A–C startups. Placed 300+ verified candidates. Using TruNet to find and verify top-tier talent faster.",
    trustScore: 88,
    isVerified: true,
    isKYCVerified: false,
    connections: 2100,
    joinedAt: "2023-08-12",
  },
  "investor@trunet.demo": {
    id: "usr_inv_005",
    name: "Adeola Williams",
    email: "investor@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
    role: "investor",
    title: "Investment Partner",
    company: "Frontier Capital",
    location: "Lagos, NG",
    bio: "Early-stage investor focused on African and emerging market startups. Managing a $40M fund with 22 active portfolio companies across fintech, health, and climate.",
    trustScore: 92,
    isVerified: true,
    isKYCVerified: true,
    connections: 3400,
    joinedAt: "2023-05-22",
  },
  "expert@trunet.demo": {
    id: "usr_exp_006",
    name: "Dr. Yuki Tanaka",
    email: "expert@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
    role: "expert",
    title: "AI Strategy & Community Lead",
    company: "Tanaka Institute",
    location: "Tokyo, JP",
    bio: "Author of two books on AI strategy. Mentor to 150+ professionals. Building the intersection of AI literacy, business strategy, and professional community on TruNet.",
    trustScore: 98,
    isVerified: true,
    isKYCVerified: true,
    connections: 5800,
    joinedAt: "2022-12-01",
  },
  "admin@trunet.demo": {
    id: "usr_adm_007",
    name: "James Okonkwo",
    email: "admin@trunet.demo",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    role: "admin",
    title: "Platform Trust & Safety Director",
    company: "TruNet Inc.",
    location: "London, UK",
    bio: "Leading trust governance, verification infrastructure, and fraud prevention for TruNet's global platform. Ensuring ecosystem integrity for 240K+ members.",
    trustScore: 100,
    isVerified: true,
    isKYCVerified: true,
    connections: 847,
    joinedAt: "2022-06-01",
  },
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("trunet-auth");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("trunet-auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailKey = email.toLowerCase().trim();
        const demoAccount = DEMO_ACCOUNTS[emailKey];
        if (demoAccount && (demoAccount.password === password || password === "demo123")) {
          const { password: _pw, ...userData } = demoAccount;
          setUser(userData);
          localStorage.setItem("trunet-auth", JSON.stringify(userData));
          resolve(true);
        } else {
          // Generic login fallback
          const userData: User = {
            id: `usr_${Date.now()}`,
            name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            email,
            role: "professional",
            title: "Professional",
            company: "",
            location: "",
            bio: "",
            trustScore: 65,
            isVerified: false,
            isKYCVerified: false,
            connections: 0,
            joinedAt: new Date().toISOString(),
          };
          setUser(userData);
          localStorage.setItem("trunet-auth", JSON.stringify(userData));
          resolve(true);
        }
      }, 1000);
    });
  };

  const register = (name: string, email: string, _password: string, role: string = "professional", company: string = ""): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const defaultAvatar = role === "business" 
          ?"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
          : role === "freelancer"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
          : role === "recruiter"
          ? "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face";

        const userData: User = {
          id: `usr_${Date.now()}`,
          name,
          email,
          role: role as any,
          avatar: defaultAvatar,
          title: role === "business" ? "Founder & CEO" : role.charAt(0).toUpperCase() + role.slice(1),
          company,
          location: "New York, NY",
          bio: `Verified ${role} on TruNet.`,
          trustScore: 45,
          isVerified: false,
          isKYCVerified: false,
          connections: 0,
          joinedAt: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem("trunet-auth", JSON.stringify(userData));
        resolve(true);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trunet-auth");
  };

  const updateProfile = (updates: Partial<User>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          const updated = { ...user, ...updates };
          setUser(updated);
          localStorage.setItem("trunet-auth", JSON.stringify(updated));
        }
        resolve(true);
      }, 800);
    });
  };

  return { user, isLoading, isAuthenticated: !!user, login, register, logout, updateProfile };
}
