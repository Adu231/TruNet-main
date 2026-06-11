import { useState } from "react";
import { AlertTriangle, Shield, Check, X, Search, Skull } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_ALERTS = [
  { id: "f1", type: "Duplicate Identity", user: "user_4821", details: "Two accounts with matching face vectors and phone registration details.", severity: "high", status: "open" },
  { id: "f2", type: "Spam Connections", user: "user_5501", details: "Sent 45 connection invitations within 10 minutes to random profiles.", severity: "medium", status: "open" },
  { id: "f3", type: "Credential Forgery", user: "user_2290", details: "Uploaded a modified diploma certificate image with mismatched names.", severity: "high", status: "open" },
  { id: "f4", type: "Fake Reviews", user: "user_9032", details: "Cross-reviewing network circle to artificially inflate Trust Scores.", severity: "low", status: "resolved" },
];

export default function AdminFraud() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [search, setSearch] = useState("");

  const handleAction = (id: string, action: "resolve" | "freeze") => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: action === "resolve" ? "resolved" : "frozen" } : a));
    toast.success(`Fraud ticket ${id} has been ${action === "resolve" ? "marked resolved" : "suspended and frozen"}!`);
  };

  const filtered = alerts.filter(a => !search || a.type.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <AlertTriangle size={22} className="text-red-500" /> Fraud & Abuse Desk
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Prevent identity theft, spam networks, and fake review scams.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search alerts..." className="input-field pl-11 py-1.5 text-xs" />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(a => (
            <div key={a.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground text-sm">{a.type}</h3>
                  <span className={cn(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase",
                    a.severity === "high" ? "bg-red-500/10 text-red-500 border-red-500/20" : a.severity === "medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  )}>{a.severity} Severity</span>
                  <span className={cn(
                    "text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize",
                    a.status === "resolved" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : a.status === "frozen" ? "bg-gray-500/10 text-gray-500 border border-gray-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                  )}>{a.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">Flagged Node: <strong className="text-foreground">{a.user}</strong></p>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.details}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {a.status === "open" && (
                  <>
                    <button onClick={() => handleAction(a.id, "resolve")} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1 bg-emerald-600 hover:bg-emerald-600/90 text-white">
                      <Check size={12} /> Resolve
                    </button>
                    <button onClick={() => handleAction(a.id, "freeze")} className="btn-secondary py-1.5 px-3 text-xs font-semibold text-red-500 hover:bg-red-500/10 border-red-500/20 flex items-center gap-1">
                      <Skull size={12} /> Freeze Account
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Shield size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Ecosystem is secure, no fraud alerts open.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
