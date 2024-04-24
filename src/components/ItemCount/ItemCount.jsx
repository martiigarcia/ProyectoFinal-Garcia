import React, {useState} from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart.js";
import {Box, Stack, Tooltip, tooltipClasses, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function ItemCount({product}) {
    const [count, setCount] = useState(1);

    const handleInc = () => {
        if (product.stock > count)
            setCount(count + 1)
    }
    const handleDec = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const handleClick = () => {
        const text = `Se han agregado ${count} productos al carrito exitosamente.`;

        MySwal.fire({
            title: <p>¡Éxito!</p>,
            html: text,
            icon: "success",
        }).then(() => {
           console.log("Exito...")
        })
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
                            disabled={count === 1}
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

                <Tooltip title="Para agregar al carrito debe sumar al menos un producto" arrow
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
                        onClick={handleClick}
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