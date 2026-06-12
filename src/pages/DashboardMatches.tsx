import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, UserCheck, UserPlus, Search, Filter, MessageSquare, Check, X } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn, getTrustScoreBg } from "@/lib/utils";
import { toast } from "sonner";

const MOCK_MATCHES: Record<string, any[]> = {
  professional: [
    { id: "m1", name: "Elena Vasquez", title: "Product Designer", company: "DesignCraft Studio", score: 96, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", reason: "Complementary skills in UX + Product", location: "Barcelona, ES", status: "suggested" },
    { id: "m2", name: "Tom Nakamura", title: "CTO", company: "CloudBridge Partners", score: 94, avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face", reason: "Shared enterprise SaaS focus", location: "San Francisco, CA", status: "suggested" },
    { id: "m3", name: "Adeola Williams", title: "Investment Partner", company: "Frontier Capital", score: 91, avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face", reason: "Active B2B SaaS investor", location: "Lagos, NG", status: "suggested" }
  ],
  business: [
    { id: "m1", name: "Apex Consulting", title: "Strategy Agency", company: "Apex Consulting LLC", score: 95, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", reason: "Top referral source for SaaS GTM", location: "New York, NY", status: "suggested" },
    { id: "m2", name: "Tanaka Institute", title: "AI Research Lab", company: "Tanaka Institute", score: 98, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", reason: "AI strategy advisory fit", location: "Tokyo, JP", status: "suggested" }
  ],
  freelancer: [
    { id: "m1", name: "Nexus Dynamics", title: "Enterprise Platform Revamp", company: "Nexus Dynamics", score: 92, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face", reason: "Matches React + Tailwind skillset", location: "Remote", budget: "$15,000", status: "suggested" },
    { id: "m2", name: "DataStream Corp", title: "Data Dashboard UI design", company: "DataStream Corp", score: 95, avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&crop=face", reason: "Highly active client in data tech", location: "London, UK", budget: "$8,500", status: "suggested" }
  ],
  recruiter: [
    { id: "m1", name: "Kwame Asante", title: "Senior AI Engineer", company: "Ex-Google", score: 97, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", reason: "Match for Senior AI/ML Listing", location: "London, UK", status: "suggested" },
    { id: "m2", name: "Elena Vasquez", title: "Lead Product Designer", company: "DesignCraft", score: 93, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", reason: "Strong portfolio match for UX role", location: "Barcelona, ES", status: "suggested" }
  ],
  investor: [
    { id: "m1", name: "AgroVault Inc", title: "Founder: Moses Afolabi", company: "AgriTech Seed", score: 88, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", reason: "Aligned with emerging market thesis", location: "Lagos, NG", ask: "$750K", status: "suggested" },
    { id: "m2", name: "RemitFast", title: "Founder: Kola Adesanya", company: "Fintech Series A", score: 95, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", reason: "96% traction fit for Series A fund", location: "London, UK", ask: "$3.2M", status: "suggested" }
  ],
  expert: [
    { id: "m1", name: "Sarah Mitchell", title: "Mentee: Startup Founder", company: "Apex Ventures", score: 94, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", reason: "Mentorship request: B2B GTM strategy", location: "New York, NY", status: "suggested" },
    { id: "m2", name: "Priya Sharma", title: "Mentee: Talent Lead", company: "HireForce Pro", score: 88, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", reason: "Mentorship request: Scaling tech teams", location: "Toronto, CA", status: "suggested" }
  ],
  admin: [
    { id: "v1", name: "Amira Hassan", title: "KYC Verification Profile", company: "Passport Upload", score: 85, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", reason: "Verification review queue", location: "New York, NY", status: "pending" },
    { id: "v2", name: "BuildFast LLC", title: "Business Registration", company: "Certificate Upload", score: 92, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face", reason: "Verification review queue", location: "Toronto, CA", status: "pending" }
  ]
};

export default function DashboardMatches() {
  const { user } = useAuth();
  const role = user?.role || "professional";
  const [matches, setMatches] = useState<any[]>(MOCK_MATCHES[role] || MOCK_MATCHES.professional);
  const [search, setSearch] = useState("");

  const handleAction = (id: string, actionName: string) => {
    if (actionName === "rejected" && role !== "admin") {
      setMatches((prev) => prev.filter((item) => item.id !== id));
      toast.info("Match dismissed.");
      return;
    }
    setMatches((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: actionName };
        }
        return item;
      })
    );
    if (actionName === "connected" || actionName === "approved") {
      toast.success("Connection request accepted!");
    } else if (actionName === "pending") {
      toast.success("Request sent successfully!");
    } else if (actionName === "rejected") {
      toast.info("Item dismissed.");
    }
  };

  const filtered = matches.filter((m) => {
    const term = search.toLowerCase();
    return !search || m.name.toLowerCase().includes(term) || (m.company && m.company.toLowerCase().includes(term));
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Zap size={22} className="text-primary animate-pulse" />
              AI Matchmaker
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              TruNet AI matches based on your goals, industry, and Trust Score compatibility.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search matches..."
              className="input-field pl-11 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
          <ShieldCheck className="text-primary flex-shrink-0" size={20} />
          <p className="text-xs text-muted-foreground leading-relaxed">
            All AI matches are verified, ensuring you only connect with real individuals or validated companies. Matching compatibility score takes into account verified background, mutual connections, and feedback logs.
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((match) => (
            <div key={match.id} className="bg-card border border-border rounded-2xl p-5 card-hover flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img src={match.avatar} alt={match.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm flex items-center gap-1">
                        {match.name}
                        <ShieldCheck size={13} className="text-primary flex-shrink-0" />
                      </h3>
                      <p className="text-xs text-muted-foreground">{match.title}</p>
                      {match.company && <p className="text-[10px] text-primary font-medium mt-0.5">{match.company}</p>}
                    </div>
                  </div>
                  <div className={cn("trust-badge text-xs flex-shrink-0", getTrustScoreBg(match.score))}>
                    {match.score}% match
                  </div>
                </div>

                <div className="space-y-2.5 my-4 p-3 rounded-xl bg-muted/40 text-xs">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Why Matched:</strong> {match.reason}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Location: {match.location}
                  </p>
                  {match.budget && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Budget: {match.budget}
                    </p>
                  )}
                  {match.ask && (
                    <p className="text-[11px] text-primary font-semibold">
                      Funding Ask: {match.ask}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                {role === "admin" ? (
                  match.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(match.id, "approved")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:opacity-95 transition-opacity"
                      >
                        <Check size={12} /> Approve KYC
                      </button>
                      <button
                        onClick={() => handleAction(match.id, "rejected")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:opacity-95 transition-opacity"
                      >
                        <X size={12} /> Reject
                      </button>
                    </>
                  ) : (
                    <button disabled className="w-full py-2 rounded-lg bg-muted text-muted-foreground text-xs font-semibold text-center cursor-default">
                      Review Completed ({match.status})
                    </button>
                  )
                ) : match.status === "suggested" ? (
                  <>
                    <button
                      onClick={() => handleAction(match.id, "pending")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <UserPlus size={12} /> Connect
                    </button>
                    <button
                      onClick={() => handleAction(match.id, "rejected")}
                      className="flex-1 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted text-xs font-semibold transition-colors"
                    >
                      Dismiss
                    </button>
                  </>
                ) : match.status === "pending" ? (
                  <button disabled className="w-full py-2 rounded-lg bg-muted text-muted-foreground text-xs font-semibold text-center cursor-default">
                    Connection Request Sent
                  </button>
                ) : match.status === "rejected" ? (
                  <button disabled className="w-full py-2 rounded-lg bg-muted/40 text-muted-foreground/60 text-xs font-semibold text-center cursor-default">
                    Dismissed
                  </button>
                ) : (
                  <button disabled className="w-full py-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold text-center cursor-default flex items-center justify-center gap-1">
                    <UserCheck size={13} /> Connected
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Zap size={40} className="text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No matches found</h3>
            <p className="text-sm text-muted-foreground">Adjust your filters or try a different search query.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
