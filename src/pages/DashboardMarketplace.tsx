import { useState } from "react";
import { Briefcase, Search, Filter, ShieldCheck, Tag, DollarSign, Handshake, Eye, Database, FileText } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const MOCK_LISTINGS: Record<string, any[]> = {
  freelancer: [
    { id: "l1", title: "React Native Developer Needed", client: "Apex Ventures", budget: 4500, time: "2 weeks", desc: "Build a cross-platform mobile verification scanner mock app.", verified: true },
    { id: "l2", title: "Technical Writer - API Docs", client: "DataStream Corp", budget: 1800, time: "1 week", desc: "Draft onboarding document guides for verified API keys integration.", verified: true }
  ],
  business: [
    { id: "l1", title: "B2B SaaS Consulting", pricing: "$12,000 / project", leads: 8, status: "Active", desc: "Growth consultation covering conversion funnels and product analytics.", verified: true },
    { id: "l2", title: "Go-to-Market Strategy", pricing: "$6,500 / startup", leads: 3, status: "Active", desc: "Full GTM architecture checklist covering organic channels.", verified: true }
  ],
  investor: [
    { id: "l1", company: "PayFlow Africa", stage: "Series A", invested: 1200000, value: 2100000, growth: "+75%", founder: "Amara Diallo" },
    { id: "l2", company: "GreenGrid Energy", stage: "Pre-Series A", invested: 800000, value: 1240000, growth: "+55%", founder: "Samuel Kiptoo" }
  ],
  admin: [
    { id: "log1", action: "User KYC Approved", actor: "James Okonkwo (Admin)", time: "10 mins ago", target: "Amira Hassan", severity: "info" },
    { id: "log2", action: "Auth Key Regenerated", actor: "System Core", time: "1h ago", target: "Tanaka Institute API", severity: "warning" }
  ]
};

export default function DashboardMarketplace() {
  const { user } = useAuth();
  const role = user?.role || "professional";
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState<any[]>(MOCK_LISTINGS[role] || MOCK_LISTINGS.freelancer);

  const handleApply = (id: string) => {
    toast.success("Proposal application submitted successfully!");
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDisableService = (id: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isAct = item.status === "Active";
          toast.success(isAct ? "Service listed paused" : "Service listed reactivated");
          return { ...item, status: isAct ? "Paused" : "Active" };
        }
        return item;
      })
    );
  };

  const filtered = listings.filter((l) => {
    const term = search.toLowerCase();
    const titleMatch = l.title && l.title.toLowerCase().includes(term);
    const clientMatch = l.client && l.client.toLowerCase().includes(term);
    const companyMatch = l.company && l.company.toLowerCase().includes(term);
    const actionMatch = l.action && l.action.toLowerCase().includes(term);
    return !search || titleMatch || clientMatch || companyMatch || actionMatch;
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Briefcase size={22} className="text-primary" />
              {role === "freelancer" ? "Project Marketplace" : role === "business" ? "My Service Directory" : role === "investor" ? "Investments & Deals Portfolio" : role === "admin" ? "Ecosystem Audit Logs" : "Services Directory"}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {role === "freelancer" && "Apply for verified contract projects listed by validated clients."}
              {role === "business" && "Manage your published consultancies, service listings, and active leads."}
              {role === "investor" && "Monitor capital allocations, valuation growth multipliers, and founders."}
              {role === "admin" && "Review detailed security system audits, user changes, and API actions."}
              {role === "professional" && "Browse B2B services, consultation catalogs, and verified agencies."}
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="input-field pl-9 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Listings Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              {role === "freelancer" && (
                <>
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <DollarSign size={13} /> {item.budget}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <div className="text-[10px] text-muted-foreground space-y-1">
                      <p>Client: <strong className="text-foreground">{item.client}</strong></p>
                      <p>Timeline: {item.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => handleApply(item.id)}
                      className="flex-1 btn-primary py-2 text-xs font-semibold"
                    >
                      Apply Now
                    </button>
                  </div>
                </>
              )}

              {role === "business" && (
                <>
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
                      <span className={cn("text-[10px] font-bold px-2.5 py-0.5 rounded-full", item.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-muted text-muted-foreground")}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <div className="text-[10px] text-muted-foreground space-y-1">
                      <p>Pricing Model: <strong className="text-foreground">{item.pricing}</strong></p>
                      <p>Active Inbound Leads: {item.leads}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => handleDisableService(item.id)}
                      className="flex-1 btn-secondary py-2 text-xs font-semibold"
                    >
                      {item.status === "Active" ? "Pause Listing" : "Reactivate"}
                    </button>
                  </div>
                </>
              )}

              {role === "investor" && (
                <>
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="font-semibold text-foreground text-sm leading-snug">{item.company}</h3>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.growth} growth</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 mb-3">
                      <p>Founder: <strong className="text-foreground">{item.founder}</strong></p>
                      <p>Investment Stage: {item.stage}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-muted/40 text-xs">
                      <div>
                        <p className="text-muted-foreground text-[10px]">Invested Capital</p>
                        <p className="font-bold text-foreground">{formatCurrency(item.invested)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[10px]">Current Valuation</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(item.value)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => toast.success(`Portfolio report generated for ${item.company}`)}
                      className="flex-1 btn-primary py-2 text-xs font-semibold"
                    >
                      Generate Report
                    </button>
                  </div>
                </>
              )}

              {role === "admin" && (
                <>
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="font-semibold text-foreground text-sm leading-snug">{item.action}</h3>
                      <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full capitalize", item.severity === "warning" ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20")}>
                        {item.severity}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Actor: <strong className="text-foreground">{item.actor}</strong></p>
                      <p>Target Node: {item.target}</p>
                      <p className="text-[10px] text-muted-foreground/60">Logged Time: {item.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <button
                      onClick={() => toast.success(`Auditing record ${item.id}...`)}
                      className="flex-1 btn-secondary py-1.5 text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <Database size={12} /> Audit Details
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Briefcase size={40} className="text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No items listed</h3>
            <p className="text-sm text-muted-foreground">Try clearing search filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
