'use client';
import MainPage from './MainPage';
import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction } from '../store/postsSlice';
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';

export default function Page() {
  const dispatch = useDispatch()
  const {loading:postloading } = useSelector(state => state.posts)
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
  if (userAuth === null || !userAuth || userAuth === {})
      {
          router.push('/login')
      }
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