import 'dotenv/config';
import { Hono } from "hono";
import { serve } from "@hono/node-server";

import users from "./users";
import posts from "./post";
import comments from "./comments";

const app = new Hono();

app.get("/", (c) => {
    return c.json({ 
        message: "Hono REST API",
        status: "running",
        endpoints: ["/users", "/posts", "/comments"]
    });
});

app.route("/users", users);
app.route("/posts", posts);
app.route("/comments", comments);

const port = 3000;
console.log(`Server running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port: port
});