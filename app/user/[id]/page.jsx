"use client";
import UserDetails from "./UserDetails"
import { routerAnimation } from '../../../utils/animations'
import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedInUserAction } from '../../../store/usersSlice';

function userDetails(props)
{
    const {data:session} = useSession()
    const dispatch = useDispatch()
    const {id} = props.params
    const {
        userAuth,
    } = useSelector(state => state.users);
    !userAuth?._id && session?.user?.email && dispatch(LoggedInUserAction({email:session?.user?.email}))
  return (
    <motion.div variants={routerAnimation}
        initial="initial"
        animate="animate"
        exit="exit">
        <UserDetails id={id} />
    </motion.div>
  )
}

export default userDetails