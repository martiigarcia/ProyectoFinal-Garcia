import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart.js";
import {Box, ButtonGroup, Stack, Tooltip, tooltipClasses, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";

const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

function ItemCount({product}) {
    const [count, setCount] = useState(0);

    const handleInc = () => {
        if (product.stock > count)
            setCount(count + 1)
    }
    const handleDec = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }


    return (
        <>
            <Box sx={{flexGrow: 1, mt: 5, alignItems: "center", alignContent: "center"}}>
                <Typography variant="body1" sx={{mb: 1}}>Stock actual: {product.stock}</Typography>
                <Stack direction="row"
                       justifyContent="center"
                       alignItems="center"
                       spacing={3}>
                    <Button variant="outlined"
                            sx={{
                                borderColor: '#AF44CC',
                                color: '#AF44CC',
                                '&:hover': {
                                    color: 'white',
                                    borderColor: '#AF44CC',
                                    backgroundColor: "#AF44CC"
                                },
                            }}
                            onClick={handleDec}
                            disabled={count === 0}
                    >-</Button>

                    <Typography variant="body1" sx={{m: "auto"}}>{count}</Typography>

                    <Button variant="outlined"
                            sx={{
                                borderColor: '#AF44CC',
                                color: '#AF44CC',
                                '&:hover': {
                                    color: 'white',
                                    borderColor: '#AF44CC',
                                    backgroundColor: "#AF44CC"
                                },
                            }}
                            onClick={handleInc}
                            disabled={count === product.stock}
                    >+</Button>
                </Stack>

                <Tooltip title="Para agregar al carrito debe sumar más de un producto" arrow
                         disableHoverListener={count !== 0}>
                    <span>
                    <Button
                        sx={{
                            mt: 2,
                            mb: 2,
                            bgcolor: "#AF44CC",
                            color: "white",
                            '&:hover': {
                                color: 'white',
                                backgroundColor: "#d96cff"
                            },
                        }}
                        aria-label="add to cart" variant="contained"
                        disabled={count === 0}
                        endIcon={
                            <AddShoppingCartIcon style={{color: count === 0 ? "#989898" : "white"}}/>
                        }>
                        Agregar al carrito
                    </Button>
                    </span>
                </Tooltip>
            </Box>
        </>
    );
}

export default ItemCount;