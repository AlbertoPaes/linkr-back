import followsRepository from "./../repositories/followsRepository.js"
import usersRepository from "../repositories/usersRepository.js";

export async function getFollows (req, res) {

    const {userId, followId} = req.params;

    if (userId === followId) return res.status(200).send("Myself");

    try {
        const checkUser = await followsRepository.getFollowsByUserId(userId);

        if (checkUser.rowCount === 0) return res.status(200).send(false);
    
        const checkFollow = await followsRepository.checkFollow(followId);
    
        if (checkFollow.rowCount === 0) return res.status(200).send(false);
        
        res.status(200).send(true);
    }

    catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
}

export async function searchFollows (req, res) {

    const {name, userId} = req.params;

    try {
        const checkUser = await usersRepository.searchUser(name);

        if (checkUser.rowCount === 0) return res.send(checkUser.rows);
    
        const allUsersId = [];
    
        checkUser.rows.forEach(row => {
            allUsersId.push(row.id);
        });
    
        let whereClauses = "";
    
        const conditions = [];
    
        for (let i = 1; i < allUsersId.length+1; i ++) {
            conditions.push(`"followId"=$${i+1}`)
        }
    
        whereClauses = `${conditions.join(" OR ")}`;
    
        const checkFollowing = await followsRepository.searchFollowsById(whereClauses, userId, allUsersId)
    
        const followingUsersid = [];
    
        checkFollowing.rows.forEach(row => {
            followingUsersid.push(row.followId);
        })
    
        res.status(200).send(followingUsersid);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
}

export async function postFollow (req, res) {

    const {userId, followId} = req.body;

    try {
        await followsRepository.registerFollow(userId, followId);
        res.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }  
}

export async function deleteFollow (req, res) {

    const {userId, followId} = req.params;

    try {
        await followsRepository.removeFollow(userId, followId);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }   
}