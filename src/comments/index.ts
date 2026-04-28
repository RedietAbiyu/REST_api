import { Hono } from "hono";
import {
    getComments,
    getCommentById,
    createComment,
    getCommentsByPostId
} from "./service";

const comments = new Hono();

comments.get("/", async (c) => {
    const allComments = await getComments();
    return c.json(allComments);
});

comments.get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ error: "Invalid comment ID" }, 400);
    }
    const comment = await getCommentById(id);
    if (!comment) {
        return c.json({ error: "Comment not found" }, 404);
    }
    return c.json(comment);
});

comments.post("/", async (c) => {
    const body = await c.req.json();
    
    if (!body.content || !body.postId) {
        return c.json({ error: "Missing required fields: content, postId" }, 400);
    }
    
    const newComment = await createComment({
        content: body.content,
        postId: body.postId
    });
    
    return c.json(newComment, 201);
});

export default comments;