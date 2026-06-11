import { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Activity, Percent, ArrowUpRight, ArrowDownRight, Briefcase } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function BusinessAnalytics() {
  const [timeframe, setTimeframe] = useState("30d");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <BarChart3 size={22} className="text-primary" /> Business Analytics
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Analyze B2B services sales velocity, lead pipelines, and monthly recurring revenues.</p>
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

        {/* Business KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Monthly Revenue (MRR)", value: "$28,450", change: "+12.8%", positive: true, icon: DollarSign, color: "text-emerald-500" },
            { label: "Active Client Nodes", value: "18 Accounts", change: "+3 clients", positive: true, icon: Activity, color: "text-primary" },
            { label: "Lead Win Rate", value: "34.5%", change: "-2.1%", positive: false, icon: Percent, color: "text-red-500" },
            { label: "Consulting Hours Billed", value: "142 Hrs", change: "+18%", positive: true, icon: Briefcase, color: "text-yellow-500" },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card border border-border rounded-2xl p-5 flex items-start justify-between">
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold mt-2 ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                    {stat.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {stat.change}
                  </span>
                </div>
                <div className={`p-2 bg-muted rounded-xl ${stat.color}`}>
                  <Icon size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sales Pipeline Funnel & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp size={15} className="text-primary" /> Sales Pipeline Conversions
            </h3>
            <p className="text-xs text-muted-foreground">Lead progression stats from initial contact to contract signing.</p>

            <div className="space-y-3 pt-2">
              {[
                { stage: "Identified Leads", count: 48, percentage: 100, color: "bg-primary" },
                { stage: "Qualified Prospecting", count: 32, percentage: 66, color: "bg-blue-500" },
                { stage: "Proposal Submitted", count: 20, percentage: 41, color: "bg-purple-500" },
                { stage: "Negotiating Deals", count: 8, percentage: 16.6, color: "bg-yellow-500" },
                { stage: "Closed & Signed", count: 6, percentage: 12.5, color: "bg-emerald-500" },
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

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
              <BarChart3 size={15} className="text-primary" /> Top Performing B2B Services
            </h3>
            <p className="text-xs text-muted-foreground">Revenues contributions from your published catalog listings.</p>

            <div className="space-y-4 pt-2">
              {[
                { service: "Security Due Diligence Consulting", revenue: "$14,500", percentage: 51 },
                { service: "Fintech Integration Package", revenue: "$8,200", percentage: 29 },
                { service: "B2B SaaS Strategy Roadmap", revenue: "$4,250", percentage: 15 },
                { service: "Custom Security Auditing", revenue: "$1,500", percentage: 5 },
              ].map(row => (
                <div key={row.service} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                    <span className="text-foreground truncate max-w-[280px]">{row.service}</span>
                    <span className="font-bold text-foreground">{row.revenue}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-primary" style={{ width: `${row.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
