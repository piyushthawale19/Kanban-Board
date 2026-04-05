"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading, error, login, register, clearError, hydrate } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  if (user) return <>{children}</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
  };

  const switchMode = () => {
    clearError();
    setMode(mode === "login" ? "register" : "login");
  };

  const inputClass =
    "w-full rounded-lg border border-bdr bg-bg px-3.5 py-2.5 text-sm text-t1 placeholder:text-t3 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-t1">FlowBoard</h1>
          <p className="mt-0.5 text-xs text-t3">
            {mode === "login" ? "Sign in to continue" : "Create your account"}
          </p>
        </div>

        <div className="rounded-xl border border-bdr bg-srf p-6">
          {error && (
            <div className="mb-3.5 rounded-lg bg-err-muted border border-err/20 px-3.5 py-2.5 text-xs text-err">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-medium text-t2 mb-1.5">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} required />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-t2 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputClass} required />
            </div>

            <div>
              <label className="block text-xs font-medium text-t2 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} required minLength={6} />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating..."}
                </span>
              ) : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={switchMode} className="text-xs text-t3 hover:text-accent transition-colors">
              {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>

          {mode === "login" && (
            <div className="mt-4 rounded-lg bg-accent/5 border border-accent/10 px-3.5 py-2.5">
              <p className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-0.5">Demo</p>
              <p className="text-xs text-t3 leading-relaxed">
                <span className="font-mono text-t2">demo@kanban.app</span>{" · "}
                <span className="font-mono text-t2">demo123</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
