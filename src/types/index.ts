export type ColumnId = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  columnId: ColumnId;
  createdAt: string;
  tags: string[];
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
  icon: string;
}

export interface MoveTaskPayload {
  taskId: string;
  fromColumn: ColumnId;
  toColumn: ColumnId;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
