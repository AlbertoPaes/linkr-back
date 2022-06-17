import db from "./../config/db.js";

async function getUserById(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

async function getPostsByUserId(id) {
    return db.query(`
    SELECT u.name, u.image, p.description, p.link, p."userId" FROM posts p 
    JOIN users u ON u.id = p."userId"
    WHERE "userId" = $1;`, [id])
}

async function searchUser(name) {
    return await db.query(`SELECT u.id, u.name, u.image 
    FROM users u WHERE name LIKE $1`,[`${name}%`]);
}

async function getAllPosts(id) {
    const result = db.query(
      `SELECT p.id, p.link, p.description, u.name, u.image
      FROM posts p
      JOIN users u ON p."userId" = u.id
      WHERE p."userId" = $1
      ORDER BY id DESC
      LIMIT 20`,[id]
    );
    return result;
  };

const usersRepository = {
    getUserById,
    getPostsByUserId,
    searchUser,
    getAllPosts
};

export default usersRepository;