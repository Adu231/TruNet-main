import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ShieldCheck, UserPlus, Star, MessageSquare, Zap, Trash2, CheckCircle2, Check } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "network",
    title: "Connection Request",
    message: "Sarah Mitchell sent you a connection request.",
    time: "2h ago",
    read: false,
    sender: { name: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", company: "Apex Ventures" },
    actionable: true
  },
  {
    id: "n2",
    type: "reputation",
    title: "New Endorsement",
    message: "Marcus Chen endorsed you for 'React' and 'Tailwind CSS'.",
    time: "5h ago",
    read: false,
    sender: { name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" }
  },
  {
    id: "n3",
    type: "match",
    title: "AI Match Alert",
    message: "Elena Vasquez matches your target profile with 96% compatibility.",
    time: "8h ago",
    read: true,
    sender: { name: "Elena Vasquez", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face" }
  },
  {
    id: "n4",
    type: "security",
    title: "Security Verification Boosted",
    message: "Your KYC document review is complete. Trust Score boosted to 100!",
    time: "1d ago",
    read: true
  },
  {
    id: "n5",
    type: "message",
    title: "New Message",
    message: "James Okonkwo sent you a message: 'Hey there, did you get a chance to look...'",
    time: "2d ago",
    read: true,
    sender: { name: "James Okonkwo", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" }
  }
];

export default function DashboardNotifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread" | "network" | "alerts">("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info("Notification deleted");
  };

  const handleAcceptConnection = (id: string, name: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success(`You are now connected with ${name}!`);
  };

  const filtered = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "network") return n.type === "network";
    if (filter === "alerts") return n.type === "security" || n.type === "match";
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "network":
        return <UserPlus size={16} className="text-blue-500" />;
      case "reputation":
        return <Star size={16} className="text-yellow-500" />;
      case "match":
        return <Zap size={16} className="text-emerald-500" />;
      case "message":
        return <MessageSquare size={16} className="text-purple-500" />;
      default:
        return <ShieldCheck size={16} className="text-primary" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Bell size={22} className="text-primary" />
              Notification Center
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Manage your activity feed, network updates, and security logs.
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <Check size={13} /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn-secondary text-xs py-1.5 px-3 text-red-500 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30 flex items-center gap-1.5"
              >
                <Trash2 size={13} /> Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-muted rounded-xl w-fit">
          {[
            { id: "all", label: "All" },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "network", label: "Network" },
            { id: "alerts", label: "System Alerts" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                filter === f.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => !notif.read && handleMarkRead(notif.id)}
              className={cn(
                "p-4 rounded-2xl border border-border bg-card transition-all flex gap-4 items-start relative group",
                !notif.read && "ring-1 ring-primary/20 bg-primary/[0.01]",
                "hover:shadow-md cursor-pointer"
              )}
            >
              {/* Unread indicator */}
              {!notif.read && (
                <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary" />
              )}

              {/* Icon Container */}
              <div className={cn(
                "w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 mt-0.5",
                !notif.read && "bg-primary/5"
              )}>
                {getNotificationIcon(notif.type)}
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{notif.message}</p>

                {/* Sender card for network connection requests */}
                {notif.type === "network" && notif.sender && notif.actionable && (
                  <div className="mt-3 p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between gap-3 max-w-md">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={notif.sender.avatar} alt={notif.sender.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{notif.sender.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{notif.sender.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptConnection(notif.id, notif.sender!.name);
                        }}
                        className="text-[10px] bg-primary text-white py-1 px-2.5 rounded-md font-semibold hover:opacity-90 transition-opacity"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notif.id);
                        }}
                        className="text-[10px] bg-muted hover:bg-muted/80 text-muted-foreground py-1 px-2.5 rounded-md font-semibold transition-colors border border-border"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity self-center flex-shrink-0">
                {!notif.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkRead(notif.id);
                      toast.success("Notification marked as read");
                    }}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                    title="Mark as Read"
                  >
                    <CheckCircle2 size={14} />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notif.id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-card border border-border rounded-3xl">
            <Bell size={40} className="text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">Clean slate!</h3>
            <p className="text-sm text-muted-foreground">You have no notifications in this section.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
