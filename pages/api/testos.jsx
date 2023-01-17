import nc from 'next-connect';

import db from '../../utils/db/dbConnect';

const handler = nc();

//-------------------------------
//Login user
//-------------------------------

handler.get(async (req, res) =>
{
    await db.connect();
    try
    {
        res.status(200).json({
            success: true,
            msg:"success"
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