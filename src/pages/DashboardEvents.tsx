import { useState } from "react";
import { Calendar, Search, Plus, MapPin, Users, Video, ShieldCheck, Clock, Share2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_EVENTS = [
  { id: "e1", title: "AI Strategy Masterclass", type: "Webinar", date: "June 18, 2026", time: "2:00 PM PST", registered: 342, capacity: 500, host: "Dr. Yuki Tanaka", status: "upcoming", isRegistered: false },
  { id: "e2", title: "B2B SaaS Growth & Funding", type: "Pitch Event", date: "June 22, 2026", time: "11:00 AM EST", registered: 95, capacity: 150, host: "Apex Ventures", status: "upcoming", isRegistered: false },
  { id: "e3", title: "Monthly Mentorship Office Hours", type: "Workshop", date: "July 2, 2026", time: "9:00 AM GMT", registered: 87, capacity: 100, host: "tanaka_institute", status: "upcoming", isRegistered: false }
];

export default function DashboardEvents() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", type: "Webinar", date: "", time: "", capacity: "100", host: "My Business" });

  const handleRegister = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const registeredDiff = e.isRegistered ? -1 : 1;
          toast.success(e.isRegistered ? "Cancelled registration" : "Successfully registered for the event!");
          return {
            ...e,
            isRegistered: !e.isRegistered,
            registered: e.registered + registeredDiff
          };
        }
        return e;
      })
    );
  };

  const handleHost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newEvent = {
      id: `e-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      date: new Date(formData.date).toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }),
      time: formData.time,
      registered: 1,
      capacity: parseInt(formData.capacity) || 100,
      host: formData.host || "Self",
      status: "upcoming",
      isRegistered: true
    };
    setEvents([newEvent, ...events]);
    setShowModal(false);
    setFormData({ title: "", type: "Webinar", date: "", time: "", capacity: "100", host: "My Business" });
    toast.success("Event created successfully! You are registered as host.");
  };

  const filtered = events.filter((e) => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.host.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || e.type.toLowerCase().includes(category.toLowerCase());
    return matchSearch && matchCat;
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Calendar size={22} className="text-primary" />
              Events & Webinars
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Host or join verified professional events, panel discussions, and pitch presentations.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-sm py-2"
          >
            <Plus size={15} /> Host Event
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          {/* Category tabs */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl w-full sm:w-auto overflow-x-auto">
            {["all", "webinar", "workshop", "pitch"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap",
                  category === cat ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat === "all" ? "All Events" : cat + "s"}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="input-field pl-11 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-5 card-hover flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={11} /> {item.time}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">
                  {item.title}
                </h3>

                <div className="space-y-1.5 text-xs text-muted-foreground mt-4 pb-4 border-b border-border">
                  <p className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-muted-foreground" /> {item.date}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Video size={12} className="text-muted-foreground" /> Online Meeting
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users size={12} className="text-muted-foreground" /> Hosted by{" "}
                    <strong className="text-foreground">{item.host}</strong>
                  </p>
                </div>
              </div>

              {/* Bottom detail and register */}
              <div className="flex items-center justify-between gap-3 mt-4 pt-2">
                <div className="text-left">
                  <p className="text-[11px] font-bold text-foreground">
                    {item.registered} / {item.capacity}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Registered</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { toast.success("Event link copied to clipboard!"); }}
                    className="p-2 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <Share2 size={13} />
                  </button>
                  <button
                    onClick={() => handleRegister(item.id)}
                    className={cn(
                      "text-xs px-4 py-2 rounded-lg font-semibold transition-all shadow-brand-sm",
                      item.isRegistered
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-primary text-white hover:opacity-90"
                    )}
                  >
                    {item.isRegistered ? "Registered ✓" : "Register"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar size={40} className="text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No events scheduled</h3>
            <p className="text-sm text-muted-foreground">Try refining your search terms or category selection.</p>
          </div>
        )}
      </div>

      {/* Host Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Host New Event</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleHost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Event Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Strategy Masterclass"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Event Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                >
                  <option>Webinar</option>
                  <option>Workshop</option>
                  <option>Pitch Event</option>
                  <option>Live Q&A</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Time</label>
                  <input
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 2:00 PM PST"
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Maximum Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="input-field"
                  placeholder="100"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                >
                  Host Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
