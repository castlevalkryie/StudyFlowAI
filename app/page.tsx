"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Bot,
  BarChart2,
  RefreshCw,
  Settings,
  Bell,
  Search,
  Zap,
  Flame,
  Trophy,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Star,
  Target,
  TrendingUp,
  Send,
  Plus,
  Menu,
  X,
  GraduationCap,
  Users,
  Brain,
  Sparkles,
} from "lucide-react";
import { clsx } from "clsx";

/* ─── helpers ─── */
function cn(...args: (string | boolean | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

/* ─── types ─── */
type Role = "student" | "teacher";
type Page =
  | "dashboard"
  | "assignments"
  | "calendar"
  | "coach"
  | "analytics"
  | "reviews"
  | "students"
  | "grading";

/* ─── nav config ─── */
const studentNav = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "assignments", icon: BookOpen, label: "Assignments", badge: 5 },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "reviews", icon: RefreshCw, label: "Reviews", badge: 3 },
  { id: "coach", icon: Bot, label: "AI Coach" },
  { id: "analytics", icon: BarChart2, label: "Analytics" },
] as const;

const teacherNav = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "students", icon: Users, label: "Students", badge: 2 },
  { id: "grading", icon: CheckCircle2, label: "Grading", badge: 14 },
  { id: "calendar", icon: Calendar, label: "Planner" },
  { id: "analytics", icon: BarChart2, label: "Analytics" },
  { id: "coach", icon: Brain, label: "AI Tools" },
] as const;

/* ─── small reusable pieces ─── */
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "purple",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color?: "purple" | "green" | "amber" | "blue";
}) {
  const iconBg = {
    purple: "bg-brand-50 text-brand-500",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
  }[color];

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
        </div>
        <TrendingUp className="w-4 h-4 text-emerald-400" />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-[11px] text-emerald-600 font-medium mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1"
          >
            {action.label}
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── STUDENT DASHBOARD ─── */
function StudentDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [xp] = useState(1840);
  const [streak] = useState(7);
  const xpToNext = 3500;
  const xpMin = 1500;
  const pct = Math.round(((xp - xpMin) / (xpToNext - xpMin)) * 100);

  const assignments = [
    { title: "Chapter 7 Problem Set", subject: "Algebra II", due: "Tomorrow", color: "#6c63f6", emoji: "📐", priority: "high" },
    { title: "AP Bio Midterm Prep", subject: "AP Biology", due: "In 5 days", color: "#10b981", emoji: "🧬", priority: "critical" },
    { title: "Titration Lab Report", subject: "Chemistry", due: "In 4 days", color: "#14b8a6", emoji: "⚗️", priority: "high" },
    { title: "WWI Essay Draft", subject: "U.S. History", due: "In 8 days", color: "#f59e0b", emoji: "📜", priority: "medium" },
  ];

  const sessions = [
    { title: "Study: Algebra II", time: "4:00 PM", duration: "90 min", color: "#6c63f6", done: false },
    { title: "Practice: AP Bio", time: "6:00 PM", duration: "60 min", color: "#10b981", done: false },
    { title: "Essay: WWI Draft", time: "7:30 PM", duration: "45 min", color: "#f59e0b", done: true },
  ];

  const reviews = [
    { topic: "Quadratic Formula", subject: "Algebra II", color: "#6c63f6" },
    { topic: "Mitosis vs Meiosis", subject: "AP Biology", color: "#10b981" },
    { topic: "Acid-Base Reactions", subject: "Chemistry", color: "#14b8a6" },
  ];

  const priorityStyle: Record<string, string> = {
    critical: "badge badge-red",
    high: "badge badge-amber",
    medium: "badge badge-blue",
    low: "badge badge-gray",
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Good afternoon, Alex! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            3 sessions today &middot; 3 reviews due &middot;{" "}
            <span className="text-brand-500 font-medium">7-day streak 🔥</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-2.5">
          <Flame className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-sm font-bold text-amber-700">{streak} day streak</p>
            <p className="text-[10px] text-amber-500">Keep it up!</p>
          </div>
        </div>
      </div>

      {/* XP / level bar */}
      <div className="card px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">
              Level 3 &mdash; Scholar
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {xp.toLocaleString()} / {xpToNext.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5">
          {(xpToNext - xp).toLocaleString()} XP to Level 4 &mdash; Academic Warrior
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={CheckCircle2} label="Sessions done" value={42} sub="↑ +6 this week" color="purple" />
        <StatCard icon={Clock} label="Hours studied" value="38.5h" sub="Total" color="blue" />
        <StatCard icon={Target} label="Completion" value="87%" sub="↑ All time" color="green" />
        <StatCard icon={AlertCircle} label="Pending" value={5} sub="assignments" color="amber" />
      </div>

      {/* Main 2-col grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Today's plan */}
        <div className="lg:col-span-2">
          <SectionCard
            title="Today's study plan"
            action={{ label: "View calendar", onClick: () => setPage("calendar") }}
          >
            <div className="divide-y divide-gray-50">
              {sessions.map((s, i) => (
                <div key={i} className={cn("flex items-center gap-3 py-3", s.done && "opacity-50")}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: s.color + "18" }}
                  >
                    📚
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium text-gray-800 truncate", s.done && "line-through")}>
                      {s.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {s.time} &middot; {s.duration}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer select-none transition-colors",
                      s.done
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-brand-50 text-brand-600 hover:bg-brand-100"
                    )}
                  >
                    {s.done ? "✓ Done" : "Start"}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Deadlines */}
          <SectionCard
            title="Upcoming deadlines"
            action={{ label: "All", onClick: () => setPage("assignments") }}
          >
            <div className="space-y-3">
              {assignments.slice(0, 3).map((a, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-base">{a.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{a.title}</p>
                    <p className="text-[11px] text-red-500 font-medium">{a.due}</p>
                  </div>
                  <span className={priorityStyle[a.priority]}>{a.priority}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Reviews due */}
          <div className="card p-5 border-brand-100 bg-brand-50/30">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-brand-500" />
              <h3 className="font-semibold text-sm text-gray-800">
                {reviews.length} reviews due today
              </h3>
            </div>
            <div className="space-y-2">
              {reviews.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
                  <span className="text-sm text-gray-700 truncate">{r.topic}</span>
                  <span className="text-xs text-gray-400 ml-auto flex-shrink-0">{r.subject}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPage("reviews")}
              className="btn-primary w-full justify-center mt-4 text-sm py-2"
            >
              Start reviews
            </button>
          </div>
        </div>
      </div>

      {/* Assignments full list */}
      <SectionCard
        title="All assignments"
        action={{ label: "Add new", onClick: () => setPage("assignments") }}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {assignments.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-brand-100 hover:bg-brand-50/20 transition-all cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: a.color + "18" }}
              >
                {a.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
                <p className="text-xs mt-0.5" style={{ color: a.color }}>
                  {a.subject}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{a.due}</p>
              </div>
              <span className={priorityStyle[a.priority]}>{a.priority}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ─── TEACHER DASHBOARD ─── */
function TeacherDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const stats = [
    { icon: Users, label: "Total students", value: 87, sub: "Across 3 classes", color: "purple" as const },
    { icon: CheckCircle2, label: "Grading queue", value: 14, sub: "Need review", color: "amber" as const },
    { icon: TrendingUp, label: "Class avg", value: "82%", sub: "↑ +3% this week", color: "green" as const },
    { icon: AlertCircle, label: "At-risk", value: 3, sub: "Students flagged", color: "blue" as const },
  ];

  const gradeQueue = [
    { name: "Marcus Torres", assignment: "Argumentative Essay", aiScore: 78, confidence: 87, subject: "#6c63f6" },
    { name: "Ana Kim", assignment: "Argumentative Essay", aiScore: 91, confidence: 92, subject: "#10b981" },
    { name: "Jin Lee", assignment: "Argumentative Essay", aiScore: 64, confidence: 61, subject: "#f59e0b" },
  ];

  const atRisk = [
    { name: "Jin Lee", reason: "6 absences · grade –15pts", level: "high" },
    { name: "Marcus Torres", reason: "IEP review due Jun 14", level: "medium" },
    { name: "Priya Patel", reason: "Missing 2 assignments", level: "medium" },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Good morning, Ms. Rivera! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            14 grades need review &middot; 2 lessons today &middot; 3 at-risk students
          </p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Quick Grade Upload
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Grade queue */}
        <div className="lg:col-span-2">
          <SectionCard
            title="AI grade queue"
            action={{ label: "Review all", onClick: () => setPage("grading") }}
          >
            <div className="space-y-1">
              {gradeQueue.map((g, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: g.subject }}
                  >
                    {g.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{g.name}</p>
                    <p className="text-xs text-gray-400">{g.assignment}</p>
                  </div>
                  <div className="text-right mr-2">
                    <p className="text-sm font-bold text-gray-800">
                      {g.aiScore}
                      <span className="text-xs text-gray-400 font-normal">/100</span>
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-medium",
                        g.confidence >= 80 ? "text-emerald-600" : "text-amber-600"
                      )}
                    >
                      {g.confidence}% conf.
                    </p>
                  </div>
                  <button className="badge badge-purple cursor-pointer hover:bg-brand-100 transition-colors text-xs px-3 py-1.5">
                    Review
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 text-center">
              <p className="text-xs text-gray-400">+11 more students in queue</p>
            </div>
          </SectionCard>
        </div>

        {/* At-risk */}
        <div>
          <SectionCard
            title="Early warnings"
            action={{ label: "Analytics", onClick: () => setPage("analytics") }}
          >
            <div className="space-y-3">
              {atRisk.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                      s.level === "high" ? "bg-red-500" : "bg-amber-500"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.reason}</p>
                  </div>
                  <span
                    className={cn(
                      "badge flex-shrink-0",
                      s.level === "high" ? "badge-red" : "badge-amber"
                    )}
                  >
                    {s.level}
                  </span>
                </div>
              ))}
            </div>

            {/* AI insight */}
            <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100">
              <p className="text-[11px] font-semibold text-brand-600 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI insight
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Attendance dips correlate with Thursday quizzes for 4 students.{" "}
                <span className="text-brand-500 cursor-pointer hover:underline">
                  See research ›
                </span>
              </p>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Upcoming */}
      <SectionCard title="This week">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { date: "Jun 13", label: "Research Paper Draft due", type: "deadline", color: "badge-red" },
            { date: "Jun 14", label: "IEP Review: Marcus Torres", type: "iep", color: "badge-amber" },
            { date: "Jun 15", label: "Parent-Teacher Conference · 3 PM", type: "event", color: "badge-blue" },
          ].map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-brand-100 transition-colors"
            >
              <div className="text-xs text-gray-400 font-medium w-12 flex-shrink-0">
                {e.date}
              </div>
              <p className="text-sm text-gray-700 flex-1">{e.label}</p>
              <span className={cn("badge flex-shrink-0", e.color)}>{e.type}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ─── AI COACH ─── */
function CoachPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant" as const,
      text: "Hi! I'm your StudyFlow Coach. I've checked your schedule — your **AP Bio Midterm** is in 5 days and your confidence is 3/10. Want me to build a prep plan?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "What should I study next?",
    "Give me a study strategy",
    "I need motivation",
    "How does spaced repetition work?",
  ];

  const responses: Record<string, string> = {
    default:
      "Based on your upcoming deadlines and confidence ratings, I'd prioritize **AP Bio** first — 2 focused hours today using active recall will make a real difference. Your Algebra quiz is also 3 days out, so a 30-minute review tomorrow would help.\n\nWant me to auto-generate a schedule for the week?",
    strategy:
      "Here's a research-backed technique: **Active Recall**.\n\nInstead of re-reading notes, close them and write down everything you remember. Where you get stuck is exactly what needs more work.\n\nThis is 2× more effective than passive review and takes the same time.",
    motivation:
      "You've got this! 💪 You already have a **7-day streak** and 42 sessions completed.\n\nRemember: every expert started as a beginner. Set a timer for just 10 minutes and start your hardest task. Once you begin, momentum takes over.",
    spaced:
      "Spaced repetition works by reviewing material at increasing intervals:\n\n**1 day → 3 days → 7 days → 14 days → 30 days**\n\nEach time you recall something successfully, the next review interval grows. If you struggle, it resets. Your Reviews section does this automatically using the SM-2 algorithm.",
  };

  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      const reply =
        lower.includes("strateg") || lower.includes("technique")
          ? responses.strategy
          : lower.includes("motivat") || lower.includes("overwhelm")
          ? responses.motivation
          : lower.includes("spaced") || lower.includes("repetition")
          ? responses.spaced
          : responses.default;
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setLoading(false);
    }, 800);
  };

  function renderText(text: string) {
    return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="mb-4">
        <h1 className="font-display text-2xl font-bold text-gray-900">AI Coach</h1>
        <p className="text-gray-500 text-sm mt-1">Your personalized study coach</p>
      </div>

      <div className="card flex flex-col" style={{ height: 560 }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">StudyFlow Coach</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse-soft" />
              Online · Personalized advice
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => { setInput(p); }}
                  className="text-left text-xs p-3 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 text-gray-500 hover:text-brand-600 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex animate-slide-up",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-brand-500" />
                </div>
              )}
              <div className={m.role === "assistant" ? "bubble-ai" : "bubble-user"}>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {renderText(m.text)}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-brand-500" />
              </div>
              <div className="bubble-ai flex items-center gap-1 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse-soft"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick prompts (after first message) */}
        {messages.length > 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {quickPrompts.slice(0, 2).map((p) => (
              <button
                key={p}
                onClick={() => setInput(p)}
                className="text-xs px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 hover:border-brand-200 hover:text-brand-500 transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-5 pb-5">
          <div className="flex gap-2">
            <input
              className="input text-sm"
              placeholder="Ask your coach anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="btn-primary px-3 py-2 flex-shrink-0"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ASSIGNMENTS ─── */
function AssignmentsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [items, setItems] = useState([
    { id: 1, title: "Chapter 7 Problem Set", subject: "Algebra II", type: "homework", due: "Tomorrow", priority: "high", status: "pending", emoji: "📐", color: "#6c63f6" },
    { id: 2, title: "AP Bio Midterm Exam", subject: "AP Biology", type: "test", due: "In 5 days", priority: "critical", status: "pending", emoji: "📋", color: "#10b981" },
    { id: 3, title: "Titration Lab Report", subject: "Chemistry", type: "homework", due: "In 4 days", priority: "high", status: "pending", emoji: "⚗️", color: "#14b8a6" },
    { id: 4, title: "WWI Essay Draft", subject: "U.S. History", type: "essay", due: "In 8 days", priority: "medium", status: "pending", emoji: "📜", color: "#f59e0b" },
    { id: 5, title: "Cell Division Worksheet", subject: "AP Biology", type: "homework", due: "Done", priority: "medium", status: "completed", emoji: "🔬", color: "#10b981" },
  ]);

  const visible = items.filter((i) =>
    filter === "all" ? true : i.status === filter
  );

  const priorityStyle: Record<string, string> = {
    critical: "badge badge-red",
    high: "badge badge-amber",
    medium: "badge badge-blue",
    low: "badge badge-gray",
  };

  const typeStyle: Record<string, string> = {
    homework: "badge badge-purple",
    test: "badge bg-purple-100 text-purple-700",
    quiz: "badge badge-blue",
    essay: "badge bg-pink-50 text-pink-700",
    project: "badge badge-green",
  };

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500 text-sm mt-1">{items.filter((i) => i.status === "pending").length} pending</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add assignment
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "pending", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all",
              filter === f
                ? "bg-brand-500 text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:border-brand-200 hover:text-brand-500"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {visible.map((a) => (
          <div key={a.id} className="card p-4 hover:border-brand-100 transition-all">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: a.color + "18" }}
              >
                {a.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p
                    className={cn(
                      "font-semibold text-gray-800",
                      a.status === "completed" && "line-through text-gray-400"
                    )}
                  >
                    {a.title}
                  </p>
                  <span className={priorityStyle[a.priority]}>{a.priority}</span>
                  <span className={typeStyle[a.type]}>{a.type}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span style={{ color: a.color }}>{a.subject}</span>
                  <span
                    className={cn(
                      "font-medium",
                      a.due.includes("Tomorrow") || a.due.includes("days") ? "text-red-500" : "text-gray-400"
                    )}
                  >
                    {a.due}
                  </span>
                </div>
              </div>
              {a.status !== "completed" && (
                <button
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((i) => (i.id === a.id ? { ...i, status: "completed", due: "Done" } : i))
                    )
                  }
                  className="flex-shrink-0 p-2 rounded-xl hover:bg-emerald-50 text-gray-300 hover:text-emerald-500 transition-all"
                  aria-label="Mark complete"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PLACEHOLDER ─── */
function Placeholder({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">{title}</h1>
      <p className="text-gray-500 text-sm mb-8">{description}</p>
      <div className="card p-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-brand-400" />
        </div>
        <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Coming soon</h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          This section is being built. Add your backend and features here.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Supabase DB", "Auth", "API Routes", "AI Integration"].map((t) => (
            <span key={t} className="badge badge-purple text-xs px-3 py-1.5">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT APP ─── */
export default function Home() {
  const [role, setRole] = useState<Role>("student");
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = role === "student" ? studentNav : teacherNav;

  const pageTitle: Record<Page, string> = {
    dashboard: "Dashboard",
    assignments: "Assignments",
    calendar: "Calendar",
    coach: role === "student" ? "AI Coach" : "AI Tools",
    analytics: "Analytics",
    reviews: "Reviews",
    students: "Students",
    grading: "Grading",
  };

  function renderPage() {
    if (page === "dashboard") {
      return role === "student"
        ? <StudentDashboard setPage={setPage} />
        : <TeacherDashboard setPage={setPage} />;
    }
    if (page === "coach") return <CoachPage />;
    if (page === "assignments") return <AssignmentsPage />;
    if (page === "calendar")
      return <Placeholder title="Calendar" description="Day, week, and month views with drag-and-drop scheduling." icon={Calendar} />;
    if (page === "reviews")
      return <Placeholder title="Spaced Reviews" description="SM-2 algorithm review cards — due today." icon={RefreshCw} />;
    if (page === "analytics")
      return <Placeholder title="Analytics" description="Charts: hours studied, completion rate, subject breakdown." icon={BarChart2} />;
    if (page === "students")
      return <Placeholder title="Students" description="Class roster, IEP tracking, attendance." icon={Users} />;
    if (page === "grading")
      return <Placeholder title="Grading" description="AI-assisted grading with rubric breakdown and teacher review." icon={CheckCircle2} />;
    return null;
  }

  const SidebarInner = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-display text-[15px] font-bold">
          StudyFlow <span className="text-brand-500">AI</span>
        </span>
      </div>

      {/* Role switcher */}
      <div className="px-3 py-3">
        <p className="section-eyebrow px-2">Role</p>
        <div className="flex bg-surface-tertiary rounded-xl p-1 gap-1">
          {(["student", "teacher"] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setPage("dashboard"); setSidebarOpen(false); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium capitalize transition-all",
                role === r
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {r === "student" ? <GraduationCap className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-1" aria-label="Main navigation">
        <p className="section-eyebrow px-3 mt-1">Menu</p>
        {nav.map(({ id, icon: Icon, label, badge }) => (
          <div
            key={id}
            onClick={() => { setPage(id as Page); setSidebarOpen(false); }}
            className={cn("nav-link", page === id ? "nav-link-active" : "nav-link-inactive")}
            role="button"
            tabIndex={0}
            aria-current={page === id ? "page" : undefined}
            onKeyDown={(e) => e.key === "Enter" && setPage(id as Page)}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {badge != null && (
              <span
                className={cn(
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                  page === id ? "bg-brand-100 text-brand-600" : "bg-red-100 text-red-600"
                )}
              >
                {badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-2 border-t border-gray-100">
        <div className="nav-link nav-link-inactive" role="button" tabIndex={0}>
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
        {/* User */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1">
          <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            {role === "student" ? "AR" : "MR"}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-gray-800 truncate">
              {role === "student" ? "Alex Rivera" : "Ms. Rivera"}
            </p>
            <p className="text-[10px] text-gray-400 truncate capitalize">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-surface-secondary">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[232px] flex-col bg-white border-r border-gray-100 flex-shrink-0">
        <SidebarInner />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-10 w-[232px] h-full bg-white border-r border-gray-100 animate-slide-up">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 text-gray-400"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarInner />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-3 px-4 flex-shrink-0">
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h2 className="font-display font-bold text-gray-900 flex-1 text-[15px]">
            {pageTitle[page]}
          </h2>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-surface-tertiary border border-gray-200 rounded-xl px-3 h-9 w-52">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-gray-400 min-w-0"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* XP chip */}
            <div className="hidden sm:flex items-center gap-1.5 bg-brand-50 border border-brand-100 rounded-xl px-3 py-1.5">
              <Trophy className="w-3.5 h-3.5 text-brand-500" />
              <span className="text-xs font-semibold text-brand-600">1,840 XP</span>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600">7d streak</span>
            </div>

            {/* Notifications */}
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
