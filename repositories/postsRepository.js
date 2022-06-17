import db from "../config/db.js";

async function editPost(usersId, description, id) {
    return db.query(
        `UPDATE posts
        SET description = $1
        WHERE "userId" = $2 AND id = $3`,[description, usersId, id],
    );
};

export const postsRepository = {
    editPost
};