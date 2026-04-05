# FlowBoard

A production-grade, highly responsive Kanban board demonstrating optimistic UI updates, robust state management, and real-world system resilience.

## Features

- **True Optimistic UI**: Instant, unblocked UI updates that rollback gracefully on API failure.
- **Resilient Drag & Drop**: Smooth dragging with `dnd-kit`, handling 1.5s API delays and 20% simulated failure rates.
- **Secure Authentication**: JWT-based auth with bcrypt-hashed passwords.
- **State Management**: Centralized using Zustand for both board layout and auth sessions.
- **Modern Stack**: Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript.

## Folder Structure

```
kanban-board/
├── src/
│   ├── app/                 # Next.js App Router endpoints and pages
│   │   ├── api/             # RESTful API routes (auth, tasks)
│   │   ├── globals.css      # Core styles and Tailwind entry
│   │   ├── layout.tsx       # Root document layout
│   │   └── page.tsx         # Main application container
│   ├── components/          # React components
│   │   ├── add-task-modal.tsx  # Task creation form
│   │   ├── auth-gate.tsx       # Auth protection and login UI
│   │   ├── board.tsx           # Drag & Drop context orchestrator
│   │   ├── column.tsx          # Board column droppable zones
│   │   ├── header.tsx          # App header with user profile menu
│   │   ├── task-card.tsx       # Draggable task item
│   │   └── toast-container.tsx # Notification system
│   ├── lib/                 # Utilities and constants
│   │   ├── auth.ts             # Auth constants
│   │   ├── constants.ts        # Seed data, column config
│   │   └── mock-api.ts         # Delay/failure simulation wrapper
│   ├── store/               # Global state
│   │   ├── auth-store.ts       # Auth state management
│   │   └── board-store.ts      # Task and UI optimistic state
│   └── types/               # Shared TypeScript interfaces
│       └── index.ts
├── .env.example             # Template for variables
└── package.json             # Dependencies
```

## Setup & Running Locally

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd kanban-board
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file based on the example:
   ```bash
   cp .env.example .env.local
   ```
   *Modify `JWT_SECRET` for secure local testing.*

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

## Demo Account

You can log in directly using the seeded demo credentials:
- **Email:** `demo@kanban.app`
- **Password:** `demo123`

*(You can also register a new account on the auth screen).*

## Deployment (Vercel)

1. Ensure the code is pushed to a GitHub repository.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Expand **Environment Variables** and add:
   - `JWT_SECRET` (Use a strong unique string here).
5. Click **Deploy**. Vercel will automatically detect the Next.js setup.

## Technical Decisions & Refinements

- **Why Zustand?** Lighter and less boilerplate than Redux, providing highly predictable snap-shotting for the optimistic updates.
- **Rollback Approach**: Before dispatching the task movement to the server, a pristine snapshot of the columns is kept in state. If the API hits the ~20% simulated failure threshold, the UI elegantly snaps back to this state and a toast warns the user.
- **Durable Styling**: Minimal, robust class names driven by utility tokens. We enforce Tailwind to avoid overly deep CSS hierarchies while leveraging native CSS variables for theme primitives.
