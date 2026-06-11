import { useState } from "react";
import { Calendar, Plus, Search, Video, MapPin, Users, Check, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_EVENTS = [
  { id: "e1", title: "Enterprise Scaling Strategy Showcase", host: "Self", date: "2026-06-28", time: "02:00 PM EST", type: "Webinar (Zoom)", registered: 180, active: true },
  { id: "e2", title: "Strategic B2B Alliances Workshop", host: "Self", date: "2026-07-05", time: "10:00 AM EST", type: "Virtual Workshop", registered: 45, active: true },
];

export default function BusinessEvents() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Webinar (Zoom)");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `e-${Date.now()}`,
      title,
      host: "Self",
      date,
      time,
      type,
      registered: 0,
      active: true
    };
    setEvents([added, ...events]);
    setShowModal(false);
    setTitle("");
    setDate("");
    setTime("");
    toast.success(`Business Event scheduled: "${title}"!`);
  };

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    toast.info("Event cancelled.");
  };

  const filtered = events.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Calendar size={22} className="text-primary" /> Corporate Events
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Coordinate B2B product demonstrations, partner summits, and client onboarding sessions.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Host Event
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Video size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={11} className="text-primary" /> {item.type}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-semibold">
                    <span>Date: {item.date} at {item.time}</span>
                    <span>·</span>
                    <span>{item.registered} Registered</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                  <Check size={12} /> Scheduled
                </span>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="Cancel Event">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Calendar size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No events hosted yet.</p>
            </div>
          )}
        </div>

        {/* Host Event Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Schedule Business Event</h3>
              <p className="text-xs text-muted-foreground mb-4">Set up a live presentation or client summit.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Event Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Q3 B2B Strategy Launch" className="input-field py-2 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Date</label>
                    <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field py-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Time</label>
                    <input required value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 2:00 PM EST" className="input-field py-2 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Session Format</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs">
                    <option value="Webinar (Zoom)">Webinar (Zoom)</option>
                    <option value="Virtual Workshop">Virtual Workshop</option>
                    <option value="B2B Client Round Table">B2B Client Round Table</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Schedule Event</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
