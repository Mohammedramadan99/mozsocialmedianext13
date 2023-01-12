// import User from '../../../models/User';
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
    // await db.connect();
    try
    {
        console.log("we're in #1")
        //1.Find the post to be liked
        const { id } = req?.body;
        const post = await Post.findById(id);
        //2. Find the login user
        const loginUserId = req?.user?._id;
        console.log("loginUserId",loginUserId)
        //3. Find is this user has liked this post?
        const isLiked = post?.isLiked;
        //4.Chech if this user has dislikes this post
        const alreadyDisliked = post?.disLikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        //5.remove the user from dislikes array if exists
        if (alreadyDisliked)
        {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { disLikes: loginUserId },
                    isDisLiked: false,
                    reactionClass: "like"
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }
        //Toggle
        //Remove the user if he has liked the post
        if (isLiked)
        {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,

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
            // const posts = await Post.find().populate({
            //     path: 'user',
            //     model: 'User',
            // }).populate('comments').sort('-createdAt')
            res.status(200).json({
                success: true,
                post,
                // posts
            });
        } else
        {
            //add to likes
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $push: { likes: loginUserId },
                    isLiked: true,
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
            // const posts = await Post.find().populate({
            //     path: 'user',
            //     model: 'User',
            // }).populate('comments').sort('-createdAt')
            res.status(200).json({
                success: true,
                post,
                // posts
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    } finally
    {
        await db.disconnect()
    }
})
export default handler;