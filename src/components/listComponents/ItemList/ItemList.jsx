import React, {useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import Item from "../Item/Item.jsx";

function ItemList({products}) {

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {products.map((product) => (
                        <Grid item xs={3} sm={3} md={3} key={product.id}>
                            <Item product={product}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default ItemList;