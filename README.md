# Hono REST API

A modular REST API built with [Hono](https://hono.dev), [Drizzle ORM](https://orm.drizzle.team), and SQLite.

## Project Structure

```
src/
├── index.ts          # Main app entry point
├── schema.ts         # Database schema with relations
├── db.ts             # Database connection
├── users/
│   ├── index.ts      # User routes
│   └── service.ts    # User business logic
├── post/
│   ├── index.ts      # Post routes
│   └── service.ts    # Post business logic
└── comments/
    ├── index.ts      # Comment routes
    └── service.ts    # Comment business logic
```

## Database Relationships

- **User** → has many **Posts**
- **Post** → belongs to one **User**, has many **Comments**
- **Comment** → belongs to one **Post**

---

## Prerequisites

- [Bun](https://bun.sh) installed on your machine

---

## Setup & Run

### 1. Clone or create the project

Navigate to your project folder:

```bash
cd hono-bcpa
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
echo "DB_FILE_NAME=file:local.db" > .env
```

### 4. Push database schema

This creates the SQLite database and tables:

```bash
bun run db:push
```

You should see:
```
[✓] Pulling schema from database...
[✓] Changes applied
```

### 5. Start the development server

```bash
bun run dev
```

You should see:
```
Server running on http://localhost:3000
```

The API is now live at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create a user |
| GET | `/users/:id/posts` | Get user's posts |
| GET | `/posts` | List all posts |
| GET | `/posts/:id` | Get post by ID |
| POST | `/posts` | Create a post |
| GET | `/posts/:id/comments` | Get post's comments |
| GET | `/comments` | List all comments |
| GET | `/comments/:id` | Get comment by ID |
| POST | `/comments` | Create a comment |

---

## Testing with HTTPie

### Install HTTPie (if not already installed)

```bash
brew install httpie
```

### Test the API

#### 1. Health check

```bash
http GET localhost:3000/
```

#### 2. Create a user

```bash
http POST localhost:3000/users name="Rediet" age:=21 email="rediet@example.com" password="secret123" phone="1234567890"
```

#### 3. Create a post (use the user ID from step 2)

```bash
http POST localhost:3000/posts title="My First Post" content="This is my post content" userId:=1
```

#### 4. Create a comment (use the post ID from step 3)

```bash
http POST localhost:3000/comments content="Great post!" postId:=1
```

#### 5. Test relationships

```bash
# Get all posts by user 1
http GET localhost:3000/users/1/posts

# Get all comments on post 1
http GET localhost:3000/posts/1/comments
```

#### 6. Get all data

```bash
http GET localhost:3000/users
http GET localhost:3000/posts
http GET localhost:3000/comments
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `bun run dev` | Start development server with hot reload |
| `db:push` | `bun run db:push` | Push schema changes to database |
| `db:studio` | `bun run db:studio` | Open Drizzle Studio GUI |

---

## Tech Stack

- **Runtime**: Bun
- **Framework**: Hono
- **ORM**: Drizzle ORM
- **Database**: SQLite (LibSQL)
- **Language**: TypeScript

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Script not found "db:push"` | Run `bun install` to ensure `drizzle-kit` is installed |
| `process is not defined` | Install Node types: `bun add -d @types/node` |
| Server hangs on start | Make sure `@hono/node-server` is installed: `bun add @hono/node-server` |
| Database errors | Delete `local.db` and re-run `bun run db:push` |

