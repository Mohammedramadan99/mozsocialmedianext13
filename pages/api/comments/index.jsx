import Comment from '../../../models/Comment';
import User from '../../../models/User';
import nc from 'next-connect';

import db from '../../../utils/db/dbConnect';
import { isAuth } from '../../../utils/auth';
import Notification from '../../../models/NotificationsModal';
import Post from '../../../models/Post';
const handler = nc();

//----------------------------------------------------------------
// GET POSTS
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await db.connect();
    try
    {
        const post = req?.query?.post

        const comments = post ? await Comment.find({ post }).populate("user").sort({createdAt: 1}) : await Comment.find().sort('-createdAt')
        
        res.json(comments);
    } catch (error)
    {
        res.json(error);
    }
    await db.disconnect();

})
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
handler.use(isAuth).post(async (req, res) =>
{
    await db.connect();
    
    const user = req.user;
    //Check if user is blocked 
    //2.Get the post Id
    const { postId, description } = req.body;

    try
    {
        await Comment.create({
            post: postId,
            user,
            description,
        });
        
        const post = await Post.findById(postId).populate({
            path:'comments',
            options: {sort: {'createdAt' : -1} }
        }).populate('user').sort('-createdAt')
        // const comments = await Comment.find().sort('-createdAt')
        
        res.status(200).json({
            success:true,
            post,
            // comments,
            // comment
        });
    } catch (error)
    {
        res.json(error.message);
    }
    await db.disconnect();
})

export default handler;