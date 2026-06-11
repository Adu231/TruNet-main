import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign, TrendingUp, Users, Handshake, BarChart3, ArrowRight,
  Plus, Target, Building2, Star, CheckCircle, Globe, Zap
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", revenue: 42000, leads: 8 }, { month: "Feb", revenue: 56000, leads: 12 },
  { month: "Mar", revenue: 48000, leads: 9 }, { month: "Apr", revenue: 71000, leads: 15 },
  { month: "May", revenue: 65000, leads: 13 }, { month: "Jun", revenue: 89000, leads: 18 },
];

const leadSourceData = [
  { name: "AI Matches", value: 38, color: "#2563EB" },
  { name: "Lead Marketplace", value: 29, color: "#10B981" },
  { name: "Network Referrals", value: 21, color: "#8B5CF6" },
  { name: "Direct Search", value: 12, color: "#F59E0B" },
];

const ACTIVE_SERVICES = [
  { name: "B2B Strategy Consulting", price: "$12,000/project", leads: 8, status: "active", views: 142 },
  { name: "Go-to-Market Planning", price: "$6,500/engagement", leads: 5, status: "active", views: 98 },
  { name: "Investor Deck Review", price: "$2,800/deck", leads: 12, status: "active", views: 211 },
  { name: "CRM Implementation", price: "$4,200/setup", leads: 3, status: "paused", views: 67 },
];

const PARTNERSHIPS = [
  { name: "DataStream Corp", type: "Strategic Alliance", value: "$62K", status: "active", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop" },
  { name: "CloudFirst Inc", type: "Reseller Agreement", value: "$34K", status: "negotiating", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face" },
  { name: "Nexus Dynamics", type: "Joint Venture", value: "$45K", status: "active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
];

export default function DashboardBusiness() {
  const { user } = useAuth();
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "" });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    setShowServiceModal(false);
    toast.success("Service listing published!");
    setNewService({ name: "", price: "" });
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Business Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5 flex items-center gap-1.5">
              <Building2 size={13} /> {user?.company} · {user?.location}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowServiceModal(true)} className="btn-primary text-sm py-2">
              <Plus size={15} /> Publish Service
            </button>
            <Link to="/dashboard/leads" className="btn-secondary text-sm py-2">
              <Target size={15} /> View Leads
            </Link>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pipeline Value", value: "$371K", icon: DollarSign, delta: "+$48K this month", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Active Leads", value: "42", icon: TrendingUp, delta: "18 qualified", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
            { label: "Partnerships", value: "11", icon: Handshake, delta: "3 in negotiation", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
            { label: "Avg. Deal Size", value: "$24.5K", icon: BarChart3, delta: "+12% vs last quarter", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
                <stat.icon size={18} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">{stat.delta}</div>
            </div>
          ))}
        </div>

        {/* Revenue + Lead Sources */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Revenue Pipeline</h3>
              <span className="text-xs text-muted-foreground">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Lead Sources</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {leadSourceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {leadSourceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services + Partnerships */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Active Services */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Active Services</h3>
              <button onClick={() => setShowServiceModal(true)} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {ACTIVE_SERVICES.map((svc) => (
                <div key={svc.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{svc.name}</p>
                    <p className="text-xs text-primary font-semibold">{svc.price}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{svc.leads} leads</p>
                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", svc.status === "active" ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600" : "bg-muted text-muted-foreground")}>
                      {svc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Business Partnerships</h3>
              <Link to="/dashboard/network" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {PARTNERSHIPS.map((p) => (
                <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.type}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">{p.value}</p>
                    <span className={cn("text-[10px] font-semibold", p.status === "active" ? "text-emerald-500" : "text-yellow-500")}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Link to="/dashboard/matches" className="btn-primary w-full justify-center text-sm py-2">
                <Zap size={14} /> Find New Partners
              </Link>
            </div>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Business Verification Badge</p>
              <p className="text-blue-100 text-sm">Your business is fully verified. Partners see your credibility badge on all listings.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20">
            <CheckCircle size={16} className="text-white" />
            <span className="text-white font-semibold text-sm">Verified Business</span>
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowServiceModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Publish New Service</h2>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Service Name</label>
                <input value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="e.g. B2B Growth Consulting" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Pricing</label>
                <input value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} placeholder="e.g. $5,000/project" className="input-field" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowServiceModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
