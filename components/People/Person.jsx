import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '../../utils/animations'
function Person({ dir, user })
{
    // const { userAuth } = useSelector(state => state.users)

    return (
        <motion.div variants={fadeInUp} initial="initial" animate="animate"  className={`${dir}__person`}>
            <div className={`${dir}__person__img`}>
                <img src={user?.profilePhoto} alt="profilePhoto" />
            </div>
            <div className={`${dir}__person__info`}>
                <div className={`${dir}__person__info__name`}>
                    {user?.name}
                </div>
                <Link href={`/user/${user._id}`} className={`${dir}__person__info__btn`}>
                    profile
                </Link>
            </div>
        </motion.div>
    )
}

export default Person