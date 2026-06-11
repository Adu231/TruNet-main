import { useState } from "react";
import { Award, Plus, Code, Trash, Star, ShieldCheck } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_PROJECTS = [
  { id: "pf1", title: "Apex Ventures Portal", stack: "React + Tailwind", budget: "$15,000", year: "2025", desc: "Interactive founder document manager and data-room integrations." },
  { id: "pf2", title: "MediLink Mobile Scanner", stack: "React Native + Node", budget: "$8,500", year: "2025", desc: "NFC scanning healthcare app tracking authentic medicines delivery." },
];

export default function FreelancerPortfolio() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [stack, setStack] = useState("");
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !stack || !budget) return;
    const added = {
      id: `pf-${Date.now()}`,
      title,
      stack,
      budget,
      year: "2026",
      desc: desc || "A secure B2B platform integration project."
    };
    setProjects([added, ...projects]);
    setShowModal(false);
    setTitle("");
    setStack("");
    setBudget("");
    setDesc("");
    toast.success("New project successfully published to your TruNet portfolio!");
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.info("Project removed from portfolio.");
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Award size={22} className="text-primary" /> Work Portfolio
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Showcase verified consultation projects and engineering credentials.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
            <Plus size={13} /> Add Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map(p => (
            <div key={p.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow relative group">
              <div>
                <div className="flex items-center gap-1 text-[10px] text-primary font-semibold mb-2">
                  <Code size={12} /> {p.stack}
                </div>
                <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">{p.title} <ShieldCheck size={13} className="text-primary" /></h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Completed: {p.year}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{p.budget}</span>
                  <button onClick={() => handleDelete(p.id)} className="p-1 rounded text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Remove">
                    <Trash size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Project Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Add Portfolio Showcase</h3>
              <p className="text-xs text-muted-foreground mb-4">Add a new verified contract to your public record.</p>

              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Name</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Fintech Integration Portal" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Tech Stack</label>
                  <input required value={stack} onChange={e => setStack(e.target.value)} placeholder="e.g. React Native + Node" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Budget / Project Value</label>
                  <input required value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. $8,500" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Brief Description</label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Summarize deliverables..." className="w-full px-4 py-2 rounded-lg border border-input bg-background text-xs" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Publish Project</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
