import db from "../config/db.js"
import urlMetadata from "url-metadata"

async function getByHashtag(hashtag, page) {
  return db.query(
    `SELECT 
      p.id, p."userId", p.link, p.description, p."createdAt",
      urp.name as "repostUserName",
      rp."userId" as "repostUserId",
      u.image, u.name
    FROM hashtags h 
      JOIN "postHashtag" ph ON ph."hashtagId" = h.id 
      JOIN "posts" p ON ph."postId" = p.id
      JOIN "users" u ON p."userId" = u.id
      LEFT JOIN "rePosts" rp ON rp."postId" = p.id
      LEFT JOIN users urp ON rp."userId" = u.id
    WHERE 
      h.name=$1 
    ORDER BY p.id DESC
    LIMIT 10
    OFFSET $2`,
    [`#${hashtag}`, page * 10]
  );
};

async function getMetadata(link) {
  return urlMetadata(link, { timeout: 1000 });
};

async function getHashtagsByQuantity() {
  return db.query(
    `SELECT 
      COUNT(ph.id) as "hashtagQuantity",
      ph."hashtagId",
      h.name
    FROM 
        "postHashtag" ph
    JOIN hashtags h ON  ph."hashtagId" = h.id
    GROUP BY ph."hashtagId", h.name
    ORDER BY "hashtagQuantity" DESC
    `
  );
};

export const hashtagsRepository = {
  getByHashtag,
  getMetadata,
  getHashtagsByQuantity
};

