import { useState } from "react";
import { Star, ShieldCheck, CheckCircle2, ChevronRight, Award, Plus, ArrowUpRight, Send, Eye } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import TrustScore from "@/components/features/TrustScore";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { toast } from "sonner";

const HISTORICAL_SCORE = [
  { month: "Jan", score: 85 },
  { month: "Feb", score: 88 },
  { month: "Mar", score: 87 },
  { month: "Apr", score: 91 },
  { month: "May", score: 90 },
  { month: "Jun", score: 94 }
];

const REVIEWS = [
  { id: "r1", client: "Sarah Mitchell", rating: 5, text: "Exceptional consulting quality. Helped us scale our B2B funnel by 60%. Absolute professional.", project: "Enterprise SaaS Funnel Strategy", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", date: "June 2, 2026" },
  { id: "r2", client: "Tom Bradley", rating: 5, text: "Exceeded all expectations. Very strategic thinker with deep industry knowledge.", project: "Pitch Deck Review", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face", date: "May 18, 2026" }
];

const ENDORSEMENTS = [
  { name: "Priya Sharma", title: "Talent Acquisition Lead", skill: "Product Management", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" },
  { name: "David Park", title: "Co-founder, BuildFast Labs", skill: "AI Strategy", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" }
];

export default function DashboardReputation() {
  const { user } = useAuth();
  const [endorsementEmail, setEndorsementEmail] = useState("");
  const [endorsementSkill, setEndorsementSkill] = useState("Product Strategy");
  const [endorsements, setEndorsements] = useState(ENDORSEMENTS);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleRequestEndorsement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!endorsementEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success(`Endorsement request sent to ${endorsementEmail}!`);
    setEndorsementEmail("");
    setShowFormModal(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Award size={22} className="text-primary" />
              Reputation & Trust Analytics
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Monitor your verifiable reputation score, endorsements, and verified client feedback.
            </p>
          </div>
          <button
            onClick={() => setShowFormModal(true)}
            className="btn-primary text-sm py-2"
          >
            <Plus size={15} /> Request Endorsement
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trust Score Card */}
          <div className="bg-card border border-border rounded-2xl p-5 text-center flex flex-col items-center justify-center">
            <h3 className="font-display font-semibold text-foreground mb-4">Your Trust Score</h3>
            <TrustScore score={user?.trustScore ?? 92} size="lg" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-xs">
              Calculated using identity verification status, verified connection counts, peer reviews, and overall response rates.
            </p>
          </div>

          {/* Historical Trend */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Trust Score History</h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={HISTORICAL_SCORE}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reviews and Endorsements split */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Verified Client Reviews */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Verified Reviews ({REVIEWS.length})</h3>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" /> 5.0 Average
              </span>
            </div>
            <div className="space-y-4">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src={rev.avatar} alt={rev.client} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{rev.client}</p>
                        <p className="text-[10px] text-muted-foreground">{rev.project}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Endorsements */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Peer Endorsements</h3>
              <span className="text-xs text-primary font-medium">{endorsements.length} Endorsed Skills</span>
            </div>
            <div className="space-y-3">
              {endorsements.map((end, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                  <div className="flex items-center gap-3">
                    <img src={end.avatar} alt={end.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">{end.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{end.title}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {end.skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Request Endorsement Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFormModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Request Skill Endorsement</h2>
              <button onClick={() => setShowFormModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleRequestEndorsement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Peer's Email Address</label>
                <input
                  type="email"
                  value={endorsementEmail}
                  onChange={(e) => setEndorsementEmail(e.target.value)}
                  placeholder="peer@company.com"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Skill to Endorse</label>
                <select
                  value={endorsementSkill}
                  onChange={(e) => setEndorsementSkill(e.target.value)}
                  className="input-field"
                >
                  <option>Product Strategy</option>
                  <option>B2B SaaS</option>
                  <option>AI/ML</option>
                  <option>Team Leadership</option>
                  <option>Go-to-Market</option>
                  <option>Growth Hacking</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center gap-1.5"
                >
                  <Send size={13} /> Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
