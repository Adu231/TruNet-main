import { useState } from "react";
import { Mic, Calendar, MapPin, Check, X, Search, Video, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_SPEAKING_REQUESTS = [
  { id: "sr1", eventName: "Global Tech Integrity Summit 2026", role: "Keynote Speaker", topic: "Identity Verification & Decentralized Trust", date: "2026-07-10", location: "New York, US", status: "pending" },
  { id: "sr2", eventName: "Fintech Founders Round Table", role: "Panel Moderator", topic: "Mitigating Credentials Fraud in B2B Deals", date: "2026-07-22", location: "Virtual (Zoom)", status: "pending" },
  { id: "sr3", eventName: "AgriTech Innovation Webinar", role: "Panelist", topic: "Securing Supply Chains via Trust Scores", date: "2026-06-30", location: "Virtual (Meet)", status: "accepted" },
];

export default function ExpertSpeaking() {
  const [requests, setRequests] = useState(INITIAL_SPEAKING_REQUESTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [role, setRole] = useState("Keynote Speaker");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleAction = (id: string, action: "accept" | "decline") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === "accept" ? "accepted" : "declined" } : r));
    toast.success(`Speaking invitation has been ${action === "accept" ? "accepted" : "declined"}!`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !topic || !date || !location) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `sr-${Date.now()}`,
      eventName,
      role,
      topic,
      date,
      location,
      status: "accepted"
    };
    setRequests([added, ...requests]);
    setShowModal(false);
    setEventName("");
    setTopic("");
    setDate("");
    setLocation("");
    toast.success(`Speaking event logged: "${eventName}"!`);
  };

  const filtered = requests.filter(r =>
    !search || r.eventName.toLowerCase().includes(search.toLowerCase()) || r.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Mic size={22} className="text-primary" /> Speaking Requests
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Coordinate panel invitations, keynote lectures, and platform webinars.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search engagements..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Log Speaking Gig
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(req => (
            <div key={req.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Mic size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-sm">{req.eventName}</h3>
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
                  <p className="text-xs text-primary font-semibold">{req.role} · <span className="text-muted-foreground">{req.topic}</span></p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-semibold">
                    <span className="flex items-center gap-0.5"><Calendar size={10} /> {req.date}</span>
                    <span className="flex items-center gap-0.5"><MapPin size={10} /> {req.location}</span>
                  </div>
                </div>
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
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    Confirmed ✓
                  </span>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Mic size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No speaking requests registered.</p>
            </div>
          )}
        </div>

        {/* Log Speaking Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Record Speaking Engagement</h3>
              <p className="text-xs text-muted-foreground mb-4">Add a new keynote or panel scheduling detail to your public record.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Event Name</label>
                  <input required value={eventName} onChange={e => setEventName(e.target.value)} placeholder="e.g. World Tech Integrity Expo" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Topic / Title of Talk</label>
                  <input required value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Scaling Verifications in Remote Teams" className="input-field py-2 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Date</label>
                    <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Location / Format</label>
                    <input required value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. London / Virtual" className="input-field py-2 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Role</label>
                  <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs">
                    <option value="Keynote Speaker">Keynote Speaker</option>
                    <option value="Panel Moderator">Panel Moderator</option>
                    <option value="Panelist">Panelist</option>
                    <option value="Workshop Leader">Workshop Leader</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Log Engagement</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
