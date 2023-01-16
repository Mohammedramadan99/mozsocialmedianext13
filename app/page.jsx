'use client';

import MainPage from '../components/MainPage/MainPage';
import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction} from '../store/postsSlice';
import { useSession } from 'next-auth/react'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import Spinner from '../components/Spinner';

export default function Page(props) {
  const dispatch = useDispatch()
  const {data:session} = useSession()
  const { postLists, loading:postloading } = useSelector(state => state.posts)
  
  useEffect(() => {
    dispatch(fetchPostsAction())
    dispatch(fetchUsersAction(4))
  }, [])
  useEffect(() => {
    dispatch(LoggedInUserAction({email:session?.user?.email}))
  }, [dispatch,session])

  return (
    <motion.div
      variants={routerAnimation} 
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {postloading && (
          <div style={{position:"relative"}}>
              <Spinner type="full" />
          </div>
      )}
      {/* <Alert/> */}
      <MainPage />
    </motion.div>
  );
}
