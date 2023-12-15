'use client'
import {createContext, useState, useContext, ReactNode, SetStateAction, Dispatch} from 'react';
import Item from '../types/item';

interface ProductContextType {
    products: Item[] | undefined;
    setProducts: (products: Item[]) => void;
}

const defaultValue: ProductContextType = {
    products: undefined,
    setProducts: (products) => {}, 
};

export const ProductContext = createContext<ProductContextType>(defaultValue);

export const useProductContext = () => useContext(ProductContext);


interface ProductProviderProps{
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({children}) =>{
    const [products, setProducts] = useState<Item[] | undefined>();

    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

