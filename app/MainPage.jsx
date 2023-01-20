'use client';

import Posts from '../components/MainPage/Posts'
import Sidebar from './Sidebar'

function MainPage()
{
    return (
        <div className='mainPage'>
            <div className="mainPage-container">
                 <div className="mainPage__left"> <Sidebar /> </div>
                <Posts direction="mainPage__middle" /> 
            </div>
        </div>
    )
}
export default MainPage
