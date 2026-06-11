import { useState } from "react";
import { ClipboardCheck, Search, Plus, Star, Link as LinkIcon, User } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_PROPOSALS = [
  { id: "p1", title: "React Native Developer Needed", client: "Apex Ventures", bid: "$4,500", status: "negotiating", date: "June 8, 2026" },
  { id: "p2", title: "Technical Writer - API Docs", client: "DataStream Corp", bid: "$1,800", status: "review", date: "June 6, 2026" },
  { id: "p3", title: "Go-to-Market Strategy Roadmap", client: "CloudFirst Inc", bid: "$6,200", status: "declined", date: "May 28, 2026" },
];

export default function FreelancerProposals() {
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState("");
  const [rate, setRate] = useState("");
  const [coverNote, setCoverNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !rate || !coverNote) return;
    const added = {
      id: `p-${Date.now()}`,
      title: `${client} Consulting Engagement`,
      client,
      bid: rate,
      status: "review",
      date: new Date().toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" })
    };
    setProposals([added, ...proposals]);
    setShowModal(false);
    setClient("");
    setRate("");
    setCoverNote("");
    toast.success("Proposal and credentials submitted to client successfully!");
  };

  const filtered = proposals.filter(p => !search || p.client.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <ClipboardCheck size={22} className="text-primary" /> Project Bids & Proposals
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Manage and review outbound consulting proposals.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search proposals..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Send Proposal
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(p => (
            <div key={p.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-sm">{p.title}</h3>
                  <span className={cn(
                    "text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border",
                    p.status === "negotiating" ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" : p.status === "review" ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                  )}>{p.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">Client: <strong className="text-foreground">{p.client}</strong> · Proposed Rate: <strong className="text-primary">{p.bid}</strong></p>
                <p className="text-[10px] text-muted-foreground mt-1">Submitted on {p.date}</p>
              </div>
              <div className="flex-shrink-0">
                <button onClick={() => toast.info(`Viewing details of proposal to ${p.client}`)} className="text-[10px] text-primary hover:underline font-bold">
                  View Proposal Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Proposal Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Submit Project Bid</h3>
              <p className="text-xs text-muted-foreground mb-4">Set your proposed consulting parameters.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Client Name</label>
                  <input required value={client} onChange={e => setClient(e.target.value)} placeholder="e.g. Apex Ventures" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Proposed Project Rate</label>
                  <input required value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. $4,500" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Cover Note</label>
                  <textarea required value={coverNote} onChange={e => setCoverNote(e.target.value)} rows={3} placeholder="Why you're the right fit for this role..." className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Submit Bid</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
