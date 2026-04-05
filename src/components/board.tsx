"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { useBoardStore } from "@/store/board-store";
import { COLUMNS } from "@/lib/constants";
import { Task, ColumnId } from "@/types";
import Column from "./column";
import TaskCard from "./task-card";

export default function Board() {
  const tasks = useBoardStore((s) => s.tasks);
  const moveTask = useBoardStore((s) => s.moveTask);
  const pendingMoves = useBoardStore((s) => s.pendingMoves);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = tasks.find((t) => t.id === event.active.id);
      if (task) setActiveTask(task);
    },
    [tasks]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);
      const { active, over } = event;
      if (!over) return;

      const taskId = active.id as string;
      let targetColumn: ColumnId | null = null;

      if (over.data.current?.type === "column") {
        targetColumn = over.data.current.columnId;
      } else if (over.data.current?.type === "task") {
        const overTask = tasks.find((t) => t.id === over.id);
        if (overTask) targetColumn = overTask.columnId;
      }

      if (targetColumn) {
        moveTask(taskId, targetColumn);
      }
    },
    [tasks, moveTask]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto px-2 pb-4">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter((t) => t.columnId === col.id);
          return (
            <Column
              key={col.id}
              column={col}
              tasks={columnTasks}
              pendingIds={pendingMoves}
            />
          );
        })}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask && (
          <div className="rotate-[3deg] scale-105 opacity-90">
            <TaskCard task={activeTask} isPending={false} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
