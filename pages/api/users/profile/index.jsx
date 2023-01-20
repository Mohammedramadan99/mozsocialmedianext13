import nc from 'next-connect';
import db from '../../../../utils/db/dbConnect';
import User from '../../../../models/User';
import generateToken from '../../../../utils/token/generateToken';

const handler = nc();

//----------------------------------------------------------------
// GET user details
//----------------------------------------------------------------

handler.post(async (req, res) =>
{
  await db.connect()
  try
  {
    console.log("requestBody",req.body)
    let email = req.body.email
    const getUser = await User.findOne({email});
    res.status(200).json({
      success: true,
      user:{
        _id: getUser?._id,
        name: getUser?.name,
        email: getUser?.email,
        image: getUser?.image,
        coverPhoto: getUser?.coverPhoto,
        isAdmin: getUser?.isAdmin,
        token: generateToken(getUser?._id),
        isVerified: getUser?.isAccountVerified,
        following: getUser?.following,
        followers: getUser?.followers,
      }
    });
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
  await db.disconnect();
})

export default handler;
