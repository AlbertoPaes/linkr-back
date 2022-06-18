import { postsRepository } from "../repositories/postsRepository.js";
import { timelineRepository } from "../repositories/timelineRepository.js";
import chalk from "chalk";

export async function editPost(req, res) {
    const { user: { id: userId } } = res.locals;
    const { description } = req.body;
    const { id } = req.params;

    let hashtags = [];
    const descriptionArr = description.split(" ");
    const pattern = /#\w+/g;

    for (let string of descriptionArr) {
        if (pattern.test(string)) {
            hashtags.push(string.toLowerCase());
        }
    };

    try {
        await postsRepository.editPost(userId, description, id);
        await timelineRepository.deleteRelatePostHashtag(id * 1)

        const { rows: posts } = await timelineRepository.searchOnePost(userId);
        const { id: postId } = posts[posts.length - 1];

        for (let value of hashtags) {
            const { rows: hashtags } = await timelineRepository.searchHashtags(value);
            const [hashtag] = hashtags;
            if (!hashtag) await timelineRepository.insertHashtag(value);
            const { rows: hashtagsAfter } = await timelineRepository.searchHashtags(value);
            const [hashtagAfter] = hashtagsAfter;
            await timelineRepository.relatePostHashtag(postId, hashtagAfter.id);
        }

        res.sendStatus(201);
    } catch (e) {
        console.log(chalk.red.bold(e));
        res.sendStatus(500);
    }
};

export async function deletePost(req, res){
    const {id} = req.params;
    const { user: { id: userId } } = res.locals;
    
    try {
        const {rows: post} = await postsRepository.getPostByPostId(id*1)
        if(!post[0]) return res.status(404).send('This post does not exist')
        if(userId !== post[0].userId) return res.status(401).send("This post is not yours")
    
        await postsRepository.deletePost(userId, id*1)
        res.sendStatus(200);
        
    } catch (e) {
        console.log(chalk.red.bold(e));
        res.sendStatus(500);
    }
}