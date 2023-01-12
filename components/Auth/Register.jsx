import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Intro from './Intro'
import { registerUserAction, reset } from '../../store/usersSlice'
import Link from 'next/link'
export default function Register()
{
    const dispatch = useDispatch()
    const router = useRouter()
    //select state from store
    const storeData = useSelector(store => store?.users);
    const { loading, appErr, serverErr, registered } = storeData;
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
        if (appErr)
        {
            dispatch(reset())
        }
        if (registered)
        {
            dispatch(reset())
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
                    {appErr || formError && <div style={{ border: "1px solid #f00", color: "#f00", padding: "10px 20px", fontWeight: "500" }}> {appErr || formError} </div>}
                    <input type="text" placeholder='name' name="name" onChange={onChange} />
                    <input type="email" placeholder='email' name="email" onChange={onChange} />
                    <input type="password" placeholder='password' name="password" onChange={onChange} />
                    <input type="submit" className='register__right__form__submit' value="register" />
                    <Link href="/login" className="register__right__form__loginPageBtn"     >
                        already have email , <strong>login </strong>
                    </Link>
                </form>
            </div>
        </div >
    )
}
