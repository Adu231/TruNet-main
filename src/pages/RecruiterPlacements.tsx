import { useState } from "react";
import { CheckCircle, Award, TrendingUp, Search, Briefcase, Plus, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_PLACEMENTS = [
  { id: "pl1", candidate: "Kwame Asante", role: "Senior AI Engineer", company: "DataStream Corp", salary: "$145,000", date: "June 2, 2026", status: "Active" },
  { id: "pl2", candidate: "Elena Vasquez", role: "Lead Product Designer", company: "Apex Consulting", salary: "$115,000", date: "May 20, 2026", status: "Active" },
  { id: "pl3", candidate: "Yuki Tanaka", role: "Data Scientist", company: "MediLink Tech", salary: "$130,000", date: "April 15, 2026", status: "Completed" },
];

export default function RecruiterPlacements() {
  const [placements, setPlacements] = useState(INITIAL_PLACEMENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate || !role || !company || !salary) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `pl-${Date.now()}`,
      candidate,
      role,
      company,
      salary,
      date: new Date().toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }),
      status: "Active"
    };
    setPlacements([added, ...placements]);
    setShowModal(false);
    setCandidate("");
    setRole("");
    setCompany("");
    setSalary("");
    toast.success(`Placement logged: ${candidate} at ${company}!`);
  };

  const filtered = placements.filter(pl =>
    !search || pl.candidate.toLowerCase().includes(search.toLowerCase()) || pl.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <CheckCircle size={22} className="text-primary" /> Placements Desk
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Monitor active employment contracts and closed recruitment commissions.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search placements..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Log Placement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Placements", value: placements.filter(p => p.status === "Active").length.toString(), desc: "Under commission guarantee", color: "text-primary" },
            { label: "Closed Placements", value: placements.filter(p => p.status === "Completed").length.toString(), desc: "Completed agreements", color: "text-emerald-500" },
            { label: "Guaranteed Revenue YTD", value: "$48,500", desc: "Based on 15% recruiter share", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
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
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Assigned Role</th>
                  <th className="px-4 py-3">Employer</th>
                  <th className="px-4 py-3">Contract Salary</th>
                  <th className="px-4 py-3">Placed Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(pl => (
                  <tr key={pl.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{pl.candidate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pl.role}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{pl.company}</td>
                    <td className="px-4 py-3 font-bold text-foreground">{pl.salary}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pl.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${pl.status === "Active" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"}`}>
                        {pl.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Log Placement Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Log New Placement</h3>
              <p className="text-xs text-muted-foreground mb-4">Register a successful recruit hire.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Candidate Name</label>
                  <input required value={candidate} onChange={e => setCandidate(e.target.value)} placeholder="e.g. David Park" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Role Title</label>
                  <input required value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Full-Stack Engineer" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Employer Company</label>
                  <input required value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. CloudFirst Inc" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Annual Salary</label>
                  <input required value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g. $130,000" className="input-field py-2 text-xs" />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Record Placement</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
