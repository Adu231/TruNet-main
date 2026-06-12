import { Link } from "react-router-dom";
import { ShieldCheck, CheckCircle, Mail, ArrowRight, UserCheck, Trash2, FileText, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const RIGHTS = [
  { icon: UserCheck, title: "Right of Access & Portability", desc: "You can request a complete archive of your professional data records and connections graph at any time." },
  { icon: Trash2, title: "Right to Erasure (Forget)", desc: "Deleting your account completely purges all verification records, profile logs, and connections from the active index." },
  { icon: FileText, title: "Right to Rectification", desc: "All skill tags, work descriptions, and company designations can be corrected instantly inside your profile dashboard." }
];

export default function GdprPage() {
  const handleExportData = () => {
    toast.success("Preparing your data export archive. Download link will be sent to your email.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Compliance
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              GDPR <span className="gradient-text-brand">Compliance</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              TruNet is built from the ground up to respect data privacy rights under the General Data Protection Regulation (GDPR).
            </p>
          </section>

          {/* Rights Grid */}
          <section className="grid md:grid-cols-3 gap-6 mb-12">
            {RIGHTS.map((r) => (
              <div key={r.title} className="p-6 rounded-2xl border border-border bg-card card-hover flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <r.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-sm">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </section>

          {/* Interactive data export & DPO details */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 space-y-4">
              <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="text-primary" size={18} /> Export Your Personal Data
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As part of our commitment to data portability under GDPR Art. 20, you can download all personal records, audit logs, and trust score metrics registered with TruNet.
              </p>
              <button
                onClick={handleExportData}
                className="btn-primary py-2.5 px-4 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download size={14} /> Request Data Export
              </button>
            </div>
            
            <div className="md:col-span-2 p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
              <h4 className="font-bold text-foreground text-xs flex items-center gap-1.5">
                <Mail size={14} className="text-primary" /> Data Protection Officer
              </h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                If you have questions about data processing or want to exercise your GDPR privacy rights, reach our Data Protection Officer:
              </p>
              <div className="text-[11px] font-semibold text-primary">
                Email: dpo@trunet.network
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
