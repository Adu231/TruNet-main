import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign, TrendingUp, Briefcase, Users, ArrowRight, ShieldCheck,
  Target, BarChart3, Zap, BookOpen, Star, MapPin, CheckCircle, Handshake, Eye
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const portfolioData = [
  { month: "Jan", value: 28.4 }, { month: "Feb", value: 30.1 },
  { month: "Mar", value: 29.8 }, { month: "Apr", value: 33.6 },
  { month: "May", value: 36.2 }, { month: "Jun", value: 40.0 },
];

const INITIAL_DEAL_FLOW = [
  { id: "df1", name: "AgroVault Inc", founder: "Moses Afolabi", ask: "$750K", sector: "AgriTech", traction: "2K farmers · $180K ARR", score: 88, status: "explore" },
  { id: "df2", name: "HealthChain", founder: "Blessing Eze", ask: "$400K", sector: "HealthTech", traction: "500 users · 40% MoM", score: 82, status: "requested" },
  { id: "df3", name: "RemitFast", founder: "Kola Adesanya", ask: "$3.2M", sector: "Fintech", traction: "$4M ARR · 18K users", score: 95, status: "explore" },
];

const INITIAL_DUE_DILIGENCE = [
  { id: "dd1", startup: "PayFlow Africa", step: "Review audited Q1 financials", completed: true },
  { id: "dd2", startup: "PayFlow Africa", step: "Conduct customer reference calls", completed: false },
  { id: "dd3", startup: "MediLink Pro", step: "Product demonstration session", completed: true },
  { id: "dd4", startup: "GreenGrid Energy", step: "Entity KYC & background verification", completed: false },
];

const PORTFOLIO = [
  { name: "PayFlow Africa", stage: "Series A", growth: "+75%", value: 2100000, founder: "Amara Diallo" },
  { name: "MediLink Pro", stage: "Seed", growth: "+78%", value: 890000, founder: "Dr. Ngozi Adeyemi" },
];

export default function DashboardInvestor() {
  const { user } = useAuth();
  const [dealFlow, setDealFlow] = useState(INITIAL_DEAL_FLOW);
  const [dueDiligence, setDueDiligence] = useState(INITIAL_DUE_DILIGENCE);
  const [showThesisModal, setShowThesisModal] = useState(false);

  const [thesisSectors, setThesisSectors] = useState("Fintech, HealthTech, ClimaTech");
  const [thesisCheck, setThesisCheck] = useState("$250K – $2M");

  const handleRequestIntro = (id: string, name: string) => {
    setDealFlow(prev => prev.map(d => d.id === id ? { ...d, status: "requested" } : d));
    toast.success(`Intro request sent to ${name}! Founder will be notified.`);
  };

  const handleToggleDD = (id: string) => {
    setDueDiligence(prev => prev.map(d => {
      if (d.id === id) {
        const nextState = !d.completed;
        toast.info(nextState ? "Task completed" : "Task marked incomplete");
        return { ...d, completed: nextState };
      }
      return d;
    }));
  };

  const handleSaveThesis = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThesisModal(false);
    toast.success("Investment thesis specifications updated!");
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Investor Journey Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Investor Workflow Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Explore Startups", desc: `${dealFlow.length} startups tracked`, active: true, done: dealFlow.length > 0 },
              { step: "2", label: "Connect Founders", desc: `${dealFlow.filter(d => d.status === "requested").length} intros requested`, active: true, done: dealFlow.some(d => d.status === "requested") },
              { step: "3", label: "Evaluate Opportunities", desc: `${dueDiligence.filter(d => !d.completed).length} items open`, active: true, done: dueDiligence.length > 0 },
              { step: "4", label: "Build Network", desc: "VC syndicates active", active: true, done: true },
              { step: "5", label: "Deploy Capital", desc: "Pipeline running", active: true, done: true }
            ].map((st, i) => (
              <div key={st.label} className="flex flex-col gap-1.5 relative">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    st.done ? "bg-emerald-500 text-white" : "bg-primary text-white"
                  )}>
                    {st.step}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{st.label}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">{st.desc}</p>
                {i < 4 && <div className="hidden md:block absolute top-3 right-0 left-[85%] border-t border-dashed border-border" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content columns */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Col 1: Explore Startups & Founder Intros */}
          <div className="lg:col-span-2 space-y-6">
            {/* Explore Startups */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> 1 & 2. Explore Startups & Founders
                </h3>
                <Link to="/dashboard/matches" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                  VC Matchmaker <ArrowRight size={12} />
                </Link>
              </div>
              <div className="space-y-3.5">
                {dealFlow.map(deal => (
                  <div key={deal.id} className="p-4 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-foreground truncate">{deal.name}</h4>
                        <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.2 rounded-full">{deal.score}% compatibility</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">Stage: {deal.stage} · Sector: {deal.sector} · Ask: {deal.ask}</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">Traction: {deal.traction}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {deal.status === "requested" ? (
                        <span className="text-[10px] font-semibold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-lg">
                          Intro Requested
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRequestIntro(deal.id, deal.name)}
                          className="text-[10px] bg-primary text-white py-1.5 px-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                        >
                          Request Intro
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluate Opportunities */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Target size={18} className="text-primary" /> 3. Opportunity Due Diligence
              </h3>
              <p className="text-xs text-muted-foreground">Perform evaluation checklist items to progress funding rounds.</p>
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {dueDiligence.map(dd => (
                  <div key={dd.id} className="p-3 rounded-xl bg-muted/30 border border-border flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{dd.startup}</p>
                      <p className={cn("text-[10px] text-muted-foreground leading-relaxed mt-0.5", dd.completed && "line-through text-muted-foreground/50")}>
                        {dd.step}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleDD(dd.id)}
                      className={cn(
                        "w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors",
                        dd.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-input bg-card"
                      )}
                    >
                      {dd.completed && <span className="text-[10px] font-bold">✓</span>}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Build Network & Capital Specs */}
          <div className="space-y-6">
            {/* Thesis Details */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Star size={18} className="text-primary" /> VC Specifications
                </h3>
                <button
                  onClick={() => setShowThesisModal(true)}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Adjust
                </button>
              </div>
              <div className="space-y-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-muted/30">
                  <p className="text-muted-foreground text-[10px]">Target Sectors</p>
                  <p className="font-bold text-foreground mt-0.5">{thesisSectors}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/30">
                  <p className="text-muted-foreground text-[10px]">Average Check Size</p>
                  <p className="font-bold text-foreground mt-0.5">{thesisCheck}</p>
                </div>
              </div>
            </div>

            {/* Build Network Syndicate matches */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Users size={18} className="text-primary" /> 4. Build VC Network
              </h3>
              <p className="text-xs text-muted-foreground">Share deal flows with verified co-investors in your syndicate circle.</p>
              <div className="space-y-2.5">
                {[
                  { name: "Apex Capital", matches: "14 mutuals" },
                  { name: "Frontier Partners", matches: "8 mutuals" }
                ].map(VC => (
                  <div key={VC.name} className="p-2.5 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">{VC.name}</p>
                      <p className="text-[10px] text-muted-foreground">{VC.matches}</p>
                    </div>
                    <button
                      onClick={() => toast.success(`Shared co-investment docs with ${VC.name}`)}
                      className="text-[10px] text-primary hover:underline font-bold"
                    >
                      Share Deal
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio analysis */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-display font-semibold text-foreground mb-4">Portfolio Fund Growth</h3>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="portGradInv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}M`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#portGradInv)" name="Valuation ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Active Fund
            </h3>
            <div className="text-3xl font-display font-bold text-foreground">$40M</div>
            <div className="text-xs text-muted-foreground mt-1">Total Assets Under Management</div>
            <p className="text-[10px] text-muted-foreground leading-normal mt-2">
              Explore startup portfolios, perform financials checks, and syndicates matching on TruNet.
            </p>
            <Link to="/dashboard/marketplace" className="btn-secondary w-full text-xs py-2 mt-3">
              Investment Catalog
            </Link>
          </div>
        </div>
      </div>

      {/* Update Thesis Modal */}
      {showThesisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowThesisModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Adjust VC Specifications</h3>
            <p className="text-xs text-muted-foreground mb-4">Set your parameters to automatically match startup profiles.</p>

            <form onSubmit={handleSaveThesis} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Focus Sectors</label>
                <input
                  required
                  value={thesisSectors}
                  onChange={(e) => setThesisSectors(e.target.value)}
                  placeholder="e.g. Fintech, ClimaTech"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Average Check Size</label>
                <input
                  required
                  value={thesisCheck}
                  onChange={(e) => setThesisCheck(e.target.value)}
                  placeholder="e.g. $100K - $1M"
                  className="input-field"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowThesisModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Save Thesis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
