import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fadeInUp } from '../../utils/animations'
import {motion} from 'framer-motion'
export default function Person({ user })
{
    return (
        <motion.div variants={fadeInUp} className="mainPage__left__sidebar__G2__persons__person" >
            <Link href={`/user/${user?._id}`} className="mainPage__left__sidebar__G2__persons__person__info" style={{ color: "#000" }}>
                <div className="mainPage__left__sidebar__G2__persons__person__info__img img__rounded">
                    {/* <div className="img--container"> */}
                        {user?.image  && <Image src={user?.image} fill={true} alt="person" />}
                    {/* </div> */}
                </div>
                <div className="mainPage__left__sidebar__G2__persons__person__info__name">{user?.name}</div>
            </Link>
            {/* {followStatus(user)} */} 

            <Link href={`/user/${user?._id}`} className="mainPage__left__sidebar__G2__persons__person__info__btn">
                visit
            </Link>
        </motion.div>
    )
}
