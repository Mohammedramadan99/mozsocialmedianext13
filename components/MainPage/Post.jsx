import React, { useEffect, useState } from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { postAction,  createCommentAction } from "../../store/postsSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Spinner from '../Spinner';
import { fadeInUp } from '../../utils/animations';
import { motion } from 'framer-motion';
// import Button from '../SmallComponents/Button';
const Button = dynamic(() => import('../SmallComponents/Button'))

import moment from 'moment/moment'

const Comment = dynamic(() => import('./Comment'))


function Post({ direction, post, profile })
{
    const dispatch = useDispatch()
    const comment = useSelector(state => state?.posts);
    const { createCommentLoading,comments, appErr, serverErr } = comment;
    const { userAuth } = useSelector(state => state.users)
    const [postComments, setPostComments] = useState([])
    const { postLists, loading: postLoading, likeLoading } = useSelector(state => state.posts)
    const [commentContent, setCommentContent] = useState("")
    const [showComments, setShowComments] = useState(false)
    const [showLiked, setShowLiked] = useState(false)
    const [showDisliked, setShowDisliked] = useState(false)
    const [sortedComments,setSortedComments] = useState([])
    const router = useRouter()
    const addLikeHandler = () =>
    {
        if(direction === "user__bottom__postsGroup") {
            dispatch(postAction({type:'like',id:post?._id,user:post?.user,profile:true}))
        } else {
            dispatch(postAction({type:'like',id:post?._id,user:post?.user,profile:false}))
        }
    }
    const addDislikeHandler = () =>
    {
        if(direction === "user__bottom__postsGroup") {
            dispatch(postAction({type:'dislike',id:post?._id,user:post?.user,profile:true}))
        } else {
            dispatch(postAction({type:'dislike',id:post?._id,user:post?.user,profile:false}))
        }
    }
    const addCommentHandler = (p, e) =>
    {
        e.preventDefault()
        const commentData = {
            postId: p?._id,
            user: userAuth?._id,
            description: commentContent
        }
        if(direction === "user__bottom__postsGroup") {
            dispatch(createCommentAction({commentData,user:post?.user,profile:true}))
        } else {
            dispatch(createCommentAction({commentData,user:post?.user,profile:false}))
        }
        // router.push('/?comment=true',undefined, {shallow:true})
        setCommentContent("")
    }
    useEffect(() =>
    {
        const liked = post?.likes.find(like => like === userAuth?._id)
        const disLiked = post?.disLikes.find(dislike => dislike === userAuth?._id)
        if (liked)
        {
            setShowLiked(true)

        } else
        {
            setShowLiked(false)

        }
        if (disLiked)
        {
            setShowDisliked(true)
        } else
        {
            setShowDisliked(false)
        }
        // dispatch(fetchPostsAction());

    }, [post?.likes, postLists, showLiked, showDisliked])
    useEffect(() =>
    {
        if (direction === "user__bottom__postsGroup")
        {
            setPostComments(comments?.filter(item => item.post === post._id))
        }
    }, [dispatch, post])
    // useEffect(() => {
    //     setSortedComments(post?.comments)
    //     console.log("setSortedCommentsHere",sortedComments)
    // }, [post])
    
    
    return (
        <motion.div variants={fadeInUp}>
            <div className={`${direction}__posts__container__post`}>
                <Link href={post ? `/user/${post?.user?._id}` : profile && `/user/${profile._id}`} className={`${direction}__posts__container__post__userInfo`}>
                    <>
                        <div className={`${direction}__posts__container__post__userInfo__img img__rounded`}>
                            {post?.user && post?.user?.image ? <Image src={post?.user?.image} fill={true} alt="you" /> : profile && profile?.image  && <Image src={post?.user?.image} alt="you" fill={true} style={{objectFit:'cover'}} />}
                        </div>
                        <div className={`${direction}__posts__container__post__userInfo__left`}>
                            <div className={`${direction}__posts__container__post__userInfo__left__name`}>
                                {direction === "user__bottom__postsGroup" ? profile.name : post?.user?.name}
                            </div>
                            <div className={`${direction}__posts__container__post__userInfo__left__time`}>
                                {moment(post?.createdAt).fromNow()}
                            </div>
                        </div>
                    </>
                </Link>
                <div className={`${direction}__posts__container__post__content`}>
                    {post?.description}
                </div>
                <div className={`${direction}__posts__container__post__img`}>
                    <div className='img--parent'>
                        {post && post?.image && <Image src={post?.image} fill={true} style={{objectFit:'contain'}} alt="post img" />}
                    </div>
                </div>
                <div className={`${direction}__posts__container__post__numbers`}>
                    <div className={`${direction}__posts__container__post__numbers__likesNums"`}>
                        <div className={`${direction}__posts__container__post__numbers__commentsNums`}>
                            <>
                                <span style={{fontWeight:"700"}}> {post?.likes?.length}  like  </span>
                                <span style={{fontWeight:"700"}}> {post?.disLikes?.length}  dislike  </span>
                                <span style={{fontWeight:"700"}}> {post?.comments?.length}  comments  </span>
                            </>
                        </div>
                    </div>
                </div>
                <div className={`${direction}__posts__container__post__actions`}>
                    <div className={showLiked ? `${direction}__posts__container__post__actions__item active` : `${direction}__posts__container__post__actions__item`} onClick={() => addLikeHandler()}>
                        <FavoriteIcon style={showLiked ? { opacity: "1" } : { opacity: ".1" }} /> <Button word="like" /> 
                    </div>
                    <div className={showDisliked ? `${direction}__posts__container__post__actions__item active` : `${direction}__posts__container__post__actions__item`} onClick={() => addDislikeHandler()}>
                        <ThumbDownOffAltIcon style={showDisliked ? { opacity: "1" } : { opacity: ".1" }} /> <Button word="dislike" />
                    </div>
                    <div className={showComments ? `${direction}__posts__container__post__actions__item active` : `${direction}__posts__container__post__actions__item`} onClick={() => setShowComments(!showComments)}>
                        <ChatBubbleOutlineIcon /> <Button word="comment" />
                    </div>
                </div>
            </div>
            <div className={showComments ? `${direction}__posts__container__commentsGroupe active` : `${direction}__posts__container__commentsGroupe`}>
                <div className={`${direction}__posts__container__commentsGroupe__writeComment`}>
                    <div className={`${direction}__posts__container__commentsGroupe__writeComment__userImg img__rounded`}>
                        <div className="img--container">
                            {userAuth?.image && <Image src={userAuth?.image} alt="img" fill={true} /> }
                        </div>
                    </div>
                    <form className={`${direction}__posts__container__commentsGroupe__writeComment__input`} onSubmit={(e) => addCommentHandler(post, e)}>
                        <input type="text" value={commentContent} placeholder='write a comment' onChange={e => setCommentContent(e.target.value)} />
                            {createCommentLoading ? (
                                <div style={{ position: "relative" }}>
                                    <Spinner />
                                </div>
                                ) : <input type="submit" />
                            }
                        
                    </form>
                </div>
                {showComments && (
                    <div className={`${direction}__posts__container__commentsGroupe__comments`}>
                        {direction === "user__bottom__postsGroup" ?
                        post.comments?.map((comment, inx) => <Comment key={inx} comment={comment} />) 
                        : post?.comments?.map((comment, inx) => <Comment key={inx} comment={comment} />)}
                    </div>
                ) }
            </div>
        </motion.div>
    )
}

export default Post
