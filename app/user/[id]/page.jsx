"use client";
import dynamic from 'next/dynamic'
// import UserDetails from "../../components/UserDetails/UserDetails"
import { routerAnimation } from '../../../utils/animations'
import { motion } from "framer-motion";
// import { wrapper } from "../../../store/store"
// import { fetchUserDetailsAction, fetchUsersAction, LoggedInUserAction, userProfileAction } from "../../../store/usersSlice"
// import {getCommentsAction} from '../../../store/postsSlice'
// import { getSession, useSession } from 'next-auth/react';
const UserDetails = dynamic(() => import('../../../components/UserDetails/UserDetails'))
function userDetails()
{
  return <motion.div variants={routerAnimation}
    initial="initial"
    animate="animate"
    exit="exit">
    <UserDetails />
  </motion.div>
}

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async ({req,res,params}) =>
//   {
//     try {
//       const protocol = req.headers['x-forwarded-proto'] || 'http'
//       const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
//       const { id } = params
//       await store.dispatch(userProfileAction({url:baseUrl,id}))
//       // await store.dispatch(fetchUsersAction({url:baseUrl}));
//       // await store.dispatch(getCommentsAction({url:baseUrl}))
  
//       // await store.dispatch(LoggedInUserAction({url:baseUrl}));
//     } catch (error) {
//       console.log("errorServer",error)
//     }
//   }
// )

export default userDetails

// export const getServerSideProps = wrapper.getServerSideProps( store =>  ({ req, res,params}) =>
// {

//   // const data = {id:params.id }
//   // store.dispatch(userProfileAction(data))
// });