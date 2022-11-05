import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

/*
we need 3 things to make the pagination
1. count
2. per page: 12
3. total pages:
4. current Page
*/

const Shop = () => {
    // const { products, count } = useLoaderData();
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    // current page product state
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    useEffect(() => {
        const url = `http://localhost:4200/products?page=${page}&size=${size}`;
        // console.log(page, size);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size]) //after that we have to add a few line of code on backend

    //pagination count
    const totalPages = Math.ceil(count / size);



    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);
        console.log(ids);

        fetch('http://localhost:4200/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })


    }, [products])

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to="/orders">
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>

            <div className="pagination">
                <p>Current page: {page} and page Product {size}</p>
                {
                    [...Array(totalPages).keys()].map(number => <button
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? 'selected' : ''}
                    >
                        {number + 1}
                    </button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="6">6</option>
                    <option value="12" selected>12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;