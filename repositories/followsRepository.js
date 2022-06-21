import db from "./../config/db.js";

async function getFollowsByUserId (userId) {
    return await db.query(`SELECT * FROM follows WHERE "userId" = $1`, [userId]);
}

async function checkFollow (followId) {
    return await db.query(`SELECT * FROM follows WHERE "followId" = $1`, [followId]);
}

async function postFollow (userId, followId) {
    return await db.query(`
    INSERT INTO follows ("userId", "followId") 
    VALUES ($1, $2)`,[userId, followId]);
}


const followsRepository = {
    getFollowsByUserId,
    postFollow,
    checkFollow
};

export default followsRepository;