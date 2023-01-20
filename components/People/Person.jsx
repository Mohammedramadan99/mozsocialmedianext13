import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '../../utils/animations'

function Person({ dir, user })
{

    return (
        <motion.div variants={fadeInUp} initial="initial" animate="animate"  className={`${dir}__person`}>
            <div className={`${dir}__person__img`}>
                <img src={user?.image} alt="profilePhoto" />
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