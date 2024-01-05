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

export interface ProductParams {
    orderBy: string;
    search?: string;
    types?: string[];
    brands?: string[];
    pageNumber: number;
    pageSize: number;
}

// Convert JSON to Typescript interface
// https://json2ts.vercel.app/
