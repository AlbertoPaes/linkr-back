import followsRepository from "./../repositories/followsRepository.js"

export async function getFollows (req, res) {

    const {id} = req.params;
    
    const follows = await followsRepository.getFollowsByUserId(id);

    if (follows.rowCount === 0) return res.sendStatus(404);

    res.send(follows.rows);
}

export async function postFollow (req, res) {

    const {userId, followId} = req.body;

    const postFollow = await followsRepository.postFollow(userId, followId);

    res.sendStatus(200);
    
}