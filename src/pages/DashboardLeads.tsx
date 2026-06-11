import { useState } from "react";
import { Plus, Search, TrendingUp, DollarSign, Filter, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatCurrency, getTrustScoreColor } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LEADS = [
  { id: "1", company: "Nexus Dynamics", contact: "Sarah Lee", email: "s.lee@nexusdyn.com", value: 45000, stage: "qualified", score: 88, date: "Jun 8, 2026", industry: "Technology" },
  { id: "2", company: "BlueWave Tech", contact: "Marcus Chen", email: "marcus@bluewave.io", value: 22000, stage: "proposal", score: 91, date: "Jun 5, 2026", industry: "SaaS" },
  { id: "3", company: "Apex Consulting", contact: "James Wright", email: "james@apexco.com", value: 78000, stage: "contacted", score: 76, date: "Jun 2, 2026", industry: "Consulting" },
  { id: "4", company: "VistaGroup LLC", contact: "Priya Nair", email: "p.nair@vistagroup.com", value: 15000, stage: "new", score: 83, date: "Jun 1, 2026", industry: "Finance" },
  { id: "5", company: "DataStream Corp", contact: "Elena Kim", email: "ekim@datastream.co", value: 62000, stage: "closed", score: 95, date: "May 28, 2026", industry: "Data" },
  { id: "6", company: "CloudFirst Inc", contact: "Tom Bradley", email: "tom@cloudfirst.io", value: 34000, stage: "qualified", score: 87, date: "May 25, 2026", industry: "Cloud" },
  { id: "7", company: "BrightPath Partners", contact: "Aisha Johnson", email: "aisha@brightpath.com", value: 19000, stage: "new", score: 79, date: "May 22, 2026", industry: "HR" },
  { id: "8", company: "InnovateCo", contact: "Chris Park", email: "chris@innovateco.com", value: 55000, stage: "proposal", score: 92, date: "May 20, 2026", industry: "Technology" },
];

const STAGES = ["all", "new", "contacted", "qualified", "proposal", "closed"];

const STAGE_STYLES: Record<string, string> = {
  new: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  contacted: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  qualified: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  proposal: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  closed: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
};

export default function DashboardLeads() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [leads, setLeads] = useState(LEADS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({ company: "", contact: "", value: "", stage: "new" });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Link to="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    const matchSearch = !search || l.company.toLowerCase().includes(search.toLowerCase()) || l.contact.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === "all" || l.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const totalValue = filtered.reduce((acc, l) => acc + l.value, 0);
  const avgScore = Math.round(filtered.reduce((acc, l) => acc + l.score, 0) / (filtered.length || 1));

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = {
      id: Date.now().toString(),
      company: newLead.company,
      contact: newLead.contact,
      email: `contact@${newLead.company.toLowerCase().replace(/\s/g, "")}.com`,
      value: parseInt(newLead.value) || 0,
      stage: newLead.stage as any,
      score: Math.floor(Math.random() * 20) + 75,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      industry: "Other",
    };
    setLeads((prev) => [lead, ...prev]);
    setNewLead({ company: "", contact: "", value: "", stage: "new" });
    setShowAddModal(false);
    toast.success("Lead added successfully!");
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Lead Pipeline</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{leads.length} total leads · {formatCurrency(leads.reduce((a, l) => a + l.value, 0))} pipeline value</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm py-2">
            <Plus size={15} /> Add Lead
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pipeline Value", value: formatCurrency(totalValue), icon: DollarSign, color: "text-primary bg-primary/10" },
            { label: "Qualified Leads", value: filtered.filter(l => l.stage === "qualified").length.toString(), icon: TrendingUp, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400" },
            { label: "Avg Lead Score", value: avgScore.toString(), icon: TrendingUp, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400" },
            { label: "Closed Won", value: leads.filter(l => l.stage === "closed").length.toString(), icon: TrendingUp, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", s.color)}>
                <s.icon size={16} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="input-field pl-10 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border",
                  stageFilter === stage ? "bg-primary text-white border-primary" : "bg-background border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Company", "Contact", "Value", "Stage", "Score", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-foreground">{lead.company}</p>
                        <p className="text-xs text-muted-foreground">{lead.industry}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm text-foreground">{lead.contact}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-foreground">{formatCurrency(lead.value)}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn("trust-badge text-xs", STAGE_STYLES[lead.stage])}>{lead.stage}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("text-sm font-semibold", getTrustScoreColor(lead.score))}>{lead.score}</span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{lead.date}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => {
                          const stages: string[] = ["new", "contacted", "qualified", "proposal", "closed"];
                          const curr = stages.indexOf(lead.stage);
                          if (curr < stages.length - 1) {
                            setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, stage: stages[curr + 1] as any } : l));
                            toast.success("Stage updated!");
                          }
                        }}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Advance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp size={32} className="text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No leads found. Add your first lead.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-card-hover">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Add New Lead</h2>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Company Name</label>
                <input value={newLead.company} onChange={(e) => setNewLead({ ...newLead, company: e.target.value })} placeholder="Company name" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Contact Name</label>
                <input value={newLead.contact} onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })} placeholder="Primary contact" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Deal Value ($)</label>
                <input type="number" value={newLead.value} onChange={(e) => setNewLead({ ...newLead, value: e.target.value })} placeholder="0" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Stage</label>
                <select value={newLead.stage} onChange={(e) => setNewLead({ ...newLead, stage: e.target.value })} className="input-field">
                  {STAGES.filter(s => s !== "all").map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Add Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
