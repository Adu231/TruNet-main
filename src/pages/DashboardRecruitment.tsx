import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ClipboardList, Plus, Search, MapPin, ShieldCheck, CheckCircle2, User, HelpCircle, DollarSign } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_JOBS = [
  { id: "j1", title: "Senior AI/ML Engineer", company: "DataBridge Solutions", salary: "$180K–$220K", stage: "active", applicants: 24, posted: "Jun 1" },
  { id: "j2", title: "Lead Product Manager", company: "InnovateTech Corp", salary: "$140K–$175K", stage: "active", applicants: 41, posted: "May 28" }
];

const INITIAL_CANDIDATES = [
  { id: "c1", name: "Kwame Asante", title: "Senior AI Engineer", location: "London, UK", skills: ["Python", "LLMs", "MLOps"], trustScore: 94, isVerified: true, stage: "interview", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", match: 97 },
  { id: "c2", name: "Elena Vasquez", title: "Lead Product Designer", location: "Barcelona, ES", skills: ["Figma", "Design Systems"], trustScore: 89, isVerified: true, stage: "screening", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", match: 93 }
];

const STAGES = ["applied", "screening", "interview", "offer", "hired"];

const STAGE_STYLE: Record<string, string> = {
  applied: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  screening: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  interview: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
  offer: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
  hired: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
};

export default function DashboardRecruitment() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [jobForm, setJobForm] = useState({ title: "", salary: "", desc: "", company: "InnovateTech Corp" });

  const advanceStage = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const currentIdx = STAGES.indexOf(c.stage);
          if (currentIdx < STAGES.length - 1) {
            const nextStage = STAGES[currentIdx + 1];
            toast.success(`Advanced ${c.name} to ${nextStage}!`);
            return { ...c, stage: nextStage };
          }
        }
        return c;
      })
    );
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.salary) {
      toast.error("Please fill in the required fields.");
      return;
    }
    const newJob = {
      id: `j-${Date.now()}`,
      title: jobForm.title,
      company: jobForm.company,
      salary: jobForm.salary,
      stage: "active",
      applicants: 0,
      posted: "Just now"
    };
    setJobs([newJob, ...jobs]);
    setShowModal(false);
    setJobForm({ title: "", salary: "", desc: "", company: "InnovateTech Corp" });
    toast.success("Job listing published on TruNet Recruitment Marketplace!");
  };

  const filteredCandidates = candidates.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <ClipboardList size={22} className="text-primary" />
              Job Listings & Recruitment
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Review applicant details, pipeline stages, and publish new hiring mandates.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-sm py-2"
          >
            <Plus size={15} /> Post Job
          </button>
        </div>

        {/* Active Mandates */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Active Mandate Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 rounded-xl bg-muted/40 border border-border hover:border-primary/20 transition-all flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{job.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                  <p className="text-xs text-primary font-semibold mt-2">{job.salary}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/60 text-[10px] text-muted-foreground">
                  <span>{job.posted}</span>
                  <span>{job.applicants} Applicants</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Pipeline */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">Candidate Pipeline</h3>
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates..."
                className="input-field pl-11 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Candidate", "Role Target", "Skills", "Match Score", "Trust Status", "Pipeline Stage", "Action"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{cand.name}</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5"><MapPin size={9} />{cand.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{cand.title}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.map((s) => (
                          <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400">{cand.match}%</td>
                    <td className="px-3 py-3 text-xs font-bold text-primary">{cand.trustScore}</td>
                    <td className="px-3 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize", STAGE_STYLE[cand.stage])}>
                        {cand.stage}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {cand.stage !== "hired" ? (
                        <button
                          onClick={() => advanceStage(cand.id)}
                          className="text-xs text-primary hover:underline font-semibold"
                        >
                          Advance Stage →
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 size={12} /> Hired
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Post Mandate Listing</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Job Title</label>
                <input
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Senior backend engineer"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Salary Range</label>
                <input
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  placeholder="e.g. $120K - $150K"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Mandate Description</label>
                <textarea
                  value={jobForm.desc}
                  onChange={(e) => setJobForm({ ...jobForm, desc: e.target.value })}
                  rows={3}
                  placeholder="Mandate specifications, qualifications..."
                  className="input-field resize-none"
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
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
