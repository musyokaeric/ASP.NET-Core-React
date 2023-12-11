export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    type?: string; // optional
    brand: string;
    quantity?: number; // optional
}

// Convert JSON to Typescript interface
// https://json2ts.vercel.app/