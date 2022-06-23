import db from "../config/db.js";

async function countRePost(postId) {
  return db.query(`
    SELECT COUNT("postId")
    FROM "rePosts"
    WHERE "postId" = $1
  `, [postId]);
}

async function insertRePost(postId,userId) {
  return db.query(`
    INSERT INTO "rePosts" ("postId", "userId")
    VALUES ($1,$2)
  `, [postId, userId]);
}


export const rePostRepository = {
  countRePost,
  insertRePost
}