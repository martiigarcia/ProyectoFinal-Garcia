import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail.jsx";
import {getProductById} from "../../../data/asyncMock.jsx";
import Loader from "../../Loader/Loader.jsx";

function ItemDetailContainer() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const {beerId} = useParams();

    useEffect(() => {
        setLoading(true)
        const asyncFunction = getProductById;

        asyncFunction(beerId).then(response => {
            setProduct(response)
            setLoading(false)
        }).catch(error => {
            console.error("Error: " + error)
        })

    }, []);

    return (
        <>
            {loading ? (
                <>
                    <Loader/>
                </>
            ) : (
                <>
                    {product && (
                        <ItemDetail product={product}/>
                    )}
                </>
            )}

        </>
    );
}

export default ItemDetailContainer;