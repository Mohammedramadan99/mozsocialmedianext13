'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Intro from './Intro'

import { registerUserAction, reset } from '../../store/usersSlice'
import Link from 'next/link'
const Alert = dynamic(() => import('../../components/Alert'))
export default function Page()
{
    const dispatch = useDispatch()
    const router = useRouter()
    //select state from store
    const { appErr, registered } = useSelector(store => store?.users);
    const [formError, setFormError] = useState("")
    const [formData, setFormDate] = useState({
        name: "",
        email: "",
        password: "",
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
        if (!formData.email || !formData.password || !formData.name)
        {
            setFormError("please enter username, email and password")
        } else
        {
            dispatch(registerUserAction(formData))
        }
    }
    useEffect(() =>
    {
        // if (appErr)
        // {
            // setErr(appErr)
            // dispatch(reset())
        // }
        if (registered)
        {
            router.push("/login");
        }
    }, [registered, appErr])

    return (
        <div className='register'>
            <div className="register__left">
                <Intro dir="register__left" />
            </div>
            <div className="register__right">
                <form className="register__right__form" onSubmit={submitHandler}>
                    <input type="text" placeholder='name' name="name" onChange={onChange} />
                    <input type="email" placeholder='email' name="email" onChange={onChange} />
                    <input type="password" placeholder='password' name="password" onChange={onChange} />
                    <input type="submit" className='register__right__form__submit' value="register" />
                    <Link href="/login" className="register__right__form__loginPageBtn"     >
                        already have email , <strong>login </strong>
                    </Link>
                </form>
            </div>
            {
                formError || appErr ? (
                    <Alert content={formError ||appErr} type='error' />
                ) : null
            }
        </div >
    )
}
