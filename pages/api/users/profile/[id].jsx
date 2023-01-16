import nc from 'next-connect';

import db from '../../../../utils/db/dbConnect';
import Comment from '../../../../models/Comment';
import Post from '../../../../models/Post';
import { isAuth } from '../../../../utils/auth';
import User from '../../../../models/User';
const handler = nc();

//----------------------------------------------------------------
// GET user details
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await db.connect()
    const { id } = req.query;
    //check if user id is valid
    try
    {
      console.log("profileQ",req.query)
        const user = await User.findById(id).populate({
            path : 'posts',
            options: {sort: {'createdAt' : -1} },
            populate : {
              path : 'comments',
              options: {sort: {'createdAt' : -1} }
            }
          })
      console.log("profileUSER",user)
        res.status(200).json({
          success: true,
          user
        });
    } catch (error)
    {
        res.status(500).json({
          success: false,
          message:error.message
        });
    }
    await db.disconnect();
})

//----------------------------------------------------------------
// update profile
//----------------------------------------------------------------

handler.put(async (req, res) =>
{
    await db.connect();
    try
    {
        let user = await User.findById(req.query.id).populate({
            path : 'posts',
            populate : {
              path : 'comments'
            }
          });

        user = await User.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }).populate({
            path : 'posts',
            options: {sort: {'createdAt' : -1} },
            populate : {
              path : 'comments',
              options: {sort: {'createdAt' : -1} }
            }
          })

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error)
    {
        res.json(error.message);
    }
    await db.disconnect();
});
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
// handler.use(isAuth).post(async (req, res) =>
// {
//     await db.connect();
//     const { id } = req.user;
//     //Display message if user is blocked
//     //Check for bad words
//     const filter = new Filter();
//     const isProfane = filter.isProfane(req.body.title, req.body.description);
//     //Block user
//     if (isProfane)
//     {
//         await User.findByIdAndUpdate(id, {
//             isBlocked: true,
//         });
//         throw new Error(
//             "Creating Failed because it contains profane words and you have been blocked"
//         );
//     }

//     //Prevet user f his account is a starter account

//     //1. Get the path to img

//     try
//     {
//         // const localPath = `public/images/posts/${req.file.filename}`;
//         // const imgUploaded = await cloudinaryUploadImg(localPath);
//         // //2.Upload to cloudinary
//         const post = await Post.create({
//             ...req.body,
//             user: id,
//             // image: imgUploaded?.url,
//         });
//         console.log(post.description)
//         console.log("user" + req.user);
//         console.log("post" + post);
//         //update the user post count
//         await User.findByIdAndUpdate(
//             id,
//             {
//                 $inc: { postCount: 1 },
//             },
//             {
//                 new: true,
//             }
//         );

//         //Remove uploaded img
//         // fs.unlinkSync(localPath);
//         res.json(post);
//     } catch (error)
//     {
//         res.json(error.message);
//     }

// })

export default handler;