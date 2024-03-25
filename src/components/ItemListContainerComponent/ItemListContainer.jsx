import React from 'react';
import {Box, Typography} from "@mui/material";

function ItemListContainer({message}) {
    return (
        <>
            <Box>
                <Typography variant="h1">{message}</Typography>
                <Typography variant="body">Proximamente aca se encontrara el catalogo de productos...</Typography>
            </Box>
        </>
    );
}

export default ItemListContainer;