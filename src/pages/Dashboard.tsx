import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ROLE_ROUTES: Record<string, string> = {
  professional: "/dashboard/professional",
  business: "/dashboard/business",
  freelancer: "/dashboard/freelancer",
  recruiter: "/dashboard/recruiter",
  investor: "/dashboard/investor",
  expert: "/dashboard/expert",
  admin: "/dashboard/admin",
};

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    const route = ROLE_ROUTES[user?.role ?? "professional"] ?? "/dashboard/professional";
    navigate(route, { replace: true });
  }, [isLoading, isAuthenticated, user?.role, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to access your personalized dashboard with AI-powered insights tailored to your role.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="btn-primary justify-center">Sign In</Link>
            <Link to="/register" className="btn-secondary justify-center">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 size={28} className="animate-spin text-primary" />
    </div>
  );
}
