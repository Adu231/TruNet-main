import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Mail, Lock, User, Building2, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import TruNetLogo from "@/components/features/TruNetLogo";
import { cn } from "@/lib/utils";

const USER_TYPES = [
  { value: "professional", label: "Professional", desc: "Employee or consultant" },
  { value: "business", label: "Business", desc: "Company or agency" },
  { value: "freelancer", label: "Freelancer", desc: "Independent contractor" },
  { value: "recruiter", label: "Recruiter", desc: "Hiring manager or HR" },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("professional");
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", agreeTerms: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!userType) errs.userType = "Please select an account type.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (form.name.length < 2) errs.name = "Enter your full name.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email address.";
    if (form.password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (!form.agreeTerms) errs.agreeTerms = "You must agree to the terms.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    const ok = await register(form.name, form.email, form.password, userType, form.company);
    setLoading(false);
    if (ok) {
      toast.success("Welcome to TruNet! Let's get you verified.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-2/5 flex-col relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-emerald-900/20" />
        <div className="relative z-10 flex flex-col h-full px-16 py-12 items-center justify-between">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <TruNetLogo variant="light" />
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-center max-w-md w-full my-8">
            <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight">
              Join the World's Most Trusted<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Professional Network
              </span>
            </h2>
            <div className="space-y-4">
              {[
                "Free forever plan available",
                "Get verified in under 10 minutes",
                "AI matches your first opportunity in 24h",
                "240,000+ professionals already inside",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-emerald-400" />
                  </div>
                  {item}
                </div>
              ))}
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

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {step > s ? <Check size={13} /> : s}
                </div>
                <span className={cn("text-xs font-medium", step >= s ? "text-foreground" : "text-muted-foreground")}>
                  {s === 1 ? "Account Type" : "Your Details"}
                </span>
                {s < 2 && <div className="w-8 h-0.5 bg-border" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-display font-bold text-foreground mb-1">Create your account</h1>
                <p className="text-muted-foreground">What best describes you?</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {USER_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setUserType(type.value)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all duration-200",
                      userType === type.value
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-border hover:border-primary/30 hover:bg-muted"
                    )}
                  >
                    <div className={cn("text-sm font-semibold mb-0.5", userType === type.value ? "text-primary" : "text-foreground")}>
                      {type.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{type.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={handleNext} className="btn-primary w-full justify-center py-3 text-base">
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground mb-1">Your details</h1>
                <p className="text-muted-foreground mb-6">Create your verified profile.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className={cn("input-field pl-10", errors.name && "border-destructive")}
                  />
                </div>
                {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className={cn("input-field pl-10", errors.email && "border-destructive")}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company / Organization</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name (optional)"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min. 8 characters"
                    className={cn("input-field pl-10 pr-10", errors.password && "border-destructive")}
                  />
                  <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1.5">{errors.password}</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-input accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to TruNet's{" "}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-xs text-destructive -mt-3">{errors.agreeTerms}</p>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center py-3">
                  Back
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Creating…</> : <>Create Account <ArrowRight size={16} /></>}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
