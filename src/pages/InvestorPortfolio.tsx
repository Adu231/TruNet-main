import { useState } from "react";
import { Briefcase, Plus, Search, DollarSign, Activity, TrendingUp, ShieldCheck, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_PORTFOLIO = [
  { id: "p1", name: "PayFlow Africa", founder: "Amara Diallo", stage: "Series A", growth: "+75%", value: "$2,100,000", costBasis: "$1,200,000", location: "Lagos, NG", verified: true },
  { id: "p2", name: "MediLink Pro", founder: "Dr. Ngozi Adeyemi", stage: "Seed", growth: "+78%", value: "$890,000", costBasis: "$500,000", location: "Nairobi, KE", verified: true },
  { id: "p3", name: "GreenGrid Energy", founder: "Felix Ngozi", stage: "Pre-Seed", growth: "0%", value: "$250,000", costBasis: "$250,000", location: "Accra, GH", verified: false },
];

export default function InvestorPortfolio() {
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [founder, setFounder] = useState("");
  const [stage, setStage] = useState("Seed");
  const [value, setValue] = useState("");
  const [costBasis, setCostBasis] = useState("");
  const [location, setLocation] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !founder || !value || !costBasis || !location) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `p-${Date.now()}`,
      name,
      founder,
      stage,
      growth: "0%",
      value,
      costBasis,
      location,
      verified: true
    };
    setPortfolio([added, ...portfolio]);
    setShowModal(false);
    setName("");
    setFounder("");
    setValue("");
    setCostBasis("");
    setLocation("");
    toast.success(`Portfolio holding registered: ${name}!`);
  };

  const filtered = portfolio.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.founder.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Briefcase size={22} className="text-primary" /> Startup Portfolio
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Monitor active venture investments, equity valuation changes, and founder profiles.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search portfolio..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Add Portfolio Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Asset Holdings", value: portfolio.length.toString(), desc: "Active startup nodes", color: "text-primary" },
            { label: "Estimated Asset Value", value: "$3.24M", desc: "Based on latest pricing rounds", color: "text-emerald-500" },
            { label: "Cost Basis Invested", value: "$1.95M", desc: "Total deployed capital", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted text-muted-foreground uppercase border-b border-border font-semibold">
                <tr>
                  <th className="px-4 py-3">Startup</th>
                  <th className="px-4 py-3">Founder</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Asset Value</th>
                  <th className="px-4 py-3">Cost Basis</th>
                  <th className="px-4 py-3">Growth Mark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        {item.verified && (
                          <ShieldCheck size={12} className="text-primary" />
                        )}
                      </div>
                      <span className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5"><MapPin size={9} /> {item.location}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.founder}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{item.stage}</span>
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">{item.value}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.costBasis}</td>
                    <td className="px-4 py-3 font-bold text-emerald-500">{item.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Entry Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Add Portfolio Entry</h3>
              <p className="text-xs text-muted-foreground mb-4">Register an equity investment holding.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Startup Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. PayFlow Africa" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Founder Name</label>
                  <input required value={founder} onChange={e => setFounder(e.target.value)} placeholder="e.g. Amara Diallo" className="input-field py-2 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Location</label>
                    <input required value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Nairobi, KE" className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Asset Value</label>
                    <input required value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. $890,000" className="input-field py-2 text-xs" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Cost Basis</label>
                    <input required value={costBasis} onChange={e => setCostBasis(e.target.value)} placeholder="e.g. $500,000" className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Stage</label>
                    <select value={stage} onChange={e => setStage(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs">
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B">Series B</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Register Holding</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
