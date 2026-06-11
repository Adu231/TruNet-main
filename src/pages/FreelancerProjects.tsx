import { useState } from "react";
import { Briefcase, Clock, Plus, CheckCircle, Search, Trash2, DollarSign } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_CONTRACTS = [
  { id: "c1", title: "Market Entry Strategy Report", client: "DataStream Corp", budget: 4200, progress: 65, due: "June 20, 2026", status: "Active", task: "Drafting Part III (Market Fit analysis)" },
  { id: "c2", title: "Sales Process Optimization", client: "InnovateCo", budget: 2900, progress: 20, due: "June 28, 2026", status: "Active", task: "Review current team sales playbook" },
  { id: "c3", title: "API Documentation Audit", client: "CloudFirst Inc", budget: 1800, progress: 100, due: "June 1, 2026", status: "Completed", task: "Deliverable Approved ✓" },
];

export default function FreelancerProjects() {
  const [contracts, setContracts] = useState(INITIAL_CONTRACTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [budget, setBudget] = useState("");
  const [due, setDue] = useState("");
  const [task, setTask] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !client || !budget || !due) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `c-${Date.now()}`,
      title,
      client,
      budget: parseFloat(budget),
      progress: 0,
      due,
      status: "Active",
      task: task || "Project Initialized"
    };
    setContracts([added, ...contracts]);
    setShowModal(false);
    setTitle("");
    setClient("");
    setBudget("");
    setDue("");
    setTask("");
    toast.success(`Active contract registered: "${title}"!`);
  };

  const handleSubmitDeliverable = (id: string, contractTitle: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, progress: 100, status: "Completed", task: "Deliverable Submitted (Pending Review)" } : c));
    toast.success(`Deliverable submitted successfully for ${contractTitle}!`);
  };

  const filtered = contracts.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Briefcase size={22} className="text-primary" /> My Projects & Contracts
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Manage active milestones, log deliverables, and review closed client consulting engagements.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contracts..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Log New Contract
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Engagements", value: contracts.filter(c => c.status === "Active").length.toString(), desc: "In-progress deliverables", color: "text-primary" },
            { label: "Completed Projects", value: contracts.filter(c => c.status === "Completed").length.toString(), desc: "Signed-off agreements", color: "text-emerald-500" },
            { label: "Contracts Value Pool", value: `$${contracts.reduce((acc, curr) => acc + curr.budget, 0).toLocaleString()}`, desc: "Earning backlog YTD", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(c => (
            <div key={c.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-foreground text-sm">{c.title}</h3>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border ${
                    c.status === "Active" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }`}>{c.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">Client: <strong className="text-foreground">{c.client}</strong> · Contract Budget: <strong className="text-primary">${c.budget.toLocaleString()}</strong></p>
                
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Task: <strong>{c.task}</strong></span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end gap-3 flex-shrink-0 self-stretch min-w-[140px]">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold"><Clock size={10} /> Due {c.due}</span>
                {c.progress < 100 && (
                  <button onClick={() => handleSubmitDeliverable(c.id, c.title)} className="btn-primary py-1.5 px-3.5 text-xs font-semibold w-full text-center">
                    Submit Deliverable
                  </button>
                )}
                {c.progress === 100 && (
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                    Completed ✓
                  </span>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Briefcase size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No active or completed projects found.</p>
            </div>
          )}
        </div>

        {/* Add Contract Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Log New Contract</h3>
              <p className="text-xs text-muted-foreground mb-4">Register an active freelance contract engagement.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Name</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sales Playbook Refinement" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Client Name</label>
                  <input required value={client} onChange={e => setClient(e.target.value)} placeholder="e.g. InnovateCo" className="input-field py-2 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Contract Budget</label>
                    <input required type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 2900" className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Due Date</label>
                    <input required value={due} onChange={e => setDue(e.target.value)} placeholder="e.g. June 28, 2026" className="input-field py-2 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">First Milestone Task</label>
                  <input value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. Review playbook draft" className="input-field py-2 text-xs" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Log Contract</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
