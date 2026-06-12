import { useState } from "react";
import { Download, ShieldCheck, Mail, ArrowRight, FileText, Image, Users, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const ASSETS = [
  { name: "TruNet Logo Pack (SVG, PNG, EPS)", size: "4.8 MB", type: "logos" },
  { name: "TruNet Platform Screenshots (HD)", size: "12.4 MB", type: "images" },
  { name: "TruNet Brand Identity Guidelines (PDF)", size: "2.1 MB", type: "guidelines" },
];

const PRESS_RELEASES = [
  { date: "May 12, 2026", title: "TruNet Crosses 240,000 Verified Professionals, Facilitates Over $2.4B in B2B Value" },
  { date: "March 8, 2026", title: "TruNet Unveils Upgraded AI-Powered Matchmaking Engine with 96% Match Relevance Score" },
  { date: "November 14, 2025", title: "TruNet Secures SOC 2 Type II Certification, Strengthening Compliance Standards for Enterprise Network" }
];

export default function PressKit() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (name: string) => {
    setDownloading(name);
    setTimeout(() => {
      setDownloading(null);
      toast.success(`Started download: ${name}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Press Room
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            Official Brand & <span className="gradient-text-brand">Media Kit</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Official assets, guidelines, statistics, and press releases about TruNet. Everything you need to write about our professional network trust layer.
          </p>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Members", value: "240,000+" },
            { label: "Facilitated Value", value: "$2.4B+" },
            { label: "Countries Active", value: "80+" },
            { label: "Trust Audits Done", value: "1.2M+" },
          ].map((st) => (
            <div key={st.label} className="p-5 rounded-2xl border border-border bg-card text-center shadow-sm">
              <div className="text-2xl font-display font-bold text-primary mb-1">{st.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{st.label}</div>
            </div>
          ))}
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-8 items-start">
          {/* Assets (left columns) */}
          <div className="md:col-span-3 space-y-6">
            <div className="mb-4">
              <h2 className="text-xl font-display font-bold text-foreground">Media Assets</h2>
              <p className="text-xs text-muted-foreground mt-1">Download high-resolution logos, brand guidelines, and app assets.</p>
            </div>

            <div className="space-y-3">
              {ASSETS.map((asset) => (
                <div key={asset.name} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {asset.type === "logos" && <Award size={16} />}
                      {asset.type === "images" && <Image size={16} />}
                      {asset.type === "guidelines" && <FileText size={16} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">{asset.name}</h4>
                      <span className="text-[10px] text-muted-foreground">{asset.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(asset.name)}
                    disabled={downloading !== null}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                    aria-label="Download asset"
                  >
                    {downloading === asset.name ? (
                      <div className="w-4 h-4 rounded-full border border-primary border-t-transparent animate-spin" />
                    ) : (
                      <Download size={14} />
                    )}
                  </button>
                </div>
              ))}
            </div>
            
            {/* Press Releases */}
            <div className="pt-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">Recent News & Updates</h2>
              <div className="space-y-4">
                {PRESS_RELEASES.map((pr) => (
                  <div key={pr.title} className="p-5 rounded-2xl border border-border bg-card/40 hover:bg-card transition-colors">
                    <span className="text-[10px] font-semibold text-primary">{pr.date}</span>
                    <h3 className="font-bold text-foreground text-sm mt-1">{pr.title}</h3>
                    <button
                      onClick={() => toast.info("Opening news release details...")}
                      className="text-[11px] text-primary hover:underline font-semibold mt-2.5 flex items-center gap-0.5"
                    >
                      Read full release <ArrowRight size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Contact (right columns) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Mail size={18} />
              </div>
              <h3 className="font-display font-bold text-foreground text-sm mb-2">Media Relations Contact</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                For media inquiries, interview requests, or high-resolution photo mandates, reach out to our communications team directly.
              </p>
              
              <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border pt-4">
                <div>
                  <span className="font-semibold text-foreground">Email:</span>
                  <p className="mt-0.5">press@trunet.network</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Phone:</span>
                  <p className="mt-0.5">+1 (415) 555-0190</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Location:</span>
                  <p className="mt-0.5">TruNet Inc. Communications Office<br />101 Market Street, San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 space-y-3">
              <h4 className="font-bold text-foreground text-xs flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-primary" /> Brand Integrity Notice
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                By downloading TruNet brand assets, you agree to follow the style guidelines. Use official color specifications and do not distort or alter the signature logo shapes.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
