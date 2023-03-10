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
    cloud_name: 'dtmjc8y9z',
    api_key: '379966828288349',
    api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});
handler.use(isAuth).put(async (req, res) =>
{
    await db.connect();
    const { _id } = req.user;
    console.log("profileIMMG",req.body)
    try
    {
        const result = await cloudinary.v2.uploader.upload(req?.body?.uploadImage, {
            folder: "blog",
        });
        const url = result.secure_url 

        const foundUser = await User.findByIdAndUpdate(
            _id,
            {
                image: url,
            },
            { new: true }
        );
        console.log("foundUser",foundUser)

        res.status(200).json({
            success: true,
            message:"updated"
        });
    } catch (error)
    {
        res.status(403).json({
            success:false,
            message:error.message,
            error
        });
    }
    await db.disconnect();
})


export default handler;