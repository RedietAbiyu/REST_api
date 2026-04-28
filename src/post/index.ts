import { Hono } from "hono";
import {
    getPosts,
    getPostById,
    createPost,
    getPostsByUserId
} from "./service";
import { getCommentsByPostId } from "../comments/service";

const posts = new Hono();

posts.get("/", async (c) => {
    const allPosts = await getPosts();
    return c.json(allPosts);
});

posts.get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ error: "Invalid post ID" }, 400);
    }
    const post = await getPostById(id);
    if (!post) {
        return c.json({ error: "Post not found" }, 404);
    }
    return c.json(post);
});

posts.post("/", async (c) => {
    const body = await c.req.json();
    
    if (!body.title || !body.content || !body.userId) {
        return c.json({ error: "Missing required fields: title, content, userId" }, 400);
    }
    
    const newPost = await createPost({
        title: body.title,
        content: body.content,
        userId: body.userId
    });
    
    return c.json(newPost, 201);
});

posts.get("/:id/comments", async (c) => {
    const postId = Number(c.req.param("id"));
    if (isNaN(postId)) {
        return c.json({ error: "Invalid post ID" }, 400);
    }
    const comments = await getCommentsByPostId(postId);
    return c.json(comments);
});

export default posts;