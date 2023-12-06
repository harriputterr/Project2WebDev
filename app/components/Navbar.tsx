import React from 'react'
import Image from 'next/image'

export default function Navbar() {
    return (
        <div className='primary-color p-10'>
            <div>
                <div className='text-center text-5xl m-10 '>
                    KHANGOORA
                </div>
                <ul className='flex flex-row justify-center space-x-10 '>
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About Us</li>
                    <li>Shop</li>
                </ul>
            </div>
            
        </div>
    )
}
