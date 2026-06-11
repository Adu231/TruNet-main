import { useState } from "react";
import { Target, Users, Check, X, Search, MessageSquare, Award } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_REQUESTS = [
  { id: "mr1", name: "Hiroshi Sato", role: "Junior Go Developer", goal: "Backend optimization and concurrent patterns", status: "pending", date: "June 9, 2026" },
  { id: "mr2", name: "Alina Petrova", role: "UI Designer", goal: "Transitioning to web accessibility compliance", status: "pending", date: "June 8, 2026" },
  { id: "mr3", name: "Carlos Menendez", role: "Security Analyst", goal: "Zero Knowledge Proof architectures", status: "accepted", date: "June 2, 2026" },
];

export default function ExpertMentorship() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [search, setSearch] = useState("");

  const handleAction = (id: string, action: "accept" | "decline") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === "accept" ? "accepted" : "declined" } : r));
    toast.success(`Mentorship request has been ${action === "accept" ? "accepted" : "declined"}!`);
  };

  const filtered = requests.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.goal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Target size={22} className="text-primary" /> Mentorship Portal
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Guide junior peers, review active mentee sessions, and accept consulting boards.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mentees or goals..." className="input-field pl-11 py-1.5 text-xs w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Mentees", value: requests.filter(r => r.status === "accepted").length.toString(), desc: "Weekly consulting rounds", color: "text-emerald-500" },
            { label: "Pending Requests", value: requests.filter(r => r.status === "pending").length.toString(), desc: "Awaiting your review", color: "text-primary" },
            { label: "Total Hours Donated", value: "48 Hours", desc: "For public community benefit", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
            <Users size={15} className="text-primary" /> Mentorship Request Board
          </h3>

          {filtered.map(req => (
            <div key={req.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-foreground text-sm">{req.name}</h4>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize border ${
                    req.status === "accepted"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : req.status === "declined"
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-primary font-semibold">{req.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Focus Area: <strong className="text-foreground">{req.goal}</strong>
                </p>
                <p className="text-[9px] text-muted-foreground">Requested on {req.date}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                {req.status === "pending" && (
                  <>
                    <button onClick={() => handleAction(req.id, "accept")} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1 bg-emerald-600 hover:bg-emerald-600/90 text-white">
                      <Check size={12} /> Accept
                    </button>
                    <button onClick={() => handleAction(req.id, "decline")} className="btn-secondary py-1.5 px-3 text-xs font-semibold text-red-500 hover:bg-red-500/10 border-red-500/20 flex items-center gap-1">
                      <X size={12} /> Decline
                    </button>
                  </>
                )}
                {req.status === "accepted" && (
                  <button onClick={() => toast.info(`Starting video consult session with ${req.name}...`)} className="btn-secondary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5">
                    <MessageSquare size={12} /> Chat Mentee
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Target size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No mentorship requests available.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
