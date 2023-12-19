export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}

export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    brand: string;
    type: string;
    quantity: number;
}
