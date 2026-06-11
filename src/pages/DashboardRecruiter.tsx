import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, Briefcase, Calendar, CheckCircle, Plus, Search, ArrowRight,
  ShieldCheck, MapPin, Star, Clock, TrendingUp, Filter
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const hiringData = [
  { month: "Jan", placements: 3 }, { month: "Feb", placements: 5 },
  { month: "Mar", placements: 4 }, { month: "Apr", placements: 7 },
  { month: "May", placements: 6 }, { month: "Jun", placements: 9 },
];

const CANDIDATES = [
  { id: "1", name: "Kwame Asante", title: "Senior AI Engineer", location: "London, UK", skills: ["Python", "LLMs", "MLOps"], trustScore: 94, isVerified: true, stage: "interview", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", match: 97 },
  { id: "2", name: "Elena Vasquez", title: "Lead Product Designer", location: "Barcelona, ES", skills: ["Figma", "Design Systems", "Research"], trustScore: 89, isVerified: true, stage: "screening", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", match: 93 },
  { id: "3", name: "David Park", title: "Full-Stack Engineer", location: "Seoul, KR", skills: ["React", "Node.js", "AWS"], trustScore: 91, isVerified: true, stage: "offer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", match: 91 },
  { id: "4", name: "Yuki Tanaka", title: "Data Scientist", location: "Tokyo, JP", skills: ["Python", "ML", "Analytics"], trustScore: 96, isVerified: true, stage: "applied", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face", match: 88 },
  { id: "5", name: "Carlos Mena", title: "VP Engineering", location: "Madrid, ES", skills: ["Leadership", "Architecture", "Scaling"], trustScore: 92, isVerified: true, stage: "screening", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", match: 85 },
];

const JOB_LISTINGS = [
  { title: "Senior AI/ML Engineer", company: "DataBridge Solutions", salary: "$180K–$220K", stage: "active", applicants: 24, posted: "Jun 1" },
  { title: "Lead Product Manager", company: "InnovateTech Corp", salary: "$140K–$175K", stage: "active", applicants: 41, posted: "May 28" },
  { title: "VP of Engineering", company: "CloudFirst Inc", salary: "$200K–$250K", stage: "active", applicants: 18, posted: "May 25" },
];

const STAGE_STYLE: Record<string, string> = {
  applied: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  screening: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  interview: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
  offer: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
  hired: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
};

export default function DashboardRecruiter() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [candidates, setCandidates] = useState(CANDIDATES);

  const advanceStage = (id: string) => {
    const stages = ["applied", "screening", "interview", "offer", "hired"];
    setCandidates((prev) => prev.map((c) => {
      if (c.id === id) {
        const idx = stages.indexOf(c.stage);
        if (idx < stages.length - 1) {
          toast.success(`${c.name} advanced to ${stages[idx + 1]}`);
          return { ...c, stage: stages[idx + 1] };
        }
      }
      return c;
    }));
  };

  const filtered = candidates.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Recruiter Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Manage your talent pipeline, job listings, and hiring workflow.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard/network" className="btn-secondary text-sm py-2">
              <Search size={15} /> Find Talent
            </Link>
            <button onClick={() => setShowPostJobModal(true)} className="btn-primary text-sm py-2">
              <Plus size={15} /> Post Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Roles", value: "8", icon: Briefcase, delta: "3 high priority", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
            { label: "Candidates", value: "183", icon: Users, delta: "+34 this month", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
            { label: "Interviews Scheduled", value: "12", icon: Calendar, delta: "This week", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
            { label: "Hires This Quarter", value: "9", icon: CheckCircle, delta: "34% fill rate", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" },
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

        {/* Placements Chart + Job Listings */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Monthly Placements</h3>
              <span className="text-xs text-muted-foreground">Jan–Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={hiringData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="placements" fill="#8B5CF6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Active Listings</h3>
              <button onClick={() => setShowPostJobModal(true)} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Plus size={12} /> Post
              </button>
            </div>
            <div className="space-y-3">
              {JOB_LISTINGS.map((job) => (
                <div key={job.title} className="p-3 rounded-xl bg-muted/50">
                  <p className="text-sm font-semibold text-foreground">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.company}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-primary font-medium">{job.salary}</span>
                    <span className="text-[10px] text-muted-foreground">{job.applicants} applicants</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Pipeline */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h3 className="font-display font-semibold text-foreground flex-1">Candidate Pipeline</h3>
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates..." className="input-field pl-9 py-2 text-sm" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Candidate", "Role", "Skills", "Match", "Trust", "Stage", "Action"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((cand) => (
                  <tr key={cand.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover" />
                          {cand.isVerified && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-2 ring-card">
                              <ShieldCheck size={8} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{cand.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-0.5"><MapPin size={9} />{cand.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-muted-foreground">{cand.title}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.slice(0, 2).map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cand.match}%</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-semibold text-primary">{cand.trustScore}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", STAGE_STYLE[cand.stage])}>
                        {cand.stage}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button onClick={() => advanceStage(cand.id)} className="text-xs text-primary hover:underline font-medium">
                        Advance →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPostJobModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-display font-semibold text-foreground mb-5">Post New Job</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowPostJobModal(false); toast.success("Job listing posted!"); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Job Title</label>
                <input placeholder="e.g. Senior Backend Engineer" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Salary Range</label>
                <input placeholder="e.g. $120K–$160K" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                <input placeholder="e.g. Remote / New York, NY" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea rows={3} placeholder="Responsibilities and requirements..." className="input-field resize-none" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPostJobModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Post Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
