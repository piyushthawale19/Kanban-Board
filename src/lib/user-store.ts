import bcrypt from "bcryptjs";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

// Shared in-memory user store accessible by both login and register routes
// Seeded with a demo user for testing
const users: StoredUser[] = [
  {
    id: "demo-user-001",
    name: "Demo User",
    email: "demo@kanban.app",
    passwordHash: bcrypt.hashSync("demo123", 12),
  },
];

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email === email);
}

export function addUser(user: StoredUser): void {
  users.push(user);
}
