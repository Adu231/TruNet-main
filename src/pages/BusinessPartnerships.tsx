import { useState } from "react";
import { Handshake, Plus, Search, DollarSign, Activity, Trash2, ShieldCheck } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_PARTNERSHIPS = [
  { id: "p1", name: "DataStream Corp", type: "Strategic Alliance", value: "$62,000", status: "Active" },
  { id: "p2", name: "Nexus Dynamics", type: "Joint Venture", value: "$45,000", status: "Negotiating" },
  { id: "p3", name: "CloudBridge Partners", type: "Reseller Agreement", value: "$18,000", status: "Active" },
];

export default function BusinessPartnerships() {
  const [partnerships, setPartnerships] = useState(INITIAL_PARTNERSHIPS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Strategic Alliance");
  const [value, setValue] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `p-${Date.now()}`,
      name,
      type,
      value: value.startsWith("$") ? value : `$${parseFloat(value).toLocaleString()}`,
      status: "Active"
    };
    setPartnerships([added, ...partnerships]);
    setShowModal(false);
    setName("");
    setValue("");
    toast.success(`Partnership logged with ${name}!`);
  };

  const handleDelete = (id: string) => {
    setPartnerships(prev => prev.filter(p => p.id !== id));
    toast.info("Partnership record removed.");
  };

  const filtered = partnerships.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Handshake size={22} className="text-primary" /> Strategic Partnerships
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Coordinate B2B alliances, co-marketing strategies, and reseller commission agreements.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search alliances..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Log Alliance
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Agreements", value: partnerships.filter(p => p.status === "Active").length.toString(), desc: "Under contract execution", color: "text-emerald-500" },
            { label: "Pipeline Value", value: "$125K", desc: "Estimated ecosystem impact", color: "text-primary" },
            { label: "Negotiating Deals", value: partnerships.filter(p => p.status === "Negotiating").length.toString(), desc: "Awaiting legal signoff", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(p => (
            <div key={p.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground text-sm">{p.name}</h3>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border ${
                    p.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  }`}>{p.status}</span>
                </div>
                <p className="text-xs text-primary font-semibold">{p.type}</p>
                <p className="text-xs text-muted-foreground">Alliance Value: <strong className="text-foreground">{p.value}</strong></p>
              </div>

              <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                <button onClick={() => toast.success(`Viewing documentation for ${p.name}...`)} className="btn-secondary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5">
                  View Terms
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Handshake size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No partnerships recorded.</p>
            </div>
          )}
        </div>

        {/* Log Alliance Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Log Strategic Alliance</h3>
              <p className="text-xs text-muted-foreground mb-4">Add a new partnership details to your records.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Partner Entity Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Nexus Dynamics" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Estimated Agreement Value</label>
                  <input required value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 45000" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Partnership Type</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs">
                    <option value="Strategic Alliance">Strategic Alliance</option>
                    <option value="Joint Venture">Joint Venture</option>
                    <option value="Reseller Agreement">Reseller Agreement</option>
                    <option value="Technology Integration">Technology Integration</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Log Agreement</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
