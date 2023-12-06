import React from 'react'
import Navbar from '@/app/components/Navbar'
import ProductSlider from '@/app/components/ProductSlider'
import { Product } from '@/app/types/product';

// Ok this is awesome
const HomePage: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product#1",
      description: "I am a product",
      price: "CAD 9.99",
      image: "@/app/images/air-freshner1.webp",
    },
    {
      id: 2,
      name: "Product#2",
      description: "I am a product",
      price: "CAD 9.99",
      image: "@/app/images/air-freshner1.webp",
    },
    {
      id: 3,
      name: "Product#3",
      description: "I am a product",
      price: "CAD 9.99",
      image: "@/app/images/air-freshner1.webp",
    },
    {
      id: 4,
      name: "Product#4",
      description: "I am a product",
      price: "CAD 9.99",
      image: "@/app/images/air-freshner1.webp",
    },
    {
      id: 5,
      name: "Product#5",
      description: "I am a product",
      price: "CAD 9.99",
      image: "@/app/images/air-freshner1.webp",
    },
    {
      id: 6,
      name: "Product#6",
      description: "I am a product",
      price: "CAD 9.99",
      image: "@/app/images/air-freshner1.webp",
    },
  ];
  return (
    <div className='primary-color'>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex justify-center bg-slate-400 home-page-image-parent-div'>
          <img src="https://static.wixstatic.com/media/f37599a3250341ebb244554882b84860.jpg/v1/fill/w_1225,h_569,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/f37599a3250341ebb244554882b84860.jpg" alt="Product Inventory" width="980" height="455" className="home-page-image" ></img>
        </div>
      </div>
      <ProductSlider products={products} />
    </div>
  )
}

export default HomePage;
