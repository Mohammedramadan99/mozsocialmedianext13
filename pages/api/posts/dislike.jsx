import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db/dbConnect';
import Post from '../../../models/Post';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb' // Set desired value here
        }
    }
}
const handler = nc();

handler.use(isAuth).put(async (req, res) =>
{
    try
    {
        // await db.connect();
        //1.Find the post to be disLiked
        const { id } = req?.body;
        const post = await Post.findById(id);
        //2.Find the login user
        console.log("post", post)
        const loginUserId = req?.user?._id;
        //3.Check if this user has already disLikes
        const isDisLiked = post?.isDisLiked;
        //4. Check if already like this post
        const alreadyLiked = post?.likes?.find(
            (userId) => userId.toString() === loginUserId?.toString()
        );
        //Remove this user from likes array if it exists
        if (alreadyLiked)
        {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,
                    reactionClass: "dislike"
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }
        //Toggling
        //Remove this user from dislikes if already disliked
        if (isDisLiked)
        {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { disLikes: loginUserId },
                    isDisLiked: false,
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate({
                path: 'user',
                model: 'User',
            }).populate({
                path:'comments',
                options: {sort: {'createdAt' : -1} }
            }).sort('-createdAt');
            // const posts = await Post.find().populate('comments').populate('user').sort('-createdAt')
            res.status(200).json({
                success: true,
                // posts,
                post
            });
        } else
        {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $push: { disLikes: loginUserId },
                    isDisLiked: true,
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate({
                path: 'user',
                model: 'User',
            }).populate({
                path:'comments',
                options: {sort: {'createdAt' : -1} }
            }).sort('-createdAt');
            // const posts = await Post.find().populate('comments').populate('user').sort('-createdAt')
            res.status(200).json({
                success: true,
                // posts,
                post
            });
        }
    } catch (error)
    {
        res.status(500).json({
            message: error.message,
        })
    }
    finally
    { 
        await db.disconnect()
    }
})

export default handler;