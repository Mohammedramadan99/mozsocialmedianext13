import User from '../../../models/User';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db/dbConnect'
const handler = nc();
import { useSession } from "next-auth/react"

handler.use(isAuth).put(async (req, res) =>
{
    try {
        await db.connect();
        const { id } = req.body;
        const loginUserId = req.user._id;
        console.log(id)
    
        //find the target user and check if the login id exist
        const targetUser = await User.findById(id);
    
        const alreadyFollowing = targetUser?.followers?.find(
            (user) => user?.toString() === loginUserId.toString()
        );
    
        if (alreadyFollowing) {
            const user = await User.findById(id).populate('posts')
            res.status(200).json({
                success:true,
                profile:user,
                message:"You have successfully followed this user",
            });
        } else {
            await User.findByIdAndUpdate(
                id,
                {
                    $push: { followers: loginUserId },
                    isFollowing: true,
                },
                { new: true }
            );
        
            //2. Update the login user following field
            await User.findByIdAndUpdate(
                loginUserId,
                {
                    $push: { following: id },
                },
                { new: true }
            );
            
            const user = await User.findById(id).populate('posts')
            res.status(200).json({
                success:true,
                profile:user,
                message:"You have successfully followed this user",
            });
        }
    
    } catch (err) {
        res.status(500).json(err.message)
    }
    await db.disconnect();

})
// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '1mb' // Set desired value here
//         }
//     }
// }
export default handler;


