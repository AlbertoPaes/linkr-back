import usersRepository from "../repositories/usersRepository.js";

export default async function getUserPosts(req, res) {

    const {id} = req.params;

    try {
        const users = await usersRepository.getUserById(id);
        res.send(users.rows);
    }

    catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
    }
}