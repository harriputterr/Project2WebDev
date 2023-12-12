'use client'
import {createContext, useState, useContext, ReactNode} from 'react';

interface PriceContextType{
    price: number;
    setPrice: (price: number) => void;
}

const defaultValue: PriceContextType = {
    price: 0,
    setPrice: price => {}
  };

const PriceContext = createContext<PriceContextType>(defaultValue);

export const usePriceContext = () => useContext(PriceContext);

interface PriceProviderProps{
    children: ReactNode;
}

export const PriceProvider: React.FC<PriceProviderProps> = ({children}) =>{
    const [price, setPrice] = useState<number>(150);

    return(
        <PriceContext.Provider value={{price, setPrice}}>
            {children}
        </PriceContext.Provider>
    )
}

