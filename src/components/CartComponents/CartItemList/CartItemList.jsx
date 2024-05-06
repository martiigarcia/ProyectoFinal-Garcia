import React, {useEffect, useState} from 'react';
import {getProducts, getProductsByCategory} from "../../../data/asyncMock.jsx";
import CartItem from "../CartItem/CartItem.jsx";
import {Box} from "@mui/material";

function CartItemList({products}) {

    useEffect(() => {

    }, []);

    return (
        <>
            {products.map((product) => (
                <Box key={product.id}>
                    <CartItem product={product}/>
                </Box>
            ))}
        </>
    );
}

export default CartItemList;