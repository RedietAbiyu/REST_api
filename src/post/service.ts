import { db } from "../db";
import { postsTable, usersTable } from "../schema";
import { eq } from "drizzle-orm";

export const getPosts = async () => {
    return await db
        .select({
            id: postsTable.id,
            title: postsTable.title,
            content: postsTable.content,
            userId: postsTable.userId,
        })
        .from(postsTable);
};

export const getPostById = async (id: number) => {
    const result = await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.id, id));
    return result[0] || null;
};

export const getPostsByUserId = async (userId: number) => {
    return await db
        .select({
            id: postsTable.id,
            title: postsTable.title,
            content: postsTable.content,
            userId: postsTable.userId,
        })
        .from(postsTable)
        .where(eq(postsTable.userId, userId));
};

export const createPost = async (data: {
    title: string;
    content: string;
    userId: number;
}) => {
    const result = await db
        .insert(postsTable)
        .values(data)
        .returning();
    return result[0];
};