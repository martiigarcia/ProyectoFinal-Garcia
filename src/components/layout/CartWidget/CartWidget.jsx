import React from 'react';
import {Badge, Box} from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';

function CartWidget() {
    return (
        <>
            <Box>
                <Badge badgeContent={4} color="secondary">
                    <ShoppingCart sx={{fontSize: 40, color: "white"}}/>
                </Badge>
            </Box>
        </>
    );
}

export default CartWidget;