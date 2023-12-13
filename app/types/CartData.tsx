
type Item = {
    id: string;
    name: string;
    category: string;
    color: string;
    description: string;
    price: number;
    listImageUrl: string[];
}

export type CartItemData = {
    id: string;
    quantity: number;
    item: Item;
}

// export default interface Cart {
//     id: string;
//     cartItems: CartItem[];
// }

export type CartDataType = {
    id: string,
    cartItems: CartItemData[],
}