import { useState, useEffect } from 'react'
import { Product } from '../models/product'
import Catalog from "../../features/catalog/Catalog";
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:7263/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    function addProduct() {
        setProducts([...products,
        {
            id: products.length + 101,
            name: 'product' + (products.length + 1),
            price: 100.00 + (products.length * 100),
            brand: 'some brand',
            description: 'some description',
            imageUrl: 'https://picsum.photos/images' // random photo generator
        }])
    }

    return (
        <>
            <CssBaseline/>
            <Header />
            <Container>
                <Catalog products={products} addProduct={addProduct} />
            </Container>

        </>
    )
}

export default App
