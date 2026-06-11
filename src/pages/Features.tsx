import { Link } from "react-router-dom";
import {
  ShieldCheck, Sparkles, TrendingUp, Star, Network, BarChart3,
  Users, Briefcase, MessageSquare, Calendar, Globe, Zap,
  Check, ArrowRight, Lock, Eye, RefreshCw
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const FEATURES_SECTIONS = [
  {
    id: "verified-identity",
    title: "Verified Identity & Trust Scoring",
    desc: "TruNet's KYC-grade identity verification establishes real-world credentials for every member. Our multi-factor Trust Score algorithm combines identity verification, work history, peer endorsements, project completion, and response quality into a single credibility metric that compounds over time.",
    icon: ShieldCheck,
    color: "blue",
    highlights: ["Government ID verification", "Business registration check", "Digital Trust Score (0–100)", "Verification badges", "KYC-grade compliance", "Trust history audit trail"],
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop",
  },
  {
    id: "ai-matchmaking",
    title: "AI Business Matchmaking Engine",
    desc: "Our proprietary AI engine analyzes 200+ behavioral and professional data points to surface business matches with up to 96% relevance. From partner discovery and client matching to investor introduction and vendor recommendation — every match is qualified, not random.",
    icon: Sparkles,
    color: "emerald",
    highlights: ["Partner & client matching", "Investor discovery", "Vendor & supplier matching", "Skill-based talent matching", "Real-time match updates", "89% conversion improvement"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop",
  },
  {
    id: "lead-generation",
    title: "B2B Lead Generation & Marketplace",
    desc: "Access a curated marketplace of qualified business leads. Post service requests, respond to RFQs, browse active project listings, and receive AI-qualified lead alerts — all in a trust-verified environment where every participant has a credibility score.",
    icon: TrendingUp,
    color: "blue",
    highlights: ["Lead marketplace access", "RFQ management", "Project listings", "AI lead qualification", "Lead scoring algorithm", "B2B opportunity alerts"],
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
  },
  {
    id: "freelance-marketplace",
    title: "Freelance & Service Marketplace",
    desc: "A professional services ecosystem designed for trust. Verified freelancers publish service catalogs, manage proposals, track milestones, and build reputation through verified client reviews — creating a merit-based marketplace where quality rises to the top.",
    icon: Briefcase,
    color: "emerald",
    highlights: ["Verified freelancer profiles", "Service catalog builder", "Proposal & contract tools", "Milestone tracking", "Verified client reviews", "Dispute resolution system"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
  },
];

const ADDITIONAL_FEATURES = [
  { icon: Network, title: "Smart Networking", desc: "Industry-specific connection recommendations based on your goals and activity." },
  { icon: Star, title: "Reputation Analytics", desc: "Track endorsements, reviews, and reputation growth with detailed analytics." },
  { icon: Users, title: "Talent Discovery", desc: "Skill-verified recruitment matching for employers and job seekers." },
  { icon: MessageSquare, title: "Encrypted Messaging", desc: "End-to-end encrypted direct messaging with file sharing capabilities." },
  { icon: Calendar, title: "Events Platform", desc: "Host and attend networking events, webinars, and virtual conferences." },
  { icon: BarChart3, title: "Business Intelligence", desc: "Real-time dashboards for network growth, lead conversion, and opportunity tracking." },
  { icon: Globe, title: "Global Directory", desc: "Searchable directory of 240K+ verified professionals across 80+ countries." },
  { icon: Zap, title: "AI Assistant", desc: "Your AI-powered business development assistant for insights and recommendations." },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Platform Features</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-5">
            Built for Trust.<br />
            <span className="gradient-text-brand">Engineered for Growth.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every TruNet feature is designed around one principle: that trust is the most valuable currency in business. Explore how we make trust measurable, scalable, and actionable.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {["KYC Verified", "AI-Powered", "SOC 2 Certified", "GDPR Ready"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {FEATURES_SECTIONS.map((feature, i) => (
            <div
              key={feature.id}
              id={feature.id}
              className={cn("grid lg:grid-cols-2 gap-12 lg:gap-16 items-center", i % 2 === 1 && "lg:grid-flow-dense")}
            >
              <div className={cn(i % 2 === 1 && "lg:col-start-2")}>
                <div className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4",
                  feature.color === "blue" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                )}>
                  <feature.icon size={13} />
                  Feature Highlight
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">{feature.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{feature.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  {feature.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={cn("w-4 h-4 rounded flex items-center justify-center flex-shrink-0", feature.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-emerald-100 dark:bg-emerald-900/30")}>
                        <Check size={10} className={feature.color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"} />
                      </div>
                      {h}
                    </div>
                  ))}
                </div>
                <Link to="/register" className="btn-primary">
                  Try {feature.title.split(" ")[0]} Free <ArrowRight size={15} />
                </Link>
              </div>
              <div className={cn("relative", i % 2 === 1 && "lg:col-start-1 lg:row-start-1")}>
                <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  <img src={feature.image} alt={feature.title} className="w-full object-cover aspect-[4/3]" />
                </div>
                <div className={cn(
                  "absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20 blur-lg",
                  feature.color === "blue" ? "bg-blue-500" : "bg-emerald-500"
                )} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
              And Much More
            </h2>
            <p className="text-muted-foreground">The complete professional trust platform with everything you need to grow.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADDITIONAL_FEATURES.map((f) => (
              <div key={f.title} className="p-5 rounded-2xl bg-card border border-border card-hover group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <f.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
              Enterprise-Grade Security
            </h2>
            <p className="text-muted-foreground">Your trust and data are protected by the highest security standards.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Lock, title: "256-bit Encryption", desc: "All data at rest and in transit is protected with AES-256 encryption." },
              { icon: Eye, title: "SOC 2 Type II", desc: "Independently audited and certified for security, availability, and confidentiality." },
              { icon: RefreshCw, title: "99.9% Uptime SLA", desc: "Enterprise reliability backed by a formal uptime service level agreement." },
            ].map((s) => (
              <div key={s.title} className="text-center p-6 rounded-2xl border border-border bg-card">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Ready to Experience TruNet?</h2>
          <p className="text-muted-foreground mb-6">Start your free account and discover the power of verified professional networking.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary justify-center">Get Started Free <ArrowRight size={15} /></Link>
            <Link to="/pricing" className="btn-secondary justify-center">View Pricing</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
