import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles, Heart, Gift, UploadCloud } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const JOBS = [
  { id: "j1", title: "Senior Frontend Engineer (React)", department: "Engineering", location: "Remote (US/Europe)", type: "Full-time", salary: "$130,000 - $160,000" },
  { id: "j2", title: "AI/ML Research Scientist (Matchmaking)", department: "Data Science", location: "San Francisco, CA / Hybrid", type: "Full-time", salary: "$160,000 - $210,000" },
  { id: "j3", title: "Security & Trust Compliance Officer", department: "Legal & Security", location: "London, UK / Hybrid", type: "Full-time", salary: "$120,000 - $150,000" },
  { id: "j4", title: "Product Designer (UI/UX)", department: "Product", location: "Remote (Global)", type: "Full-time", salary: "$95,000 - $125,000" }
];

const PERKS = [
  { icon: Heart, title: "Premium Healthcare", desc: "Comprehensive health, dental, and vision cover with mental health support." },
  { icon: Clock, title: "Flexible Working", desc: "Work from anywhere with core collaboration hours. Unlimited PTO policy." },
  { icon: Gift, title: "Home Office Budget", desc: "$2,000 stipend to set up your dream workspace, plus yearly hardware upgrades." },
  { icon: Sparkles, title: "Learning Allowance", desc: "$1,500 annual budget for courses, books, and professional conferences." }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !resume) {
      toast.error("Please fill in all application fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJob(null);
      setName("");
      setEmail("");
      setResume("");
      toast.success("Application submitted successfully! Our talent team will reach out within 48h.");
    }, 1500);
  };

  const activeJob = JOBS.find(j => j.id === selectedJob);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Join the Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            Help Us Build the <span className="gradient-text-brand">Trust Layer</span> of Business
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We are looking for builders, developers, and researchers passionate about scaling verifiable professional reputation globally. Let's make networking secure, transparent, and meritocratic together.
          </p>
        </section>

        {/* Perks Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Life at TruNet</h2>
            <p className="text-xs text-muted-foreground">Premium perks to support your work, life, and personal growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((perk) => (
              <div key={perk.title} className="p-5 rounded-2xl bg-card border border-border flex flex-col items-center text-center card-hover">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <perk.icon className="text-primary" size={18} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{perk.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">Open Positions</h2>
            <p className="text-xs text-muted-foreground mt-1">Explore our current job openings across all divisions.</p>
          </div>

          <div className="space-y-4">
            {JOBS.map((job) => (
              <div key={job.id} className="p-5 rounded-2xl border border-border bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 card-hover">
                <div>
                  <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    {job.title}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                      {job.department}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                    <span className="text-emerald-500 font-semibold">{job.salary}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(job.id)}
                  className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1 w-full sm:w-auto justify-center"
                >
                  Apply Now <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Application Modal */}
      {selectedJob && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
          <div className="relative bg-card border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Apply for Position</h3>
            <p className="text-xs text-primary font-medium mb-4">{activeJob.title} ({activeJob.location})</p>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="input-field py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="input-field py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Resume link / Bio summary</label>
                <textarea
                  required
                  rows={3}
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Link to your resume or brief summary of your background..."
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-xs leading-relaxed"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs py-2 px-4"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
