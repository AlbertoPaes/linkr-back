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
    ORDER BY id DESC
    LIMIT 20`
  );
  return result;
};

async function getMetada(link) {
  return urlMetadata(link);
}

export const timelineRepository = {
  insertPost,
  searchHashtags,
  insertHashtag,
  relatePostHashtag,
  searchOnePost,
  searchAllPosts,
  getMetada
};