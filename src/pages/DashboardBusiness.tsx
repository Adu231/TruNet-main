import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign, TrendingUp, Users, Handshake, BarChart3, ArrowRight,
  Plus, Target, Building2, Star, CheckCircle, Globe, Zap, UploadCloud, ClipboardCheck
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", revenue: 42000 }, { month: "Feb", revenue: 56000 },
  { month: "Mar", revenue: 48000 }, { month: "Apr", revenue: 71000 },
  { month: "May", revenue: 65000 }, { month: "Jun", revenue: 89000 },
];

const INITIAL_SERVICES = [
  { id: "s1", name: "B2B Strategy Consulting", price: "$12,000/project", status: "active", views: 142 },
  { id: "s2", name: "Go-to-Market Planning", price: "$6,500/engagement", status: "active", views: 98 },
  { id: "s3", name: "Investor Deck Review", price: "$2,800/deck", status: "active", views: 211 },
];

const INITIAL_LEADS = [
  { id: "l1", name: "Apex Ventures", value: "$15,000", stage: "qualified", contact: "Sarah Mitchell" },
  { id: "l2", name: "TechScale Global", value: "$8,500", stage: "contacted", contact: "James Okonkwo" },
  { id: "l3", name: "CloudBridge Partners", value: "$22,000", stage: "proposal", contact: "Tom Nakamura" },
];

const PARTNERSHIPS = [
  { name: "DataStream Corp", type: "Strategic Alliance", value: "$62K", status: "active" },
  { name: "Nexus Dynamics", type: "Joint Venture", value: "$45K", status: "negotiating" },
];

export default function DashboardBusiness() {
  const { user } = useAuth();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [isVerified, setIsVerified] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");

  const handleVerifyBusiness = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success("Business verification completed!");
    }, 2000);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice) return;
    const added = {
      id: `s-${Date.now()}`,
      name: newServiceName,
      price: newServicePrice,
      status: "active",
      views: 1
    };
    setServices([added, ...services]);
    setShowServiceModal(false);
    setNewServiceName("");
    setNewServicePrice("");
    toast.success("New business service package published!");
  };

  const handleAdvanceLead = (id: string) => {
    const stages = ["contacted", "qualified", "proposal", "closed"];
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        const idx = stages.indexOf(l.stage);
        if (idx < stages.length - 1) {
          toast.success(`Lead for ${l.name} advanced to ${stages[idx + 1]}`);
          return { ...l, stage: stages[idx + 1] };
        }
      }
      return l;
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Business Journey Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Business Owner Flow Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Verify Business", desc: isVerified ? "Tax ID & Entity verified" : "Pending document upload", active: true, done: isVerified },
              { step: "2", label: "Publish Services", desc: `${services.length} active consultancies`, active: true, done: services.length > 0 },
              { step: "3", label: "Generate Leads", desc: `${leads.length} leads in pipeline`, active: true, done: leads.length > 0 },
              { step: "4", label: "Build Partnerships", desc: `${PARTNERSHIPS.length} agreements active`, active: true, done: PARTNERSHIPS.length > 0 },
              { step: "5", label: "Grow Revenue", desc: "Pipeline active", active: true, done: true }
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

        {/* Content Rows */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Col 1: Verify Business & Publish Services */}
          <div className="space-y-6">
            {/* Verify Business */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Building2 size={18} className="text-primary" /> 1. Verify Business
              </h3>
              {isVerified ? (
                <div className="p-3 border border-emerald-500/20 bg-emerald-500/10 rounded-xl flex items-center gap-3">
                  <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Business Authenticated</p>
                    <p className="text-[10px] text-muted-foreground">Entity registration validated with Trust score badge.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Upload incorporation certificate or Tax ID registration details.</p>
                  <button
                    onClick={handleVerifyBusiness}
                    disabled={isVerifying}
                    className="btn-primary w-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    {isVerifying ? <>Verifying...</> : <><UploadCloud size={14} /> Upload Entity Credentials</>}
                  </button>
                </div>
              )}
            </div>

            {/* Services catalog */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <ClipboardCheck size={18} className="text-primary" /> 2. Publish Services
                </h3>
                <button
                  onClick={() => setShowServiceModal(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5"
                >
                  <Plus size={12} /> Add Service
                </button>
              </div>
              <div className="space-y-3">
                {services.map(svc => (
                  <div key={svc.id} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{svc.name}</p>
                      <p className="text-[10px] text-primary font-semibold">{svc.price}</p>
                    </div>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex-shrink-0">
                      {svc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Generate Leads & Partnerships */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generate Leads */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Target size={18} className="text-primary" /> 3. Generate Leads Pipeline
                </h3>
                <Link to="/dashboard/leads" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                  Full Pipeline <ArrowRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {leads.map(lead => (
                  <div key={lead.id} className="p-3.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">{lead.name}</h4>
                      <p className="text-[10px] text-muted-foreground truncate">Valued at {lead.value} · Contact: {lead.contact}</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full capitalize border",
                        lead.stage === "closed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      )}>
                        {lead.stage}
                      </span>
                      {lead.stage !== "closed" && (
                        <button
                          onClick={() => handleAdvanceLead(lead.id)}
                          className="text-[10px] bg-primary text-white py-1 px-2.5 rounded-md font-semibold hover:opacity-90 transition-opacity"
                        >
                          Advance
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Build Partnerships */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Handshake size={18} className="text-primary" /> 4. Build Partnerships
                </h3>
                <Link to="/dashboard/matches" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                  VC Matchmaker <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {PARTNERSHIPS.map(p => (
                  <div key={p.name} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.type}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-semibold text-primary">{p.value}</p>
                      <span className={cn(
                        "text-[9px] font-bold",
                        p.status === "active" ? "text-emerald-500" : "text-yellow-500"
                      )}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue chart */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> 5. Revenue Pipeline Analytics
              </h3>
              <span className="text-xs text-muted-foreground">Monthly consulting growth</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGradBus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGradBus)" name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" /> Average Deal Value
            </h3>
            <div className="text-3xl font-display font-bold text-foreground">$24,500</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
              <TrendingUp size={13} /> +12% increase vs last quarter
            </div>
            <div className="text-[10px] text-muted-foreground leading-normal mt-2">
              Verify your business profile completely to qualify for larger, verified corporate consultancies.
            </div>
            <Link to="/dashboard/business/services" className="btn-secondary w-full text-xs py-2 mt-4">
              Service Directories
            </Link>
          </div>
        </div>
      </div>

      {/* Publish Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowServiceModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Publish B2B Service</h3>
            <p className="text-xs text-muted-foreground mb-4">List your consultation or product package in the TruNet Directory.</p>

            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Service Name</label>
                <input
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. CRM Custom Setup & Consultation"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Pricing Bracket</label>
                <input
                  required
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  placeholder="e.g. $4,500/project"
                  className="input-field"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
