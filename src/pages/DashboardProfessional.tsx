import { Link } from "react-router-dom";
import {
  TrendingUp, Users, Star, Zap, ArrowRight, ShieldCheck, Bell,
  Briefcase, MessageSquare, Eye, UserPlus, Target, BarChart3, CheckCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import TrustScore from "@/components/features/TrustScore";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const networkData = [
  { month: "Jan", connections: 680 }, { month: "Feb", connections: 712 },
  { month: "Mar", connections: 738 }, { month: "Apr", connections: 765 },
  { month: "May", connections: 801 }, { month: "Jun", connections: 847 },
];

const opportunityData = [
  { week: "W1", leads: 4 }, { week: "W2", leads: 7 }, { week: "W3", leads: 5 },
  { week: "W4", leads: 9 }, { week: "W5", leads: 6 }, { week: "W6", leads: 11 },
];

const AI_MATCHES = [
  { name: "Elena Vasquez", title: "Product Designer", company: "DesignCraft Studio", score: 96, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", reason: "Complementary skills in UX + Product" },
  { name: "Tom Nakamura", title: "CTO", company: "CloudBridge Partners", score: 94, avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=40&h=40&fit=crop&crop=face", reason: "Shared enterprise SaaS focus" },
  { name: "Adeola Williams", title: "Investment Partner", company: "Frontier Capital", score: 91, avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&crop=face", reason: "Active B2B SaaS investor" },
];

const ACTIVITIES = [
  { icon: UserPlus, text: "Sarah Mitchell accepted your connection request", time: "2h ago", color: "text-blue-500" },
  { icon: Star, text: "You received a 5-star endorsement from Marcus Chen", time: "5h ago", color: "text-yellow-500" },
  { icon: Zap, text: "3 new AI match recommendations available", time: "8h ago", color: "text-emerald-500" },
  { icon: Eye, text: "Your profile was viewed by 14 professionals today", time: "1d ago", color: "text-purple-500" },
  { icon: Target, text: "New lead opportunity: VistaGroup LLC ($15K project)", time: "1d ago", color: "text-primary" },
];

export default function DashboardProfessional() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">Your professional network is growing. Here's your overview.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/network" className="btn-secondary text-sm py-2">
              <Users size={15} /> My Network
            </Link>
            <Link to="/dashboard/matches" className="btn-primary text-sm py-2">
              <Zap size={15} /> AI Matches
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Connections", value: user?.connections?.toLocaleString() ?? "847", icon: Users, delta: "+23 this week", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Profile Views", value: "1,247", icon: Eye, delta: "+18% vs last week", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
            { label: "Opportunities", value: "34", icon: Target, delta: "12 new this month", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
            { label: "Endorsements", value: "68", icon: Star, delta: "+5 this week", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
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

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Network Growth</h3>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={networkData}>
                <defs>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="connections" stroke="#2563EB" strokeWidth={2} fill="url(#netGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Weekly Opportunities</h3>
              <span className="text-xs text-muted-foreground">Last 6 weeks</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={opportunityData}>
                <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="leads" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* AI Matches */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Top AI Matches</h3>
              <Link to="/dashboard/matches" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {AI_MATCHES.map((match) => (
                <div key={match.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <img src={match.avatar} alt={match.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{match.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{match.title} · {match.company}</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">{match.reason}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{match.score}%</span>
                    <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-medium">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Score + Activity */}
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <h3 className="font-display font-semibold text-foreground mb-3">Your Trust Score</h3>
              <TrustScore score={user?.trustScore ?? 92} size="lg" />
              <div className="mt-4 space-y-2 text-left">
                {[
                  { label: "Identity Verified", done: true },
                  { label: "KYC Complete", done: user?.isKYCVerified },
                  { label: "50+ Connections", done: true },
                  { label: "3+ Reviews", done: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <CheckCircle size={13} className={item.done ? "text-emerald-500" : "text-muted-foreground/30"} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={cn("w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5", act.color)}>
                  <act.icon size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{act.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
