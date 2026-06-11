import { useState } from "react";
import { Users, Search, ShieldCheck, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_CANDIDATES = [
  { id: "c1", name: "Kwame Asante", title: "Senior AI Engineer", location: "London, UK", skills: ["Python", "LLMs", "MLOps"], trustScore: 94, isVerified: true, stage: "interview", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", match: 97 },
  { id: "c2", name: "Elena Vasquez", title: "Lead Product Designer", location: "Barcelona, ES", skills: ["Figma", "Design Systems", "Research"], trustScore: 89, isVerified: true, stage: "screening", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", match: 93 },
  { id: "c3", name: "David Park", title: "Full-Stack Engineer", location: "Seoul, KR", skills: ["React", "Node.js", "AWS"], trustScore: 91, isVerified: true, stage: "offer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", match: 91 },
  { id: "c4", name: "Yuki Tanaka", title: "Data Scientist", location: "Tokyo, JP", skills: ["Python", "ML", "Analytics"], trustScore: 96, isVerified: true, stage: "applied", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face", match: 88 },
];

export default function RecruiterCandidates() {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [search, setSearch] = useState("");

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

  const filtered = candidates.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Users size={22} className="text-primary" /> Candidate Sourcing Directory
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Browse verified candidates with confirmed credentials and Trust Score badges.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates..." className="input-field pl-11 py-1.5 text-xs" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted text-muted-foreground uppercase border-b border-border font-semibold">
                <tr>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Target Role</th>
                  <th className="px-4 py-3">Skills</th>
                  <th className="px-4 py-3">Match</th>
                  <th className="px-4 py-3">Trust</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(cand => (
                  <tr key={cand.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover" />
                          {cand.isVerified && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center ring-2 ring-card">
                              <ShieldCheck size={8} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground leading-snug">{cand.name}</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5"><MapPin size={9} /> {cand.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{cand.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.map(s => (
                          <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{cand.match}%</td>
                    <td className="px-4 py-3 font-bold text-foreground">{cand.trustScore}</td>
                    <td className="px-4 py-3">
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full capitalize bg-primary/10 text-primary border border-primary/20">
                        {cand.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {cand.stage !== "hired" ? (
                        <button onClick={() => advanceStage(cand.id)} className="text-[10px] text-primary hover:underline font-bold">
                          Advance Stage →
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-500 font-semibold">Hired ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
