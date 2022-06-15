import db from "../config/db.js"

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
  return db.query(
    `SELECT 
      *
    FROM 
      posts
    ORDER BY id DESC
    LIMIT 20`
  )
};

export const timelineRepository = {
  insertPost,
  searchHashtags,
  insertHashtag,
  relatePostHashtag,
  searchOnePost,
  searchAllPosts
};