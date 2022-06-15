import db from "./../config/db.js";

async function getUserById(id) {
    // return db.query(`SELECT * FROM users`);
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);

};

async function getPostsByUserId(id) {
    return db.query(`
    SELECT u.name, u.image, p.description, p.link, p."userId" FROM posts p 
    JOIN users u ON u.id = p."userId"
    WHERE "userId" = $1;`, [id])
}

async function searchUser(name) {
    return await db.query(`SELECT * FROM users WHERE name LIKE $1`,[`${name}%`]);
}

const usersRepository = {
    getUserById,
    getPostsByUserId,
    searchUser
};

export default usersRepository;