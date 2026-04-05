import { Column, Task } from "@/types";

export const COLUMNS: Column[] = [
  { id: "todo", title: "To Do", color: "#6366f1", icon: "📋" },
  { id: "in-progress", title: "In Progress", color: "#f59e0b", icon: "⚡" },
  { id: "done", title: "Done", color: "#22c55e", icon: "✅" },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Fix login bug on mobile",
    description:
      "Users on iOS Safari are unable to sign in due to a cookie parsing issue. Investigate and patch the auth flow.",
    priority: "urgent",
    assignee: "Priya S.",
    columnId: "todo",
    createdAt: "2026-04-01T09:00:00Z",
    tags: ["bug", "auth"],
  },
  {
    id: "task-2",
    title: "Implement payment gateway",
    description:
      "Integrate Razorpay for subscription billing. Include webhook handling for payment confirmations.",
    priority: "high",
    assignee: "Arjun M.",
    columnId: "todo",
    createdAt: "2026-04-01T10:30:00Z",
    tags: ["feature", "payments"],
  },
  {
    id: "task-3",
    title: "Design landing page",
    description:
      "Create a conversion-optimized hero section with clear CTAs, social proof, and feature highlights.",
    priority: "medium",
    assignee: "Sneha R.",
    columnId: "todo",
    createdAt: "2026-04-02T08:00:00Z",
    tags: ["design", "marketing"],
  },
  {
    id: "task-4",
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing on PRs, staging deployments on merge to develop, and production releases on main.",
    priority: "high",
    assignee: "Karan D.",
    columnId: "in-progress",
    createdAt: "2026-03-28T14:00:00Z",
    tags: ["devops", "infra"],
  },
  {
    id: "task-5",
    title: "Write API documentation",
    description:
      "Document all REST endpoints with request/response schemas using OpenAPI 3.0. Include auth requirements and rate limits.",
    priority: "medium",
    assignee: "Priya S.",
    columnId: "in-progress",
    createdAt: "2026-03-29T11:00:00Z",
    tags: ["docs", "api"],
  },
  {
    id: "task-6",
    title: "Refactor user settings page",
    description:
      "Break the monolithic settings component into tabbed sections: Profile, Security, Notifications, Billing.",
    priority: "low",
    assignee: "Arjun M.",
    columnId: "in-progress",
    createdAt: "2026-03-30T09:00:00Z",
    tags: ["refactor", "ui"],
  },
  {
    id: "task-7",
    title: "Add email verification flow",
    description:
      "Send OTP to user email on registration. Block access until verified. Include resend logic with rate limiting.",
    priority: "medium",
    assignee: "Sneha R.",
    columnId: "done",
    createdAt: "2026-03-25T10:00:00Z",
    tags: ["feature", "auth"],
  },
  {
    id: "task-8",
    title: "Optimize database queries",
    description:
      "Profile slow queries on the dashboard endpoint. Add missing indexes and convert N+1 patterns to batch loads.",
    priority: "high",
    assignee: "Karan D.",
    columnId: "done",
    createdAt: "2026-03-26T15:00:00Z",
    tags: ["performance", "backend"],
  },
];

export const PRIORITY_CONFIG = {
  urgent: { label: "Urgent", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  high: { label: "High", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  medium: { label: "Medium", color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  low: { label: "Low", color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
} as const;

export const API_DELAY_MS = 1500;
export const API_FAILURE_RATE = 0.2;
