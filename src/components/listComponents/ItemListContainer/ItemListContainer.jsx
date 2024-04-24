import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import ItemList from "../ItemList/ItemList.jsx";
import {getProducts, getProductsByCategory} from "../../../data/asyncMock.jsx";
import {useParams} from "react-router-dom";

function ItemListContainer() {
    const [products, setProducts] = useState([]);
    const {categoryName} = useParams();


    useEffect(() => {

        let category;
        if (categoryName === "lager")
            category = "Rubia"
        if (categoryName === "red")
            category = "Roja"
        if (categoryName === "black")
            category = "Negra"
        if (categoryName === "ipa")
            category = "IPA"

        const asyncFunction = category ? getProductsByCategory : getProducts;

        asyncFunction(category).then(response => {
            console.log(response)
            setProducts(response)
        }).catch(error => {
            console.error("Error: " + error)
        })

    }, [categoryName]);

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "75%",
            }}>
                <ItemList products={products}/>
            </Box>
        </>
    );
}

export default ItemListContainer;