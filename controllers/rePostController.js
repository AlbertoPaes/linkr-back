import { rePostRepository } from "../repositories/rePostRepository.js";

const getRePosts = async (req, res) => {
  const { postId } = req.params;

  try {

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } 
}

const modulesRePostController = { getRePosts };
export default modulesRePostController;