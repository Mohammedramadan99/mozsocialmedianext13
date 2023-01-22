import Link from 'next/link'
import React from 'react'
export default function Friend({ user })
{
    console.log(user)
    return (
        <Link href={`/user/${user._id}`} className='user__bottom__sidebar__friendsCard__friendsList__friend'>
            <div className="user__bottom__sidebar__friendsCard__friendsList__friend__img">
                <img src={user?.image} alt="img" />
            </div>
            <div className="user__bottom__sidebar__friendsCard__friendsList__friend__name">{user.name}</div>
        </Link>
    )
}
