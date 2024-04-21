import React from 'react';
import {Box, Typography} from "@mui/material";
import ItemList from "../ItemList/ItemList.jsx";

function ItemListContainer({message}) {
    const category = window.location.pathname;
    //aca buscar productos para la ctaegoria especificada
    return (
        <>
            <Box>
                <Typography variant="h1">{message}</Typography>
                <Typography variant="body">Proximamente aca se encontrara el catalogo de productos...</Typography>
                <ItemList products={{products:"Productos x Categoria: "+ category}}/>
            </Box>
        </>
    );
}

export default ItemListContainer;