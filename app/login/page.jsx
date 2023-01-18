'use client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const Intro = dynamic(() => import('../register/Intro'))

// import Intro from '../components/Auth/Intro'
import { loginUserAction, reset } from '../../store/usersSlice'
// import Alert from '../components/Alert'
const Alert = dynamic(() => import('../../components/Alert'))

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useSession,signIn,signOut} from 'next-auth/react'

export default function login()
{
    const dispatch = useDispatch()
    const router = useRouter()
    const { userAuth, loading, serverErr, appErr } = useSelector(state => state?.users);

    const [formData, setFormDate] = useState({
        email: "mo@gmail.com",
        password: "mmmmmmmm",
    });
    const onChange = (e) =>
    {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const submitHandler = e =>
    {
        e.preventDefault()
        dispatch(loginUserAction(formData))
    }
    if (userAuth)
    {
        dispatch(reset())
        router.push("/");
    }
    const { data: session } = useSession()
    useEffect(() =>
    {
        const data = { ...session?.user, accountType: "google" }
        if (session?.user)
        {
            dispatch(loginUserAction(data))
        }

    }, [dispatch, session])
    return (
        <div className='login'>
            <div className="login__left">
                <Intro dir="login__left" />
            </div>
            <div className="login__right">
                {session ? (
                    <div>
                        welcome {session.user.email}
                        <div onClick={() => signOut()}> sign out </div>
                    </div>                
                ) : (
                    <>
                        you're not sign in yet!
                        <div onClick={() => signIn()}> log in </div>
                    </>
                )}
                <form className="login__right__form" onSubmit={submitHandler}>
                    <input type="text" placeholder='email' value={formData.email} name="email" onChange={onChange} />
                    <input type="password" placeholder='password' name="password" value={formData.password} onChange={onChange} />
                    <input type="submit" className='login__right__form__submit' value="login" />

                    <Link href="#" className="login__right__form__link">
                        forgotten password
                    </Link>
                    <Link href="/register" className="login__right__form__createNewAccbtn">
                        create new account
                    </Link>
                </form>
            </div>
            {
                serverErr || appErr ? (
                    <Alert content={appErr} type='error' />
                ) : null
            }
        </div >
    )
}
