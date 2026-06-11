import { useState } from "react";
import {
  ShieldCheck, Users, AlertTriangle, TrendingUp, Activity,
  CheckCircle, XCircle, Clock, Search, BarChart3, Globe,
  Lock, Flag, RefreshCw, Database, Bell, Shield, Eye
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { toast } from "sonner";

const userGrowthData = [
  { month: "Jan", users: 184000, verified: 162000 }, { month: "Feb", users: 196000, verified: 172000 },
  { month: "Mar", users: 207000, verified: 182000 }, { month: "Apr", users: 218000, verified: 193000 },
  { month: "May", users: 230000, verified: 205000 }, { month: "Jun", users: 240000, verified: 216000 },
];

const fraudData = [
  { week: "W1", flagged: 28, resolved: 24 }, { week: "W2", flagged: 19, resolved: 18 },
  { week: "W3", flagged: 34, resolved: 29 }, { week: "W4", flagged: 22, resolved: 22 },
  { week: "W5", flagged: 15, resolved: 15 }, { week: "W6", flagged: 31, resolved: 27 },
];

const INITIAL_VERIFICATIONS = [
  { id: "v1", name: "Amira Hassan", type: "KYC Check", docs: "Passport Scan", risk: "low" },
  { id: "v2", name: "BuildFast LLC", type: "Business Reg", docs: "Inc Certificate + Tax ID", risk: "medium" },
  { id: "v3", name: "Dr. Felix Ngozi", type: "Expert Credentials", docs: "Ph.D. Diploma + License", risk: "low" },
  { id: "v4", name: "TechBridge Co", type: "Business Reg", docs: "CAC Documents + Bank Stmt", risk: "high" },
];

const INITIAL_FRAUD = [
  { id: "f1", type: "Duplicate Identity", user: "user_4821", severity: "high", status: "open" },
  { id: "f2", type: "Spam Connections", user: "user_5501", severity: "low", status: "open" },
  { id: "f3", type: "Fake Endorsement", user: "user_1029", severity: "medium", status: "resolved" }
];

const SYSTEM_HEALTH = [
  { service: "Auth API Gateway", status: "operational", latency: "48ms" },
  { service: "KYC Verification Engine", status: "operational", latency: "1.2s" },
  { service: "AI Matchmaker Engine", status: "operational", latency: "320ms" },
  { service: "Secure Messaging Node", status: "operational", latency: "65ms" },
];

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [fraudAlerts, setFraudAlerts] = useState(INITIAL_FRAUD);

  const handleVerify = (id: string, name: string, action: "approve" | "reject") => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    toast.success(`Verification request for ${name} has been ${action}d.`);
  };

  const handleFraud = (id: string, action: "resolve" | "freeze") => {
    setFraudAlerts(prev => prev.map(f => f.id === id ? { ...f, status: action === "resolve" ? "resolved" : "frozen" } : f));
    toast.success(`Fraud alert ${id} has been ${action === "resolve" ? "marked resolved" : "suspended/frozen"}!`);
  };

  const filteredVerifications = verifications.filter(v =>
    !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Admin Journey Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Platform Administration Flow</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Verify Users", desc: `${verifications.length} accounts in queue`, active: true, done: verifications.length > 0 },
              { step: "2", label: "Monitor Metrics", desc: "Trust index 87.4 average", active: true, done: true },
              { step: "3", label: "Prevent Fraud", desc: `${fraudAlerts.filter(f => f.status === "open").length} open cases`, active: true, done: true },
              { step: "4", label: "Manage Ecosystem", desc: "All core systems operational", active: true, done: true },
              { step: "5", label: "Audit Controls", desc: "Audit logs active", active: true, done: true }
            ].map((st, i) => (
              <div key={st.label} className="flex flex-col gap-1.5 relative">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    st.done ? "bg-emerald-500 text-white" : "bg-primary text-white"
                  )}>
                    {st.step}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{st.label}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">{st.desc}</p>
                {i < 4 && <div className="hidden md:block absolute top-3 right-0 left-[85%] border-t border-dashed border-border" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content columns */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Col 1: Verify Users & Monitor Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verify Users queue */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <ShieldCheck size={18} className="text-primary" /> 1. User Verification Review Queue
                </h3>
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search queue..."
                    className="input-field pl-11 py-1.5 text-xs w-full sm:w-48"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {filteredVerifications.map(v => (
                  <div key={v.id} className="p-3.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-colors">
                    <div className="flex justify-between items-start gap-3 mb-2.5">
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{v.name}</h4>
                        <p className="text-[10px] text-muted-foreground">Type: {v.type} · Documents: {v.docs}</p>
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full capitalize border",
                        v.risk === "high" ? "bg-red-500/10 text-red-500 border-red-500/20" : v.risk === "medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      )}>
                        {v.risk} Risk
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerify(v.id, v.name, "approve")}
                        className="flex-1 text-[10px] bg-emerald-600 hover:bg-emerald-600/90 text-white py-1.5 rounded-md font-bold transition-colors"
                      >
                        Approve Credentials
                      </button>
                      <button
                        onClick={() => handleVerify(v.id, v.name, "reject")}
                        className="flex-1 text-[10px] bg-red-600 hover:bg-red-600/90 text-white py-1.5 rounded-md font-bold transition-colors"
                      >
                        Reject Request
                      </button>
                    </div>
                  </div>
                ))}
                {filteredVerifications.length === 0 && (
                  <div className="text-center py-6">
                    <CheckCircle size={28} className="text-emerald-500 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Verification queue is completely clear!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Monitor Metrics */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Activity size={18} className="text-primary" /> 2. Platform User Growth & Verifications
                </h3>
                <span className="text-xs text-muted-foreground">Monthly analytics</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="totalGradAdmin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="verGradAdmin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} fill="url(#totalGradAdmin)" name="Total Users" />
                  <Area type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={2} fill="url(#verGradAdmin)" name="Verified Users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Col 2: Prevent Fraud & Manage Ecosystem */}
          <div className="space-y-6">
            {/* Prevent Fraud */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle size={18} className="text-primary" /> 3. Fraud Prevention Desk
              </h3>
              <div className="space-y-3">
                {fraudAlerts.map(alert => (
                  <div key={alert.id} className="p-3 rounded-xl border border-border bg-muted/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-foreground">{alert.type}</p>
                        <p className="text-[9px] text-muted-foreground">User: {alert.user}</p>
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.2 rounded border capitalize",
                        alert.status === "resolved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                      )}>{alert.status}</span>
                    </div>
                    {alert.status === "open" && (
                      <div className="flex gap-2.5 mt-2.5">
                        <button
                          onClick={() => handleFraud(alert.id, "resolve")}
                          className="flex-1 text-[9px] bg-primary text-white py-1 rounded-md font-semibold hover:opacity-95"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => handleFraud(alert.id, "freeze")}
                          className="flex-1 text-[9px] bg-red-600 text-white py-1 rounded-md font-semibold hover:opacity-95"
                        >
                          Freeze Account
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* System health/Ecosystem */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Database size={18} className="text-primary" /> 4. Manage Ecosystem health
              </h3>
              <div className="space-y-2.5">
                {SYSTEM_HEALTH.map(sys => (
                  <div key={sys.service} className="p-2.5 rounded-xl bg-muted/30 border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-foreground">{sys.service}</span>
                    </div>
                    <span className="font-mono text-muted-foreground text-[10px]">{sys.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem logs controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Export Ecosystem DB", icon: Database, action: () => toast.success("Ecosystem database logs exported!") },
            { label: "Broadcast Alert Notification", icon: Bell, action: () => toast.success("System alert notification broadcasted!") },
            { label: "Ecosystem Security Lock", icon: Lock, action: () => toast.success("System security parameters reinforced!") },
            { label: "Content moderation desk", icon: Eye, action: () => toast.success("Content moderation log active!") },
          ].map(action => (
            <button
              key={action.label}
              onClick={action.action}
              className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all flex flex-col items-center justify-center text-center gap-2"
            >
              <action.icon size={20} className="text-primary" />
              <span className="text-xs font-semibold text-foreground leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
