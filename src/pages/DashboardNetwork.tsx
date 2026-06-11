import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Search, Filter, ShieldCheck, MapPin, Building2, Users, MessageSquare, UserCheck } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn, getTrustScoreBg } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const CONNECTIONS = [
  { id: "1", name: "Sarah Mitchell", title: "Founder & CEO", company: "Apex Ventures", location: "New York, NY", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", trustScore: 94, isVerified: true, mutual: 12, status: "connected" },
  { id: "2", name: "James Okonkwo", title: "Head of Biz Dev", company: "TechScale Global", location: "London, UK", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face", trustScore: 91, isVerified: true, mutual: 8, status: "connected" },
  { id: "3", name: "Priya Sharma", title: "Senior Recruiter", company: "HireForce Pro", location: "Toronto, CA", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face", trustScore: 88, isVerified: true, mutual: 5, status: "pending" },
  { id: "4", name: "Marcus Chen", title: "Independent Consultant", company: "Chen Strategy Group", location: "Singapore", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", trustScore: 96, isVerified: true, mutual: 19, status: "connected" },
  { id: "5", name: "Adeola Williams", title: "Investment Partner", company: "Frontier Capital", location: "Lagos, NG", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&fit=crop&crop=face", trustScore: 92, isVerified: true, mutual: 7, status: "suggest" },
  { id: "6", name: "David Park", title: "Co-founder", company: "BuildFast Labs", location: "Seoul, KR", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face", trustScore: 89, isVerified: false, mutual: 3, status: "suggest" },
  { id: "7", name: "Elena Vasquez", title: "Product Designer", company: "DesignCraft Studio", location: "Barcelona, ES", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face", trustScore: 85, isVerified: true, mutual: 6, status: "suggest" },
  { id: "8", name: "Tom Nakamura", title: "CTO", company: "CloudBridge Partners", location: "San Francisco, CA", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=60&h=60&fit=crop&crop=face", trustScore: 90, isVerified: true, mutual: 14, status: "connected" },
];

export default function DashboardNetwork() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "connected" | "pending" | "suggestions">("all");
  const [connections, setConnections] = useState(CONNECTIONS);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center"><Link to="/login" className="btn-primary">Sign In to View Network</Link></div>
      </div>
    );
  }

  const filtered = connections.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || (tab === "connected" && c.status === "connected") || (tab === "pending" && c.status === "pending") || (tab === "suggestions" && c.status === "suggest");
    return matchSearch && matchTab;
  });

  const handleConnect = (id: string) => {
    setConnections((prev) => prev.map((c) => c.id === id ? { ...c, status: "pending" } : c));
    toast.success("Connection request sent!");
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">My Network</h1>
            <p className="text-muted-foreground text-sm mt-0.5">847 connections · 12 pending · 24 suggestions</p>
          </div>
          <button className="btn-primary text-sm py-2">
            <UserPlus size={15} /> Invite Contacts
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-xl mb-6 w-fit">
          {(["all", "connected", "pending", "suggestions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or company..."
            className="input-field pl-10"
          />
        </div>

        {/* Connection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((conn) => (
            <div key={conn.id} className="bg-card border border-border rounded-2xl p-5 card-hover">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  <img src={conn.avatar} alt={conn.name} className="w-12 h-12 rounded-full object-cover" />
                  {conn.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-2 ring-card">
                      <ShieldCheck size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm truncate">{conn.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{conn.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Building2 size={10} /> <span className="truncate">{conn.company}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={cn("trust-badge text-xs", getTrustScoreBg(conn.trustScore))}>
                    {conn.trustScore}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1"><MapPin size={10} />{conn.location}</div>
                <div className="flex items-center gap-1"><Users size={10} />{conn.mutual} mutual</div>
              </div>

              <div className="flex items-center gap-2">
                {conn.status === "connected" ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-muted hover:bg-muted/80 text-xs font-medium transition-colors">
                      <MessageSquare size={12} /> Message
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border hover:bg-muted text-xs font-medium transition-colors">
                      <UserCheck size={12} /> Connected
                    </button>
                  </>
                ) : conn.status === "pending" ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-medium cursor-default">
                    Request Pending
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(conn.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <UserPlus size={12} /> Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Users size={40} className="text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No connections found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
