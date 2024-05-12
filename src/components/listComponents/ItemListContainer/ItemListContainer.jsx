import React, {useEffect, useState} from 'react';
import {Box, CardHeader} from "@mui/material";
import ItemList from "../ItemList/ItemList.jsx";
import {useParams} from "react-router-dom";
import Loader from "../../Loader/Loader.jsx";
import {db} from "../../../config/firebase.jsx"
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import PageError from "../../PageError/PageError";

function ItemListContainer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState(false)
    const {categoryName} = useParams();
    const [title, setTitle] = useState("Catálogo de cervezas")

    useEffect(() => {
        setFail(false)
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

        const fetchProducts = async () => {
            const productsCollection = collection(db, 'products');

            const productsQuery = !category ?
                query(productsCollection, orderBy("type", "asc"))
                :
                query(productsCollection, where('type', '==', category))

            try {
                const response = await getDocs(productsQuery);
                const productsData = response.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setProducts(productsData);
                setLoading(false)

            } catch (error) {
                setLoading(false)
                setFail(true)
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts()

        // // Codigo para cargar productos desde data->asyncMock (archivo local)
        //
        // const asyncFunction = category ? getProductsByCategory : getProducts;
        //
        // asyncFunction(category).then(response => {
        //     setProducts(response)
        //     setLoading(false)
        // }).catch(error => {
        //     console.error("Error: " + error)
        // })

    }, [categoryName]);

    return (
        <>
            {loading ? (
                <>
                    <Loader/>
                </>
            ) : (
                <>
                    {fail ? (
                        <>

                            <PageError/>
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
            )}

        </>
    );
}

export default ItemListContainer;