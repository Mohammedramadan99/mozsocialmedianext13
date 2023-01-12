'use client';

import dynamic from 'next/dynamic';
// const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
import MainPage from '../components/MainPage/MainPage';
import { wrapper } from "../store/store";

import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction, getAllPosts, getCommentsAction, testo } from '../store/postsSlice';
import { getSession } from 'next-auth/react';
import db from '../utils/db/dbConnect';
// import { getPosts } from './api/posts';

import { useDispatch } from 'react-redux'

export default function Page() {
  const dispatch = useDispatch()
  
  dispatch(fetchPostsAction())

  return (
    <motion.div
      variants={routerAnimation} 
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <MainPage />
    </motion.div>
  );
}
