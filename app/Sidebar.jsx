'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAction, followUserAction, LoggedInUserAction, unfollowUserAction, userProfileAction } from '../store/usersSlice'
// import Person from './Person'
import dynamic from 'next/dynamic';

const Person = dynamic(() => import('../components/MainPage/Person'), { ssr: false })

import {motion} from 'framer-motion'
import { fadeInUp, stagger } from '../utils/animations'
import { useSession } from 'next-auth/react'

function Sidebar()
{    const router = useRouter()
    const users = useSelector(state => state.users)
    // const [userAuth, setuserAuth] = useState({})
    const { usersList, profile, userAuth,
        usersCount,
        appErr } = users
        console.log("usersList #11",usersList)
    const usersFiltered = usersList !== {} && usersList && usersList?.filter(user => user?._id !== userAuth?._id)

        // console.log(status)

    return (
        <div className='mainPage__left__sidebar'>
            <div className="mainPage__left__sidebar__G1">
                <Link  href={`/user/${userAuth?._id}`} className="mainPage__left__sidebar__G1__Imgs">
                    <div className="mainPage__left__sidebar__G1__Imgs__coverImg">
                        <div style={{ height: "200px" }}>
                            {userAuth?.coverPhoto && <Image src={userAuth?.coverPhoto} alt="photo" fill={true} style={{objectFit:'cover'}} />}
                        </div>
                    </div>
                    <div className="mainPage__left__sidebar__G1__Imgs__profileImg img__rounded">
                        <div className="img--container">
                            {userAuth?.image && <Image src={userAuth?.image} alt="photo" width={100} height={100} />}
                        </div>
                    </div>
                </Link>
                <div className="mainPage__left__sidebar__G1__name">
                    {userAuth?.name}
                </div>
                <div className="mainPage__left__sidebar__G1__follow">
                    <div className='mainPage__left__sidebar__G1__follow__item'>
                        Followers {userAuth?.followers?.length}
                    </div>
                    <div className='mainPage__left__sidebar__G1__follow__item'>
                        Following {userAuth?.following?.length}
                    </div>
                </div>
            </div>
            <div className="mainPage__left__sidebar__G2">
                <div className="mainPage__left__sidebar__G2__head">
                    people you may know
                </div>
                <motion.div variants={stagger} initial="initial" animate="animate" className="mainPage__left__sidebar__G2__persons">
                    {usersFiltered.length >= 1 ? usersFiltered?.map((user, inx) => (
                        <Person key={inx} user={user} />
                    )) : "there's no persons"}
                    {/* {followStatus()} */}
                    {usersCount > 4 && usersCount !== 5 && <div className="mainPage__left__sidebar__G2__persons__seeMore common_btn" onClick={() => router.push("/people")}> more </div>}
                </motion.div>
            </div>
        </div>
    )
    }



export default Sidebar
