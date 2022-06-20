import db from "../config/db.js";

async function getLikesByPostId(postId){
  return db.query(`
    SELECT u.name, u.id AS "userId"
    FROM users u
    JOIN "postLike" L
    ON L."userId" = u.id
    WHERE L."postId" = $1
  `, [postId]);
}

async function checkPostExist(postId){
  return db.query(`
  SELECT *
  FROM posts
  WHERE id = $1
  `, [postId]);
}

async function checkPostLiked(userId,postId){
  return db.query(`
  SELECT *
  FROM "postLike"
  WHERE "userId" = $1 AND "postId" = $2
  `, [userId,postId]);
}

async function removeLike(userId,postId){
  return db.query(`
  DELETE 
  FROM "postLike"
  WHERE "userId" = $1 AND "postId" = $2
  `, [userId,postId]);
}

async function addLike(userId,postId){
  return db.query(`
  INSERT INTO
  "postLike" ("userId","postId")
  VALUES ($1,$2)
  `, [userId,postId]);
}

export const likeRepository = {
  getLikesByPostId,
  checkPostExist,
  checkPostLiked,
  removeLike,
  addLike
}