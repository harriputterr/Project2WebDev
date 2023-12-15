'use client'
import Navbar from '@/app/components/Navbar'
import ProductSlider from '@/app/components/ProductSlider'
import Item  from '@/app/types/item';
import { useEffect, useState } from 'react';


const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Item[] | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/display-items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, [])


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
