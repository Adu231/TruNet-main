import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign, TrendingUp, Briefcase, Users, ArrowRight, Plus, ShieldCheck,
  Globe, Target, BarChart3, Zap, BookOpen, Star, MapPin, ChevronRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

const portfolioData = [
  { month: "Jan", value: 28.4 }, { month: "Feb", value: 30.1 },
  { month: "Mar", value: 29.8 }, { month: "Apr", value: 33.6 },
  { month: "May", value: 36.2 }, { month: "Jun", value: 40.0 },
];

const sectorData = [
  { name: "Fintech", value: 32, color: "#2563EB" },
  { name: "HealthTech", value: 24, color: "#10B981" },
  { name: "ClimaTech", value: 18, color: "#8B5CF6" },
  { name: "EdTech", value: 14, color: "#F59E0B" },
  { name: "AgriTech", value: 12, color: "#EF4444" },
];

const PORTFOLIO = [
  { name: "PayFlow Africa", stage: "Series A", sector: "Fintech", invested: 1200000, currentValue: 2100000, growth: "+75%", founder: "Amara Diallo", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&crop=face", trustScore: 91 },
  { name: "MediLink Pro", stage: "Seed", sector: "HealthTech", invested: 500000, currentValue: 890000, growth: "+78%", founder: "Dr. Ngozi Adeyemi", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", trustScore: 88 },
  { name: "GreenGrid Energy", stage: "Pre-Series A", sector: "ClimaTech", invested: 800000, currentValue: 1240000, growth: "+55%", founder: "Samuel Kiptoo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", trustScore: 94 },
  { name: "EduReach Labs", stage: "Seed", sector: "EdTech", invested: 350000, currentValue: 510000, growth: "+46%", founder: "Chioma Obi", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", trustScore: 86 },
];

const DEAL_FLOW = [
  { name: "AgroVault Inc", stage: "Raising Seed", ask: "$750K", sector: "AgriTech", traction: "2K farmers · $180K ARR", score: 88, founder: "Moses Afolabi", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
  { name: "HealthChain", stage: "Pre-Seed", ask: "$400K", sector: "HealthTech", traction: "500 users · 40% MoM growth", score: 82, founder: "Blessing Eze", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
  { name: "RemitFast", stage: "Series A", ask: "$3.2M", sector: "Fintech", traction: "$4M ARR · 18K users", score: 95, founder: "Kola Adesanya", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
];

export default function DashboardInvestor() {
  const { user } = useAuth();
  const [showThesisModal, setShowThesisModal] = useState(false);

  const totalInvested = PORTFOLIO.reduce((a, p) => a + p.invested, 0);
  const totalValue = PORTFOLIO.reduce((a, p) => a + p.currentValue, 0);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Investor Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {user?.company} · $40M Fund · 22 Active Portfolio Companies
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/matches" className="btn-secondary text-sm py-2">
              <Zap size={15} /> Explore Startups
            </Link>
            <button onClick={() => setShowThesisModal(true)} className="btn-primary text-sm py-2">
              <Target size={15} /> Update Thesis
            </button>
          </div>
        </div>

        {/* Fund Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Portfolio Value", value: "$40M", icon: DollarSign, delta: "+40.7% YTD", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
            { label: "Active Companies", value: "22", icon: Briefcase, delta: "4 in due diligence", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Deal Flow (30d)", value: "48", icon: TrendingUp, delta: "12 qualified", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
            { label: "Avg. Return", value: "3.6x", icon: BarChart3, delta: "Top quartile", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
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

        {/* Portfolio Growth + Sector Split */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Portfolio Value Growth ($M)</h3>
              <span className="text-xs text-muted-foreground">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`$${v}M`, "Portfolio Value"]} />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#portGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Sector Allocation</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={sectorData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {sectorData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {sectorData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Companies */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Portfolio Companies</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Total Invested: <strong className="text-foreground">{formatCurrency(totalInvested)}</strong></span>
              <span>Current Value: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(totalValue)}</strong></span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {PORTFOLIO.map((co) => (
              <div key={co.name} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/20 transition-colors">
                <img src={co.avatar} alt={co.founder} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-sm font-semibold text-foreground">{co.name}</p>
                    <ShieldCheck size={12} className="text-primary flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground">{co.stage} · {co.sector}</p>
                  <p className="text-xs text-muted-foreground">by {co.founder}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{co.growth}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(co.currentValue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Flow */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Inbound Deal Flow</h3>
            <Link to="/dashboard/matches" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {DEAL_FLOW.map((deal) => (
              <div key={deal.name} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <img src={deal.avatar} alt={deal.founder} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{deal.name}</p>
                  <p className="text-xs text-muted-foreground">{deal.stage} · {deal.sector} · Ask: {deal.ask}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{deal.traction}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{deal.score}</span>
                  <button onClick={() => toast.success(`Requested intro to ${deal.name}`)} className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-medium">
                    Request Intro
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thesis Modal */}
      {showThesisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowThesisModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Update Investment Thesis</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowThesisModal(false); toast.success("Investment thesis updated!"); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Focus Sectors</label>
                <input defaultValue="Fintech, HealthTech, ClimaTech, EdTech, AgriTech" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Check Size Range</label>
                <input defaultValue="$250K – $2M" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Stage Preference</label>
                <select className="input-field">
                  <option>Pre-Seed to Series A</option>
                  <option>Seed to Series B</option>
                  <option>Series A+</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowThesisModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Save Thesis</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
