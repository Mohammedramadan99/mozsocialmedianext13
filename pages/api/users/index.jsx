import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db/dbConnect';
import generateToken from '../../../utils/token/generateToken';

const handler = nc();

//-------------------------------
//Login user
//-------------------------------

handler.get(async (req, res) =>
{
    await db.connect();
    try
    {
        const limit = req.query.limit
        const usersCount = await User.countDocuments();
        if (limit)
        {
            const users = await User.find().limit(limit);
            res.status(200).json({
                success: true,
                users,
                usersCount
            });
        } else
        {
            const users = await User.find().populate("posts");
            res.status(200).json({
                success: true,
                users,
                usersCount
            });
        }
    } catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    await db.disconnect();

});


export default handler;