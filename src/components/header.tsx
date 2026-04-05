"use client";

import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";

interface HeaderProps {
  onAddTask: () => void;
}

export default function Header({ onAddTask }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-bdr bg-srf/80 backdrop-blur-xl px-6 py-3 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-t1 tracking-tight">FlowBoard</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onAddTask}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-accent-hover transition-colors"
          id="add-task-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Task
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent hover:bg-accent/25 transition-colors"
            id="profile-btn"
          >
            {user?.name?.charAt(0) || "U"}
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-11 z-50 w-52 rounded-xl border border-bdr bg-srf shadow-2xl py-1.5 animate-in">
                <div className="px-3.5 py-2.5 border-b border-bdr">
                  <p className="text-sm font-medium text-t1">{user?.name}</p>
                  <p className="text-xs text-t3 mt-0.5">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full px-3.5 py-2 text-left text-sm text-err hover:bg-err-muted transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
