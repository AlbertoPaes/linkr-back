import db from "../config/db.js";

async function editPost(usersId, description, id) {
    return db.query(
        `UPDATE posts
        SET description = $1
        WHERE "userId" = $2 AND id = $3`, [description, usersId, id]
    );
};

async function getPostByPostId(id) {
    const post = db.query(
        `SELECT * FROM posts
        WHERE id = $1;`, [id]
    );
    return post;
}

async function deletePost(userId, id) {
    db.query(
        `DELETE FROM comments
        WHERE "postId" = $1`, [id]);
    db.query(
        `DELETE FROM "postLike"
            WHERE "postId" = $1`, [id]);
    db.query(
        `DELETE FROM "postHashtag"
        WHERE "postId" = $1`, [id]);
    db.query(
        `DELETE FROM posts
        WHERE "userId" = $1 AND id = $2`
        , [userId, id]);
}

export const postsRepository = {
    editPost,
    deletePost,
    getPostByPostId
};