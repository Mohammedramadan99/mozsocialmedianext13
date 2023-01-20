'use client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
const Intro = dynamic(() => import('../register/Intro'))
import { loginUserAction, reset } from '../../store/usersSlice'
const Alert = dynamic(() => import('../../components/Alert'))
import GoogleIcon from '@mui/icons-material/Google'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {useSession,signIn} from 'next-auth/react'

export default function login()
{
    const dispatch = useDispatch()
    const router = useRouter()
    const { userAuth, loading, serverErr, appErr } = useSelector(state => state?.users);
    const { data: session } = useSession()
    const [formData, setFormDate] = useState({
        email: "col@g.com",
        password: "cccccccc",
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
    if (userAuth || session)
    {
        dispatch(reset())
        router.push("/");
    }
    
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
                <form className="login__right__form" onSubmit={submitHandler}>
                    <input type="text" placeholder='email' value={formData.email} name="email" onChange={onChange} />
                    <input type="password" placeholder='password' name="password" value={formData.password} onChange={onChange} />
                    <input type="submit" className='login__right__form__submit' value="login" />

                    {/* <Link href="#" className="login__right__form__link">
                        forgotten password
                    </Link> */}
                    <Link href="/register" className="login__right__form__createNewAccbtn">
                        create new account
                    </Link>
                </form>
                {!session && (
                    <div className='google_account'>
                        <GoogleIcon/>
                        <div onClick={() => signIn()}> log in with google </div>
                    </div>
                )}
            </div>
            {
                serverErr || appErr ? (
                    <Alert content={appErr} type='error' />
                ) : null
            }
        </div >
    )
}
