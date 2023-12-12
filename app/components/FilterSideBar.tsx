'use client'
import React, { useState } from 'react'
import { usePriceContext } from '@/app/contexts/filtered-price-state';

const FilterByPrice: React.FC = () => {
    const { price, setPrice } = usePriceContext();
    const [isPriceCollapsed, setIsPriceCollapsed] = useState<boolean>(false);

    const toggleCollapse = (filterType: 'price' | 'color' | 'size') => {
        if (filterType === 'price') setIsPriceCollapsed(!isPriceCollapsed);
    };
    return (
        <div className=' m-5'>
            <div className="w-1/6 mt-16">
                <div className="border-b border-gray-300 mb-4">
                    <h2 className="text-2xl mb-3">Browse by</h2>
                </div>
                <div className=' mb-10'>All Products</div>
            </div>
            <div>
                <h2 className="text-lg  mb-2">Filter by</h2>
                <div className="mb-4 filter-toggle">
                    <span className="text-left w-full filter-toggle-label" >
                        Price
                    </span>
                    <button className='filter-toggle-icon' onClick={() => toggleCollapse('price')}>+</button>
                </div>
                {isPriceCollapsed &&
                    <div className="mt-2">
                        <input
                            type="range"
                            min={7.5}
                            max={150}
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            className="w-full range-bar"
                        />
                        <div className="flex justify-between text-xs">
                            <span>C$7.50</span>
                            <span>C${price}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default FilterByPrice;
