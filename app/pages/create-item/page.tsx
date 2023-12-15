import React from 'react'
import CreateItem from '@/app/components/CreateItem'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
export default function page() {
  return (
    <div>
        <Navbar />
        <CreateItem />
        <Footer />
    </div>
  )
}
