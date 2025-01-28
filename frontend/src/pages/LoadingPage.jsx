import React from 'react'
import '../css/LoadingPage.css'
import { Link, } from 'react-router-dom'


const LoadingPage = () => {
    return (
        <div className='bg-cover bg-[url(https://images.pexels.com/photos/29333180/pexels-photo-29333180/free-photo-of-street-view-in-savannah-with-fire-truck-responding.jpeg)] loading w-screen h-screen flex justify-center items-center'>
            <div className="cover w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center">
                <div className="neon-container bg-transparent">
                    <h1 className="neon-text bg-transparent">Uber</h1>
                </div>
                <h1 className='p-8 text-neutral-100  text-4xl'>Get Start With Uber</h1>
                <div class="center-box">
                    <div class="animated-border-box-glow"></div>
                    <div class="animated-border-box">
                        <Link to="/usersignUp" className="bg-[black]  text-white px-48 py-7 rounded-lg text-4xl">
                            Continue
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage
