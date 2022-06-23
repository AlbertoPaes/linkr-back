import { rePostRepository } from "../repositories/rePostRepository.js";
import { likeRepository } from '../repositories/likeRepository.js';

const getRePosts = async (req, res) => {
  const { postId } = req.params;

  try {
    const { rows: rePosts } = await rePostRepository.countRePost(postId);
    const [countRePost] = rePosts;
    res.status(200).send(countRePost.count);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } 
}

const makeRePost = async (req,res) => {
  const { postId } = req.params;
  const { user } = res.locals;

  try {
    const postExist = await likeRepository.checkPostExist(postId);
    if(postExist.rowCount === 0){
      res.sendStatus(404);
      return;
    }

    if(postExist.rows[0].userId === user.id){
      res.status(403).send("It's not possible to repost a post you created");
      return;
    }

    await rePostRepository.insertRePost(postId,user.id);
    res.sendStatus(201);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } 
}

const modulesRePostController = { getRePosts,makeRePost };
export default modulesRePostController;