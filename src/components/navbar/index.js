import React from 'react'
import logo from '../../images/logo.png'
import { Link} from 'react-router-dom'
import { SubmitPhoto } from '../submit_photo'
export const Navbar = () => {
    return (
        <>
            <div className='m-3 px-5 py-3 flex justify-between items-center'>
                <div className='w-56'>
                    <img src={logo}></img>
                </div>
                <div className='flex'>
                    <Link to={'/collection'}><button className='mr-5 font-bold text-xl'>Your Collection</button></Link>
                    {/* <SubmitPhoto/> */}
                    <button className='bg-black text-white text-xl rounded-md p-3'>Submit a photo</button>
                </div>
            </div>
        </>
    )
}
