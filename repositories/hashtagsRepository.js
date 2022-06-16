import db from "../config/db.js"
import urlMetadata from "url-metadata"

async function getByHashtag(hashtag) {
  return db.query(
    `SELECT p.id, p."userId", p.link, p.description, p."createdAt"
    FROM hashtags h 
      JOIN "postHashtag" ph ON ph."hashtagId" = h.id 
      JOIN "posts" p ON ph."postId" = p.id
    WHERE 
      name=$1`,
    [`#${hashtag}`]
  );
};

async function getMetadata(link) {
  return urlMetadata(link);
};

export const hashtagsRepository = {
  getByHashtag,
  getMetadata
};
