import { Link } from "react-router-dom";
import { Shield, Lock, Eye, CheckCircle, ArrowRight, RefreshCw, Server, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PILLARS = [
  { icon: Lock, title: "AES-256 Encryption", desc: "All user records and platform data are encrypted at rest using AES-256 and in transit using TLS 1.3." },
  { icon: Shield, title: "SOC 2 Type II Certified", desc: "Our infrastructure and security operations undergo third-party auditing to guarantee SOC 2 requirements." },
  { icon: Eye, title: "KYC Privacy Shield", desc: "Identity documents are processed through automated KYC providers and instantly discarded. TruNet never stores ID documents." }
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Trust & Safety
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Security at <span className="gradient-text-brand">TruNet</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We employ enterprise-grade security protocols to protect your professional identity, connection graphs, and business data.
            </p>
          </section>

          {/* Pillars Grid */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {PILLARS.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl border border-border bg-card card-hover flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <p.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </section>

          {/* Compliance details */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-display font-bold text-foreground">Security Auditing & Operations</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              TruNet treats security as an ongoing process of validation. Our trust frameworks are backed by automated monitoring nodes:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-muted/30 flex gap-3">
                <CheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Continuous Penetration Testing</h4>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">We conduct regular external penetration testing with trusted security groups.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-muted/30 flex gap-3">
                <CheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Audit Logging</h4>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">All administrative modifications and KYC status approvals are tracked in an immutable audit ledger.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/25 flex gap-3">
              <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400">Reporting Vulnerabilities</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  If you discover a potential vulnerability or security concern, please submit a report to <a href="mailto:security@trunet.network" className="text-primary hover:underline font-semibold">security@trunet.network</a>. We respond to verified security disclosures within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
