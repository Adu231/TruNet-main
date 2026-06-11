import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { BarChart3, TrendingUp, DollarSign, ShieldAlert } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const analyticsData = [
  { month: "Jan", revenue: 14000, verifications: 120 },
  { month: "Feb", revenue: 19000, verifications: 150 },
  { month: "Mar", revenue: 17500, verifications: 180 },
  { month: "Apr", revenue: 24000, verifications: 210 },
  { month: "May", revenue: 29800, verifications: 280 },
  { month: "Jun", revenue: 35400, verifications: 340 },
];

export default function AdminAnalytics() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <BarChart3 size={22} className="text-primary" /> Platform Revenue & Analytics
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Overview of subscription pipelines, verification rates, and platform volume metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Monthly Revenue", value: "$35,400", desc: "+18% from last month", icon: DollarSign },
            { label: "Verified Members Ratio", value: "89.2%", desc: "+3.4% growth", icon: TrendingUp },
            { label: "Verification Volume", value: "1,280 YTD", desc: "Avg 98/week", icon: BarChart3 },
          ].map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <stat.icon size={16} className="text-primary" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-emerald-500 font-semibold mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Verification Velocity (Monthly approvals)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={analyticsData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="verifications" fill="#3B82F6" radius={[4, 4, 0, 0]} name="KYC Approvals" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Subscription Pipeline MRR ($)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#mrrGrad)" name="Monthly Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
