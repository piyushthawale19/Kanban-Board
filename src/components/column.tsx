"use client";

import { Column as ColumnType, Task } from "@/types";
import TaskCard from "./task-card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  pendingIds: Set<string>;
}

const columnBg: Record<string, string> = {
  todo: "bg-slate-500/10",
  "in-progress": "bg-blue-500/10",
  done: "bg-green-500/10",
};

const dotColor: Record<string, string> = {
  todo: "bg-slate-400",
  "in-progress": "bg-accent",
  done: "bg-ok",
};

export default function Column({ column, tasks, pendingIds }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", columnId: column.id },
  });

  return (
    <div className="flex w-full min-w-[320px] max-w-[380px] flex-col" id={`column-${column.id}`}>
      <div className="flex items-center gap-2.5 px-1 pb-3">
        <span className={`h-2 w-2 rounded-full ${dotColor[column.id] || "bg-t3"}`} />
        <h2 className="text-[13px] font-medium text-t2 tracking-wide uppercase">
          {column.title}
        </h2>
        <span className="ml-auto text-xs text-t3 font-medium tabular-nums">{tasks.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-2 rounded-xl p-2.5 transition-all duration-200 min-h-[200px] ${
          isOver ? "bg-accent/5 ring-1 ring-accent/20" : columnBg[column.id] || "bg-srf/50"
        }`}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} isPending={pendingIds.has(task.id)} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center py-16">
            <p className="text-xs text-t3">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
