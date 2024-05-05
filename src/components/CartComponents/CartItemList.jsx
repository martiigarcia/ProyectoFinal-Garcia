import React, {useEffect, useState} from 'react';
import {getProducts, getProductsByCategory} from "../../data/asyncMock.jsx";
import CartItem from "./CartItem.jsx";

function CartItemList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const asyncFunction = getProductsByCategory;

        asyncFunction("Rubia").then(response => {
            setProducts(response)
        }).catch(error => {
            console.error("Error: " + error)
        })

    }, []);

    return (
        <>
            {products.map((product) => (
                <CartItem product={product}/>
            ))}
        </>
    );
}

export default CartItemList;