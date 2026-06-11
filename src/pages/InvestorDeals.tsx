import { useState } from "react";
import { TrendingUp, Plus, Search, DollarSign, Award, Target, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_DEAL_FLOW = [
  { id: "df1", name: "AgroVault Inc", founder: "Moses Afolabi", ask: "$750,000", sector: "AgriTech", traction: "2K farmers · $180K ARR", score: 88, status: "Exploring" },
  { id: "df2", name: "HealthChain", founder: "Blessing Eze", ask: "$400,000", sector: "HealthTech", traction: "500 users · 40% MoM", score: 82, status: "DD Active" },
  { id: "df3", name: "RemitFast", founder: "Kola Adesanya", ask: "$3,200,000", sector: "Fintech", traction: "$4M ARR · 18K users", score: 95, status: "Exploring" },
];

export default function InvestorDeals() {
  const [deals, setDeals] = useState(INITIAL_DEAL_FLOW);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [founder, setFounder] = useState("");
  const [ask, setAsk] = useState("");
  const [sector, setSector] = useState("");
  const [traction, setTraction] = useState("");
  const [score, setScore] = useState(90);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !founder || !ask || !sector || !traction) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `df-${Date.now()}`,
      name,
      founder,
      ask,
      sector,
      traction,
      score,
      status: "Exploring"
    };
    setDeals([added, ...deals]);
    setShowModal(false);
    setName("");
    setFounder("");
    setAsk("");
    setSector("");
    setTraction("");
    toast.success(`Deal registered for review: ${name}!`);
  };

  const handleDelete = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    toast.info("Deal removed from pipeline.");
  };

  const filtered = deals.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.founder.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <TrendingUp size={22} className="text-primary" /> Venture Deal Flow
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Review and evaluate startup deals in your active investment pipeline.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deal flow..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Add Deal
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(deal => (
            <div key={deal.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-foreground text-sm">{deal.name}</h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{deal.score}% Compatibility</span>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border ${
                    deal.status === "DD Active" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  }`}>{deal.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">Founder: <strong className="text-foreground">{deal.founder}</strong> · Ask: <strong className="text-primary">{deal.ask}</strong></p>
                <p className="text-xs text-muted-foreground">Sector: {deal.sector} · <span className="text-emerald-500 font-semibold">{deal.traction}</span></p>
              </div>

              <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                <button onClick={() => toast.success(`Due diligence folder opened for ${deal.name}...`)} className="btn-secondary py-1.5 px-3 text-xs font-semibold flex items-center gap-1">
                  <Target size={12} /> Due Diligence
                </button>
                <button onClick={() => handleDelete(deal.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <TrendingUp size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No deals in pipeline matching search.</p>
            </div>
          )}
        </div>

        {/* Add Deal Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Add Pipeline Deal</h3>
              <p className="text-xs text-muted-foreground mb-4">Add a new startup to your deal flow review queue.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Startup Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. HealthChain" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Founder Name</label>
                  <input required value={founder} onChange={e => setFounder(e.target.value)} placeholder="e.g. Blessing Eze" className="input-field py-2 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Capital Ask</label>
                    <input required value={ask} onChange={e => setAsk(e.target.value)} placeholder="e.g. $400,000" className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Sector</label>
                    <input required value={sector} onChange={e => setSector(e.target.value)} placeholder="e.g. HealthTech" className="input-field py-2 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Traction Description</label>
                  <input required value={traction} onChange={e => setTraction(e.target.value)} placeholder="e.g. 500 users · 40% MoM" className="input-field py-2 text-xs" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Register Deal</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
