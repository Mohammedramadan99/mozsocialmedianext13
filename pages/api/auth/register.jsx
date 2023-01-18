import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db/dbConnect';

const handler = nc();

handler.post(async (req, res) =>
{
    await db.connect();
    const userExists = await User.findOne({ email: req?.body?.email });

    if (userExists) throw new Error("User already exists");
    try
    {
        //Register user
        const user = await User.create({
            name: req?.body?.name,
            email: req?.body?.email,
            password: req?.body?.password,
            accountType:"normal"
        });
        res.status(200).json({
            success: true ,
            user
        });
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