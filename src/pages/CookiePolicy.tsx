import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Info, ArrowRight, Lock, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function CookiePolicy() {
  const [prefAnalytics, setPrefAnalytics] = useState(true);
  const [prefMarketing, setPrefMarketing] = useState(false);

  const handleSavePreferences = () => {
    toast.success("Cookie preferences saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Legal Policy
            </span>
            <h1 className="text-4xl font-display font-bold text-foreground mb-3">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: June 1, 2026</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed text-muted-foreground">
            <p className="text-sm">
              TruNet uses cookies and similar tracking technologies to coordinate user sessions, improve service latency, and secure professional identity verifications.
            </p>

            <div className="border border-border bg-card rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-bold text-foreground mb-1">1. Essential Cookies (Strictly Required)</h2>
              <p>
                These cookies are absolutely necessary to provide secure authentication, session persistence, and security controls. The platform cannot function without these.
              </p>
              <table className="w-full text-left border-collapse text-[11px] text-muted-foreground">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-foreground font-semibold">Cookie Name</th>
                    <th className="py-2 text-foreground font-semibold">Purpose</th>
                    <th className="py-2 text-foreground font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 font-mono text-primary">trunet-auth</td>
                    <td className="py-2">Remembers user login state and session token.</td>
                    <td className="py-2">Session / 30 Days</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-primary">trunet-theme</td>
                    <td className="py-2">Saves selected aesthetic preference (Light/Dark mode).</td>
                    <td className="py-2">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-border bg-card rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-bold text-foreground mb-1">2. Custom Cookie Preferences</h2>
              <p>
                Select which non-essential cookies you authorize TruNet to use during your browsing experience.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <div>
                    <h4 className="font-semibold text-foreground text-xs">Analytics Cookies</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Helps us monitor connection volumes, page routing latency, and overall UI usage.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefAnalytics}
                    onChange={(e) => setPrefAnalytics(e.target.checked)}
                    className="w-4 h-4 rounded text-primary border-border bg-background focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <div>
                    <h4 className="font-semibold text-foreground text-xs">Marketing & Referral Cookies</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Tracks invitations links, affiliate referral campaigns, and B2B growth statistics.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefMarketing}
                    onChange={(e) => setPrefMarketing(e.target.checked)}
                    className="w-4 h-4 rounded text-primary border-border bg-background focus:ring-primary"
                  />
                </div>
              </div>

              <button
                onClick={handleSavePreferences}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
