import { useState } from "react";
import { BarChart3, TrendingUp, Clock, Users, ArrowUpRight, Zap, Target } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RecruiterAnalytics() {
  const [timeframe, setTimeframe] = useState("30d");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <BarChart3 size={22} className="text-primary" /> Recruiter Analytics
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Analyze pipeline conversions, application response rates, and source channel efficiency.</p>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  timeframe === t
                    ? "bg-primary text-white border-primary"
                    : "bg-card border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Avg. Time-to-Hire", value: "18 Days", change: "-4 days", positive: true, icon: Clock, color: "text-emerald-500" },
            { label: "Application Volume", value: "248 Recruits", change: "+12.4%", positive: true, icon: Users, color: "text-primary" },
            { label: "Candidate Match Rate", value: "87.5%", change: "+2.1%", positive: true, icon: Target, color: "text-yellow-500" },
            { label: "AI Sourcing Matches", value: "142 Profiles", change: "+45%", positive: true, icon: Zap, color: "text-purple-500" },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-5 flex items-start justify-between">
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold mt-2 ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                    <ArrowUpRight size={10} /> {stat.change}
                  </span>
                </div>
                <div className={`p-2 bg-muted rounded-xl ${stat.color}`}>
                  <Icon size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts & Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Funnel */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp size={15} className="text-primary" /> Hiring Pipeline Funnel
            </h3>
            <p className="text-xs text-muted-foreground">Candidate conversion efficiency across key recruitment lifecycle stages.</p>

            <div className="space-y-3 pt-2">
              {[
                { stage: "Sourced Candidates", count: 248, percentage: 100, color: "bg-primary" },
                { stage: "Screening Passed", count: 180, percentage: 72, color: "bg-blue-500" },
                { stage: "Interviews Conducted", count: 84, percentage: 33, color: "bg-purple-500" },
                { stage: "Offers Extended", count: 12, percentage: 4.8, color: "bg-yellow-500" },
                { stage: "Placements Hired", count: 10, percentage: 4.0, color: "bg-emerald-500" },
              ].map(f => (
                <div key={f.stage} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                    <span className="text-foreground">{f.stage}</span>
                    <span>{f.count} ({f.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time to Hire Breakdown */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
              <Clock size={15} className="text-primary" /> Time to Hire Breakdown
            </h3>
            <p className="text-xs text-muted-foreground">Average days spent in each phase of recruitment.</p>

            <div className="space-y-4 pt-2">
              {[
                { phase: "Resume Screening", days: 3, percentage: 16 },
                { phase: "Phone / Technical Interview", days: 8, percentage: 44 },
                { phase: "Portfolio Review", days: 4, percentage: 22 },
                { phase: "Executive Round & Offer", days: 3, percentage: 16 },
              ].map(phase => (
                <div key={phase.phase} className="flex items-center gap-4">
                  <div className="w-24 text-xs font-semibold text-foreground truncate">{phase.phase}</div>
                  <div className="flex-1 h-3.5 bg-muted rounded-lg overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-primary rounded-lg" style={{ width: `${phase.percentage * 2}%` }} />
                  </div>
                  <div className="w-12 text-right text-xs font-bold text-foreground">{phase.days} days</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
