import React from 'react'
import { useSelector } from 'react-redux'
import Person from './Person'

export default function Followers()
{
    const { userAuth, usersList } = useSelector(state => state.users)
    const followers = usersList?.filter(user =>
    {
        const u = userAuth?.followers?.find(f =>
        {
            if (user?._id === f)
            {
                return user
            } else
            {
                return null
            }
        })
        console.log(u)
        return u
    })
    console.log(followers)
    return (
        <div className='People__mainPage__Followers'>
            <div className="People__mainPage__Followers__title">Followers</div>
            <div className="People__mainPage__Followers__list">
                {followers.length < 1 && <div style={{textAlign:"center"}}> no followers found </div>}
                {followers.map((user, i) => <Person key={i} dir="People__mainPage__Followers__list" user={user} />)}
            </div>
        </div>
    )
}
