import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Users, Star, Zap, ShieldCheck, Eye, UserPlus,
  Target, BarChart3, CheckCircle, ArrowRight, UploadCloud, Link2, Award, ClipboardList
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import TrustScore from "@/components/features/TrustScore";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const reputationHistory = [
  { month: "Jan", rating: 85 }, { month: "Feb", rating: 88 },
  { month: "Mar", rating: 87 }, { month: "Apr", rating: 90 },
  { month: "May", rating: 92 }, { month: "Jun", rating: 94 },
];

const INITIAL_CONNECTIONS = [
  { name: "Sarah Mitchell", title: "Founder & CEO", company: "Apex Ventures", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", score: 94, status: "suggested" },
  { name: "Marcus Chen", title: "Independent Consultant", company: "Chen Strategy Group", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", score: 96, status: "suggested" },
  { name: "Elena Vasquez", title: "Product Designer", company: "DesignCraft Studio", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face", score: 92, status: "suggested" },
];

const OPPORTUNITIES = [
  { id: "o1", title: "B2B SaaS Strategy Advisor", provider: "Frontier Capital", budget: "$10,000", match: "94% Match", tags: ["SaaS", "Strategy"] },
  { id: "o2", title: "Product Growth Consultation", provider: "TechScale Global", budget: "$5,000", match: "91% Match", tags: ["Product Growth", "UX"] },
];

export default function DashboardProfessional() {
  const { user } = useAuth();
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.isKYCVerified || false);
  const [profileProgress, setProfileProgress] = useState([
    { id: "p1", task: "Verify Identity", completed: user?.isKYCVerified || false, points: 25 },
    { id: "p2", task: "Add Core Skill Tags", completed: true, points: 15 },
    { id: "p3", task: "Link LinkedIn Profile", completed: false, points: 20 },
    { id: "p4", task: "Request Peer Review", completed: false, points: 20 },
    { id: "p5", task: "Complete Bio Description", completed: true, points: 20 },
  ]);

  const handleConnect = (name: string) => {
    setConnections(prev => prev.map(c => c.name === name ? { ...c, status: "pending" } : c));
    toast.success(`Connection invitation sent to ${name}`);
  };

  const handleVerifyIdentity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setProfileProgress(prev => prev.map(p => p.id === "p1" ? { ...p, completed: true } : p));
      toast.success("Identity verified successfully! Trust Score boosted.");
    }, 2000);
  };

  const handleLinkLinkedIn = () => {
    setProfileProgress(prev => prev.map(p => p.id === "p3" ? { ...p, completed: true } : p));
    toast.success("LinkedIn profile linked successfully!");
  };

  const progressPercentage = profileProgress.reduce((acc, curr) => acc + (curr.completed ? curr.points : 0), 0);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Journey Stepper Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Professional Workflow Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Register", desc: "Account setup complete", active: true, done: true },
              { step: "2", label: "Verify Identity", desc: isVerified ? "Identity Verified" : "Verification pending", active: true, done: isVerified },
              { step: "3", label: "Build Profile", desc: `${progressPercentage}% complete`, active: true, done: progressPercentage === 100 },
              { step: "4", label: "Connect", desc: `${user?.connections || 847} connections`, active: true, done: true },
              { step: "5", label: "Grow Reputation", desc: `Trust score: ${isVerified ? 100 : user?.trustScore || 92}`, active: true, done: isVerified }
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

        {/* Content Columns */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Col 1: Verify Identity & Build Profile */}
          <div className="space-y-6">
            {/* Identity Card */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" /> 1. Verify Identity
              </h3>
              {isVerified ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">KYC Verified Status</p>
                    <p className="text-[10px] text-muted-foreground">Your government credentials are fully authenticated.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Secure your account and gain trust badges by uploading documents.</p>
                  <button
                    onClick={handleVerifyIdentity}
                    disabled={isVerifying}
                    className="btn-primary w-full py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    {isVerifying ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <UploadCloud size={14} /> Authenticate ID Credentials
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Checklist */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList size={18} className="text-primary" /> 2. Build Profile
                </h3>
                <span className="text-xs font-bold text-primary">{progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
              </div>
              <div className="space-y-2.5 pt-2">
                {profileProgress.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-muted/30">
                    <span className={cn("text-muted-foreground", item.completed && "line-through text-muted-foreground/45")}>
                      {item.task}
                    </span>
                    {item.completed ? (
                      <CheckCircle size={14} className="text-emerald-500" />
                    ) : (
                      <button
                        onClick={item.id === "p3" ? handleLinkLinkedIn : handleVerifyIdentity}
                        className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-0.5"
                      >
                        <Link2 size={10} /> Link
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Connect with Network & Generate Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connect with Network */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Users size={18} className="text-primary" /> 3. Connect with Network
                </h3>
                <Link to="/dashboard/network" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                  Expand Circle <ArrowRight size={12} />
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">Connect with high-trust verified professionals in your domain.</p>
              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                {connections.map((c) => (
                  <div key={c.name} className="p-3.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 transition-colors flex flex-col justify-between items-center text-center">
                    <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover mb-2 ring-2 ring-primary/20" />
                    <h4 className="text-xs font-bold text-foreground truncate w-full">{c.name}</h4>
                    <p className="text-[9px] text-muted-foreground truncate w-full mb-2">{c.title}</p>
                    <div className="w-full">
                      {c.status === "pending" ? (
                        <button disabled className="w-full text-[10px] bg-muted border border-border text-muted-foreground py-1 rounded-md font-medium cursor-default">
                          Pending
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConnect(c.name)}
                          className="w-full text-[10px] bg-primary text-white py-1 rounded-md font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                        >
                          <UserPlus size={10} /> Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Target size={18} className="text-primary" /> 4. Generate Opportunities
                </h3>
                <Link to="/dashboard/leads" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                  Browse Leads <ArrowRight size={12} />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {OPPORTUNITIES.map((opp) => (
                  <div key={opp.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{opp.title}</h4>
                      <p className="text-[10px] text-muted-foreground">Offered by {opp.provider} · {opp.budget}</p>
                      <div className="flex gap-1 mt-1.5">
                        {opp.tags.map(t => (
                          <span key={t} className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{opp.match}</span>
                      <button
                        onClick={() => toast.success(`Applied for ${opp.title}!`)}
                        className="block text-[10px] text-primary hover:underline font-semibold mt-1"
                      >
                        Apply Interest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* reputation analysis */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> Reputation Growth Trend
              </h3>
              <span className="text-xs text-muted-foreground">Historical index score (0-100)</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={reputationHistory}>
                <defs>
                  <linearGradient id="repGradProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="rating" stroke="#3B82F6" strokeWidth={2} fill="url(#repGradProf)" name="Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between items-center text-center">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star size={18} className="text-primary" /> Grow Reputation Score
            </h3>
            <TrustScore score={isVerified ? 100 : user?.trustScore || 92} size="lg" />
            <div className="mt-3.5 text-xs text-muted-foreground leading-normal">
              KYC check boosts score by +25 points. Gather reviews to maintain an elite status rating.
            </div>
            <Link to="/dashboard/reputation" className="btn-secondary w-full text-xs py-2 mt-4 flex items-center justify-center gap-1.5">
              <Award size={14} className="text-yellow-500" /> Reputation analytics
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
