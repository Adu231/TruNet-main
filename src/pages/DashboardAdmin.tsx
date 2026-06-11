import { useState } from "react";
import {
  ShieldCheck, Users, AlertTriangle, TrendingUp, Activity, Eye,
  CheckCircle, XCircle, Clock, Search, BarChart3, Globe, Zap,
  Lock, Flag, RefreshCw, Database, Bell
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

const PENDING_VERIFICATIONS = [
  { id: "v001", name: "Amira Hassan", type: "KYC", submitted: "Jun 9, 2026", docs: "Passport + Business Reg", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face", risk: "low" },
  { id: "v002", name: "BuildFast LLC", type: "Business", submitted: "Jun 8, 2026", docs: "Inc Certificate + Tax ID", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop", risk: "medium" },
  { id: "v003", name: "Dr. Felix Ngozi", type: "Professional", submitted: "Jun 7, 2026", docs: "Medical License + NIN", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", risk: "low" },
  { id: "v004", name: "TechBridge Co", type: "Business", submitted: "Jun 6, 2026", docs: "CAC Certificate + Bank Stmt", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", risk: "high" },
];

const FRAUD_ALERTS = [
  { id: "f001", type: "Duplicate Identity", user: "user_4821", severity: "high", reported: "1h ago", status: "open" },
  { id: "f002", type: "Fake Reviews", user: "user_9032", severity: "medium", reported: "3h ago", status: "investigating" },
  { id: "f003", type: "Credential Forgery", user: "user_2290", severity: "high", reported: "6h ago", status: "open" },
  { id: "f004", type: "Spam Connections", user: "user_5501", severity: "low", reported: "12h ago", status: "resolved" },
];

const SYSTEM_HEALTH = [
  { service: "Authentication API", status: "operational", latency: "48ms" },
  { service: "KYC Verification", status: "operational", latency: "1.2s" },
  { service: "AI Matchmaking", status: "operational", latency: "320ms" },
  { service: "Lead Marketplace", status: "degraded", latency: "890ms" },
  { service: "Messaging Service", status: "operational", latency: "65ms" },
  { service: "Analytics Engine", status: "operational", latency: "210ms" },
];

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [verifications, setVerifications] = useState(PENDING_VERIFICATIONS);
  const [fraudAlerts, setFraudAlerts] = useState(FRAUD_ALERTS);

  const handleVerify = (id: string, action: "approve" | "reject") => {
    const item = verifications.find((v) => v.id === id);
    if (item) {
      toast.success(`${item.name} ${action === "approve" ? "approved ✓" : "rejected ✗"}`);
      setVerifications((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleFraud = (id: string, action: "resolve" | "escalate") => {
    setFraudAlerts((prev) => prev.map((f) => f.id === id ? { ...f, status: action === "resolve" ? "resolved" : "escalated" } : f));
    toast.success(`Alert ${id} ${action}d`);
  };

  const filteredVerifications = verifications.filter((v) =>
    !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-display font-bold text-foreground">Admin Control Center</h1>
              <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold">ADMIN</span>
            </div>
            <p className="text-muted-foreground text-sm">Platform governance · Trust & Safety · Ecosystem monitoring</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast.success("System health report generated")} className="btn-secondary text-sm py-2">
              <RefreshCw size={15} /> Refresh
            </button>
            <button onClick={() => toast.success("Full platform audit initiated")} className="btn-primary text-sm py-2">
              <Activity size={15} /> Audit Log
            </button>
          </div>
        </div>

        {/* Platform KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Members", value: "240K+", icon: Users, delta: "+10K this month", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Verification Queue", value: verifications.length.toString(), icon: Clock, delta: "Avg 6h response", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
            { label: "Open Fraud Alerts", value: fraudAlerts.filter(f => f.status === "open").length.toString(), icon: AlertTriangle, delta: "2 high severity", color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" },
            { label: "Trust Score Avg", value: "87.4", icon: ShieldCheck, delta: "+1.2 this week", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
                <stat.icon size={18} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{stat.delta}</div>
            </div>
          ))}
        </div>

        {/* User Growth + Fraud Chart */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">User Growth vs. Verified</h3>
              <span className="text-xs text-muted-foreground">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="verGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [v.toLocaleString()]} />
                <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} fill="url(#totalGrad)" name="Total" />
                <Area type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={2} fill="url(#verGrad)" name="Verified" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Fraud Detection Activity</h3>
              <span className="text-xs text-muted-foreground">Last 6 weeks</span>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={fraudData}>
                <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="flagged" fill="#EF4444" radius={[4, 4, 0, 0]} name="Flagged" />
                <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Queue + Fraud Alerts */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Verification Queue */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <h3 className="font-display font-semibold text-foreground flex-1">Verification Queue</h3>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="input-field pl-8 py-1.5 text-xs w-40" />
              </div>
            </div>
            <div className="space-y-3">
              {filteredVerifications.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle size={28} className="text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Queue is clear!</p>
                </div>
              )}
              {filteredVerifications.map((v) => (
                <div key={v.id} className="p-3 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.type} · {v.submitted}</p>
                    </div>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", v.risk === "high" ? "bg-red-100 dark:bg-red-900/20 text-red-600" : v.risk === "medium" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600" : "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600")}>
                      {v.risk} risk
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Docs: {v.docs}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleVerify(v.id, "approve")} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:opacity-90 transition-opacity">
                      <CheckCircle size={11} /> Approve
                    </button>
                    <button onClick={() => handleVerify(v.id, "reject")} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:opacity-90 transition-opacity">
                      <XCircle size={11} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Fraud & Abuse Alerts</h3>
            <div className="space-y-3">
              {fraudAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", alert.severity === "high" ? "bg-red-100 dark:bg-red-900/20" : alert.severity === "medium" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-gray-100 dark:bg-gray-800")}>
                      <AlertTriangle size={14} className={cn(alert.severity === "high" ? "text-red-600" : alert.severity === "medium" ? "text-yellow-600" : "text-gray-500")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.user} · {alert.reported}</p>
                    </div>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", alert.status === "resolved" ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600" : alert.status === "investigating" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600" : "bg-red-100 dark:bg-red-900/20 text-red-600")}>
                      {alert.status}
                    </span>
                  </div>
                  {alert.status === "open" && (
                    <div className="flex gap-2">
                      <button onClick={() => handleFraud(alert.id, "resolve")} className="flex-1 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                        Resolve
                      </button>
                      <button onClick={() => handleFraud(alert.id, "escalate")} className="flex-1 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:opacity-90 transition-opacity">
                        Escalate
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">System Health Monitor</h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live monitoring
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SYSTEM_HEALTH.map((svc) => (
              <div key={svc.service} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2.5">
                  <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", svc.status === "operational" ? "bg-emerald-500" : "bg-yellow-500")} />
                  <div>
                    <p className="text-xs font-medium text-foreground">{svc.service}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{svc.status}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{svc.latency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Export User Report", icon: Database, action: () => toast.success("User report exported") },
            { label: "Broadcast Notice", icon: Bell, action: () => toast.success("Platform notice sent") },
            { label: "Freeze Account", icon: Lock, action: () => toast.success("Account freeze dialog opened") },
            { label: "Compliance Audit", icon: Flag, action: () => toast.success("Compliance audit initiated") },
          ].map((action) => (
            <button key={action.label} onClick={action.action} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-center">
              <action.icon size={20} className="text-primary" />
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
