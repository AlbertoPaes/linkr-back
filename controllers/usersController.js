import usersRepository from "../repositories/usersRepository.js";
import { timelineRepository } from "../repositories/timelineRepository.js";

export async function getUserPosts(req, res) {

    let posts = [];

    const { id } = req.params;

    try {

        const users = await usersRepository.getUserById(id * 1);

        if (users.rowCount === 0) return res.status(404).send("User inexistent");

        const { rows: allPosts } = await usersRepository.getAllPosts(users.rows[0].id);

        for (let post of allPosts) {
            const urlMeta = await timelineRepository.getMetada(post.link);
            const { title: urlTitle, image: urlImage, description: urlDescription } = urlMeta;
            posts.push({ ...post, urlTitle, urlImage, urlDescription });
        }

        res.status(200).send(posts);
    }

    catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
}

export async function searchUsers(req, res) {

    const {id, name} = req.params; 

    try {
        const user = await usersRepository.searchUser(name);
        res.send(user.rows);
    }

    catch (error) {
        console.log(error);
        return res.sendStatus(500); 
    }
}