export interface ICart {
    cartId: number;
    customerId: string;
    cartItems: ICartItem[];
}

export interface ICartItem {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}