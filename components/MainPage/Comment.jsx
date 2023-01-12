import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'

export default function Comment({ comment })
{
    
    return (
        <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment">
            <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__img img__rounded">
                {comment?.user?.image && <Image src={comment?.user?.image} alt="img" width={100} height={100} />} 
            </div>
            <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details">
                <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__top"> 
                    <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__top__name">
                        {comment?.user?.name}
                    </div>
                    <div className='mainPage__middle__posts__container__commentsGroupe__comments__comment__details__top__time'>
                        {moment(comment?.createdAt).fromNow()}
                    </div>
                </div>
                <div className="mainPage__middle__posts__container__commentsGroupe__comments__comment__details__commentContent">
                    {comment?.description}
                </div>
            </div>
        </div>
    )
}
