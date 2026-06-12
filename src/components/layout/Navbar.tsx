import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Bell, ChevronDown, Shield, LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { NAV_ITEMS } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import TruNetLogo from "@/components/features/TruNetLogo";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isDark = theme === "dark";
  const isLandingPage = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isLandingPage
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <TruNetLogo variant={scrolled || !isLandingPage ? "default" : "light"} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => {
                  if (location.pathname === item.href) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "text-primary bg-primary/8 dark:bg-primary/10"
                    : scrolled || !isLandingPage
                    ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                scrolled || !isLandingPage
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link
                  to="/dashboard"
                  className={cn(
                    "relative p-2 rounded-lg transition-all duration-200",
                    scrolled || !isLandingPage
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-muted transition-all duration-200"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/20" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {getInitials(user?.name || "U")}
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium">{user?.name?.split(" ")[0]}</span>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-card-hover py-1.5 z-50">
                      <div className="px-4 py-2.5 border-b border-border">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                      </div>
                      {[
                        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
                        { icon: User, label: "Profile", href: "/profile" },
                        { icon: Settings, label: "Settings", href: "/settings" },
                      ].map(({ icon: Icon, label, href }) => (
                        <Link
                          key={href}
                          to={href}
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <Icon size={15} className="text-muted-foreground" />
                          {label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 w-full transition-colors"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    scrolled || !isLandingPage
                      ? "text-foreground hover:bg-muted"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-brand-sm"
                >
                  Get Started Free
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-all duration-200",
                scrolled || !isLandingPage
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => {
                  if (location.pathname === item.href) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/8"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                <Link to="/login" className="px-4 py-3 rounded-lg text-sm font-medium text-center border border-border hover:bg-muted transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-3 rounded-lg text-sm font-semibold text-center bg-primary text-white hover:opacity-90 transition-colors">
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
