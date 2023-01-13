import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
// import Spinner from '../../components/Spinner'
import Posts from '../../../components/MainPage/Posts'
import Sidebar from '../../../components/MainPage/Sidebar'
import { useSelector } from 'react-redux'
import { fetchUsersAction, followUserAction, unfollowUserAction, uploadProfilePhototAction, uploadCoverPhototAction, LoggedInUserAction } from '../../../store/usersSlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Edit from '@mui/icons-material/Edit'
import { useSession } from 'next-auth/react'

function UserDetails(props)
{
    const router = useRouter()
    const {data:session} = useSession()
    const { id } = props.params
    const dispatch = useDispatch()
    const [uploadImage, setUploadImage] = useState("");
    const [imagePreview, setImagePreview] = useState("")
    //User data from store
    const {
        profile,
        profileLoading,
        profileImgUpdated,
        followed,
        unFollowed,
        userAuth,
        loading,
    } = useSelector(state => state.users);
    const [editPhoto, setEditPhoto] = useState(false)
    const [editCover, setEditCover] = useState(false)
    
    // const { likes, dislikes } = useSelector(state => state.post)
    // const comment = useSelector(state => state?.comment);

    // const { loading, appErr, serverErr, commentCreated } = comment;


    const createPostImagesChange = (e) =>
    {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () =>
        {
            if (Reader.readyState === 2)
            {
                setUploadImage(Reader.result);
                setImagePreview(Reader.result);
            }
        };
    };
    const uploadProfilePhoto = (e) =>
    {
        // e.preventDefault()
        const theImage = { uploadImage }
        dispatch(uploadProfilePhototAction(theImage))
    }
    const uploladcoverPhoto = (e) =>
    {
        // e.preventDefault()
        const theImage = { uploadImage }
        dispatch(uploadCoverPhototAction(theImage))
    }
    const closeHandler = () =>
    {
        setImagePreview('')
        setEditCover(false)
        setEditPhoto(false)
    }
    const [follow, setFollow] = useState(false)
    useEffect(() =>
    {
        const ifFollowed = profile?.followers?.find(item => item === userAuth._id)
        setFollow(ifFollowed ? true : false)
    }, [id, followed, unFollowed, profile?.followers?.length])
    if (profileImgUpdated)
    {
        dispatch(reset())
        router.push("/")
    }
    
    useEffect(() => {
        dispatch(LoggedInUserAction({email:session?.user?.email}))
    }, [session])
    
    console.log({session})
    return (
        <div className='user'>
            {/* {loading ? <Spinner /> : ( */}
                <>
                    <div className="user__top">
                        <div className="user__top__img">
                            <div className="user__top__img__cover">
                                {profile?._id === userAuth?._id && <div className="overlay" onClick={() => setEditCover(true)} >
                                    <div className="overlay__edit">
                                        <Edit />
                                    </div>
                                </div>
                                }
                                {profile?.coverPhoto ? (
                                    <div className="img--parent">
                                        <Image src={profile?.coverPhoto} alt="cover" objectFit='cover' layout='fill' />
                                    </div>
                                ) : (
                                    <div className='coverTxt'>
                                        cover image
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="user__top__info">
                            <div className={profile?._id !== userAuth?._id ? "user__top__info__personalImg center" : "user__top__info__personalImg flex-start"}>
                                {
                                profile?._id === userAuth?._id && profile?.accountType !== "google" &&
                                    <div className="overlay" onClick={() => setEditPhoto(true)}>
                                        <div className="overlay__edit">
                                            <Edit />
                                        </div>
                                    </div>
                                }
                            {profile?.image ? (
                                <div className='user__top__info__personalImg__container'>
                                    <Image src={profile?.image} alt="img" width={250} height={250} style={{ objectFit:"cover" }} />
                                </div>
                            ) : (
                                    <div className='personalImgTxt'>
                                        profile image
                                    </div>
                            )}
                            </div>
                            <div className="user__top__info__name "> {profile?.name} </div>
                            <div className="user__top__info__following">
                                {userAuth?._id !== profile?._id && (
                                    follow ? (
                                        <div className="user__top__info__following__unFollowBtn" onClick={() => dispatch(unfollowUserAction({id,profile:true}))}>
                                            unfollow
                                        </div>
                                    ) : (
                                        <div className="user__top__info__following__followBtn" onClick={() => dispatch(followUserAction({id,profile:true}))}>
                                            follow
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="user__bottom">
                        <Sidebar profile={profile} />
                        <div className="user__bottom__postsGroup">
                            <Posts direction="user__bottom__postsGroup" user={profile} />
                        </div>
                    </div>
                    <div className={editCover ? "user__editPhoto active" : `user__editPhoto`}>
                        <div className="overlay">
                            <div className="user__editPhoto__box">
                                <div className="user__editPhoto__box__closeIcon" onClick={() => closeHandler()}> <CloseIcon /> </div>
                                <div className="user__editPhoto__box__title">
                                    edit your cover
                                </div>
                                <div className="user__editPhoto__box__editCover">
                                    {imagePreview ? (
                                        <div className="user__editPhoto__box__editCover__img">
                                            <img src={imagePreview} alt="Product Preview" />
                                        </div>
                                    ) : (
                                        <input type="file" accept="image/*" onChange={createPostImagesChange} />
                                    )}
                                </div>
                                <div className="user__editPhoto__box__editProfilePhoto">
                                    <div className="user__editPhoto__box__editProfilePhoto__img">
                                        <img src={profile?.profilePhoto} alt="profile" />
                                    </div>
                                </div>

                                <div className="user__editPhoto__box__btn common_btn" onClick={(e) => uploladcoverPhoto(e)}>
                                    update photos
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={editPhoto ? "user__editPhoto active" : `user__editPhoto`}>
                        
                        <div className="overlay">
                            <div className="user__editPhoto__box">
                                <div className="user__editPhoto__box__closeIcon" onClick={() => closeHandler()}> <CloseIcon /> </div>
                                <div className="user__editPhoto__box__title">
                                    edit profile photo
                                </div>
                                <div className="user__editPhoto__box__editCover">
                                    <div className="user__editPhoto__box__editCover__img">
                                        <img src={profile?.coverPhoto} alt="cover" />
                                    </div>
                                </div>
                                <div className="user__editPhoto__box__editProfilePhoto">
                                    {imagePreview ? (
                                        <div className="user__editPhoto__box__editProfilePhoto__img">
                                            <img src={imagePreview} width="100" height="200" alt="Product Preview" />
                                        </div>
                                    ) : (
                                        <input type="file" accept="image/*" onChange={createPostImagesChange} />
                                    )}
                                </div>

                                <div className="user__editPhoto__box__btn common_btn" onClick={(e) => uploadProfilePhoto(e)}>
                                    update photos
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            {/* )} */}
        </div >
    )
    
}


export default UserDetails