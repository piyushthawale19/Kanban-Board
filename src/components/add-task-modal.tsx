"use client";

import { useState } from "react";
import { useBoardStore } from "@/store/board-store";
import { ColumnId, Task } from "@/types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const addTask = useBoardStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [assignee, setAssignee] = useState("");
  const [tags, setTags] = useState("");
  const [columnId, setColumnId] = useState<ColumnId>("todo");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      assignee: assignee.trim() || "Unassigned",
      columnId,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setAssignee("");
    setTags("");
    setColumnId("todo");
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-bdr bg-bg px-3.5 py-2.5 text-sm text-t1 placeholder:text-t3 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg rounded-xl border border-bdr bg-srf p-6 shadow-2xl mx-4 animate-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-t1">New Task</h2>
          <button onClick={onClose} className="rounded-md p-1 text-t3 hover:text-t1 hover:bg-bdr/30 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-t2 mb-1.5">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" className={inputClass} autoFocus required />
          </div>

          <div>
            <label className="block text-xs font-medium text-t2 mb-1.5">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add context..." rows={3} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-t2 mb-1.5">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} className={inputClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-t2 mb-1.5">Column</label>
              <select value={columnId} onChange={(e) => setColumnId(e.target.value as ColumnId)} className={inputClass}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-t2 mb-1.5">Assignee</label>
            <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Who's responsible?" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-t2 mb-1.5">
              Tags <span className="font-normal text-t3">comma separated</span>
            </label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="bug, feature, frontend" className={inputClass} />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-t2 hover:text-t1 hover:bg-bdr/30 transition-colors">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
