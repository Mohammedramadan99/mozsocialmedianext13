'use client';

import { useEffect, useState } from 'react'

import WritePost from './WritePost'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/navigation'

import dynamic from 'next/dynamic'
// import { stagger } from '../../utils/animations'
import { motion } from 'framer-motion'
const {stagger} = dynamic(() => import('../../utils/animations'))

// import MyPost from './MyPost'
const Post = dynamic(() => import('./Post'))
// import Post from './Post'
const Spinner = dynamic(() => import('../Spinner'))

function Posts({ direction, user })
{
    const router = useRouter()
    
    const [commentContent, setCommentContent] = useState("")
    const { postLists, loading:postloading } = useSelector(state => state.posts)
    const { profile } = useSelector(state => state.users)
    
    const [showComments, setShowComments] = useState({ post: "", status: false })
    // useEffect(() =>
    // {
    //     // id && dispatch(userProfileAction(id))
    // }, [dispatch, id, likes, dislikes, commentCreated])

    // useEffect(() =>
    // {
    //     // !id && dispatch(fetchPostsAction(""));
    // }, [isCreated, postCreated, dispatch, likes, dislikes, commentCreated]);



    const openCommentHandler = (post) =>
    {
        setShowComments({ post: post._id, status: !showComments.status })
    }
    if (!router.isFallback && !postLists)
    {
        return <div>404</div>;
    }
    return (
        <div className={direction}>
                <WritePost dir={direction} userDetails={user} />
                {/* <MyPost /> */}
                {postloading && (
                    <div style={{position:"relative"}}>
                        <Spinner />
                    </div>
                )}
            {direction === "mainPage__middle" ? (
                    postLists?.map(p => (
                        <motion.div variants={stagger} initial="initial" animate="animate" key = { p._id } className={`${direction}__posts__container`} style={{ position: 'relative' }}>
                            <Post  post = { p } direction = { direction } />
                        </motion.div>
                    )
                        )

            ) : direction === "user__bottom__postsGroup" && (
                !user?.posts || user?.posts?.length === 0 ? (
                    <p style={{ textAlign: "center", textTransform: "capitalize", marginTop: "40px" }}>there is not posts yet</p>
                ) : (
                    user?.posts?.map(p => (
                    <motion.div variants={stagger} initial="initial" animate="animate" key = { p._id } className={`${direction}__posts__container`} style={{ position: 'relative' }}>
                        <Post  direction = { direction } profile = { profile } post = { p } />
                    </motion.div>

                    ))
                )
            )}
        </div>
    )
}

export default Posts