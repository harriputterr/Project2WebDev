'use client'
import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    return (
        <div className='primary-color p-10'>
            <div>
                <div className='flex text-center text-5xl m-10 justify-center'>
                    <div>
                        ShopSphere
                    </div>
                    <div className='relative left-96 text-lg '>
                        <Link href={'/pages/view-cart-page'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
                        </svg></Link>
                    </div>
                    <div className='flex relative left-96 text-lg'>
                    {session ?
                            <>
                                <div className='items-center'>Hello {session.user?.name}</div>
                                <button onClick={() => { signOut(); router.push('/pages/home-page') }} className=' text-right'>Sign Out</button>
                            </>
                            :
                            <>
                                <Link href={'/pages/login-register-page'} className=' text-right'>Log In</Link>
                            </>
                        }
                    </div>
                </div>
                <ul className='flex flex-row justify-center space-x-10 '>
                    <Link href={'/pages/home-page'}>Home</Link>
                    <Link href={'/'}>Contact</Link>
                    <Link href={''}>About Us</Link>
                    <Link href={'/pages/shop-page'}>Shop</Link>
                    {session?.user.isAdmin ? <Link href={'/pages/create-item'}>Create Item</Link> : <></>}
                </ul>
            </div>


        </div>
    )
}
