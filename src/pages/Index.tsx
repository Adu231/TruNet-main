import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Sparkles, TrendingUp, Star, Network, BarChart3,
  Play, CheckCircle, ChevronDown, Quote, Check, Users, Zap, Globe, X
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrustScore from "@/components/features/TrustScore";
import AnimatedCounter from "@/components/features/AnimatedCounter";
import { TESTIMONIALS, PRICING_PLANS, FAQ_ITEMS, STATS, WORKFLOW_STEPS } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import heroBg from "@/assets/hero-bg.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-white shadow-brand flex items-center justify-center transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ChevronDown size={18} className="rotate-180" />
    </button>
  );
}

const FEATURE_CARDS = [
  { icon: ShieldCheck, title: "Verified Identity", desc: "KYC-grade verification with digital trust scores and professional badges.", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", href: "/features#verified-identity" },
  { icon: Sparkles, title: "AI Matchmaking", desc: "Intelligent engine surfaces the right partners, clients, and collaborators.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400", href: "/features#ai-matchmaking" },
  { icon: TrendingUp, title: "Lead Generation", desc: "Qualified B2B lead marketplace with automated qualification systems.", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", href: "/features#lead-generation" },
  { icon: Star, title: "Trust Score", desc: "Comprehensive reputation analytics combining reviews and endorsements.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400", href: "/features#verified-identity" },
  { icon: Network, title: "Smart Networking", desc: "Industry-based suggestions powered by AI to grow your circle strategically.", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", href: "/features" },
  { icon: BarChart3, title: "Business Intelligence", desc: "Real-time dashboards with growth analytics and opportunity reports.", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400", href: "/features" },
];

const BENEFITS = [
  { title: "2.3× More Project Wins", desc: "Verified professionals win business at more than double the rate of unverified peers.", icon: TrendingUp },
  { title: "60% Faster Hiring", desc: "Skill-verified candidate discovery reduces time-to-hire by 60% for recruiters.", icon: Zap },
  { title: "89% Match Accuracy", desc: "AI matchmaking surfaces partnerships with 89% higher conversion than cold outreach.", icon: Sparkles },
  { title: "240K+ Global Network", desc: "Access a growing ecosystem of verified professionals across 80+ countries.", icon: Globe },
];

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [pricingAnnual, setPricingAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const featuresRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTopBtn />

      {/* ─── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
        <div className="absolute inset-0">
          <img src={heroBg} alt="TruNet Hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(222,84%,5%)]/40 to-[hsl(222,84%,5%)]" />
        </div>
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/8 blur-3xl animate-float delay-300" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles size={14} />
            AI-Powered Business Trust Platform
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
            Build Trust.
            <br />
            <span className="gradient-text-brand">Grow Business.</span>
            <br />
            Get Verified.
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            TruNet is the only professional network where every profile is verified, every connection is meaningful, and every opportunity is qualified through AI-powered trust intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300 w-full px-4">
            <Link to="/register" className="btn-primary text-base w-full sm:w-[240px] py-3.5 shadow-brand-lg">
              Start for Free <ArrowRight size={32} />
            </Link>
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-[240px] py-3.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-base font-medium"
            >
              <Play size={12} fill="currentColor" /> See How It Works
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up delay-400">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-xs text-white/50 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-in delay-500">
            {["SOC 2 Type II", "KYC Verified", "GDPR Ready", "256-bit Encryption"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-white/40 text-xs">
                <CheckCircle size={12} className="text-emerald-500" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURES ────────────────────────────────────────────────────── */}
      <section ref={featuresRef as React.RefObject<HTMLElement>} className="section-padding bg-background">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Everything You Need to{" "}
              <span className="gradient-text-brand">Build Business Trust</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From verified identity to AI-powered lead generation — TruNet provides the complete infrastructure for trust-driven business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_CARDS.map((f, i) => (
              <Link
                key={f.title}
                to={f.href}
                className={cn(
                  "p-7 rounded-2xl border border-border bg-card card-hover group block text-left",
                  i === 0 && "lg:col-span-1"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5", f.color)}>
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold font-display text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/features" className="btn-secondary">
              Explore All Features <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 3. PRODUCT WORKFLOW ──────────────────────────────────────────── */}
      <section className="section-padding bg-muted/40">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Your Journey from Profile<br />to{" "}
              <span className="gradient-text-brand">Business Growth</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-emerald-500/20 z-0" />

            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step.step} className="relative z-10 text-center group">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-card border-2 border-border group-hover:border-primary/40 shadow-card transition-all duration-300 mb-6 mx-auto">
                  <span className="text-xs font-bold text-primary absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  {step.step === "01" && <ShieldCheck size={24} className="text-primary" />}
                  {step.step === "02" && <Sparkles size={24} className="text-emerald-500" />}
                  {step.step === "03" && <Users size={24} className="text-primary" />}
                  {step.step === "04" && <TrendingUp size={24} className="text-emerald-500" />}
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register" className="btn-primary text-base px-8 py-3">
              Start Your Journey <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. BENEFITS ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Why TruNet
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Results That Speak<br />
                <span className="gradient-text-brand">for Themselves</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                TruNet members consistently outperform their peers across every business metric. Trust is not just a value — it is a competitive advantage.
              </p>
              <div className="space-y-4">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/20 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <b.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-0.5">{b.title}</h4>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Trust Score Demo Card */}
              <div className="relative bg-card border border-border rounded-3xl p-8 shadow-card">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">Trust Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Your credibility at a glance</p>
                  </div>
                  <span className="trust-badge bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>

                <div className="flex items-center gap-8 mb-8">
                  <TrustScore score={92} size="lg" />
                  <div className="flex-1 space-y-3">
                    {[
                      { label: "Identity Verified", value: 100 },
                      { label: "Profile Complete", value: 95 },
                      { label: "Reviews Score", value: 88 },
                      { label: "Response Rate", value: 97 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Connections", value: "847" },
                    { label: "Reviews", value: "124" },
                    { label: "Projects", value: "53" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-muted/60">
                      <div className="text-xl font-bold font-display text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 bg-card border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 shadow-card-hover animate-float">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-xs">New Match Found!</p>
                    <p className="text-xs text-muted-foreground">96% compatibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. DASHBOARD PREVIEW ─────────────────────────────────────────── */}
      <section className="section-padding bg-foreground/[0.02] dark:bg-white/[0.02]">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Platform Preview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              An Intelligent Dashboard<br />
              <span className="gradient-text-brand">Built for Business Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor your network growth, lead pipeline, trust score, and business intelligence in a single unified workspace.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-border shadow-[0_32px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
            {/* Browser chrome */}
            <div className="bg-muted/80 dark:bg-zinc-900 px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground max-w-xs">
                  app.trunet.ai/dashboard
                </div>
              </div>
            </div>
            <img
              src={dashboardPreview}
              alt="TruNet Dashboard Preview"
              className="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <div className="text-center mt-8">
            <Link to="/dashboard" className="btn-primary text-base px-8 py-3">
              Explore the Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Trusted by{" "}
              <span className="gradient-text-brand">Thousands of Professionals</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-6 rounded-2xl border border-border bg-card card-hover flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <Quote size={20} className="text-primary/30 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{t.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                      <ShieldCheck size={12} className="text-primary flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{t.title} · {t.company}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">{t.trustScore}</div>
                    <div className="text-[10px] text-muted-foreground">Trust Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. PRICING ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-muted/40" id="pricing">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Simple, Transparent{" "}
              <span className="gradient-text-brand">Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">Start free, scale when you are ready.</p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-muted border border-border">
              <button
                onClick={() => setPricingAnnual(false)}
                className={cn("px-5 py-2 rounded-full text-sm font-medium transition-all duration-200", !pricingAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
              >
                Monthly
              </button>
              <button
                onClick={() => setPricingAnnual(true)}
                className={cn("px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2", pricingAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
              >
                Annual <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-7 border transition-all duration-300",
                  plan.highlighted
                    ? "bg-primary text-white border-primary shadow-brand-lg scale-[1.02]"
                    : "bg-card border-border card-hover"
                )}
              >
                {plan.badge && (
                  <span className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold",
                    plan.highlighted ? "bg-white text-primary" : "bg-emerald-500 text-white"
                  )}>
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={cn("text-xl font-display font-bold mb-1", plan.highlighted ? "text-white" : "text-foreground")}>{plan.name}</h3>
                  <p className={cn("text-sm leading-relaxed", plan.highlighted ? "text-white/70" : "text-muted-foreground")}>{plan.description}</p>
                </div>

                <div className="mb-7">
                  <div className="flex items-end gap-1">
                    <span className={cn("text-5xl font-display font-bold", plan.highlighted ? "text-white" : "text-foreground")}>
                      ${pricingAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className={cn("text-sm pb-2", plan.highlighted ? "text-white/60" : "text-muted-foreground")}>
                      {plan.monthlyPrice === 0 ? "forever free" : "/mo"}
                    </span>
                  </div>
                  {pricingAnnual && plan.monthlyPrice > 0 && (
                    <p className={cn("text-xs mt-1", plan.highlighted ? "text-white/60" : "text-muted-foreground")}>
                      Billed ${plan.yearlyPrice * 12}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className={cn("flex-shrink-0 mt-0.5", plan.highlighted ? "text-white" : "text-emerald-500")} />
                      <span className={plan.highlighted ? "text-white/85" : "text-muted-foreground"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={
                    isAuthenticated
                      ? plan.monthlyPrice === 0
                        ? "/dashboard"
                        : "/payment"
                      : "/register"
                  }
                  state={
                    isAuthenticated && plan.monthlyPrice > 0
                      ? {
                          planName: plan.name,
                          price: pricingAnnual ? plan.yearlyPrice : plan.monthlyPrice,
                          billing: pricingAnnual ? "annual" : "monthly"
                        }
                      : undefined
                  }
                  className={cn(
                    "block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                    plan.highlighted
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:opacity-90 shadow-brand-sm"
                  )}
                >
                  {plan.monthlyPrice === 0 ? "Get Started Free" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ─── 8. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Frequently Asked{" "}
              <span className="gradient-text-brand">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.slice(0, 6).map((faq) => (
              <div key={faq.id} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn("text-muted-foreground flex-shrink-0 transition-transform duration-200", openFaq === faq.id && "rotate-180")}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faq" className="btn-secondary">
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 9. CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-[hsl(222,84%,5%)]/95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 container-max text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
            <Sparkles size={14} />
            Join 240,000+ Verified Professionals
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Build Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Trusted Business Network?
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Start free today. Get verified in minutes. Watch your business opportunities multiply.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <Link to="/register" className="btn-primary text-base w-full sm:w-[240px] py-4 shadow-brand-lg">
              Create Free Account <ArrowRight size={34} />
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 w-full sm:w-[240px] py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-base font-medium">
              Talk to Sales
            </Link>
          </div>
          <p className="text-white/30 text-sm mt-6">No credit card required · Free forever plan · Cancel anytime</p>
        </div>
      </section>

      {/* ─── 10. FOOTER ──────────────────────────────────────────────────────── */}
      <Footer />

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setShowVideoModal(false)} 
          />
          
          {/* Content Container */}
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-white font-display">TruNet Product Walkthrough</span>
              </div>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Video Aspect Ratio Wrapper */}
            <div className="aspect-video bg-black relative">
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-data-screens-with-charts-and-graphs-42007-large.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop"
              />
            </div>
            
            {/* Modal Footer / Features Overlay */}
            <div className="p-5 bg-zinc-900/50 border-t border-zinc-800 text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-4">
              <p>Demo showcasing AI Matches, Verification queue, and Lead Pipeline integration.</p>
              <div className="flex items-center gap-3">
                <Link 
                  to="/register" 
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-opacity animate-pulse"
                >
                  Get Verified Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
