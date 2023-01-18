import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db/dbConnect';
import { signToken } from '../../../utils/auth';
import generateToken from '../../../utils/token/generateToken';

const handler = nc();
handler.post(async (req, res) =>
{
    await db.connect();
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email });
    //check if blocked
    if (userFound && (await userFound.isPasswordMatched(password)))
    {
        //Check if password is match
        res.status(200).json({
            user:{
                _id: userFound?._id,
                name: userFound?.name,
                email: userFound?.email,
                image: userFound?.image,
                isAdmin: userFound?.isAdmin,
                token: generateToken(userFound?._id),
                isVerified: userFound?.isAccountVerified,
                following: userFound?.following,
                followers: userFound?.followers,
            }
        });
    } else
    {
        res.status(401);
        throw new Error("Invalid Login Credentials");
    }
    // if (!userFound)
    // {
    //     const data = req.body
    //     const user = await User.create(data)
    //     res.status(200).json({
    //         status: 'success',
    //         user: {
    //             ...user,
    //             token:generateToken(user?._id)
    //         }
    //     })
    //     console.log({user})
    // } else
    // {
    //     res.status(200).json({
    //         success:true,
    //         message: `${userFound.name} is already registered`,
    //         user: {
    //             ...userFound,
    //             token:generateToken(userFound?._id)
    //         }
    //     })
    //     console.log({userFound})
    // }
    await db.disconnect();

});

export default handler;