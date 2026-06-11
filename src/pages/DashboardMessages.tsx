import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, Send, ShieldCheck, CheckCircle2, Search, MoreVertical, Phone, Video, Info } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INITIAL_THREADS = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    title: "Founder & CEO, Apex Ventures",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    messages: [
      { sender: "them", text: "Hi! I saw your profile on TruNet. We are looking for a strategy consultant for our Q3 launch.", time: "10:30 AM" },
      { sender: "me", text: "Hello Sarah! Thanks for reaching out. I'd love to help. What are the key areas you need assistance with?", time: "10:32 AM" },
      { sender: "them", text: "Mainly B2B SaaS growth funnel optimization and setting up analytics dashboards. Do you have availability next week?", time: "10:35 AM" }
    ]
  },
  {
    id: "t2",
    name: "James Okonkwo",
    title: "Head of Biz Dev, TechScale Global",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    messages: [
      { sender: "them", text: "Hey there, did you get a chance to look at the joint venture proposal?", time: "Yesterday" },
      { sender: "me", text: "Yes James, I'm reviewing it with our legal department. Will send feedback by Friday.", time: "Yesterday" }
    ]
  },
  {
    id: "t3",
    name: "Priya Sharma",
    title: "Senior Recruiter, HireForce Pro",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    messages: [
      { sender: "them", text: "Hi Alex, we have a candidate who fits your AI engineering role perfectly. Let me know when you're free to chat.", time: "2 days ago" }
    ]
  }
];

export default function DashboardMessages() {
  const { user } = useAuth();
  const location = useLocation();
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState("t1");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = location.state as { startChatWith?: string; startChatAvatar?: string; startChatTitle?: string } | null;
    if (state?.startChatWith) {
      // Check if there is an existing thread with this person
      const existing = threads.find((t) => t.name.toLowerCase() === state.startChatWith!.toLowerCase());
      if (existing) {
        setActiveThreadId(existing.id);
      } else {
        // Create a new temporary thread
        const newThreadId = "t-temp-" + Date.now();
        const newThread = {
          id: newThreadId,
          name: state.startChatWith,
          title: state.startChatTitle || "Professional Contact",
          avatar: state.startChatAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop",
          messages: [
            { sender: "them", text: `Hi! Let's start a conversation here.`, time: "Just now" }
          ]
        };
        setThreads((prev) => [newThread, ...prev]);
        setActiveThreadId(newThreadId);
      }
    }
  }, [location.state]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === activeThreadId) {
          return {
            ...thread,
            messages: [...thread.messages, newMessage]
          };
        }
        return thread;
      })
    );
    const sentText = input.trim();
    setInput("");

    // Simulate auto response
    setTimeout(() => {
      let replyText = `Thanks for the message! Let's follow up on this soon.`;
      if (sentText.toLowerCase().includes("hello") || sentText.toLowerCase().includes("hi")) {
        replyText = `Hello! Hope you're having a productive day. How can I help you?`;
      } else if (sentText.toLowerCase().includes("avail") || sentText.toLowerCase().includes("schedule") || sentText.toLowerCase().includes("meeting")) {
        replyText = `Sure! I am free on Tuesday afternoon or Thursday morning. Does any of those slots work for a brief call?`;
      } else if (sentText.toLowerCase().includes("price") || sentText.toLowerCase().includes("rate") || sentText.toLowerCase().includes("cost")) {
        replyText = `Our pricing is flexible depending on scope. Let's schedule a Zoom call to discuss details!`;
      }

      const botMessage = {
        sender: "them",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setThreads((prevThreads) =>
        prevThreads.map((thread) => {
          if (thread.id === activeThreadId) {
            return {
              ...thread,
              messages: [...thread.messages, botMessage]
            };
          }
          return thread;
        })
      );
      toast.info(`New message from ${activeThread.name}`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
        {/* Thread Sidebar */}
        <div className="w-80 border-r border-border flex flex-col flex-shrink-0 bg-card">
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare size={20} className="text-primary" /> Messages
            </h1>
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search chat..." className="input-field pl-11 py-1.5 text-xs" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {threads.map((thread) => {
              const lastMessage = thread.messages[thread.messages.length - 1];
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={cn(
                    "w-full text-left p-4 flex gap-3 hover:bg-muted/40 transition-colors",
                    activeThreadId === thread.id && "bg-primary/5 border-l-4 border-primary"
                  )}
                >
                  <img src={thread.avatar} alt={thread.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-semibold text-sm text-foreground truncate flex items-center gap-1">
                        {thread.name}
                        <ShieldCheck size={12} className="text-primary flex-shrink-0" />
                      </h3>
                      <span className="text-[10px] text-muted-foreground">{lastMessage?.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{thread.title}</p>
                    <p className="text-xs text-foreground/80 truncate mt-1">{lastMessage?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col justify-between bg-muted/20">
          {/* Active Contact Header */}
          <div className="h-14 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeThread.avatar} alt={activeThread.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-1">
                  {activeThread.name}
                  <ShieldCheck size={13} className="text-primary" />
                </h2>
                <p className="text-[10px] text-muted-foreground leading-none">{activeThread.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toast.success("Voice call starting...")} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Phone size={16} />
              </button>
              <button onClick={() => toast.success("Video call starting...")} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Video size={16} />
              </button>
              <button onClick={() => toast.info(`${activeThread.name} is verified on TruNet.`)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Info size={16} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {activeThread.messages.map((msg, index) => {
              const isMe = msg.sender === "me";
              return (
                <div key={index} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-md rounded-2xl px-4 py-2.5 text-sm", isMe ? "bg-primary text-white rounded-br-none" : "bg-card border border-border text-foreground rounded-bl-none")}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className={cn("block text-[9px] mt-1 text-right", isMe ? "text-white/60" : "text-muted-foreground")}>{msg.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <div className="p-4 bg-card border-t border-border">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${activeThread.name}...`}
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary p-3 rounded-xl flex items-center justify-center">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
