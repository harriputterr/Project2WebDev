'use client'
import { useSession } from 'next-auth/react';
import React, { ReactHTMLElement, useEffect, useState } from 'react';
import { CartDataType } from '@/app/types/CartData'
import { CartItemData } from '@/app/types/CartData'
import { redirect } from 'next/navigation';
import Navbar from '@/app/components/Navbar';


const Cart = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/pages/login-register-page')
    },
  });
  const [cart, setCart] = useState<CartDataType | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // The below useState is being so that we can make 
  // the useEffect re-render the Cart Page on every button click.
  const [sideEffect, setSideEffect] = useState<boolean>(false);

  const handleQty = async (quantity: number, cartItemId: string, changeType: string) => {
    console.log("Quantity before", quantity);
    if (changeType === 'decrement') {
      quantity--;
    }
    else if (changeType === 'increment') {
      quantity++;
    }
    console.log("Quantity after", quantity);
    const response = await fetch(`/api/cart-with-items/${cartItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    setSideEffect(!sideEffect);
  }
  const handleCartItemDelete = async (cartItemId: string) => {
    const response = await fetch(`/api/cart-with-items/${cartItemId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setSideEffect(!sideEffect);
      alert("Item removed from cart");

    }
  }


  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(`/api/cart-with-items/${session?.user.id}`);
      const data = await response.json();
      setCart(data);

      if (data) {
        const total = data.cartItems.reduce((acc: number, cartItem: CartItemData) => acc + cartItem.item.price * cartItem.quantity, 0);
        setTotalPrice(total);
      }

    };
    if (session?.user.id) {
      fetchCart();
    }

  }, [sideEffect]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3 bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">My cart</h2>
          {
            !cart ? <>Loading...</> :

              <>{cart.cartItems.length == 0 && <h1>Your Cart is Empty</h1>}
                {cart.cartItems.map((cartItem, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between p-4">
                      <img src={cartItem.item.listImageUrl[0]} alt={cartItem.item.name} className="w-20 h-20 object-cover" />
                      <span className="font-semibold">{cartItem.item.name}</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleQty(cartItem.quantity, cartItem.id, 'decrement')} className="px-2 py-1 border">-</button>
                        <span>{cartItem.quantity}</span>
                        <button className="px-2 py-1 border" onClick={() => handleQty(cartItem.quantity, cartItem.id, 'increment')}>+</button>
                      </div>
                      <span>{`C$${Math.round(cartItem.item.price * cartItem.quantity)}`}</span>
                      <button onClick={() => handleCartItemDelete(cartItem.id)} className="text-gray-500 hover:text-gray-700">✕</button>
                    </div>
                  </div>
                ))}
              </>
          }

          <div className="flex justify-between items-center mt-6">
            <button className="text-blue-500 hover:text-blue-700">Enter a promo code</button>
            <button className="text-blue-500 hover:text-blue-700">Add a note</button>
          </div>
        </div>
        <div className="w-full lg:w-1/3 bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order summary</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>C${totalPrice}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Delivery</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total with tax </span>
            <span>C${totalPrice ? Math.round(totalPrice * 1.05) : 0}</span>
          </div>
          <button onClick={() => alert("Congratulations!, You have checked out all your items!")} className="w-full bg-black text-white p-4">Checkout</button>
        </div>
      </div>
    </div>

  );
}
export default Cart;
