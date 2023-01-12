import User from '../../../models/User';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db/dbConnect'
const handler = nc();

handler.use(isAuth).put(async (req, res) =>
{
    await db.connect();
    try {
        const { id } = req.body;
        const loginUserId = req.user._id;
        console.log(id)
        await User.findByIdAndUpdate(
            id,
            {
                $pull: { followers: loginUserId },
                isFollowing: false,
            },
            { new: true }
        );

        await User.findByIdAndUpdate(
            loginUserId,
            {
                $pull: { following: id },
            },
            { new: true }
        );

        const user = await User.findById(id).populate('posts')
            res.status(200).json({
                success:true,
                profile:user,
                message:"You have successfully followed this user",
            });            
    } catch (err) {
        res.status(500).json(err.message)
    }
    
    await db.disconnect();

})
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb' // Set desired value here
        }
    }
}
export default handler;