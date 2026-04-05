import { API_DELAY_MS, API_FAILURE_RATE } from "./constants";
import { MoveTaskPayload } from "@/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldFail(): boolean {
  return Math.random() < API_FAILURE_RATE;
}

export async function moveTaskAPI(
  payload: MoveTaskPayload
): Promise<{ success: boolean; payload: MoveTaskPayload }> {
  await delay(API_DELAY_MS);

  if (shouldFail()) {
    throw new Error(
      `Server error: Failed to move task "${payload.taskId}" from ${payload.fromColumn} to ${payload.toColumn}`
    );
  }

  return { success: true, payload };
}

export async function createTaskAPI(task: {
  title: string;
  description: string;
  priority: string;
  assignee: string;
  tags: string[];
}): Promise<{ success: boolean }> {
  await delay(API_DELAY_MS);

  if (shouldFail()) {
    throw new Error("Server error: Failed to create task");
  }

  return { success: true };
}

export async function deleteTaskAPI(
  taskId: string
): Promise<{ success: boolean }> {
  await delay(API_DELAY_MS);

  if (shouldFail()) {
    throw new Error(`Server error: Failed to delete task "${taskId}"`);
  }

  return { success: true };
}
