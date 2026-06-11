import { useState } from "react";
import { Briefcase, Plus, Search, Trash2, ShieldCheck, Eye, DollarSign } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_SERVICES = [
  { id: "s1", name: "B2B Strategy Consulting", price: "$12,000 / project", status: "active", views: 142 },
  { id: "s2", name: "Go-to-Market Planning", price: "$6,500 / engagement", status: "active", views: 98 },
  { id: "s3", name: "Investor Deck Review", price: "$2,800 / deck", status: "active", views: 211 },
];

export default function BusinessServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `s-${Date.now()}`,
      name,
      price,
      status: "active",
      views: 0
    };
    setServices([added, ...services]);
    setShowModal(false);
    setName("");
    setPrice("");
    toast.success(`Business service package published: ${name}!`);
  };

  const handleToggleStatus = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s));
    toast.info("Service package status updated.");
  };

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    toast.info("Service package deleted.");
  };

  const filtered = services.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Briefcase size={22} className="text-primary" /> My Service Catalog
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Publish consulting packages, set pricing structures, and track traffic reach metrics.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Publish Service
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Services", value: services.filter(s => s.status === "active").length.toString(), desc: "Listed in platform directories", color: "text-emerald-500" },
            { label: "Total Package Views", value: services.reduce((acc, curr) => acc + curr.views, 0).toLocaleString(), desc: "Audience traffic reach", color: "text-primary" },
            { label: "Average Project Value", value: "$7,100", desc: "Based on published benchmarks", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map(svc => (
            <div key={svc.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow relative group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border ${
                    svc.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                  }`}>{svc.status}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Eye size={12} /> {svc.views} views</span>
                </div>
                <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">{svc.name} <ShieldCheck size={13} className="text-primary" /></h3>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{svc.price}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleToggleStatus(svc.id)} className="text-[10px] text-muted-foreground hover:text-foreground font-semibold">
                    Toggle Status
                  </button>
                  <button onClick={() => handleDelete(svc.id)} className="p-1 rounded text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Remove">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl col-span-2">
              <Briefcase size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No service offerings listed.</p>
            </div>
          )}
        </div>

        {/* Publish Service Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Publish B2B Service</h3>
              <p className="text-xs text-muted-foreground mb-4">List your consultation or product package details.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. CRM Custom Integration Consultation" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Pricing Bracket / Package Rate</label>
                  <input required value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. $4,500 / project" className="input-field py-2 text-xs" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Publish Service</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
