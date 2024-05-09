import React, {useEffect, useState} from 'react';
import {Box, CardHeader, Divider} from "@mui/material";
import ItemList from "../ItemList/ItemList.jsx";
import {getProducts, getProductsByCategory} from "../../../data/asyncMock.jsx";
import {useParams} from "react-router-dom";
import Loader from "../../Loader/Loader.jsx";
import {db} from "../../../config/firebase.jsx"

function ItemListContainer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {categoryName} = useParams();
    const [title, setTitle] = useState("Catálogo de cervezas")

    useEffect(() => {
        setLoading(true)
        let textTitle = "Catálogo de cervezas";

        let category;
        if (categoryName === "lager")
            category = "Rubia"
        if (categoryName === "red")
            category = "Roja"
        if (categoryName === "black")
            category = "Negra"
        if (categoryName === "ipa")
            category = "IPA"

        if (category) {
            setTitle(textTitle + ": " + category)
        } else {
            setTitle(textTitle)
        }

        const asyncFunction = category ? getProductsByCategory : getProducts;

        asyncFunction(category).then(response => {
            setProducts(response)
            setLoading(false)
        }).catch(error => {
            console.error("Error: " + error)
        })

    }, [categoryName]);

    return (
        <>
            {loading ? (
                <>
                    <Loader/>
                </>
            ) : (
                <>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        m: "auto",
                        width: "75%",
                    }}>
                        <CardHeader
                            title={title}
                        />
                        {/*<Divider sx={{backgroundColor: "#AF44CC", mb: 3, border:2}} variant="middle" />*/}
                        <ItemList products={products}/>
                    </Box>
                </>
            )}

        </>
    );
}

export default ItemListContainer;