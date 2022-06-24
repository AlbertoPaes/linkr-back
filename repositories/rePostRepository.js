import db from "../config/db.js";

async function countRePost(postId) {
  return db.query(`
    SELECT COUNT("postId")
    FROM "rePosts"
    WHERE "postId" = $1
  `, [postId]);
}

async function insertRePost(postId, rePostUser, userId, link, description) {
  db.query(`
    INSERT INTO "rePosts" ("postId", "userId")
    VALUES ($1,$2)
  `, [postId, rePostUser])

  db.query(`
    INSERT INTO "posts" ("rePostUser", "userId", link, description)
    VALUES ($1,$2,$3,$4)
  `, [rePostUser, userId, link, description]);
}


export const rePostRepository = {
  countRePost,
  insertRePost
}