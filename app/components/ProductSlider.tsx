"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "@/public/images/product-images/bag1.webp";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ProductSliderProps {
  products: Product[];
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}


export default class ProductSlider extends Component<ProductSliderProps> {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    // image height: 330px
    return (
      <div className="primary-color" style={{ padding: "80px" }}>
        <Slider  {...settings}>
          {this.props.products.map((product) => (
            <div
              className="product-slider-parent-div object-contain font-light text-sm"
              key={product.id}
              style={{ padding: "10px" }}
            >
              <div className="w-fit object-contain">
                <Image src={product.image} alt={product.name} height="330" width="330" />
                <div className="p-2">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
