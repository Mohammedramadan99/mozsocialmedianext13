import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Friend from '../../../components/UserDetails/Friend'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import {reset, updateUserAction} from '../../../store/usersSlice'
import FollowPersons from '../../../components/UserDetails/FollowPersons';
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '../../../utils/animations';
export default function Sidebar({ profile }) 
{
    const dispatch = useDispatch()
    const { userAuth, usersList, isUpdated } = useSelector(state => state.users)
    const [showFriends,setShowFriends] = useState({status:false,data:[],type:""})
    const followers = usersList?.filter(user =>
    {
        const u = profile?.followers?.find(f =>
        {
            if (user._id === f)
            {
                return user
            } else
            {
                return null
            }
        })
        return u
    })
    const following = usersList?.filter(user =>
    {
        const u = profile?.following?.find(f =>
        {
            if (user._id === f)
            {
                return user
            } else
            {
                return null
            }
        })
        return u
    })
    const [edit, setEdit] = useState(false)
    const [bio,setBio] = useState("")
    const [study, setStudy] = useState("")
    const [relationShip, setRelationShip] = useState("")

    const editProfileHandler = e =>
    {
        e.preventDefault()
        const data = {
            bio,
            relationShip,
            study
        }
        dispatch(updateUserAction(data))
    }

    useEffect(() =>
    {
        setRelationShip(profile?.relationShip)
        setBio(profile?.bio)
        setStudy(profile?.study)
    }, [profile])
    useEffect(() => {
        if (isUpdated) {
            setEdit(false)
            dispatch(reset())
        }
    }, [isUpdated])
    
    return (
        <motion.div variants={stagger} initial="initial" animate="animate"  className='user__bottom__sidebar'>
            <motion.div variants={fadeInUp} className="user__bottom__sidebar__introCard" style={{position:"relative"}}>
                <div className="user__bottom__sidebar__introCard__edit" onClick={() => setEdit(!edit)} style={{ position: "absolute", right: "0", paddingRight: "20px", cursor: "pointer" }}>
                    {profile?._id === userAuth?._id && <EditIcon /> }
                </div>
                
                <div className="user__bottom__sidebar__introCard__title">
                    intro
                </div>
                <div className="user__bottom__sidebar__introCard__content">
                    {!edit ? (
                        <motion.div variants={fadeInUp}>
                            <div className={`user__bottom__sidebar__introCard__content__bio`}>
                                {profile?.bio ? profile?.bio : "_____________________"}
                            </div>
                            <div className="user__bottom__sidebar__introCard__content__study">
                                <SchoolIcon style={{marginRight:"10px"}} /> {profile?.study ? profile?.study : "_____________________"}
                            </div>
                            <div className="user__bottom__sidebar__introCard__content__status">
                                <FavoriteIcon style={{ marginRight: "10px" }} /> {profile?.relationShip ? profile?.relationShip : "_____________________"}
                            </div>
                        </motion.div>    
                    ): (
                        <>
                            <form className='user__bottom__sidebar__introCard__content__form' onSubmit={e => editProfileHandler(e)}>
                                <div className="user__bottom__sidebar__introCard__content__form__bio">
                                    <label>bio</label>
                                    <input type="text" value={bio} onChange={e => setBio(e.target.value)} /> 
                                </div>
                                <div className="user__bottom__sidebar__introCard__content__form__study">
                                    <label>study</label>
                                    <input type="text" value={study} onChange={e => setStudy(e.target.value)} />
                                </div>
                                <div className="user__bottom__sidebar__introCard__content__form__status">
                                    <label> status </label>
                                    <input type="text" value={relationShip} onChange={e => setRelationShip(e.target.value)} />
                                </div>
                                <input type="submit" className='user__bottom__sidebar__introCard__content__form__btn common_btn' />
                            </form> 
                        </>
                    
                    )}
                </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="user__bottom__sidebar__friendsCard">
                <div className="user__bottom__sidebar__friendsCard__title">
                    followers
                </div>
                <div className="user__bottom__sidebar__friendsCard__friendsList">
                    {followers?.length >= 1 ? followers?.map(user => <Friend key={user?._id} user={user} />) : <div style={{textAlign:"center",width:"100%"}}> (0) followers </div>}
                </div>
                {
                    followers?.length >= 2 &&
                     <div 
                        className="user__bottom__sidebar__friendsCard__btn common_btn" 
                        onClick={() => setShowFriends({ status: true, data: followers,type:"followers" })}
                        >
                            see all
                    </div>
                }
                
            </motion.div>
            <motion.div variants={fadeInUp} className="user__bottom__sidebar__friendsCard">
                <div className="user__bottom__sidebar__friendsCard__title">
                    following
                </div>
                <div className="user__bottom__sidebar__friendsCard__friendsList">
                    {following.length > 0 ? following?.map(user => <Friend key={user?._id} user={user} />) : <div style={{ textAlign: "center", width: "100%" }}> (0) following </div>}
                </div>
                {
                    following?.length > 2 && <div className="user__bottom__sidebar__friendsCard__btn common_btn" onClick={() => setShowFriends({status:true,data: following,type:"following"})}>see all</div>
                }
            </motion.div>
            {showFriends.status && <FollowPersons data={showFriends?.data} title={showFriends.type === "following" ? `${profile?.name}'s following persons` : `${profile?.name}'s followers persons`} setShowFriends={setShowFriends} showFriends={showFriends} /> }
            
        </motion.div>
    )
}
