'use client';

import dynamic from 'next/dynamic';
// const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
import MainPage from '../components/MainPage/MainPage';
import { wrapper } from "../store/store";
// import Alert from './Alert'
import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction, getAllPosts, getCommentsAction, testo } from '../store/postsSlice';
import { useSession } from 'next-auth/react'
import db from '../utils/db/dbConnect';
// import { getPosts } from './api/posts';

import { useDispatch } from 'react-redux'
import { useEffect } from 'react';

export default function Page() {
  const dispatch = useDispatch()
  const {data:session} = useSession()
  
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
      {/* <Alert/> */}
      <MainPage />
    </motion.div>
  );
}
