import db from "./../config/db.js";

async function getFollowsByUserId (id) {
    return await db.query(`SELECT * FROM follows WHERE "userId" = $1`, [id]);
}

async function postFollow (userId, followId) {
    return await db.query(`
    INSERT INTO follows ("userId", "followId") 
    VALUES ($1, $2)`,[userId, followId]);
}


const followsRepository = {
    getFollowsByUserId,
    postFollow
};

export default followsRepository;