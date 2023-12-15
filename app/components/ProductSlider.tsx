import React from "react";
import Slider from "react-slick";
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '@/public/images/product-images/bag1.webp'
import Item from '@/app/types/item'

export default function ProductSlider({ products }: {products: Item[] | undefined} ) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // image height: 330px
  return (
    <div className="primary-color " style={{ padding: '80px' }}>
      <Slider  {...settings}>
        {
          products && 
          <>
          {products.map(product => (
            <div className="border-2 product-slider-parent-div object-contain" key={product.id} style={{ padding: '10px' }}>
              <div className=" w-fit object-contain ">
                <Image src={product.listImageUrl[0]} alt={product.name} height='330' width='330' />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
          
          </>
        }

      </Slider>
    </div>
  );
}