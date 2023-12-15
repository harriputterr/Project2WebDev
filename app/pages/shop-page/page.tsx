'use client'
import React from 'react'
import Image from 'next/image'
import img from '@/public/images/shop-page-images/primary-image-for-shop-page.webp'
import Navbar from '@/app/components/Navbar'
import FilterSideBar from '@/app/components/FilterSideBar'
import DisplayItems from '@/app/components/DisplayItems'
import {PriceProvider} from '@/app/contexts/filtered-price-state'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Footer from '@/app/components/Footer'

export default function page() {
  const {data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/pages/login-register-page?callbackUrl=/pages/shop-page')
    },
  });
  return (
    <>
      <PriceProvider>
        <Navbar />
        <div>
          <div className='flex'>
            <FilterSideBar />
            <div className='h-screen'>
              <div className='flex flex-row-reverse h-fit'>
                <div className='flex flex-row-reverse mt-20 mr-10'>
                  <Image src={img} alt="Cube image" fetchPriority="high" width={1239} height={280} object-fit="contain" object-position="50% 50%" />
                </div>
              </div>
              <DisplayItems />
            </div>
          </div>
        </div>
      </PriceProvider>

    </>
  )
}
