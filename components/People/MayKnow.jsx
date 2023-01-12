import React from 'react'
import { useSelector } from 'react-redux'
import Person from './Person'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '../../utils/animations'

function MayKnow()
{
    //! maybe i will need to dispatch the action of userslist
    const { usersList, userAuth } = useSelector(state => state.users)
    const usersFiltered = usersList?.filter(user => user?._id !== userAuth?._id)

    return (
        <div className='People__mainPage__mayKnow'>
            <div className="People__mainPage__mayKnow__title">people you may know</div>
            <motion.div variants={stagger} initial="initial" animate="animate" className="People__mainPage__mayKnow__list">
                {usersFiltered?.map((user, i) => <Person key={i} dir="People__mainPage__mayKnow__list" user={user} />)}
            </motion.div>
        </div>
    )
}

export default MayKnow