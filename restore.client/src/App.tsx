import { useState, useEffect } from 'react'
import './App.css'
import { Product } from './product'

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
            <h1>Re-Store</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} - {product.price}</li>
                ))}
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </>
    )
}

export default App
