import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DashboardProfessional from "./pages/DashboardProfessional";
import DashboardBusiness from "./pages/DashboardBusiness";
import DashboardFreelancer from "./pages/DashboardFreelancer";
import DashboardRecruiter from "./pages/DashboardRecruiter";
import DashboardInvestor from "./pages/DashboardInvestor";
import DashboardExpert from "./pages/DashboardExpert";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardNetwork from "./pages/DashboardNetwork";
import DashboardLeads from "./pages/DashboardLeads";
import DashboardMatches from "./pages/DashboardMatches";
import DashboardMarketplace from "./pages/DashboardMarketplace";
import DashboardReputation from "./pages/DashboardReputation";
import DashboardMessages from "./pages/DashboardMessages";
import DashboardEvents from "./pages/DashboardEvents";
import DashboardCommunity from "./pages/DashboardCommunity";
import DashboardRecruitment from "./pages/DashboardRecruitment";
import DashboardNotifications from "./pages/DashboardNotifications";

import AdminVerifications from "./pages/AdminVerifications";
import AdminFraud from "./pages/AdminFraud";
import AdminUsers from "./pages/AdminUsers";
import AdminModeration from "./pages/AdminModeration";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSystemHealth from "./pages/AdminSystemHealth";
import AdminAuditLogs from "./pages/AdminAuditLogs";

import FreelancerProposals from "./pages/FreelancerProposals";
import FreelancerEarnings from "./pages/FreelancerEarnings";
import FreelancerPortfolio from "./pages/FreelancerPortfolio";
import FreelancerProjects from "./pages/FreelancerProjects";

import RecruiterCandidates from "./pages/RecruiterCandidates";
import RecruiterInterviews from "./pages/RecruiterInterviews";
import RecruiterPlacements from "./pages/RecruiterPlacements";
import RecruiterAnalytics from "./pages/RecruiterAnalytics";

import InvestorFounders from "./pages/InvestorFounders";
import InvestorAnalytics from "./pages/InvestorAnalytics";
import InvestorEvents from "./pages/InvestorEvents";
import InvestorPortfolio from "./pages/InvestorPortfolio";
import InvestorDeals from "./pages/InvestorDeals";

import ExpertArticles from "./pages/ExpertArticles";
import ExpertMentorship from "./pages/ExpertMentorship";
import ExpertFollowers from "./pages/ExpertFollowers";
import ExpertSpeaking from "./pages/ExpertSpeaking";
import ExpertEvents from "./pages/ExpertEvents";

import BusinessAnalytics from "./pages/BusinessAnalytics";
import BusinessServices from "./pages/BusinessServices";
import BusinessPartnerships from "./pages/BusinessPartnerships";
import BusinessEvents from "./pages/BusinessEvents";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import Blog from "./pages/Blog";
import FAQPage from "./pages/FAQPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import PressKit from "./pages/PressKit";
import ApiDocs from "./pages/ApiDocs";
import StatusPage from "./pages/StatusPage";
import SecurityPage from "./pages/SecurityPage";
import GdprPage from "./pages/GdprPage";
import CookiePolicy from "./pages/CookiePolicy";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<PressKit />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/gdpr" element={<GdprPage />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* Dashboard Router (redirects based on role) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Role-specific Dashboards */}
          <Route path="/dashboard/professional" element={<DashboardProfessional />} />
          <Route path="/dashboard/business" element={<DashboardBusiness />} />
          <Route path="/dashboard/freelancer" element={<DashboardFreelancer />} />
          <Route path="/dashboard/recruiter" element={<DashboardRecruiter />} />
          <Route path="/dashboard/investor" element={<DashboardInvestor />} />
          <Route path="/dashboard/expert" element={<DashboardExpert />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />

          {/* Admin Subpages */}
          <Route path="/dashboard/admin/verifications" element={<AdminVerifications />} />
          <Route path="/dashboard/admin/fraud" element={<AdminFraud />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/moderation" element={<AdminModeration />} />
          <Route path="/dashboard/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/dashboard/admin/health" element={<AdminSystemHealth />} />
          <Route path="/dashboard/admin/audits" element={<AdminAuditLogs />} />

          {/* Business Subpages */}
          <Route path="/dashboard/business/analytics" element={<BusinessAnalytics />} />
          <Route path="/dashboard/business/services" element={<BusinessServices />} />
          <Route path="/dashboard/business/partnerships" element={<BusinessPartnerships />} />
          <Route path="/dashboard/business/events" element={<BusinessEvents />} />

          {/* Freelancer Subpages */}
          <Route path="/dashboard/freelancer/proposals" element={<FreelancerProposals />} />
          <Route path="/dashboard/freelancer/earnings" element={<FreelancerEarnings />} />
          <Route path="/dashboard/freelancer/portfolio" element={<FreelancerPortfolio />} />
          <Route path="/dashboard/freelancer/projects" element={<FreelancerProjects />} />

          {/* Recruiter Subpages */}
          <Route path="/dashboard/recruiter/candidates" element={<RecruiterCandidates />} />
          <Route path="/dashboard/recruiter/interviews" element={<RecruiterInterviews />} />
          <Route path="/dashboard/recruiter/placements" element={<RecruiterPlacements />} />
          <Route path="/dashboard/recruiter/analytics" element={<RecruiterAnalytics />} />

          {/* Investor Subpages */}
          <Route path="/dashboard/investor/founders" element={<InvestorFounders />} />
          <Route path="/dashboard/investor/analytics" element={<InvestorAnalytics />} />
          <Route path="/dashboard/investor/events" element={<InvestorEvents />} />
          <Route path="/dashboard/investor/portfolio" element={<InvestorPortfolio />} />
          <Route path="/dashboard/investor/deals" element={<InvestorDeals />} />

          {/* Expert Subpages */}
          <Route path="/dashboard/expert/articles" element={<ExpertArticles />} />
          <Route path="/dashboard/expert/mentorship" element={<ExpertMentorship />} />
          <Route path="/dashboard/expert/followers" element={<ExpertFollowers />} />
          <Route path="/dashboard/expert/speaking" element={<ExpertSpeaking />} />
          <Route path="/dashboard/expert/events" element={<ExpertEvents />} />

          {/* Shared Dashboard Pages */}
          <Route path="/dashboard/network" element={<DashboardNetwork />} />
          <Route path="/dashboard/leads" element={<DashboardLeads />} />
          <Route path="/dashboard/matches" element={<DashboardMatches />} />
          <Route path="/dashboard/marketplace" element={<DashboardMarketplace />} />
          <Route path="/dashboard/reputation" element={<DashboardReputation />} />
          <Route path="/dashboard/messages" element={<DashboardMessages />} />
          <Route path="/dashboard/events" element={<DashboardEvents />} />
          <Route path="/dashboard/community" element={<DashboardCommunity />} />
          <Route path="/dashboard/recruitment" element={<DashboardRecruitment />} />
          <Route path="/dashboard/notifications" element={<DashboardNotifications />} />

          {/* Account */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
