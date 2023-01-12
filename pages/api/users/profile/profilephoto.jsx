import nc from 'next-connect';
// import Post from '../../../../models/Post';

import cloudinary from 'cloudinary'
import db from '../../../../utils/db/dbConnect';
import { isAuth } from '../../../../utils/auth';
import User from '../../../../models/User';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb' // Set desired value here
        }
    }
}
const handler = nc();

//----------------------------------------------------------------
// GET user details
//----------------------------------------------------------------
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
handler.use(isAuth).put(async (req, res) =>
{
    await db.connect();
    const { _id } = req.user;
    try
    {
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "blog",
        });
        const url = result.secure_url

        const foundUser = await User.findByIdAndUpdate(
            id,
            {
                profilePhoto: url,
            },
            { new: true }
        );
        res.json(foundUser);
    } catch (error)
    {
        res.json(error.message);
    }
    await db.disconnect();
})


export default handler;