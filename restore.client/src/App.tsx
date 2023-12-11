import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [products, setProducts] = useState([
        { name: 'product1', price: 100.00 },
        { name: 'product2', price: 100.00 },
    ]);

    useEffect(() => {
        fetch('https://localhost:7263/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    function addProduct() {
        setProducts([...products, { name: 'product' + (products.length + 1), price: 100.00 + (products.length * 100) }])
    }

    return (
        <>
            <h1>Re-Store</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - {product.price}</li>
                ))}
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </>
    )
}

export default App
