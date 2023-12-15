'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react'
import Item from '@/app/types/item'
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


export default function Product() {
  const { data: session } = useSession();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const searchParams = useSearchParams();
  const itemId = searchParams.get('id');

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('purple');

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`/api/display-items/${itemId}`);
      const data = await response.json();
      setItem(data);
    };
    getItem();
  }, [])

  const handleQuantityChange = (event: any) => {
    setQuantity(event.target.value);
  };

  const addToCart = async (userId: string | undefined, itemId: string | null, quantity: number) => {
    const response = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, itemId, quantity }),
    });
    if (response.ok) {
      alert("Item added successfully");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">

        <main className="flex flex-row items-start justify-center gap-8 p-4">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 relative mb-4">
              <img src={item?.listImageUrl[0]} alt="Product Image" className=' object-contain ' />
            </div>
            <div className="flex">
              {/* Thumbnail images */}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{item?.name}</h1>
            <p className="text-gray-500">SKU: {item?.id}</p>
            <p className="text-xl font-semibold my-4">CAD {item?.price}</p>
            <div className="flex space-x-2 my-4">
              {/* Color selection circles */}
              <button
                className={`w-6 h-6 rounded-full ${selectedColor === 'purple' ? 'bg-purple-600' : 'bg-purple-300'}`}
                onClick={() => setSelectedColor('purple')}
              />
              <button
                className={`w-6 h-6 rounded-full ${selectedColor === 'black' ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => setSelectedColor('black')}
              />
            </div>
            <div className="flex border border-gray-300 rounded my-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2"
              >
                <MinusIcon className="w-6 h-6" />
              </button>
              <input
                type="number"
                className="w-16 text-center"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2"
              >
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={() => addToCart(session?.user.id, itemId, quantity)}
              className="bg-black text-white py-2 px-4 rounded my-4"
            >
              Add to Cart
            </button>
            {/* Product info, return & refund policy, etc. */}
          </div>
        </main>

      </div>
      <Footer />
    </div>


  );
}
