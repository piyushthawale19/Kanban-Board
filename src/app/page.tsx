"use client";

import { useState } from "react";
import AuthGate from "@/components/auth-gate";
import Header from "@/components/header";
import Board from "@/components/board";
import AddTaskModal from "@/components/add-task-modal";
import ToastContainer from "@/components/toast-container";

export default function Home() {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <AuthGate>
      <div className="flex flex-1 flex-col bg-bg min-h-screen">
        <Header onAddTask={() => setShowAddTask(true)} />

        <main className="flex flex-1 flex-col px-8 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-t1">Project Board</h2>
            <p className="text-sm text-t3 mt-1">
              Drag tasks between columns · Mock API with 1.5s latency & 20%
              failure rate
            </p>
          </div>

          <Board />
        </main>

        <AddTaskModal
          isOpen={showAddTask}
          onClose={() => setShowAddTask(false)}
        />
        <ToastContainer />
      </div>
    </AuthGate>
  );
}
