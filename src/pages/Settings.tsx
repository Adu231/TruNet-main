import { useState } from "react";
import { Save, Bell, Shield, CreditCard, User, Palette, Sun, Moon, Loader2, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SETTING_TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const NOTIFICATION_SETTINGS = [
  { id: "connections", label: "Connection Requests", desc: "When someone wants to connect with you", defaultOn: true },
  { id: "messages", label: "New Messages", desc: "When you receive a direct message", defaultOn: true },
  { id: "leads", label: "Lead Alerts", desc: "When new leads match your criteria", defaultOn: true },
  { id: "ai_matches", label: "AI Match Notifications", desc: "When AI finds new business matches", defaultOn: true },
  { id: "reviews", label: "New Reviews", desc: "When someone leaves you a review", defaultOn: true },
  { id: "trust_score", label: "Trust Score Changes", desc: "When your trust score changes significantly", defaultOn: false },
  { id: "newsletter", label: "Platform Newsletter", desc: "Weekly insights and platform updates", defaultOn: false },
];

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [saving, setSaving] = useState(false);
  const [notifSettings, setNotifSettings] = useState<Record<string, boolean>>(
    NOTIFICATION_SETTINGS.reduce((acc, n) => ({ ...acc, [n.id]: n.defaultOn }), {})
  );
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    website: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Sign In Required</h2>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your account preferences and platform settings.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Nav */}
            <div className="lg:col-span-1">
              <nav className="space-y-1 bg-card border border-border rounded-2xl p-3">
                {SETTING_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "sidebar-item w-full",
                      activeTab === tab.id ? "bg-primary/8 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                {/* Account */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-4">Account Information</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { label: "Full Name", field: "name", placeholder: "Your full name" },
                        { label: "Email Address", field: "email", placeholder: "your@email.com", type: "email" },
                        { label: "Phone Number", field: "phone", placeholder: "+1 (555) 000-0000" },
                        { label: "Website", field: "website", placeholder: "https://yoursite.com" },
                      ].map((f) => (
                        <div key={f.field}>
                          <label className="block text-sm font-medium text-foreground mb-2">{f.label}</label>
                          <input
                            type={f.type || "text"}
                            value={(accountForm as any)[f.field]}
                            onChange={(e) => setAccountForm({ ...accountForm, [f.field]: e.target.value })}
                            placeholder={f.placeholder}
                            className="input-field"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-medium text-foreground mb-3">Danger Zone</h3>
                      <button
                        onClick={() => toast.error("Account deletion requires email confirmation. Check your inbox.")}
                        className="px-4 py-2 rounded-lg border border-destructive/40 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                      {NOTIFICATION_SETTINGS.map((setting) => (
                        <div key={setting.id} className="flex items-start justify-between gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                          <div>
                            <p className="text-sm font-medium text-foreground">{setting.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{setting.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifSettings((prev) => ({ ...prev, [setting.id]: !prev[setting.id] }))}
                            className={cn(
                              "relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0",
                              notifSettings[setting.id] ? "bg-primary" : "bg-muted border border-input"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200",
                              notifSettings[setting.id] ? "left-6" : "left-1"
                            )} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Privacy */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-4">Privacy & Visibility</h2>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Profile Visibility</p>
                      <div className="space-y-3">
                        {[
                          { value: "public", label: "Public", desc: "Visible to all TruNet members" },
                          { value: "connections", label: "Connections Only", desc: "Only visible to your connections" },
                          { value: "private", label: "Private", desc: "Only visible to you" },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <input
                              type="radio"
                              name="visibility"
                              value={opt.value}
                              checked={profileVisibility === opt.value}
                              onChange={(e) => setProfileVisibility(e.target.value)}
                              className="mt-1 accent-primary"
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">{opt.label}</p>
                              <p className="text-xs text-muted-foreground">{opt.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border space-y-3">
                      {["Allow AI to recommend my profile", "Show my Trust Score publicly", "Allow data export requests"].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
                          <span className="text-sm text-foreground">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-4">Appearance</h2>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "light", label: "Light Mode", icon: Sun, desc: "Clean white interface" },
                          { value: "dark", label: "Dark Mode", icon: Moon, desc: "Easy on the eyes" },
                        ].map((t) => (
                          <button
                            key={t.value}
                            onClick={() => { if ((theme === "light") !== (t.value === "light")) toggleTheme(); }}
                            className={cn(
                              "p-4 rounded-xl border-2 text-left transition-all",
                              theme === t.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                            )}
                          >
                            <t.icon size={20} className={cn("mb-2", theme === t.value ? "text-primary" : "text-muted-foreground")} />
                            <p className={cn("text-sm font-medium", theme === t.value ? "text-primary" : "text-foreground")}>{t.label}</p>
                            <p className="text-xs text-muted-foreground">{t.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing */}
                {activeTab === "billing" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-display font-semibold text-foreground border-b border-border pb-4">Billing & Subscription</h2>
                    <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">Professional Plan</h3>
                        <span className="trust-badge bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">Active</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">$29/month · Renews Jul 1, 2026</p>
                      <div className="flex gap-3">
                        <Link to="/pricing" className="text-sm text-primary font-medium hover:underline">Upgrade Plan</Link>
                        <span className="text-muted-foreground">·</span>
                        <button onClick={() => toast.info("Cancellation flow coming soon.")} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Payment Method</h3>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                        <div className="w-10 h-7 bg-primary/10 rounded flex items-center justify-center text-xs font-bold text-primary">VISA</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                        </div>
                        <button className="text-sm text-primary hover:underline">Update</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                {activeTab !== "billing" && (
                  <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary disabled:opacity-60"
                    >
                      {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : <><Save size={15} /> Save Changes</>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
