import { likeRepository } from '../repositories/likeRepository.js';

const getLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const usersWhoLikes = await likeRepository.getLikesByPostId(postId);
    res.status(200).send(usersWhoLikes.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const addOrRemoveLike = async (req, res) => {
  const { user } = res.locals;
  const { postId } = req.params;

  try {
    const postExist = await likeRepository.checkPostExist(postId);

    if(postExist.rowCount === 0){
      res.sendStatus(404);
      return;
    }

    const postIsLiked = await likeRepository.checkPostLiked(user.id,postId);

    if(postIsLiked.rowCount > 0){
      await likeRepository.removeLike(user.id,postId);
      res.sendStatus(200);
      return;
    }
    console.log("deploy heroku like");

    await likeRepository.addLike(user.id,postId);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const modulesLikeController = { getLikes,addOrRemoveLike };
export default modulesLikeController;