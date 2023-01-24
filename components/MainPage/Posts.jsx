'use client';

import { useState } from 'react'

import WritePost from './WritePost'
import { useSelector } from 'react-redux'

import { useRouter } from 'next/navigation'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
const {stagger} = dynamic(() => import('../../utils/animations'))
const Post = dynamic(() => import('./Post'))

function Posts({ direction, user })
{
    const router = useRouter()
    
    const [commentContent, setCommentContent] = useState("")
    const { postLists, loading:postloading } = useSelector(state => state.posts)
    const { profile } = useSelector(state => state.users)
    
    const [showComments, setShowComments] = useState({ post: "", status: false })

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
            <div className="mainPage__middle__top">
            {direction !== "user__bottom__postsGroup" && <WritePost dir={direction} userDetails={user} />}
                
            </div>
            <div className="mainPage__middle__bottom">
                {direction === "mainPage__middle" ? (
                        postLists?.map(p => (
                            <motion.div variants={stagger} initial="initial" animate="animate" key = { p?._id } className={`${direction}__posts__container`} style={{ position: 'relative' }}>
                                <Post  post = { p } direction = { direction } />
                            </motion.div>
                            )
                        )
                ) : direction === "user__bottom__postsGroup" && (
                    !user?.posts || user?.posts?.length === 0 ? (
                        <p style={{ textAlign: "center", textTransform: "capitalize", marginTop: "40px" }}>there is not posts yet</p>
                    ) : (
                        user?.posts?.map(p => (
                        <motion.div variants={stagger} initial="initial" animate="animate" key = { p?._id } className={`${direction}__posts__container`} style={{ position: 'relative' }}>
                            <Post  direction = { direction } profile = { profile } post = { p } />
                        </motion.div>

                        ))
                    )
                )}
            </div>
        </div>
    )
}

export default Posts