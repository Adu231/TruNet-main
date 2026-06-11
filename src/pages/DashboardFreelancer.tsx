import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, DollarSign, Star, Clock, CheckCircle, Plus, ArrowRight,
  TrendingUp, Eye, FileText, MessageSquare, Award, Zap
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import TrustScore from "@/components/features/TrustScore";
import { cn, formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const earningsData = [
  { month: "Jan", earned: 8400 }, { month: "Feb", earned: 11200 },
  { month: "Mar", earned: 9600 }, { month: "Apr", earned: 14800 },
  { month: "May", earned: 12400 }, { month: "Jun", earned: 16200 },
];

const PROJECTS = [
  { id: "1", client: "DataStream Corp", title: "Market Entry Strategy Report", budget: 4200, status: "in_progress", progress: 65, due: "Jun 20, 2026", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face" },
  { id: "2", client: "BlueWave Tech", title: "Competitive Analysis Deep-Dive", budget: 3100, status: "review", progress: 90, due: "Jun 15, 2026", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
  { id: "3", client: "Apex Consulting", title: "Fundraising Narrative & Pitch Deck", budget: 5800, status: "completed", progress: 100, due: "Jun 5, 2026", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
  { id: "4", client: "InnovateCo", title: "Sales Process Optimization", budget: 2900, status: "negotiating", progress: 0, due: "TBD", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
];

const REVIEWS = [
  { client: "Sarah Mitchell", rating: 5, text: "Marcus delivered exceptional work. Clear thinking, fast execution, and genuinely invested in our success.", project: "Market Entry Strategy", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
  { client: "Tom Bradley", rating: 5, text: "Best consultant we've ever hired. Will absolutely work together again.", project: "Fundraising Narrative", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face" },
];

const STATUS_STYLE: Record<string, string> = {
  in_progress: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  review: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
  completed: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
  negotiating: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
};

export default function DashboardFreelancer() {
  const { user } = useAuth();
  const [showProposalModal, setShowProposalModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Freelancer Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Your portfolio, projects, and reputation — all in one place.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/marketplace" className="btn-secondary text-sm py-2">
              <Briefcase size={15} /> Browse Projects
            </Link>
            <button onClick={() => setShowProposalModal(true)} className="btn-primary text-sm py-2">
              <Plus size={15} /> New Proposal
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Earned", value: "$72,600", icon: DollarSign, delta: "+$16.2K this month", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
            { label: "Active Projects", value: "3", icon: Briefcase, delta: "1 in review", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Avg. Rating", value: "4.9", icon: Star, delta: "124 reviews", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
            { label: "On-Time Rate", value: "98%", icon: Clock, delta: "All 47 projects", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
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

        {/* Earnings Chart + Trust Score */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Monthly Earnings</h3>
              <span className="text-xs text-muted-foreground">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={earningsData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Earned"]} />
                <Bar dataKey="earned" fill="#2563EB" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <h3 className="font-display font-semibold text-foreground mb-3">Trust Score</h3>
              <TrustScore score={user?.trustScore ?? 96} size="lg" />
              <p className="text-xs text-muted-foreground mt-3">Top 2% of freelancers</p>
              <div className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                <Award size={13} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Elite Freelancer Badge</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h4>
              <div className="space-y-2">
                {[
                  { label: "Profile Views", value: "892 this month" },
                  { label: "Proposals Sent", value: "14 (8 won)" },
                  { label: "Repeat Clients", value: "68% return rate" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Active Projects</h3>
            <Link to="/dashboard/marketplace" className="text-xs text-primary hover:underline flex items-center gap-1">
              View marketplace <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl border border-border hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-3">
                  <img src={proj.avatar} alt={proj.client} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground truncate">{proj.title}</p>
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0", STATUS_STYLE[proj.status])}>
                        {proj.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{proj.client} · Due {proj.due} · {formatCurrency(proj.budget)}</p>
                    {proj.progress > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${proj.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{proj.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Reviews */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Latest Client Reviews</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground italic mb-3">"{rev.text}"</p>
                <div className="flex items-center gap-2">
                  <img src={rev.avatar} alt={rev.client} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{rev.client}</p>
                    <p className="text-[10px] text-muted-foreground">{rev.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowProposalModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Send Proposal</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowProposalModal(false); toast.success("Proposal sent!"); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Project / Client</label>
                <input placeholder="Company or project name" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Proposed Rate</label>
                <input placeholder="e.g. $4,500" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Cover Note</label>
                <textarea rows={3} placeholder="Why you're the right fit..." className="input-field resize-none" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowProposalModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Send Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
