import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Users, Star, Calendar, TrendingUp, Plus, ArrowRight,
  MessageSquare, Award, Mic, Globe, Target, Zap, CheckCircle, Video, PlusCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import TrustScore from "@/components/features/TrustScore";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const followersData = [
  { month: "Jan", followers: 4200 }, { month: "Feb", followers: 4600 },
  { month: "Mar", followers: 4900 }, { month: "Apr", followers: 5200 },
  { month: "May", followers: 5500 }, { month: "Jun", followers: 5800 },
];

const INITIAL_MENTEES = [
  { id: "m1", name: "James Okonkwo", goal: "B2B SaaS GTM", sessions: 8, status: "pending", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
  { id: "m2", name: "Priya Sharma", goal: "AI Product Strategy", sessions: 4, status: "active", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
  { id: "m3", name: "Sarah Mitchell", goal: "Leadership & Management", sessions: 3, status: "pending", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
];

const INITIAL_ARTICLES = [
  { id: "a1", title: "Why Most AI Strategies Fail in Practice", views: 18400, likes: 1240, category: "AI Strategy" },
  { id: "a2", title: "Framework for Mentoring Leaders", views: 12200, likes: 890, category: "Leadership" },
];

const INITIAL_EVENTS = [
  { id: "e1", title: "AI Strategy Masterclass", type: "Webinar", date: "Jun 18, 2026", registered: 342, capacity: 500 },
  { id: "e2", title: "Monthly Office Hours", type: "Workshop", date: "Jul 2, 2026", registered: 87, capacity: 100 },
];

export default function DashboardExpert() {
  const { user } = useAuth();
  const [mentees, setMentees] = useState(INITIAL_MENTEES);
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [artTitle, setArtTitle] = useState("");
  const [artCat, setArtCat] = useState("AI Strategy");
  const [artContent, setArtContent] = useState("");

  const [evtTitle, setEvtTitle] = useState("");
  const [evtType, setEvtType] = useState("Webinar");
  const [evtDate, setEvtDate] = useState("");

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artContent) return;
    const added = {
      id: `a-${Date.now()}`,
      title: artTitle,
      category: artCat,
      views: 0,
      likes: 0
    };
    setArticles([added, ...articles]);
    setShowArticleModal(false);
    setArtTitle("");
    setArtContent("");
    toast.success("Strategy article published successfully!");
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle || !evtDate) return;
    const added = {
      id: `e-${Date.now()}`,
      title: evtTitle,
      type: evtType,
      date: evtDate,
      registered: 0,
      capacity: 100
    };
    setEvents([added, ...events]);
    setShowEventModal(false);
    setEvtTitle("");
    setEvtDate("");
    toast.success(`Event ${evtTitle} hosted successfully!`);
  };

  const handleMentorshipAction = (id: string, name: string, action: "active" | "declined") => {
    setMentees(prev => prev.map(m => m.id === id ? { ...m, status: action } : m));
    if (action === "active") {
      toast.success(`You accepted ${name} as your mentee!`);
    } else {
      toast.info(`Mentorship application for ${name} declined.`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Expert Journey Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Expert Workflow Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Share Knowledge", desc: `${articles.length} articles published`, active: true, done: articles.length > 0 },
              { step: "2", label: "Mentor Members", desc: `${mentees.filter(m => m.status === "active").length} active mentees`, active: true, done: mentees.some(m => m.status === "active") },
              { step: "3", label: "Host Events", desc: `${events.length} webinars scheduled`, active: true, done: events.length > 0 },
              { step: "4", label: "Build Authority", desc: "Top 1% Rank", active: true, done: true },
              { step: "5", label: "Expand Outreach", desc: "Audience growing", active: true, done: true }
            ].map((st, i) => (
              <div key={st.label} className="flex flex-col gap-1.5 relative">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                    st.done ? "bg-emerald-500 text-white" : "bg-primary text-white"
                  )}>
                    {st.step}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{st.label}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">{st.desc}</p>
                {i < 4 && <div className="hidden md:block absolute top-3 right-0 left-[85%] border-t border-dashed border-border" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content columns */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Col 1: Share Knowledge & Mentorship */}
          <div className="lg:col-span-2 space-y-6">
            {/* Knowledge center */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" /> 1. Share Knowledge & Publications
                </h3>
                <button
                  onClick={() => setShowArticleModal(true)}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Publish Article
                </button>
              </div>
              <div className="space-y-3">
                {articles.map(art => (
                  <div key={art.id} className="p-3.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">{art.title}</h4>
                      <p className="text-[10px] text-muted-foreground">Category: {art.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-foreground">{(art.views / 1000).toFixed(1)}K views</p>
                      <p className="text-[9px] text-muted-foreground">{art.likes.toLocaleString()} likes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Board */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Target size={18} className="text-primary" /> 2. Mentor Members Hub
              </h3>
              <div className="space-y-3.5">
                {mentees.map(ment => (
                  <div key={ment.id} className="p-3.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={ment.avatar} alt={ment.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground truncate">{ment.name}</h4>
                        <p className="text-[10px] text-muted-foreground truncate">Goal: {ment.goal} · {ment.sessions} sessions</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {ment.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMentorshipAction(ment.id, ment.name, "active")}
                            className="text-[10px] bg-primary text-white py-1 px-2.5 rounded-md font-bold hover:opacity-95"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleMentorshipAction(ment.id, ment.name, "declined")}
                            className="text-[10px] bg-muted border border-border text-muted-foreground py-1 px-2.5 rounded-md font-semibold hover:bg-muted/80"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <span className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize border",
                          ment.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground"
                        )}>
                          {ment.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Host Events & Build Authority */}
          <div className="space-y-6">
            {/* Host Events */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Calendar size={18} className="text-primary" /> 3. Host Events
                </h3>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Host Event
                </button>
              </div>
              <div className="space-y-3">
                {events.map(event => (
                  <div key={event.id} className="p-3 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-foreground">{event.title}</p>
                      <span className="text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.2 rounded-full flex-shrink-0">{event.type}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Clock size={9} /> {event.date}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${event.capacity > 0 ? (event.registered / event.capacity) * 100 : 0}%` }} />
                      </div>
                      <span className="text-[9px] text-muted-foreground">{event.registered}/{event.capacity} seats</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Build Authority */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Award size={18} className="text-primary" /> 4. Build Authority Rank
              </h3>
              <TrustScore score={user?.trustScore ?? 98} size="lg" />
              <div className="mt-3.5 flex items-center justify-center gap-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-lg">
                <Star size={12} className="text-blue-500" />
                <span className="text-[10px] font-bold">Top 1% Community Expert</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-normal mt-3">
                Broad audience engagement and high-trust rating reviews elevate your expert status badge.
              </p>
              <Link to="/dashboard/reputation" className="btn-secondary w-full text-xs py-2 mt-4">
                Verify Credentials
              </Link>
            </div>
          </div>
        </div>

        {/* Growth index */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-display font-semibold text-foreground mb-4">Audience Growth</h3>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={followersData}>
                <defs>
                  <linearGradient id="folGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="followers" stroke="#8B5CF6" strokeWidth={2} fill="url(#folGrad)" name="Followers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Authority metrics
            </h3>
            <div className="text-3xl font-display font-bold text-foreground">2.1M</div>
            <div className="text-xs text-muted-foreground mt-1">Total article reads</div>
            <p className="text-[10px] text-muted-foreground leading-normal mt-2">
              Host webinars and share validated SaaS or tech strategies to grow reach.
            </p>
            <Link to="/dashboard/community" className="btn-secondary w-full text-xs py-2 mt-3">
              Go to Forum Feed
            </Link>
          </div>
        </div>
      </div>

      {/* Publish Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowArticleModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Publish Strategy Article</h3>
            <p className="text-xs text-muted-foreground mb-4">Share your technical insights or research papers on TruNet.</p>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Article Title</label>
                <input
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="e.g. Why Most AI Projects Fail"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <select
                  value={artCat}
                  onChange={(e) => setArtCat(e.target.value)}
                  className="input-field"
                >
                  <option>AI Strategy</option>
                  <option>Leadership</option>
                  <option>Networking</option>
                  <option>Business Growth</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Draft Summary</label>
                <textarea
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  rows={4}
                  placeholder="Draft your key takeaways here..."
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-xs leading-relaxed"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Host Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEventModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Host Webinar / Workshop</h3>
            <p className="text-xs text-muted-foreground mb-4">Host strategy panels or Q&A webinars for the community.</p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Event Title</label>
                <input
                  required
                  value={evtTitle}
                  onChange={(e) => setEvtTitle(e.target.value)}
                  placeholder="e.g. Q3 SaaS Strategy Review"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date & Time</label>
                <input
                  required
                  value={evtDate}
                  onChange={(e) => setEvtDate(e.target.value)}
                  placeholder="e.g. Jun 28, 2026 at 3:00 PM EST"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Event Type</label>
                <select
                  value={evtType}
                  onChange={(e) => setEvtType(e.target.value)}
                  className="input-field"
                >
                  <option>Webinar</option>
                  <option>Workshop</option>
                  <option>Live Event</option>
                  <option>Mentorship Session</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
