import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, TrendingUp, Star, Briefcase, MessageSquare,
  Calendar, Settings, Bell, Search, ChevronLeft, ChevronRight,
  Shield, Network, BookOpen, Zap, LogOut, Menu, X,
  Target, DollarSign, Handshake, BarChart3, FileText,
  CheckCircle, AlertTriangle, Globe, Mic, Award, Video,
  UserCheck, Wallet, PieChart, TrendingDown, Lightbulb,
  ClipboardList, Building2, ShieldCheck, Eye, Database, Flag
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn, getInitials } from "@/lib/utils";
import TruNetLogo from "@/components/features/TruNetLogo";
import TrustScore from "@/components/features/TrustScore";
import type { User } from "@/types";

// ─── Role-Specific Navigation ────────────────────────────────────────────────

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
};

function getSidebarItems(role: string): NavItem[] {
  switch (role) {
    case "professional":
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard/professional" },
        { icon: Users, label: "My Network", href: "/dashboard/network" },
        { icon: Zap, label: "AI Matches", href: "/dashboard/matches", badge: "New" },
        { icon: Target, label: "Opportunities", href: "/dashboard/leads" },
        { icon: Star, label: "Reputation", href: "/dashboard/reputation" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: "3" },
        { icon: Calendar, label: "Events", href: "/dashboard/events" },
        { icon: BookOpen, label: "Community", href: "/dashboard/community" },
      ];

    case "business":
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard/business" },
        { icon: Briefcase, label: "My Services", href: "/dashboard/business/services" },
        { icon: TrendingUp, label: "Lead Pipeline", href: "/dashboard/leads" },
        { icon: Handshake, label: "Partnerships", href: "/dashboard/business/partnerships" },
        { icon: Zap, label: "AI Matches", href: "/dashboard/matches", badge: "New" },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/business/analytics" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: "5" },
        { icon: Calendar, label: "Business Events", href: "/dashboard/business/events" },
      ];

    case "freelancer":
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard/freelancer" },
        { icon: Briefcase, label: "My Projects", href: "/dashboard/freelancer/projects" },
        { icon: Globe, label: "Browse Work", href: "/dashboard/leads" },
        { icon: FileText, label: "Proposals", href: "/dashboard/freelancer/proposals" },
        { icon: Star, label: "Reviews & Trust", href: "/dashboard/reputation" },
        { icon: DollarSign, label: "Earnings", href: "/dashboard/freelancer/earnings" },
        { icon: MessageSquare, label: "Client Chat", href: "/dashboard/messages", badge: "2" },
        { icon: Award, label: "Portfolio", href: "/dashboard/freelancer/portfolio" },
      ];

    case "recruiter":
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard/recruiter" },
        { icon: ClipboardList, label: "Job Listings", href: "/dashboard/recruitment" },
        { icon: Users, label: "Candidates", href: "/dashboard/recruiter/candidates" },
        { icon: Calendar, label: "Interviews", href: "/dashboard/recruiter/interviews" },
        { icon: Zap, label: "AI Talent Match", href: "/dashboard/matches", badge: "New" },
        { icon: CheckCircle, label: "Placements", href: "/dashboard/recruiter/placements" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: "4" },
        { icon: BarChart3, label: "Hiring Analytics", href: "/dashboard/recruiter/analytics" },
      ];

    case "investor":
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard/investor" },
        { icon: Briefcase, label: "Portfolio", href: "/dashboard/investor/portfolio" },
        { icon: TrendingUp, label: "Deal Flow", href: "/dashboard/investor/deals" },
        { icon: Zap, label: "Startup Matches", href: "/dashboard/matches", badge: "New" },
        { icon: Network, label: "Founder Network", href: "/dashboard/investor/founders" },
        { icon: PieChart, label: "Fund Analytics", href: "/dashboard/investor/analytics" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: "6" },
        { icon: Calendar, label: "Pitch Events", href: "/dashboard/investor/events" },
      ];

    case "expert":
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard/expert" },
        { icon: BookOpen, label: "My Articles", href: "/dashboard/expert/articles" },
        { icon: Target, label: "Mentorship", href: "/dashboard/expert/mentorship" },
        { icon: Video, label: "Events & Webinars", href: "/dashboard/expert/events" },
        { icon: Users, label: "My Followers", href: "/dashboard/expert/followers" },
        { icon: Star, label: "Reputation", href: "/dashboard/reputation" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: "8" },
        { icon: Mic, label: "Speaking Requests", href: "/dashboard/expert/speaking" },
      ];

    case "admin":
      return [
        { icon: LayoutDashboard, label: "Control Center", href: "/dashboard/admin" },
        { icon: ShieldCheck, label: "Verification Queue", href: "/dashboard/admin/verifications" },
        { icon: AlertTriangle, label: "Fraud Alerts", href: "/dashboard/admin/fraud" },
        { icon: Users, label: "User Management", href: "/dashboard/admin/users" },
        { icon: Eye, label: "Content Moderation", href: "/dashboard/admin/moderation" },
        { icon: BarChart3, label: "Revenue Analytics", href: "/dashboard/admin/analytics" },
        { icon: Database, label: "System Health", href: "/dashboard/admin/health" },
        { icon: Flag, label: "Audit Logs", href: "/dashboard/admin/audits" },
      ];

    default:
      return [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
        { icon: Users, label: "Network", href: "/dashboard/network" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
      ];
  }
}

function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    professional: "Professional",
    business: "Business Owner",
    freelancer: "Freelancer",
    recruiter: "Recruiter",
    investor: "Investor",
    expert: "Community Expert",
    admin: "Administrator",
  };
  return labels[role] || "Member";
}

function getRoleBadgeStyle(role: string): string {
  const styles: Record<string, string> = {
    professional: "bg-blue-500/20 text-blue-300",
    business: "bg-emerald-500/20 text-emerald-300",
    freelancer: "bg-purple-500/20 text-purple-300",
    recruiter: "bg-yellow-500/20 text-yellow-300",
    investor: "bg-teal-500/20 text-teal-300",
    expert: "bg-pink-500/20 text-pink-300",
    admin: "bg-red-500/20 text-red-300",
  };
  return styles[role] || "bg-gray-500/20 text-gray-300";
}

// ─── Bottom nav is the same for all roles ────────────────────────────────────

const BOTTOM_ITEMS: NavItem[] = [
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = user?.role ?? "professional";
  const sidebarItems = getSidebarItems(role);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + Collapse Toggle */}
      <div className={cn("p-4 border-b border-sidebar-border flex items-center gap-3", collapsed && "justify-center p-3")}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <TruNetLogo variant={isDark ? "light" : "dark"} size="sm" />
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center hover:opacity-90 transition-opacity">
            <Shield size={16} className="text-white" />
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="ml-auto hidden lg:flex p-1.5 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all"
          >
            <ChevronLeft size={15} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="hidden lg:flex p-1.5 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all absolute right-2 top-[18px]"
          >
            <ChevronRight size={15} />
          </button>
        )}
      </div>

      {/* User Card */}
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-sidebar-primary/30 flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-sidebar-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {getInitials(user?.name || "U")}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name}</p>
              <span className={cn("inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-0.5", getRoleBadgeStyle(role))}>
                {getRoleLabel(role)}
              </span>
            </div>
            <div className="flex-shrink-0">
              <TrustScore score={user?.trustScore || 0} size="sm" showLabel={false} showRing={false} className="text-sidebar-primary font-bold text-sm" />
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-3 border-b border-sidebar-border flex justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-sidebar-primary/30" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-sidebar-primary text-white flex items-center justify-center text-xs font-bold ring-2 ring-sidebar-primary/30">
              {getInitials(user?.name || "U")}
            </div>
          )}
        </div>
      )}

      {/* Role Label for collapsed */}
      {collapsed && (
        <div className="px-2 py-2 border-b border-sidebar-border flex justify-center">
          <div className={cn("w-2 h-2 rounded-full", role === "admin" ? "bg-red-400" : role === "expert" ? "bg-pink-400" : role === "investor" ? "bg-teal-400" : role === "recruiter" ? "bg-yellow-400" : role === "freelancer" ? "bg-purple-400" : role === "business" ? "bg-emerald-400" : "bg-blue-400")} title={getRoleLabel(role)} />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {sidebarItems.map(({ icon: Icon, label, href, badge }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "sidebar-item group",
                active
                  ? "bg-sidebar-primary/20 text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{label}</span>
                  {badge && (
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                      badge === "New" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    )}>
                      {badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border space-y-0.5">
        {BOTTOM_ITEMS.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            to={href}
            className={cn(
              "sidebar-item text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className={cn(
            "sidebar-item text-red-500/80 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/10 w-full",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0 relative",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <TruNetLogo variant={isDark ? "light" : "dark"} size="sm" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-sidebar-foreground/50 hover:text-sidebar-foreground">
                <X size={18} />
              </button>
            </div>
            {/* User Card Mobile */}
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-sidebar-primary/30" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-sidebar-primary text-white flex items-center justify-center text-sm font-bold">
                    {getInitials(user?.name || "U")}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name}</p>
                  <span className={cn("inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-0.5", getRoleBadgeStyle(role))}>
                    {getRoleLabel(role)}
                  </span>
                </div>
              </div>
            </div>
            {/* Nav */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {sidebarItems.map(({ icon: Icon, label, href, badge }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "sidebar-item",
                    isActive(href)
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon size={18} />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", badge === "New" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400")}>
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t border-sidebar-border space-y-0.5">
              {BOTTOM_ITEMS.map(({ icon: Icon, label, href }) => (
                <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="sidebar-item text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}
              <button onClick={handleLogout} className="sidebar-item text-red-500/80 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/10 w-full">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-background border-b border-border flex items-center px-4 sm:px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder={role === "recruiter" ? "Search candidates, jobs, skills..." : role === "investor" ? "Search startups, founders, sectors..." : role === "admin" ? "Search users, alerts, reports..." : "Search connections, leads, opportunities..."}
              className="w-full pl-11 pr-4 py-2 text-sm rounded-lg border border-input bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Role badge in header */}
            <span className={cn("hidden sm:inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border", role === "admin" ? "border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10" : role === "expert" ? "border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/10" : "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10")}>
              {getRoleLabel(role)}
            </span>

            <Link
              to="/dashboard/notifications"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            <Link to="/profile">
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  {getInitials(user?.name || "U")}
                </div>
              )}
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
