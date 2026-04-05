import { create } from "zustand";
import { Task, ColumnId, Toast } from "@/types";
import { INITIAL_TASKS } from "@/lib/constants";
import { moveTaskAPI, createTaskAPI, deleteTaskAPI } from "@/lib/mock-api";
import { v4 as uuidv4 } from "uuid";

interface BoardState {
  tasks: Task[];
  toasts: Toast[];
  pendingMoves: Set<string>;

  moveTask: (taskId: string, toColumn: ColumnId) => void;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  deleteTask: (taskId: string) => void;
  addToast: (message: string, type: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  tasks: INITIAL_TASKS,
  toasts: [],
  pendingMoves: new Set(),

  moveTask: (taskId: string, toColumn: ColumnId) => {
    const prevTasks = [...get().tasks];
    const task = prevTasks.find((t) => t.id === taskId);
    if (!task || task.columnId === toColumn) return;

    const fromColumn = task.columnId;

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, columnId: toColumn } : t
      ),
      pendingMoves: new Set(state.pendingMoves).add(taskId),
    }));

    moveTaskAPI({ taskId, fromColumn, toColumn })
      .then(() => {
        set((state) => {
          const next = new Set(state.pendingMoves);
          next.delete(taskId);
          return { pendingMoves: next };
        });
        get().addToast("Task moved successfully", "success");
      })
      .catch(() => {
        set((state) => {
          const next = new Set(state.pendingMoves);
          next.delete(taskId);
          return {
            tasks: prevTasks,
            pendingMoves: next,
          };
        });
        get().addToast("Update failed. Reverting changes...", "error");
      });
  },

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    const prevTasks = [...get().tasks];
    set((state) => ({ tasks: [...state.tasks, newTask] }));

    createTaskAPI({
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignee: newTask.assignee,
      tags: newTask.tags,
    })
      .then(() => {
        get().addToast("Task created successfully", "success");
      })
      .catch(() => {
        set({ tasks: prevTasks });
        get().addToast("Failed to create task. Reverting...", "error");
      });
  },

  deleteTask: (taskId: string) => {
    const prevTasks = [...get().tasks];
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    }));

    deleteTaskAPI(taskId)
      .then(() => {
        get().addToast("Task deleted", "info");
      })
      .catch(() => {
        set({ tasks: prevTasks });
        get().addToast("Failed to delete task. Reverting...", "error");
      });
  },

  addToast: (message: string, type: Toast["type"]) => {
    const id = uuidv4();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
