import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Users, Star, Calendar, TrendingUp, Plus, ArrowRight,
  MessageSquare, Award, Mic, Globe, Target, Zap, CheckCircle, Video
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

const MENTEES = [
  { name: "James Okonkwo", goal: "B2B SaaS GTM", progress: 70, sessions: 8, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", status: "active" },
  { name: "Priya Sharma", goal: "AI Product Strategy", progress: 45, sessions: 4, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", status: "active" },
  { name: "David Park", goal: "Startup Scaling", progress: 90, sessions: 12, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", status: "completing" },
  { name: "Sarah Mitchell", goal: "Leadership & Management", progress: 30, sessions: 3, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face", status: "new" },
];

const ARTICLES = [
  { title: "Why Most AI Strategies Fail in Practice", views: 18400, likes: 1240, date: "Jun 3, 2026", category: "AI Strategy" },
  { title: "The 5-Step Framework for Mentoring Senior Leaders", views: 12200, likes: 890, date: "May 22, 2026", category: "Leadership" },
  { title: "Building a Knowledge Business on Verified Networks", views: 9800, likes: 710, date: "May 10, 2026", category: "Networking" },
];

const EVENTS = [
  { title: "AI Strategy Masterclass", type: "Webinar", date: "Jun 18, 2026", registered: 342, capacity: 500, status: "upcoming" },
  { title: "Leadership & AI: Fireside Chat", type: "Live Event", date: "Jun 25, 2026", registered: 180, capacity: 200, status: "upcoming" },
  { title: "Monthly Mentorship Office Hours", type: "Workshop", date: "Jul 2, 2026", registered: 87, capacity: 100, status: "upcoming" },
];

export default function DashboardExpert() {
  const { user } = useAuth();
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Community Expert Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Share knowledge, mentor professionals, and build your authority.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowEventModal(true)} className="btn-secondary text-sm py-2">
              <Calendar size={15} /> Host Event
            </button>
            <button onClick={() => setShowArticleModal(true)} className="btn-primary text-sm py-2">
              <Plus size={15} /> Write Article
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Followers", value: "5,800", icon: Users, delta: "+300 this month", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Articles Published", value: "47", icon: BookOpen, delta: "2.1M total reads", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
            { label: "Active Mentees", value: "23", icon: Target, delta: "150+ total mentored", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
            { label: "Events Hosted", value: "84", icon: Calendar, delta: "12K+ attendees", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
                <stat.icon size={18} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">{stat.delta}</div>
            </div>
          ))}
        </div>

        {/* Growth Chart + Trust Score */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Audience Growth</h3>
              <span className="text-xs text-muted-foreground">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={followersData}>
                <defs>
                  <linearGradient id="follGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="followers" stroke="#8B5CF6" strokeWidth={2} fill="url(#follGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <h3 className="font-display font-semibold text-foreground mb-3">Trust Score</h3>
              <TrustScore score={user?.trustScore ?? 98} size="lg" />
              <div className="mt-3 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center justify-center gap-1.5">
                  <Award size={12} /> Top 1% Expert on TruNet
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Authority Badges</h4>
              <div className="space-y-2">
                {[
                  { label: "Verified Author", icon: BookOpen, color: "text-blue-500" },
                  { label: "Master Mentor", icon: Target, color: "text-emerald-500" },
                  { label: "Top Speaker", icon: Mic, color: "text-purple-500" },
                  { label: "Global Expert", icon: Globe, color: "text-yellow-500" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <b.icon size={13} className={b.color} />
                    <span className="text-xs font-medium text-foreground">{b.label}</span>
                    <CheckCircle size={11} className="text-emerald-500 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mentorship + Articles + Events */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Active Mentees */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Active Mentees</h3>
              <button onClick={() => toast.success("Mentorship invite sent!")} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Plus size={12} /> Add Mentee
              </button>
            </div>
            <div className="space-y-3">
              {MENTEES.map((mentee) => (
                <div key={mentee.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <img src={mentee.avatar} alt={mentee.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{mentee.name}</p>
                    <p className="text-xs text-muted-foreground">{mentee.goal} · {mentee.sessions} sessions</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${mentee.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{mentee.progress}%</span>
                    </div>
                  </div>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", mentee.status === "active" ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600" : mentee.status === "new" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600" : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600")}>
                    {mentee.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Upcoming Events</h3>
              <button onClick={() => setShowEventModal(true)} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Plus size={12} /> Create
              </button>
            </div>
            <div className="space-y-3">
              {EVENTS.map((event) => (
                <div key={event.title} className="p-4 rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Video size={14} className="text-primary flex-shrink-0" />
                      <p className="text-sm font-semibold text-foreground">{event.title}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 flex-shrink-0 ml-2">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{event.registered}/{event.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Top Articles</h3>
            <button onClick={() => setShowArticleModal(true)} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Plus size={12} /> Write Article
            </button>
          </div>
          <div className="space-y-3">
            {ARTICLES.map((art) => (
              <div key={art.title} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{art.title}</p>
                  <p className="text-xs text-muted-foreground">{art.category} · {art.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-foreground">{(art.views / 1000).toFixed(1)}K views</p>
                  <p className="text-xs text-muted-foreground">{art.likes.toLocaleString()} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowArticleModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Publish New Article</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowArticleModal(false); toast.success("Article published!"); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Article Title</label>
                <input placeholder="Your insight or perspective..." className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <select className="input-field">
                  <option>AI Strategy</option>
                  <option>Leadership</option>
                  <option>Networking</option>
                  <option>Business Growth</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Summary</label>
                <textarea rows={3} placeholder="Key takeaways for readers..." className="input-field resize-none" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowArticleModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEventModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Create Event</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowEventModal(false); toast.success("Event created!"); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Event Title</label>
                <input placeholder="e.g. AI Strategy Masterclass" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Type</label>
                <select className="input-field">
                  <option>Webinar</option>
                  <option>Workshop</option>
                  <option>Live Event</option>
                  <option>Mentorship Session</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date</label>
                <input type="date" className="input-field" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEventModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
