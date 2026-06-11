import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, DollarSign, Star, Clock, CheckCircle, Plus, ArrowRight,
  TrendingUp, Award, Zap, Code, ShieldCheck, ClipboardCheck, Sparkles
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

const INITIAL_PORTFOLIO = [
  { id: "pf1", title: "Apex Ventures Portal", stack: "React + Tailwind", budget: "$15,000", year: "2025" },
  { id: "pf2", title: "MediLink Mobile Scanner", stack: "React Native + Node", budget: "$8,500", year: "2025" },
];

const INITIAL_APPLICATIONS = [
  { id: "ap1", title: "React Native Developer Needed", client: "Apex Ventures", bid: "$4,500", status: "negotiating" },
  { id: "ap2", title: "Technical Writer - API Docs", client: "DataStream Corp", bid: "$1,800", status: "review" },
];

const INITIAL_CONTRACTS = [
  { id: "c1", title: "Market Entry Strategy Report", client: "DataStream Corp", budget: 4200, progress: 65, due: "Jun 20, 2026", task: "Drafting Part III (Market Fit analysis)" },
  { id: "c2", title: "Sales Process Optimization", client: "InnovateCo", budget: 2900, progress: 20, due: "Jun 28, 2026", task: "Review current team sales playbook" },
];

const REVIEWS = [
  { client: "Sarah Mitchell", rating: 5, text: "Marcus delivered exceptional work. Clear thinking, fast execution, and genuinely invested in our success.", project: "Market Entry Strategy", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
  { client: "Tom Nakamura", rating: 5, text: "Best consultant we've ever hired. Will absolutely work together again.", project: "Fundraising Narrative", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=32&h=32&fit=crop&crop=face" },
];

export default function DashboardFreelancer() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  
  const [pfTitle, setPfTitle] = useState("");
  const [pfStack, setPfStack] = useState("");
  const [pfBudget, setPfBudget] = useState("");

  const [propClient, setPropClient] = useState("");
  const [propRate, setPropRate] = useState("");

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pfTitle || !pfStack || !pfBudget) return;
    const added = {
      id: `pf-${Date.now()}`,
      title: pfTitle,
      stack: pfStack,
      budget: pfBudget,
      year: "2026"
    };
    setPortfolio([added, ...portfolio]);
    setShowPortfolioModal(false);
    setPfTitle("");
    setPfStack("");
    setPfBudget("");
    toast.success("New project successfully published to your TruNet portfolio!");
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propClient || !propRate) return;
    const added = {
      id: `ap-${Date.now()}`,
      title: `${propClient} Consulting Engagement`,
      client: propClient,
      bid: propRate,
      status: "review"
    };
    setApplications([added, ...applications]);
    setShowProposalModal(false);
    setPropClient("");
    setPropRate("");
    toast.success("Proposal and trust score verification sent to client!");
  };

  const handleSubmitDeliverable = (id: string, title: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, progress: 100, task: "Deliverable Submitted (Pending Review)" } : c));
    toast.success(`Deliverable submitted successfully for ${title}!`);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Freelancer Journey Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Freelancer Workflow Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Create Portfolio", desc: `${portfolio.length} items published`, active: true, done: portfolio.length > 0 },
              { step: "2", label: "Apply for Projects", desc: `${applications.length} bids pending`, active: true, done: applications.length > 0 },
              { step: "3", label: "Deliver Work", desc: `${contracts.filter(c => c.progress < 100).length} active contracts`, active: true, done: contracts.some(c => c.progress < 100) },
              { step: "4", label: "Earn Reviews", desc: `${REVIEWS.length} 5-star ratings`, active: true, done: REVIEWS.length > 0 },
              { step: "5", label: "Build Trust Score", desc: "Elite Freelancer status", active: true, done: true }
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
          {/* Col 1: Create Portfolio & Apply for Projects */}
          <div className="space-y-6">
            {/* Portfolio manager */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Code size={18} className="text-primary" /> 1. Create Portfolio
                </h3>
                <button
                  onClick={() => setShowPortfolioModal(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5 font-semibold"
                >
                  <Plus size={12} /> Add Project
                </button>
              </div>
              <div className="space-y-3">
                {portfolio.map(p => (
                  <div key={p.id} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-foreground">{p.title}</p>
                      <p className="text-[10px] text-muted-foreground">{p.stack}</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{p.budget}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply for Projects */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <ClipboardCheck size={18} className="text-primary" /> 2. Apply for Projects
                </h3>
                <button
                  onClick={() => setShowProposalModal(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5 font-semibold"
                >
                  <Plus size={12} /> Send Bid
                </button>
              </div>
              <div className="space-y-3">
                {applications.map(ap => (
                  <div key={ap.id} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">{ap.title}</p>
                      <p className="text-[10px] text-muted-foreground">Client: {ap.client} · Rate: {ap.bid}</p>
                    </div>
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-full capitalize",
                      ap.status === "negotiating" ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                    )}>
                      {ap.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Deliver Work & Earn Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Deliver Work */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> 3. Deliver Work & Contracts
                </h3>
                <Link to="/dashboard/marketplace" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                  Find Projects <ArrowRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {contracts.map(c => (
                  <div key={c.id} className="p-4 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-colors space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{c.title}</h4>
                        <p className="text-[10px] text-muted-foreground">Client: {c.client} · Budget: {formatCurrency(c.budget)} · Due {c.due}</p>
                      </div>
                      {c.progress < 100 ? (
                        <button
                          onClick={() => handleSubmitDeliverable(c.id, c.title)}
                          className="text-[10px] bg-primary text-white py-1 px-2.5 rounded-md font-semibold hover:opacity-90 transition-opacity"
                        >
                          Submit Deliverable
                        </button>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Submitted ✓
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>Current Milestone: <strong>{c.task}</strong></span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earn Reviews */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Star size={18} className="text-primary" /> 4. Client Feedback & Ratings
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {REVIEWS.map((rev, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-muted/30 border border-border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} size={11} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xs text-foreground italic">"{rev.text}"</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <img src={rev.avatar} alt={rev.client} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold text-foreground leading-tight">{rev.client}</p>
                        <p className="text-[8px] text-muted-foreground">{rev.project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Build Trust Score */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> Earnings Pipeline
              </h3>
              <span className="text-xs text-muted-foreground">Consulting volume (Jan-Jun 2026)</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={earningsData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="earned" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" /> 5. Build Trust Score
            </h3>
            <TrustScore score={user?.trustScore ?? 96} size="lg" />
            <div className="mt-2.5 flex items-center justify-center gap-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-lg">
              <Sparkles size={12} className="animate-spin text-emerald-500" />
              <span className="text-[10px] font-bold">Elite Freelancer Rank</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal mt-2">
              On-time delivery and verified corporate feedback logs sustain your 90+ score tier.
            </p>
            <Link to="/dashboard/reputation" className="btn-secondary w-full text-xs py-2 mt-3">
              Request Review
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio Add Modal */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPortfolioModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Add Portfolio Item</h3>
            <p className="text-xs text-muted-foreground mb-4">Add a verified project showcase to raise inbound inquiries.</p>

            <form onSubmit={handleAddPortfolio} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Project Title</label>
                <input
                  required
                  value={pfTitle}
                  onChange={(e) => setPfTitle(e.target.value)}
                  placeholder="e.g. Acme SaaS Dashboard"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tech Stack</label>
                <input
                  required
                  value={pfStack}
                  onChange={(e) => setPfStack(e.target.value)}
                  placeholder="e.g. Next.js + Tailwind + GraphQL"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Project Value / Budget</label>
                <input
                  required
                  value={pfBudget}
                  onChange={(e) => setPfBudget(e.target.value)}
                  placeholder="e.g. $12,500"
                  className="input-field"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowPortfolioModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Publish Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowProposalModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Submit Project Bid</h3>
            <p className="text-xs text-muted-foreground mb-4">Apply for active projects in the B2B Service Directory.</p>

            <form onSubmit={handleSendProposal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Client / Venture Name</label>
                <input
                  required
                  value={propClient}
                  onChange={(e) => setPropClient(e.target.value)}
                  placeholder="e.g. GreenGrid Energy"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Proposed Consulting Rate</label>
                <input
                  required
                  value={propRate}
                  onChange={(e) => setPropRate(e.target.value)}
                  placeholder="e.g. $5,000"
                  className="input-field"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowProposalModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
