'use client'
import { useState } from 'react';

const FilterComponent: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number>(50);
  const [isPriceCollapsed, setIsPriceCollapsed] = useState<boolean>(false);
  const [isColorCollapsed, setIsColorCollapsed] = useState<boolean>(false);
  const [isSizeCollapsed, setIsSizeCollapsed] = useState<boolean>(false);

  const toggleCollapse = (filterType: 'price' | 'color' | 'size') => {
    if (filterType === 'price') setIsPriceCollapsed(!isPriceCollapsed);
    if (filterType === 'color') setIsColorCollapsed(!isColorCollapsed);
    if (filterType === 'size') setIsSizeCollapsed(!isSizeCollapsed);
  };

  return (
    <div className="p-5 w-1/6 mt-16">
      <div className="border-b border-gray-300 mb-4">
        <h2 className="text-2xl mb-3">Browse by</h2>
      </div>
        <div className=' mb-10'>All Products</div>
      
      <div>
        <h2 className="text-lg  mb-2">Filter by</h2>
        
        <div className="mb-4 filter-toggle">
          <span className="text-left w-full filter-toggle-label" >
            Price
          </span>
          <button className='filter-toggle-icon' onClick={() => toggleCollapse('price')}>+</button>
          {isPriceCollapsed && (
            // <div className="mt-2">
            //   <input 
            //     type="range" 
            //     min={7.5} 
            //     max={130} 
            //     value={priceRange}
            //     onChange={(e) => setPriceRange(parseFloat(e.target.value))}
            //     className="w-full"
            //   />
            //   <div className="flex justify-between text-xs">
            //     <span>C$7.50</span>
            //     <span>C$130.00</span>
            //   </div>
            // </div>
          )}
        </div>

        <div className="mb-4">
          <button className="text-left w-full" onClick={() => toggleCollapse('color')}>
            Color
          </button>
          {isColorCollapsed && (
            <div className="mt-2">
              {/* Color options go here */}
            </div>
          )}
        </div>

        <div>
          <button className="text-left w-full" onClick={() => toggleCollapse('size')}>
            Size
          </button>
          {isSizeCollapsed && (
            <div className="mt-2">
              {/* Size options go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
