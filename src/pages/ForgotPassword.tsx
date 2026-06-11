import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import TruNetLogo from "@/components/features/TruNetLogo";
import { cn } from "@/lib/utils";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <TruNetLogo />
          </div>
          {!sent ? (
            <>
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">Reset your password</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and we will send you a secure link to reset your password.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4 mx-auto">
                <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">Check your email</h1>
              <p className="text-muted-foreground text-sm">
                We sent a password reset link to <strong className="text-foreground">{email}</strong>. It will expire in 15 minutes.
              </p>
            </>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@company.com"
                    className={cn("input-field pl-10", error && "border-destructive focus:ring-destructive")}
                  />
                </div>
                {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending…</>
                ) : (
                  <>Send Reset Link <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="btn-secondary w-full justify-center py-3"
              >
                Try a different email
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Didn't receive it? Check your spam folder or{" "}
                <button onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)} className="text-primary hover:underline">
                  resend
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
