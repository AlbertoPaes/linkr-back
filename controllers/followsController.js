import followsRepository from "./../repositories/followsRepository.js"

export async function getFollows (req, res) {

    const {userId, followId} = req.params;

    if (userId === followId) return res.status(200).send("Myself");
    
    const checkUser = await followsRepository.getFollowsByUserId(userId);

    if (checkUser.rowCount === 0) return res.status(200).send(false);

    const checkFollow = await followsRepository.checkFollow(followId);

    if (checkFollow.rowCount === 0) return res.status(200).send(false);

    res.status(200).send(true);

}

export async function postFollow (req, res) {

    const {userId, followId} = req.body;

    const postFollow = await followsRepository.postFollow(userId, followId);

    res.sendStatus(201);
    
}

export async function deleteFollow (req, res) {

    const {userId, followId} = req.params;
    
    await followsRepository.deleteFollow(userId, followId);

    res.sendStatus(200);

}