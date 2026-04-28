import { db } from "../db";
import { commentsTable } from "../schema";
import { eq } from "drizzle-orm";

export const getComments = async () => {
    return await db
        .select({
            id: commentsTable.id,
            content: commentsTable.content,
            postId: commentsTable.postId,
        })
        .from(commentsTable);
};

export const getCommentById = async (id: number) => {
    const result = await db
        .select()
        .from(commentsTable)
        .where(eq(commentsTable.id, id));
    return result[0] || null;
};

export const getCommentsByPostId = async (postId: number) => {
    return await db
        .select({
            id: commentsTable.id,
            content: commentsTable.content,
            postId: commentsTable.postId,
        })
        .from(commentsTable)
        .where(eq(commentsTable.postId, postId));
};

export const createComment = async (data: {
    content: string;
    postId: number;
}) => {
    const result = await db
        .insert(commentsTable)
        .values(data)
        .returning();
    return result[0];
};