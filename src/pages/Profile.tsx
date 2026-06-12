import { useState } from "react";
import { Camera, Save, ShieldCheck, MapPin, Building2, Globe, Loader2, CheckCircle, Edit3 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrustScore from "@/components/features/TrustScore";
import { useAuth } from "@/hooks/useAuth";
import { cn, getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SKILLS = ["Product Strategy", "B2B SaaS", "AI/ML", "Team Leadership", "Go-to-Market", "Data Analytics", "Growth Hacking", "Stakeholder Management"];

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    title: user?.title || "",
    company: user?.company || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [skills, setSkills] = useState(SKILLS);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");

  const [showKYCModal, setShowKYCModal] = useState(false);
  const [kycForm, setKycForm] = useState({ phone: "", idType: "Passport", idNumber: "" });

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
    setShowSkillModal(false);
    toast.success("Skill added!");
  };

  const handleAvatarSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({ avatar: avatarUrl });
    setSaving(false);
    setShowAvatarModal(false);
    toast.success("Avatar updated successfully!");
  };

  const handleKYCVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({ isKYCVerified: true, trustScore: 100 });
    setSaving(false);
    setShowKYCModal(false);
    toast.success("Identity verified successfully! Trust Score boosted to 100.");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <h2 className="text-xl font-display font-bold text-foreground mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">Sign in to view and edit your profile.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    const ok = await updateProfile(form);
    setSaving(false);
    if (ok) {
      setEditing(false);
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Cover & Avatar */}
          <div className="relative mb-6">
            <div className="h-48 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-700/60 to-emerald-600/40" />
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&fit=crop')] bg-cover bg-center" />
            </div>
            <div className="absolute bottom-0 left-6 translate-y-1/2 flex items-end gap-4">
              <div className="relative group">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-background shadow-lg" />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl font-bold ring-4 ring-background">
                    {getInitials(user?.name || "U")}
                  </div>
                )}
                <button
                  onClick={() => { setAvatarUrl(user?.avatar || ""); setShowAvatarModal(true); }}
                  className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid lg:grid-cols-3 gap-6">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Identity Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {editing ? (
                      <div className="space-y-3">
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field font-bold text-xl" placeholder="Full Name" />
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="Job Title" />
                        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" placeholder="Company" />
                        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" placeholder="Location" />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-2xl font-display font-bold text-foreground">{user?.name}</h1>
                          {user?.isVerified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                              <ShieldCheck size={11} /> Verified
                            </span>
                          )}
                          {user?.isKYCVerified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                              <CheckCircle size={11} /> KYC
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-1">{user?.title}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          {user?.company && <span className="flex items-center gap-1"><Building2 size={13} />{user.company}</span>}
                          {user?.location && <span className="flex items-center gap-1"><MapPin size={13} />{user.location}</span>}
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => editing ? handleSave() : setEditing(true)}
                    disabled={saving}
                    className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ml-4", editing ? "bg-primary text-white hover:opacity-90" : "border border-border hover:bg-muted")}
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : editing ? <Save size={14} /> : <Edit3 size={14} />}
                    {saving ? "Saving…" : editing ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium text-foreground mb-2 text-sm">About</h3>
                  {editing ? (
                    <textarea
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Write a professional bio..."
                    />
                  ) : (
                    <p className="text-muted-foreground text-sm leading-relaxed">{user?.bio}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-display font-semibold text-foreground mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary/8 dark:bg-primary/12 text-primary text-sm font-medium border border-primary/15">
                      {skill}
                    </span>
                  ))}
                  <button
                    onClick={() => setShowSkillModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-dashed border-border text-muted-foreground text-sm hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-display font-semibold text-foreground mb-5">Experience</h2>
                <div className="space-y-5">
                  {[
                    { role: "Senior Product Manager", company: "InnovateTech Corp", period: "2021 – Present", desc: "Leading B2B SaaS product strategy for enterprise clients across 40+ countries." },
                    { role: "Product Manager", company: "DataBridge Solutions", period: "2018 – 2021", desc: "Built and launched the core analytics platform serving 5,000+ business users." },
                    { role: "Associate PM", company: "SoftEdge Labs", period: "2016 – 2018", desc: "Collaborated with engineering on mobile-first product features." },
                  ].map((exp, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Building2 size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{exp.role}</h3>
                        <p className="text-primary text-xs font-medium">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>
                        <p className="text-sm text-muted-foreground">{exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Trust Score */}
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <h3 className="font-display font-semibold text-foreground mb-4">Trust Score</h3>
                <TrustScore score={user?.trustScore || 92} size="lg" />
                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "Identity Verified", done: true },
                    { label: "KYC Complete", done: user?.isKYCVerified },
                    { label: "Email Confirmed", done: true },
                    { label: "Phone Verified", done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <CheckCircle size={16} className={item.done ? "text-emerald-500" : "text-muted-foreground/30"} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowKYCModal(true)}
                  className="btn-primary w-full justify-center mt-5 text-sm"
                >
                  Boost Trust Score
                </button>
              </div>

              {/* Network Stats */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-4">Network Overview</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Connections", value: user?.connections?.toString() || "847" },
                    { label: "Profile Views", value: "1.2K" },
                    { label: "Reviews", value: "124" },
                    { label: "Endorsements", value: "68" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/60">
                      <div className="text-xl font-bold font-display text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Verified Professional</h3>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 text-xs leading-relaxed">
                  Your identity and professional credentials have been verified by TruNet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAvatarModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Update Profile Avatar</h2>
              <button onClick={() => setShowAvatarModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleAvatarSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Avatar Image URL</label>
                <input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or presets"
                  className="input-field"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground">Presets</label>
                <div className="flex gap-2">
                  {[
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                  ].map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarUrl(url)}
                      className={cn(
                        "w-10 h-10 rounded-full overflow-hidden border-2",
                        avatarUrl === url ? "border-primary" : "border-transparent"
                      )}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAvatarModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Update Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSkillModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Add New Skill</h2>
              <button onClick={() => setShowSkillModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Skill Name</label>
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. cloud security, docker"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowSkillModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Add Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KYC Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowKYCModal(false)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Boost Trust Score (KYC Verification)</h2>
              <button onClick={() => setShowKYCModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={handleKYCVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={kycForm.phone}
                  onChange={(e) => setKycForm({ ...kycForm, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Government Document Type</label>
                <select
                  value={kycForm.idType}
                  onChange={(e) => setKycForm({ ...kycForm, idType: e.target.value })}
                  className="input-field"
                >
                  <option>Passport</option>
                  <option>Driving License</option>
                  <option>National Identification Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Document ID Number</label>
                <input
                  value={kycForm.idNumber}
                  onChange={(e) => setKycForm({ ...kycForm, idNumber: e.target.value })}
                  placeholder="e.g. G-847294829"
                  className="input-field"
                  required
                />
              </div>
              <p className="text-[10px] text-muted-foreground leading-normal mt-1.5">
                Note: TruNet uses secure 256-bit encryption for KYC data. Your documents are verified by a certified third party and are never saved on our servers.
              </p>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowKYCModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Verify & Boost</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
