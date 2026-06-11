import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Shield, Zap, Building2, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRICING_PLANS } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const COMPARISON_FEATURES = [
  { feature: "Verified Profile", starter: true, professional: true, business: true },
  { feature: "Trust Score", starter: "Basic", professional: "Advanced + KYC", business: "Enterprise" },
  { feature: "Connections", starter: "50", professional: "Unlimited", business: "Unlimited" },
  { feature: "Monthly Leads", starter: "3", professional: "50", business: "Unlimited" },
  { feature: "AI Matchmaking", starter: false, professional: true, business: true },
  { feature: "Lead Marketplace", starter: false, professional: false, business: true },
  { feature: "Analytics Dashboard", starter: false, professional: true, business: true },
  { feature: "Business Verification", starter: false, professional: false, business: true },
  { feature: "Team Seats", starter: "1", professional: "1", business: "5" },
  { feature: "API Access", starter: false, professional: false, business: true },
  { feature: "CRM Integration", starter: false, professional: false, business: true },
  { feature: "Account Manager", starter: false, professional: false, business: true },
];

const FAQS = [
  { q: "Can I switch plans at any time?", a: "Yes. Upgrades take effect immediately. Downgrades take effect at the next billing cycle." },
  { q: "Is there a free trial?", a: "All paid plans include a 14-day free trial. No credit card required to start." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), and ACH transfers for annual Business plans." },
  { q: "What happens after the free trial?", a: "You will be notified 3 days before your trial ends. If you do not add a payment method, you will be moved to the Starter free plan." },
];

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            Simple Pricing,<br /><span className="gradient-text-brand">Real Value</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">Start free. Scale as your trust and business grow. No hidden fees.</p>
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-muted border border-border">
            <button onClick={() => setAnnual(false)} className={cn("px-6 py-2.5 rounded-full text-sm font-medium transition-all", !annual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={cn("px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2", annual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}>
              Annual <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-7 border transition-all",
                  plan.highlighted ? "bg-primary text-white border-primary shadow-brand-lg" : "bg-card border-border"
                )}
              >
                {plan.badge && (
                  <span className={cn("absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold", plan.highlighted ? "bg-white text-primary" : "bg-emerald-500 text-white")}>
                    {plan.badge}
                  </span>
                )}
                <div className="mb-5">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", plan.highlighted ? "bg-white/20" : "bg-primary/10")}>
                    {plan.id === "starter" && <Shield size={18} className={plan.highlighted ? "text-white" : "text-primary"} />}
                    {plan.id === "professional" && <Zap size={18} className={plan.highlighted ? "text-white" : "text-primary"} />}
                    {plan.id === "business" && <Building2 size={18} className={plan.highlighted ? "text-white" : "text-primary"} />}
                  </div>
                  <h3 className={cn("text-xl font-display font-bold mb-1", plan.highlighted ? "text-white" : "text-foreground")}>{plan.name}</h3>
                  <p className={cn("text-sm", plan.highlighted ? "text-white/70" : "text-muted-foreground")}>{plan.description}</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={cn("text-5xl font-display font-bold", plan.highlighted ? "text-white" : "text-foreground")}>
                      ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className={cn("text-sm pb-2", plan.highlighted ? "text-white/60" : "text-muted-foreground")}>
                      {plan.monthlyPrice === 0 ? "/ free" : "/mo"}
                    </span>
                  </div>
                  {annual && plan.monthlyPrice > 0 && (
                    <p className={cn("text-xs mt-0.5", plan.highlighted ? "text-white/50" : "text-muted-foreground")}>
                      Billed ${plan.yearlyPrice * 12}/yr · saves ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                    </p>
                  )}
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className={cn("flex-shrink-0 mt-0.5", plan.highlighted ? "text-white" : "text-emerald-500")} />
                      <span className={plan.highlighted ? "text-white/85" : "text-muted-foreground"}>{f}</span>
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
                          price: annual ? plan.yearlyPrice : plan.monthlyPrice,
                          billing: annual ? "annual" : "monthly"
                        }
                      : undefined
                  }
                  className={cn(
                    "block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all",
                    plan.highlighted ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:opacity-90 shadow-brand-sm"
                  )}
                >
                  {plan.monthlyPrice === 0 ? "Start for Free" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">All plans include 14-day free trial · No credit card required</p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Full Feature Comparison</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground w-1/2">Feature</th>
                    {["Starter", "Professional", "Business"].map((p) => (
                      <th key={p} className="px-4 py-4 text-center text-sm font-semibold text-foreground">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COMPARISON_FEATURES.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3.5 text-sm text-foreground">{row.feature}</td>
                      {([row.starter, row.professional, row.business] as (boolean | string)[]).map((val, j) => (
                        <td key={j} className="px-4 py-3.5 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check size={16} className="text-emerald-500 mx-auto" />
                            ) : (
                              <span className="text-muted-foreground/30 text-lg">–</span>
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  <HelpCircle size={16} className="text-muted-foreground flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Not sure which plan is right?</h2>
          <p className="text-muted-foreground mb-6">Talk to our team and we will help you find the perfect fit for your goals.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={isAuthenticated ? "/payment" : "/register"}
              state={isAuthenticated ? { planName: "Professional Plan", price: 29, billing: "monthly" } : undefined}
              className="btn-primary justify-center"
            >
              Start Free Trial <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn-secondary justify-center">Talk to Sales</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
