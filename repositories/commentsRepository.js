import db from "../config/db.js"

async function publishComments(userId, postId, comment) {
  return db.query(
    `INSERT INTO 
      comments ("userId", "postId", comment)
    VALUES
      ($1, $2, $3)
  `, [userId, postId, comment]);
};

async function getComentsByPostId(postId) {
  return db.query(
    `SELECT 
      c.comment, c.id,
      u.name, u.image, u.id as "userId"
    FROM 
      comments c
      JOIN users u ON c."userId" = u.id   
    WHERE c."postId" = $1
    ORDER BY c.id`,
    [postId]);
};

export const commentsRepository = {
  publishComments,
  getComentsByPostId
};