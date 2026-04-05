"use client";

import { useBoardStore } from "@/store/board-store";
import { useEffect, useState } from "react";

export default function ToastContainer() {
  const toasts = useBoardStore((s) => s.toasts);
  const removeToast = useBoardStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} id={toast.id} message={toast.message} type={toast.type} onDismiss={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ id, message, type, onDismiss }: { id: string; message: string; type: "success" | "error" | "info"; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss(id), 250);
  };

  const config = {
    success: { icon: "✓", accent: "#22C55E", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.15)" },
    error: { icon: "✕", accent: "#EF4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.15)" },
    info: { icon: "ℹ", accent: "#3B82F6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.15)" },
  }[type];

  return (
    <div
      className="pointer-events-auto flex items-center gap-2.5 rounded-lg px-4 py-3 backdrop-blur-xl transition-all duration-300"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        transform: visible ? "translateX(0)" : "translateX(110%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white" style={{ background: config.accent }}>
        {config.icon}
      </span>
      <span className="text-[13px] font-medium" style={{ color: config.accent }}>{message}</span>
      <button onClick={handleDismiss} className="ml-1.5 shrink-0 text-[10px] opacity-50 hover:opacity-100 transition-opacity" style={{ color: config.accent }}>
        ✕
      </button>
    </div>
  );
}
