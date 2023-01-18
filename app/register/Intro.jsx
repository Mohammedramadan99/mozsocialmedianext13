import React from 'react'
import Logo from '../../components/Logo/Logo'

export default function Intro({ dir })
{
    return (
        <div className={`${dir}__intro`}>
            <div className={`${dir}__intro__logo`}> <Logo /> </div>
            <div className={`${dir}__intro__title`}>moz social media app </div>
            <div className={`${dir}__intro__text`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores esse fuga et cupiditate quod maxime.</div>

        </div>
    )
}
