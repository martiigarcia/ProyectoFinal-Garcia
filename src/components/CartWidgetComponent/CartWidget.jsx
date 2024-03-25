import React from 'react';
import {Box} from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';

function CartWidget() {
    return (
        <>
            <Box>
                <ShoppingCart sx={{fontSize: 40, color:"white"}}/>
            </Box>
        </>
    );
}

export default CartWidget;