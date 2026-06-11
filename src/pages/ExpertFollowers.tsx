import { useState } from "react";
import { Users, Search, MessageSquare, ShieldCheck, TrendingUp, Award, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_FOLLOWERS = [
  { id: "f1", name: "David Park", role: "Full-Stack Engineer", location: "Seoul, KR", trustScore: 91, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", verified: true },
  { id: "f2", name: "Yuki Tanaka", role: "Data Scientist", location: "Tokyo, JP", trustScore: 96, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face", verified: true },
  { id: "f3", name: "Elena Vasquez", role: "Lead Product Designer", location: "Barcelona, ES", trustScore: 89, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", verified: true },
  { id: "f4", name: "Rajesh Patel", role: "AgriTech Developer", location: "Pune, IN", trustScore: 88, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", verified: false },
];

export default function ExpertFollowers() {
  const [followers] = useState(INITIAL_FOLLOWERS);
  const [search, setSearch] = useState("");

  const handleMessage = (name: string) => {
    toast.success(`Opening direct chat with ${name}...`);
  };

  const filtered = followers.filter(f =>
    !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Users size={22} className="text-primary" /> Audience & Followers
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Review your platform audience, follower demographics, and engage with verified community members.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search followers..." className="input-field pl-11 py-1.5 text-xs w-full" />
          </div>
        </div>

        {/* Growth Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Audience", value: "1,240 Followers", desc: "Across B2B network", color: "text-primary" },
            { label: "New This Month", value: "+148 Profiles", desc: "+12.4% MoM growth", color: "text-emerald-500" },
            { label: "Average Audience Trust", value: "92 / 100 Score", desc: "High integrity connections", color: "text-yellow-500" },
          ].map(stat => (
            <div key={stat.label} className="stat-card bg-card border border-border rounded-2xl p-5">
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-semibold">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* List of Followers */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-1.5">
            <TrendingUp size={15} className="text-primary" /> Audience Directory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(follower => (
              <div key={follower.id} className="p-4 bg-card border border-border rounded-2xl flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={follower.avatar} alt={follower.name} className="w-10 h-10 rounded-full object-cover" />
                    {follower.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center ring-2 ring-card">
                        <ShieldCheck size={8} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-foreground text-xs">{follower.name}</h4>
                    <p className="text-[10px] text-primary font-semibold">{follower.role}</p>
                    <p className="text-[9px] text-muted-foreground flex items-center gap-0.5"><MapPin size={9} /> {follower.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-muted-foreground">Trust: {follower.trustScore}</span>
                  <button onClick={() => handleMessage(follower.name)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Send message">
                    <MessageSquare size={14} />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 bg-card border border-border rounded-2xl col-span-2">
                <Users size={40} className="text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No followers found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
