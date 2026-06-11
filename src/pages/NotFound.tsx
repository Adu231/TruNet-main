import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import TruNetLogo from "@/components/features/TruNetLogo";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Page not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <TruNetLogo size="lg" />
      </div>

      {/* 404 Visual */}
      <div className="relative mb-8">
        <div className="text-[120px] sm:text-[180px] font-display font-black text-muted/30 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-primary/60" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
        This Page Doesn't Exist
      </h1>
      <p className="text-muted-foreground text-base max-w-md mb-8 leading-relaxed">
        The page at <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{location.pathname}</code> could not be found. It may have moved or been removed.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link to="/" className="btn-primary justify-center">
          <Home size={16} /> Go to Homepage
        </Link>
        <button onClick={() => window.history.back()} className="btn-secondary justify-center">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>

      {/* Quick Links */}
      <div className="border-t border-border pt-8 w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
