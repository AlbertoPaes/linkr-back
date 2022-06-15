import db from "./../config/db.js";

async function getUserById(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

async function getPostsByUserid(id) {
    return db.query(`
    SELECT u.name, p.link, p.description FROM posts p 
    JOIN users u ON u.id = p."userId"
    WHERE "userId" = $1;`, [id])
}

const usersRepository = {
    getUserById,
    getPostsByUserid
};

export default usersRepository;