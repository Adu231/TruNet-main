import { useState } from "react";
import { Calendar, Search, MapPin, Users, Check, Plus, Video, Trash2, Mic } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_EVENTS = [
  { id: "e1", title: "CleanTech Seed Showcase", host: "EcoVibe Logistics", date: "2026-06-18", time: "10:00 AM EST", type: "Virtual (Zoom)", RSVPs: 48, joined: false },
  { id: "e2", title: "Fintech & DeFi Pitch Deck Live", host: "Krypton Ledger", date: "2026-06-22", time: "02:00 PM EST", type: "London VC Hub", RSVPs: 35, joined: true },
  { id: "e3", title: "Healthcare AI Seed Presentations", host: "NeuraMedica", date: "2026-06-28", time: "11:00 AM EST", type: "Virtual (Meet)", RSVPs: 62, joined: false },
];

export default function InvestorEvents() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Virtual (Zoom)");

  const handleRSVP = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        const nextJoined = !e.joined;
        toast.success(nextJoined ? `RSVP confirmed for "${e.title}"!` : `Cancelled RSVP for "${e.title}".`);
        return { ...e, joined: nextJoined, RSVPs: nextJoined ? e.RSVPs + 1 : e.RSVPs - 1 };
      }
      return e;
    }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !host || !date || !time) {
      toast.error("Please fill in all fields");
      return;
    }
    const added = {
      id: `e-${Date.now()}`,
      title,
      host,
      date,
      time,
      type,
      RSVPs: 1,
      joined: true
    };
    setEvents([added, ...events]);
    setShowModal(false);
    setTitle("");
    setHost("");
    setDate("");
    setTime("");
    toast.success(`VC Pitch Event "${title}" registered!`);
  };

  const filtered = events.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.host.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Calendar size={22} className="text-primary" /> Pitch Presentations & Events
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Join upcoming startup demos, private seed pitch meetings, and networking workshops.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pitch events..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0">
              <Plus size={13} /> Host Pitch Event
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Mic size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">Hosted by: <strong className="text-foreground">{item.host}</strong></p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={11} className="text-primary" /> {item.type}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-semibold">
                    <span>Date: {item.date}</span>
                    <span>·</span>
                    <span>Time: {item.time}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><Users size={9} /> {item.RSVPs} Attendees</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleRSVP(item.id)}
                  className={`py-1.5 px-3.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1 ${
                    item.joined
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-primary text-white border-primary hover:bg-primary/90"
                  }`}
                >
                  {item.joined ? (
                    <>
                      <Check size={12} /> Registered
                    </>
                  ) : (
                    "RSVP Now"
                  )}
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Calendar size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No events found matching search criteria.</p>
            </div>
          )}
        </div>

        {/* Create Pitch Event Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">Host Pitch Event</h3>
              <p className="text-xs text-muted-foreground mb-4">Register an upcoming startup showcase or presentation.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Event Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. DeFi Series A Demo" className="input-field py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Host Startup / VC</label>
                  <input required value={host} onChange={e => setHost(e.target.value)} placeholder="e.g. Krypton Ledger" className="input-field py-2 text-xs" />
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
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Location / Format</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground text-xs">
                    <option value="Virtual (Zoom)">Virtual (Zoom)</option>
                    <option value="Virtual (Meet)">Virtual (Meet)</option>
                    <option value="London VC Hub">London VC Hub</option>
                    <option value="San Francisco Incubator">San Francisco Incubator</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs py-2 px-4">Cancel</button>
                  <button type="submit" className="btn-primary text-xs py-2 px-4">Publish Event</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
