import React, {useContext} from 'react';
import {Badge, Box} from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Context from "../../../context/CartContext.jsx";

function CartWidget({fontSize, color}) {
    const {getQuantity} = useContext(Context);
    return (
        <>
            <Box>
                <Badge badgeContent={getQuantity()} color="secondary">
                    <ShoppingCart sx={{fontSize: fontSize, color: color}}/>
                </Badge>
            </Box>
        </>
    );
}

export default CartWidget;