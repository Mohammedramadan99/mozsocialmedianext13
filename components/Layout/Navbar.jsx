"use client";
import React, { useEffect, useState } from 'react'
import Logo from '../Logo/Logo'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PostAddIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { logoutAction } from '../../store/usersSlice'
import Image from 'next/image'
import {useSession,signIn,signOut} from 'next-auth/react'

function Navbar()
{
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()

    console.log("router", router)
    let dropdownref = useRef()
    const store = useSelector(state => state?.users)
    const { userAuth,loggedOut, usersList } = store
    const currentUser = usersList !== {} && usersList && usersList?.find(user => user?._id === userAuth?._id)
    
    const [icons, setIcons] = useState([
        {
            icon: <HomeIcon />,
            title: 'Home',
            link: "/"
        },
        {
            icon: <PeopleOutlineIcon />,
            title: 'people',
            link: "/people"
        },
        {
            icon: <PostAddIcon />,
            title: 'profile',
            // link: `/user/63c86567dee09f71a9a5fee0`
            link: `/user/${userAuth?._id}`
        }
    ])
    console.log("navbar --> user", userAuth)
    const [startSearch, setStartSearch] = useState(false)
    const [activePage, setActivePage] = useState('Home')
    const [opened, setOpened] = useState(false)
    const [notificationOpened, setNotificationOpened] = useState(false)
    const logoutHandler = () =>
    {
        if(session){

            signOut()
            dispatch(logoutAction())
        } else {
            dispatch(logoutAction())
        }
    }
    useEffect(() =>
    {
        let handler = e =>
        {
            if (!dropdownref.current.contains(e.target))
            {
                setOpened(false)
                setNotificationOpened(false)
                console.log(dropdownref.current)
            }
        }
        document.addEventListener('mousedown', handler)
        return () =>
        {
            document.removeEventListener("mousedown", handler)
        }
    })
    return (
        <div className="mainNav">
            <div className="nav-container" >
                <div className=" mainNav__left">
                    <div className="mainNav__left__logo">
                        <Logo />
                    </div>
                    <div className={startSearch ? `mainNav__left__search__active` : `mainNav__left__search`} >
                        <SearchIcon onClick={() => setStartSearch(!startSearch)} />
                        <input type="text" />
                        <CloseIcon className={startSearch ? `mainNav__left__search__active__close` : `mainNav__left__search__close`} onClick={() => setStartSearch(false)} />
                    </div>
                </div>
                <div className=" mainNav__middle">
                    {/* <div className="row"> */}
                        {icons?.map((item, i) => (
                            <Link href={`${item.link}`} key={i} title={item.title}
                                className={pathname == item.link ? 'col mainNav__middle__link active' : 'col mainNav__middle__link'}
                                onClick={() => setActivePage(item.title)}  >
                                {item.icon}
                            </Link>

                        ))}
                    {/* </div> */}
                </div>
                <div className=" mainNav__right" ref={dropdownref}>
                    <Link href={`/user/${userAuth?._id}`} className="mainNav__right__item nav-icon" legacyBehavior >
                        {currentUser?.image ? (
                                <div className="mainNav__right__item img__rounded">
                                <Image src={currentUser?.image} width={100} height={100} alt="personal img" />
                                </div>
                        ) : (
                                <div className="mainNav__right__item__logoLitter">
                                    {userAuth?.name && userAuth.name[0]}
                                </div>
                            )}
                    </Link>
                    <div className="mainNav__right__item nav-icon" onClick={() => setNotificationOpened(!notificationOpened)}>
                        <NotificationsIcon />
                    </div>
                    <div className="mainNav__right__item nav-icon " onClick={() => setOpened(!opened)}> 
                        <SettingsIcon />
                    </div>

                    <ul className={opened ? `mainNav__right__dropDown options active` : "mainNav__right__dropDown inactive"} >
                        {userAuth && (
                            <DropdownItem icon={<LogoutIcon />} text="logout" func={logoutHandler} />
                        )}
                        {!userAuth  && (
                            <DropdownItem icon={<LoginIcon />} text="login" func={() => router.push('/login')} />
                        )}
                    </ul>
                    <ul className={notificationOpened ? `mainNav__right__dropDown notifications active` : "mainNav__right__dropDown inactive"} >
                        {/* <h6 style={{padding:"20px 20px 10px"}}> last 4 notifications </h6> */}
                        <div style={{padding:"10px",fontSize:"15px",textAlign:'center'}}>soon with Version 2</div>
                        {/* {userAuth && allNotifications?.length > 1 ? allNotifications?.map(item => <NotificationsItem text={item.title} userImg={item?.reactedUser?.profilePhoto} />) : (
                            <div style={{padding:"20px"}}>
                                there is no notifications now
                            </div>
                        )} */}
                    </ul>
                </div>
            </div >
        </div >
    )
}

function DropdownItem({ icon, text, func })
{
    return (
        <li className='mainNav__right__dropDown__item' onClick={func}>
            <div className="mainNav__right__dropDown__item__icon"> {icon} </div>
            <div className="mainNav__right__dropDown__item__text"> {text} </div>
        </li>
    )
}
function NotificationsItem({ userImg, text, func })
{
    return (
        <li className='mainNav__right__dropDown__item' onClick={func}>
            <div className="mainNav__right__dropDown__item__img" style={{flex:"3",position:"relative",width:"50px",height:"50px",borderRadius:"50%",overflow:"hidden"}}>
                {userImg && <Image src={userImg} layout="fill" objectFit="cover" alt="img" />}
                
            </div>
            <div className="mainNav__right__dropDown__item__text" style={{ flex: "9" }}> {text} </div>
        </li>
    )
}
export default Navbar