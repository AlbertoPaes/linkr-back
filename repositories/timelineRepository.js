import db from "../config/db.js"
import urlMetadata from "url-metadata"

async function insertPost(usersId, link, description) {
  return db.query(
    `INSERT INTO 
      posts ("userId", link, description)
    VALUES 
      ($1, $2, $3)`,
    [usersId, link, description]
  );
};

async function searchHashtags(name) {
  return db.query(
    `SELECT 
      *
    FROM 
      hashtags
    WHERE 
      name = $1`,
    [name]
  )
};

async function insertHashtag(name) {
  return db.query(
    `INSERT INTO 
      hashtags (name)
    VALUES 
      ($1)`,
    [name]
  );
};

async function relatePostHashtag(postId, hashtagId) {
  return db.query(
    `INSERT INTO 
      "postHashtag" ("postId", "hashtagId")
    VALUES 
      ($1, $2)`,
    [postId, hashtagId]
  );
};

async function deleteRelatePostHashtag(postId) {
  return db.query(
    `DELETE FROM "postHashtag"
    WHERE "postId"=$1`,
    [postId]
  )
}

async function searchOnePost(userId) {
  return db.query(
    `SELECT 
      *
    FROM 
      posts
    WHERE 
      "userId" = $1
      ORDER BY id`,
    [userId]
  )
};

async function searchAllPosts() {
  const result = db.query(
    `SELECT 
      p.id, p.link, p.description, u.name, u.image, p."userId"
    FROM 
      posts p
      JOIN users u ON p."userId" = u.id
    ORDER BY p.id DESC
    LIMIT 20`
  );
  return result;
};

async function getMetada(link) {
  return urlMetadata(link, { timeout: 1000 });
};

async function getFollowsByUserId(userId, page) {
  return await db.query(
    `SELECT 
      f."followId", 
      urp.name as "repostUserName",
      rp."userId" as "repostUserId",
      p.id, p."userId", u.name, p.link, p.description, 
      u.image
    FROM 
      posts p
      JOIN users u ON p."userId" = u.id
      JOIN  follows f ON  p."userId" = f."followId"
      LEFT JOIN "rePosts" rp ON rp."postId" = p.id
      LEFT JOIN users urp ON rp."userId" = u.id
    WHERE f."userId" = $1
    ORDER BY id DESC
    LIMIT 10
    OFFSET $2
    `
    , [userId, page * 10]);
};

async function getNewPosts(userId, time) {

  return await db.query(
    `SELECT 
      f."followId", 
      p.id, p.link, p.description, u.name, u.image, p."userId"
    FROM 
      posts p
      JOIN users u ON p."userId" = u.id
      LEFT JOIN  follows f ON  p."userId" = f."followId" AND p."userId" != $1
    WHERE f."userId" = $1 AND p."createdAt" > $2
    ORDER BY id DESC
    `
    , [userId, time]);
}

export const timelineRepository = {
  insertPost,
  searchHashtags,
  insertHashtag,
  relatePostHashtag,
  deleteRelatePostHashtag,
  searchOnePost,
  searchAllPosts,
  getMetada,
  getFollowsByUserId,
  getNewPosts
};