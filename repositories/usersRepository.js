import db from "./../config/db.js";

async function getUserById (id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

const usersRepository = {
    getUserById
};

export default usersRepository;