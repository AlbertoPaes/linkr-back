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

async function deleteFollow (userId, followId) {
    return await db.query(`
    DELETE FROM follows 
    WHERE "userId"=$1 AND "followId"=$2`,[userId,followId])
}
 
async function searchFollowsById (whereClauses, userId, array) {
    return await db.query(`
    SELECT * FROM follows WHERE "userId"=$1 AND 
    (${whereClauses})`,[userId,...array]);
}

const followsRepository = {
    getFollowsByUserId,
    checkFollow,
    postFollow,
    deleteFollow,
    searchFollowsById
};

export default followsRepository;