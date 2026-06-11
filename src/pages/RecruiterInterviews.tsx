import { useState } from "react";
import { Calendar as CalendarIcon, Video, Clock, Plus, Search, User, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_INTERVIEWS = [
  { id: "i1", candidate: "Kwame Asante", role: "Senior AI Engineer", date: "2026-06-12", time: "14:00", type: "Technical Interview", link: "https://trunet.io/meet/kwame-asante" },
  { id: "i2", candidate: "Elena Vasquez", role: "Lead Product Designer", date: "2026-06-15", time: "11:00", type: "Portfolio Review", link: "https://trunet.io/meet/elena-vasquez" },
  { id: "i3", candidate: "David Park", role: "Full-Stack Engineer", date: "2026-06-16", time: "16:30", type: "Culture Fit", link: "https://trunet.io/meet/david-park" },
];

export default function RecruiterInterviews() {
  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Technical Interview");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate || !role || !date || !time) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `i-${Date.now()}`,
      candidate,
      role,
      date,
      time,
      type,
      link: `https://trunet.io/meet/${candidate.toLowerCase().replace(/\s+/g, "-")}`
    };
    setInterviews([added, ...interviews]);
    setShowModal(false);
    setCandidate("");
    setRole("");
    setDate("");
    setTime("");
    toast.success(`Interview with ${candidate} successfully scheduled!`);
  };

  const handleDelete = (id: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
    toast.info("Interview invitation cancelled.");
  };

  const filtered = interviews.filter(i =>
    !search || i.candidate.toLowerCase().includes(search.toLowerCase()) || i.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <CalendarIcon size={22} className="text-primary" /> Interview Schedule
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Coordinate, schedule, and launch video screening sessions for verified talent.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search scheduled sessions..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Schedule Interview
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map(item => (
            <div key={item.id} className="p-4 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Video size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{item.candidate}</h3>
                  <p className="text-xs text-muted-foreground">{item.role} · <span className="text-primary font-semibold">{item.type}</span></p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarIcon size={10} /> {item.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                <a href={item.link} target="_blank" rel="noreferrer" className="btn-secondary py-1.5 px-3 text-xs font-semibold hover:bg-primary/10 hover:text-primary flex items-center gap-1">
                  Launch Meeting
                </a>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="Cancel Interview">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <CalendarIcon size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No interviews scheduled.</p>
            </div>
          )}
        </div>

        {/* Add Interview Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Schedule Video Interview</h3>
              <p className="text-xs text-muted-foreground mb-4">Set up a session with a candidate.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Candidate Name</label>
                  <input required value={candidate} onChange={e => setCandidate(e.target.value)} placeholder="e.g. Elena Vasquez" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Target Role</label>
                  <input required value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Lead Product Designer" className="input-field py-2 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Date</label>
                    <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Time</label>
                    <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field py-2 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Interview Type</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs">
                    <option value="Technical Interview">Technical Interview</option>
                    <option value="Portfolio Review">Portfolio Review</option>
                    <option value="Culture Fit">Culture Fit</option>
                    <option value="Initial Screening">Initial Screening</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Create Schedule</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
