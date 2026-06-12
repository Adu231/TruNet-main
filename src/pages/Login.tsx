import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Mail, Lock, ChevronDown, User } from "lucide-react";
import { useAuth, DEMO_ACCOUNTS } from "@/hooks/useAuth";
import { toast } from "sonner";
import TruNetLogo from "@/components/features/TruNetLogo";
import { cn } from "@/lib/utils";

const DEMO_USERS = [
  { email: "professional@trunet.demo", label: "Professional", desc: "Senior Product Manager", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" },
  { email: "business@trunet.demo", label: "Business Owner", desc: "Founder & CEO, Apex Ventures", color: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300" },
  { email: "freelancer@trunet.demo", label: "Freelancer", desc: "Independent Strategy Consultant", color: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" },
  { email: "recruiter@trunet.demo", label: "Recruiter", desc: "Senior Talent Acquisition Lead", color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300" },
  { email: "investor@trunet.demo", label: "Investor", desc: "Investment Partner, Frontier Capital", color: "bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300" },
  { email: "expert@trunet.demo", label: "Community Expert", desc: "AI Strategy & Community Lead", color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" },
  { email: "admin@trunet.demo", label: "Admin", desc: "Platform Trust & Safety Director", color: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300" },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDemoPanel, setShowDemoPanel] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email address.";
    if (form.password.length < 4) errs.password = "Password required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const ok = await login(form.email, form.password);
    setLoading(false);
    if (ok) {
      toast.success("Welcome back to TruNet!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleDemoLogin = async (email: string) => {
    setShowDemoPanel(false);
    setLoading(true);
    const ok = await login(email, "demo123");
    setLoading(false);
    if (ok) {
      const account = DEMO_ACCOUNTS[email];
      toast.success(`Signed in as ${account?.name} (${account?.role})`);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-emerald-900/20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col h-full px-16 py-12 items-center justify-between">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <TruNetLogo variant="light" size="md" />
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md w-full my-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6">
                <ShieldCheck size={14} />
                240,000+ Verified Members
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
                Your Network.<br />Your Business.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Your Trust.
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                Sign in to access your verified professional profile, AI-powered matches, lead pipeline, and business intelligence dashboard.
              </p>
            </div>

            {/* Demo accounts info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2">
                <User size={14} /> 7 Demo Accounts Available
              </p>
              <div className="space-y-1.5">
                {DEMO_USERS.map((u) => (
                  <div key={u.email} className="flex items-center gap-2 text-white/50 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                    <span className="font-medium text-white/70">{u.label}</span>
                    <span>·</span>
                    <span>{u.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-[10px] mt-3">Password for all demo accounts: <span className="font-mono text-white/50">demo123</span></p>
            </div>
          </div>

          <div className="w-full max-w-md">
            <p className="text-white/30 text-xs">© 2026 TruNet Inc. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <TruNetLogo />
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground mb-1">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your TruNet account</p>
          </div>

          {/* Demo Login Panel */}
          <div className="mb-5">
            <button
              type="button"
              onClick={() => setShowDemoPanel((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/8 transition-colors text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                  <User size={12} className="text-primary" />
                </div>
                <span className="font-semibold text-primary">Try a Demo Account</span>
                <span className="text-muted-foreground">— 7 profiles available</span>
              </div>
              <ChevronDown size={16} className={cn("text-primary transition-transform", showDemoPanel && "rotate-180")} />
            </button>

            {showDemoPanel && (
              <div className="mt-2 border border-border rounded-xl overflow-hidden shadow-card">
                <div className="p-2.5 bg-muted/40 border-b border-border">
                  <p className="text-xs text-muted-foreground text-center">Click any account to sign in instantly · Password: <span className="font-mono font-semibold text-foreground">demo123</span></p>
                </div>
                <div className="divide-y divide-border">
                  {DEMO_USERS.map((demo) => {
                    const account = DEMO_ACCOUNTS[demo.email];
                    return (
                      <button
                        key={demo.email}
                        onClick={() => handleDemoLogin(demo.email)}
                        disabled={loading}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left disabled:opacity-50"
                      >
                        {account?.avatar ? (
                          <img src={account.avatar} alt={account.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{account?.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{demo.desc}</p>
                        </div>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0", demo.color)}>
                          {demo.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs text-muted-foreground">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({}); }}
                  placeholder="you@company.com"
                  className={cn("input-field pl-10", errors.email && "border-destructive focus:ring-destructive")}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({}); }}
                  placeholder="Enter your password"
                  className={cn("input-field pl-10 pr-10", errors.password && "border-destructive focus:ring-destructive")}
                />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1.5">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Signing In…</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "LinkedIn"].map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => toast.info(`${provider} login coming soon`)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to TruNet?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create your free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
