import React from 'react'
import Image from 'next/image'
import img from '@/public/images/shop-page-images/primary-image-for-shop-page.webp'
import Navbar from '@/app/components/Navbar'
import Filter from '@/app/components/FilterSideBar'

export default function page() {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Filter />
        <div className='flex flex-row-reverse h-fit'>
          <div className='flex flex-row-reverse mt-20 mr-10'>
            <Image src={img} alt="Cube image" fetchPriority="high" width={1239} height={280} object-fit="contain" object-position="50% 50%" />
          </div>
        </div>
      </div>


      

    </div>
  )
}
