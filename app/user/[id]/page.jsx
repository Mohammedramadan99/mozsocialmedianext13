"use client";
import dynamic from 'next/dynamic'
import UserDetails from "./UserDetails"
import { routerAnimation } from '../../../utils/animations'
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInUserAction, userProfileAction } from '../../../store/usersSlice';
import { useEffect } from 'react';
// import { wrapper } from "../../../store/store"
// import { fetchUserDetailsAction, fetchUsersAction, LoggedInUserAction, userProfileAction } from "../../../store/usersSlice"
// import {getCommentsAction} from '../../../store/postsSlice'
// import { getSession, useSession } from 'next-auth/react';
// const UserDetails = dynamic(() => import('../../../components/UserDetails/UserDetails'))
function userDetails(props)
{
    const {data:session} = useSession()
    const dispatch = useDispatch()
    const {
        profile,
        profileLoading,
        profileImgUpdated,
        followed,
        unFollowed,
        userAuth,
        loading,
    } = useSelector(state => state.users);
    !userAuth?._id && dispatch(LoggedInUserAction({email:session?.user?.email}))

    console.log("params",props.params.id)
    useEffect(() => {
      dispatch(userProfileAction(props?.params?.id))
    }, [dispatch])
    
  return (
    <motion.div variants={routerAnimation}
        initial="initial"
        animate="animate"
        exit="exit">
        <UserDetails id={props.params.id} />
    </motion.div>
  )
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