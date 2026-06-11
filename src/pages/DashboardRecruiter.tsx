import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, Briefcase, Calendar, CheckCircle, Plus, Search, ArrowRight,
  ShieldCheck, MapPin, Clock, TrendingUp, Filter, Video, PlusCircle
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

const INITIAL_CANDIDATES = [
  { id: "c1", name: "Kwame Asante", title: "Senior AI Engineer", location: "London, UK", skills: ["Python", "LLMs", "MLOps"], trustScore: 94, isVerified: true, stage: "interview", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", match: 97 },
  { id: "c2", name: "Elena Vasquez", title: "Lead Product Designer", location: "Barcelona, ES", skills: ["Figma", "Design Systems", "Research"], trustScore: 89, isVerified: true, stage: "screening", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", match: 93 },
  { id: "c3", name: "David Park", title: "Full-Stack Engineer", location: "Seoul, KR", skills: ["React", "Node.js", "AWS"], trustScore: 91, isVerified: true, stage: "offer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", match: 91 },
  { id: "c4", name: "Yuki Tanaka", title: "Data Scientist", location: "Tokyo, JP", skills: ["Python", "ML", "Analytics"], trustScore: 96, isVerified: true, stage: "applied", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face", match: 88 },
];

const INITIAL_JOBS = [
  { id: "j1", title: "Senior AI/ML Engineer", salary: "$180K–$220K", applicants: 24 },
  { id: "j2", title: "Lead Product Manager", salary: "$140K–$175K", applicants: 41 },
];

const INITIAL_INTERVIEWS = [
  { id: "i1", candidate: "Kwame Asante", time: "Tomorrow at 10:00 AM", type: "Technical Interview", link: "zoom.us/j/94821032" },
  { id: "i2", candidate: "Elena Vasquez", time: "Friday at 2:00 PM", type: "Portfolio Review", link: "google.meet/ux-review" }
];

const STAGE_STYLE: Record<string, string> = {
  applied: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
  screening: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  interview: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
  offer: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  hired: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
};

export default function DashboardRecruiter() {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS);
  const [search, setSearch] = useState("");
  const [showJobModal, setShowJobModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobSalary, setJobSalary] = useState("");

  const [intCandidate, setIntCandidate] = useState("");
  const [intTime, setIntTime] = useState("");
  const [intType, setIntType] = useState("Technical Interview");

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobSalary) return;
    const added = {
      id: `j-${Date.now()}`,
      title: jobTitle,
      salary: jobSalary,
      applicants: 0
    };
    setJobs([added, ...jobs]);
    setShowJobModal(false);
    setJobTitle("");
    setJobSalary("");
    toast.success(`Job listing posted successfully!`);
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intCandidate || !intTime) return;
    const added = {
      id: `i-${Date.now()}`,
      candidate: intCandidate,
      time: intTime,
      type: intType,
      link: "zoom.us/j/mock-meeting"
    };
    setInterviews([added, ...interviews]);
    setShowInterviewModal(false);
    setIntCandidate("");
    setIntTime("");
    toast.success(`Interview scheduled with ${intCandidate}!`);
  };

  const advanceStage = (id: string) => {
    const stages = ["applied", "screening", "interview", "offer", "hired"];
    setCandidates(prev => prev.map(c => {
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

  const filteredCandidates = candidates.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Recruiter Journey Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Recruiter Workflow Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Post Jobs", desc: `${jobs.length} jobs listed`, active: true, done: jobs.length > 0 },
              { step: "2", label: "Search Talent", desc: `${candidates.length} profiles qualified`, active: true, done: candidates.length > 0 },
              { step: "3", label: "Schedule Interview", desc: `${interviews.length} sessions queued`, active: true, done: interviews.length > 0 },
              { step: "4", label: "Hire Candidates", desc: `${candidates.filter(c => c.stage === "offer" || c.stage === "hired").length} active offers`, active: true, done: true },
              { step: "5", label: "Build Teams", desc: "Pipeline running", active: true, done: true }
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

        {/* Content rows */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Col 1: Post Jobs & Search Talent */}
          <div className="space-y-6">
            {/* Job Listings Manager */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> 1. Post Jobs
                </h3>
                <button
                  onClick={() => setShowJobModal(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5 font-semibold"
                >
                  <Plus size={12} /> Post Job
                </button>
              </div>
              <div className="space-y-3">
                {jobs.map(job => (
                  <div key={job.id} className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-foreground">{job.title}</p>
                      <p className="text-[10px] text-primary font-semibold">{job.salary}</p>
                    </div>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                      {job.applicants} candidates
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Talent Search quick filter info */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 text-center">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2 text-left">
                <Users size={18} className="text-primary" /> 2. Search Verified Talent
              </h3>
              <p className="text-xs text-muted-foreground text-left">TruNet connects you with professionals whose backgrounds, reviews, and trust badges are verified.</p>
              <Link to="/dashboard/network" className="btn-secondary w-full text-xs py-2 block">
                Open Talent Directory
              </Link>
            </div>
          </div>

          {/* Col 2: Schedule Interviews & Hire Candidates */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule Interviews */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Calendar size={18} className="text-primary" /> 3. Schedule Interviews
                </h3>
                <button
                  onClick={() => setShowInterviewModal(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-0.5 font-semibold"
                >
                  <PlusCircle size={13} /> Add Interview
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {interviews.map(int => (
                  <div key={int.id} className="p-3.5 rounded-xl border border-border bg-muted/40 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">{int.type}</span>
                      <h4 className="text-xs font-bold text-foreground mt-1.5">{int.candidate}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Clock size={9} />{int.time}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                      <span className="text-[9px] font-semibold text-primary truncate max-w-[120px]">{int.link}</span>
                      <button
                        onClick={() => toast.success("Copied meeting link!")}
                        className="text-[9px] text-muted-foreground hover:text-foreground font-semibold"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Pipeline / Hire Candidates */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary" /> 4. Candidate Pipeline & Hiring
                </h3>
                <div className="relative max-w-xs">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search candidate..."
                    className="input-field pl-11 py-1.5 text-xs w-full sm:w-48"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="px-3 py-2 text-left font-semibold uppercase">Candidate</th>
                      <th className="px-3 py-2 text-left font-semibold uppercase">Target Role</th>
                      <th className="px-3 py-2 text-left font-semibold uppercase">Match Compatibility</th>
                      <th className="px-3 py-2 text-left font-semibold uppercase">Stage</th>
                      <th className="px-3 py-2 text-center font-semibold uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCandidates.map(cand => (
                      <tr key={cand.id} className="hover:bg-muted/30">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <img src={cand.avatar} alt={cand.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground flex items-center gap-0.5">{cand.name} <ShieldCheck size={10} className="text-primary" /></p>
                              <p className="text-[10px] text-muted-foreground">{cand.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-muted-foreground">{cand.title}</td>
                        <td className="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">{cand.match}% match</td>
                        <td className="px-3 py-2.5">
                          <span className={cn("text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize", STAGE_STYLE[cand.stage])}>
                            {cand.stage}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {cand.stage !== "hired" ? (
                            <button
                              onClick={() => advanceStage(cand.id)}
                              className="text-[10px] text-primary hover:underline font-bold"
                            >
                              Advance Stage →
                            </button>
                          ) : (
                            <span className="text-[10px] font-semibold text-emerald-500">Hired ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Placements metrics */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-display font-semibold text-foreground mb-4">Monthly Placement Success</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={hiringData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="placements" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Hired Placements" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Placement Performance
            </h3>
            <div className="text-3xl font-display font-bold text-foreground">34%</div>
            <div className="text-xs text-muted-foreground mt-1">Average pipeline fill rate</div>
            <p className="text-[10px] text-muted-foreground leading-normal mt-2">
              All candidates verified on TruNet decrease screening delays by up to 45%.
            </p>
            <Link to="/dashboard/matches" className="btn-secondary w-full text-xs py-2 mt-3">
              AI Talent Matches
            </Link>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowJobModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Post Job Mandate</h3>
            <p className="text-xs text-muted-foreground mb-4">Post a new job opening to verified candidates.</p>

            <form onSubmit={handlePostJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Job Title</label>
                <input
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Salary Range</label>
                <input
                  required
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  placeholder="e.g. $140,000 – $180,000"
                  className="input-field"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Post Job Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInterviewModal(false)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Schedule Candidate Interview</h3>
            <p className="text-xs text-muted-foreground mb-4">Coordinate a secure video call or technical screening session.</p>

            <form onSubmit={handleScheduleInterview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Candidate Name</label>
                <input
                  required
                  value={intCandidate}
                  onChange={(e) => setIntCandidate(e.target.value)}
                  placeholder="e.g. Elena Vasquez"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date & Time</label>
                <input
                  required
                  value={intTime}
                  onChange={(e) => setIntTime(e.target.value)}
                  placeholder="e.g. Next Monday at 11:30 AM"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Interview Type</label>
                <select
                  value={intType}
                  onChange={(e) => setIntType(e.target.value)}
                  className="input-field"
                >
                  <option>Technical Interview</option>
                  <option>Portfolio Review</option>
                  <option>Behavioral Screen</option>
                  <option>Offer Negotiation</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
