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

export const postRepository = {
  insertPost
};