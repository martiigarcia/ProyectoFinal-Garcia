import React from 'react';
import {Typography} from "@mui/material";

function ItemList({products}) {

    return (
        <>
            <Typography variant="body1">{products.products}</Typography>
        </>
    );
}

export default ItemList;