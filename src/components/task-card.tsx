"use client";

import { Task } from "@/types";
import { PRIORITY_CONFIG } from "@/lib/constants";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStore } from "@/store/board-store";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  isPending: boolean;
}

export default function TaskCard({ task, isPending }: TaskCardProps) {
  const deleteTask = useBoardStore((s) => s.deleteTask);
  const [showMenu, setShowMenu] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = PRIORITY_CONFIG[task.priority];
  const timeAgo = getRelativeTime(task.createdAt);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative rounded-xl border border-bdr bg-srf p-4 shadow-sm transition-all duration-200 select-none
        ${isDragging ? "opacity-30 scale-[1.02] shadow-2xl z-50" : "hover:border-bdr-light hover:shadow-md hover:-translate-y-0.5"}
        ${isPending ? "opacity-60" : ""}
      `}
      id={`task-${task.id}`}
    >
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-srf/70 backdrop-blur-[2px] z-10">
          <div className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span
            className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: priority.bg, color: priority.color }}
          >
            {priority.label}
          </span>
          {task.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-bdr/50 px-1.5 py-0.5 text-[10px] font-medium text-t3">
              {tag}
            </span>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            onPointerDown={(e) => e.stopPropagation()}
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-1 hover:bg-bdr/40 text-t3"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="3" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="8" cy="13" r="1.5" />
            </svg>
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-7 z-20 w-28 rounded-lg border border-bdr bg-srf shadow-2xl py-1 animate-in"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); setShowMenu(false); }}
                className="w-full px-3 py-1.5 text-left text-xs text-err hover:bg-err-muted transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="mt-2.5 text-[13px] font-medium text-t1 leading-snug">{task.title}</h3>
      <p className="mt-1 text-xs text-t3 leading-relaxed line-clamp-2">{task.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[9px] font-bold text-accent">
            {task.assignee.charAt(0)}
          </div>
          <span className="text-[11px] text-t3">{task.assignee}</span>
        </div>
        <span className="text-[10px] text-t3/60">{timeAgo}</span>
      </div>
    </div>
  );
}

function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
