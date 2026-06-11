import { useState } from "react";
import { Users, Search, Mail, ShieldCheck, MapPin, Building, Calendar, Star } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const INITIAL_FOUNDERS = [
  { id: "fd1", name: "Amara Okeke", startup: "EcoVibe Logistics", sector: "CleanTech", valuation: "$4.5M", location: "Lagos, NG", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face", trustScore: 95, verifiedStartUp: true },
  { id: "fd2", name: "Niklas Lindqvist", startup: "Krypton Ledger", sector: "Fintech / DeFi", valuation: "$12.0M", location: "Stockholm, SE", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face", trustScore: 92, verifiedStartUp: true },
  { id: "fd3", name: "Sarah Chen", startup: "NeuraMedica", sector: "HealthTech / AI", valuation: "$8.2M", location: "San Francisco, US", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face", trustScore: 97, verifiedStartUp: true },
  { id: "fd4", name: "Rajesh Patel", startup: "FarmFlo Automation", sector: "AgriTech", valuation: "$3.1M", location: "Pune, IN", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", trustScore: 88, verifiedStartUp: false },
];

export default function InvestorFounders() {
  const [founders] = useState(INITIAL_FOUNDERS);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  const handleRequestIntro = (founderName: string, startupName: string) => {
    toast.success(`Introduction request sent to ${founderName} (${startupName}). We will notify you once accepted.`);
  };

  const filtered = founders.filter(f => {
    const matchesSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.startup.toLowerCase().includes(search.toLowerCase());
    const matchesSector = sectorFilter === "all" || f.sector.toLowerCase().includes(sectorFilter.toLowerCase());
    return matchesSearch && matchesSector;
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Users size={22} className="text-primary" /> Founder Directory
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Connect with verified founders who have passed KYC verification and platform due diligence.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search founders or startups..." className="input-field pl-11 py-1.5 text-xs w-full" />
            </div>
            <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className="px-3 py-1.5 rounded-lg border border-input bg-card text-foreground text-xs">
              <option value="all">All Sectors</option>
              <option value="cleantech">CleanTech</option>
              <option value="fintech">Fintech</option>
              <option value="healthtech">HealthTech</option>
              <option value="agritech">AgriTech</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(founder => (
            <div key={founder.id} className="p-5 bg-card border border-border rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <div className="flex items-start gap-4">
                <img src={founder.avatar} alt={founder.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-foreground text-sm">{founder.name}</h3>
                    {founder.verifiedStartUp && (
                      <ShieldCheck size={14} className="text-primary" title="Verified Founder" />
                    )}
                  </div>
                  <p className="text-xs text-primary font-semibold flex items-center gap-1"><Building size={11} /> {founder.startup}</p>
                  <p className="text-xs text-muted-foreground">{founder.sector} · Valuation: <strong className="text-foreground">{founder.valuation}</strong></p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><MapPin size={9} /> {founder.location}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-foreground font-semibold"><Star size={9} className="text-primary fill-primary" /> Trust: {founder.trustScore}</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex justify-end">
                <button onClick={() => handleRequestIntro(founder.name, founder.startup)} className="btn-primary py-1.5 px-3.5 text-xs font-semibold flex items-center gap-1.5">
                  <Mail size={12} /> Request Intro
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl col-span-2">
              <Users size={40} className="text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No founders found matching search filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
