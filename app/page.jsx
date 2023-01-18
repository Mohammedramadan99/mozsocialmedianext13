'use client';
// const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
import MainPage from './MainPage';
// import Alert from './Alert'
import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction, getAllPosts, getCommentsAction, testo } from '../store/postsSlice';
import { useSession } from 'next-auth/react'
// import { getPosts } from './api/posts';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';

export default function Page(props) {
  const dispatch = useDispatch()
  const { postLists, loading:postloading } = useSelector(state => state.posts)
  const { userAuth } = useSelector(state => state.users)
  const {data:session} = useSession()
  const router = useRouter()
  
  useEffect(()  => { 
    dispatch(fetchPostsAction())
    dispatch(fetchUsersAction(4))
  }, [dispatch])
  useEffect(() => {
    session && !userAuth && dispatch(LoggedInUserAction({email:session?.user?.email}))
  }, [dispatch,session])
  useEffect(() =>
  {
      if (userAuth === null)
      {
          router.push('/login')
      }
  }, [])
  return (
    <motion.div
      variants={routerAnimation} 
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* <Alert/> */}
      {postloading && (
          <div style={{position:"relative"}}>
              <Spinner type="full" />
          </div>
      )}
      <MainPage />
    </motion.div>
  );
}
