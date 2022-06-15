import usersRepository from "../repositories/usersRepository.js";

import db from "./../config/db.js"

export async function getUserPosts(req, res) {

    const {id} = req.params;

    try {
        const users = await usersRepository.getUserById(id);

        if (users.rowCount === 0) return res.status(404).send("User inexistent");

        const posts = await usersRepository.getPostsByUserId(users.rows[0].id);
        res.send(posts.rows);
    }

    catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
    }
}

export async function searchUsers (req, res) {

    const {name} = req.body;

    try {
        const user = await usersRepository.searchUser(name);
        res.send(user.rows);
    } 


    catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
    }
}