import { useState } from "react";
import { PieChart, TrendingUp, DollarSign, Percent, Activity, ArrowUpRight, ArrowDownRight, Award } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function InvestorAnalytics() {
  const [activeTab, setActiveTab] = useState("allocation");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <PieChart size={22} className="text-primary" /> Fund Analytics
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Review asset allocations, total valuation distributions, and portfolio IRR performance metrics.</p>
          </div>
          <div className="flex bg-muted/60 p-1 rounded-xl">
            {[
              { id: "allocation", label: "Allocations" },
              { id: "performance", label: "Performance" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === t.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Investment High-level KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Assets Under Management", value: "$18.5M", change: "+14.8%", positive: true, icon: DollarSign, color: "text-primary" },
            { label: "Active Startup Nodes", value: "12 Portfolio", change: "+2 nodes", positive: true, icon: Activity, color: "text-blue-500" },
            { label: "Portfolio IRR YTD", value: "24.2%", change: "+3.4%", positive: true, icon: Percent, color: "text-emerald-500" },
            { label: "Total Realized Returns", value: "$2.8M", change: "-0.5%", positive: false, icon: Award, color: "text-yellow-500" },
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

        {activeTab === "allocation" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Allocation by Sector */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
                <PieChart size={15} className="text-primary" /> Sector Allocation Split
              </h3>
              <p className="text-xs text-muted-foreground">Capital deployment ratios across VC technology verticals.</p>

              <div className="space-y-4 pt-2">
                {[
                  { sector: "Fintech & Blockchain", allocation: "$6.2M", percentage: 33.5, color: "bg-primary" },
                  { sector: "HealthTech & Genetics", allocation: "$4.5M", percentage: 24.3, color: "bg-blue-500" },
                  { sector: "AI & Neural Networks", allocation: "$3.8M", percentage: 20.5, color: "bg-purple-500" },
                  { sector: "CleanTech & Grid Logistics", allocation: "$2.5M", percentage: 13.5, color: "bg-yellow-500" },
                  { sector: "AgriTech & Automation", allocation: "$1.5M", percentage: 8.2, color: "bg-emerald-500" },
                ].map(item => (
                  <div key={item.sector} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                      <span className="text-foreground">{item.sector}</span>
                      <span>{item.allocation} ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Startup Valuation Growth */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
                <TrendingUp size={15} className="text-primary" /> Top Holdings Valuation Growth
              </h3>
              <p className="text-xs text-muted-foreground">Valuation markup multipliers relative to original cost basis.</p>

              <div className="space-y-4 pt-2">
                {[
                  { company: "Krypton Ledger", multiplier: "3.2x Markup", valuation: "$12.0M", costBasis: "$3.75M", percentage: 100 },
                  { company: "NeuraMedica", multiplier: "2.1x Markup", valuation: "$8.2M", costBasis: "$3.9M", percentage: 68 },
                  { company: "EcoVibe Logistics", multiplier: "1.5x Markup", valuation: "$4.5M", costBasis: "$3.0M", percentage: 38 },
                  { company: "FarmFlo Automation", multiplier: "1.1x Markup", valuation: "$3.1M", costBasis: "$2.8M", percentage: 26 },
                ].map(c => (
                  <div key={c.company} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                      <span className="text-foreground">{c.company} · <strong className="text-emerald-500">{c.multiplier}</strong></span>
                      <span>{c.valuation} <span className="text-[10px] text-muted-foreground">(Cost: {c.costBasis})</span></span>
                    </div>
                    <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full" style={{ width: `${c.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
              <Activity size={15} className="text-primary" /> IRR Performance History
            </h3>
            <p className="text-xs text-muted-foreground">Annualized fund net returns comparison against market benchmarks.</p>

            <div className="pt-4 space-y-4">
              {[
                { year: "2026 YTD", fund: "24.2%", benchmark: "14.5%", percentage: 85 },
                { year: "2025", fund: "21.8%", benchmark: "12.8%", percentage: 76 },
                { year: "2024", fund: "18.5%", benchmark: "11.2%", percentage: 64 },
                { year: "2023", fund: "16.1%", benchmark: "9.5%", percentage: 56 },
              ].map(row => (
                <div key={row.year} className="flex items-center gap-4">
                  <div className="w-20 text-xs font-bold text-foreground">{row.year}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                      <span>Fund Return: <strong className="text-emerald-500">{row.fund}</strong></span>
                      <span>Index Benchmark: {row.benchmark}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary" style={{ width: `${row.percentage}%` }} />
                      <div className="h-full bg-muted-foreground/30" style={{ width: `${100 - row.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
