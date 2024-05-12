import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail.jsx";
import {getProductById} from "../../../data/asyncMock.jsx";
import Loader from "../../Loader/Loader.jsx";
import {doc, getDoc} from 'firebase/firestore'
import {db} from "../../../config/firebase.jsx"
import Context from "../../../context/CartContext.jsx";

function ItemDetailContainer() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const {beerId} = useParams();
    const {currentQuantity} = useContext(Context);

    useEffect(() => {
        setLoading(true)
        // // Para obtener el producto desde data->asyncMock (en el achivo local)
        //
        // const asyncFunction = getProductById;
        //
        // asyncFunction(beerId).then(response => {
        //     setProduct(response)
        //     setLoading(false)
        // }).catch(error => {
        //     console.error("Error: " + error)
        // })

        const fetchProduct = async () => {

            const productQuery = doc(db, 'products', beerId)
            const response = await getDoc(productQuery)
            const item = {
                ...response.data(),
                id: response.id
            }
            setProduct(item)
            setLoading(false)
        }

        fetchProduct()

    }, [beerId]);

    return (
        <>
            {loading ? (
                <>
                    <Loader/>
                </>
            ) : (
                <>
                    {product && (
                        <ItemDetail
                            product={product}
                            currentQuantity={currentQuantity(beerId)}
                        />
                    )}
                </>
            )}

        </>
    );
}

export default ItemDetailContainer;