import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail.jsx";
import {getProductById, getProducts, getProductsByCategory} from "../../data/asyncMock.jsx";

function ItemDetailContainer() {
    const [product, setProduct] = useState({});
    const {beerId} = useParams();

    useEffect(() => {
        console.log(beerId)

        const asyncFunction = getProductById;

        asyncFunction(beerId).then(response => {
            console.log(response)
            // setProduct(response)
        }).catch(error => {
            console.error("Error: " + error)
        })

    }, []);

    return (
        <>
            {console.log(product)}
            {product && (
                <ItemDetail product={product}/>
            )}
        </>
    );
}

export default ItemDetailContainer;