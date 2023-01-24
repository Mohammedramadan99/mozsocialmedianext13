'use client';

// import Posts from '../components/MainPage/Posts'
// import Sidebar from './Sidebar'
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
    ssr: false,
  })
const Posts = dynamic(() => import('../components/MainPage/Posts'), {
    ssr: false,
  })
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
