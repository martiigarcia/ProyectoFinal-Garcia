import React, {useContext} from 'react';
import {Badge, Box} from "@mui/material";
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Context from "../../../context/CartContext.jsx";

function CartWidget() {
    const {getQuantity} = useContext(Context);
    return (
        <>
            <Box>
                <Badge badgeContent={getQuantity()} color="secondary">
                    <ShoppingCart sx={{fontSize: 40, color: "white"}}/>
                </Badge>
            </Box>
        </>
    );
}

export default CartWidget;