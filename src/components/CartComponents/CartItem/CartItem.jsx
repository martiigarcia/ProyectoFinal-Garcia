import React, {useState} from 'react';
import {
    Box,
    Card,
    CardMedia,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    tooltipClasses,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {styled} from "@mui/material/styles";
import useCounter from "../../../hooks/useCounter.jsx";

const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        color: 'rgb(255,255,255)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

function CartItem({product}) {

    const {count, increment, decrement, remove} = useCounter(1, product.stock);

    return (
        <>
            <Card variant={"outlined"} sx={{m: 1}}>
                <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={8}>

                            <Typography>{product.name}</Typography>
                            <Typography>${product.priceperpinta}</Typography>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    alignItems: "center",
                                    alignContent: "center"
                                }}
                            >
                                <Stack direction="row"
                                       justifyContent="center"
                                       alignItems="center"
                                       spacing={3}>

                                    {/*Boton de remover del carrito*/}
                                    <LightTooltip title={count > 1 ? "Eliminar un elemento" : "Remover del carrito"}
                                                  arrow>
                                        <IconButton
                                            sx={{
                                                borderColor: '#AF44CC',
                                                color: '#AF44CC',
                                                '&:hover': {
                                                    color: 'white',
                                                    borderColor: '#AF44CC',
                                                    backgroundColor: "#AF44CC",
                                                },
                                            }}
                                            onClick={count > 1 ? decrement : remove}
                                            disabled={count <= 0}
                                        >
                                            {count <= 1 ?
                                                <DeleteOutlineIcon/> : <RemoveIcon/>}
                                        </IconButton>
                                    </LightTooltip>

                                    <Typography variant="body1" sx={{m: "auto"}}>{product.quantity}</Typography>

                                    {/*Boton de agregar al carrito*/}
                                    <LightTooltip title="Sumar un elemento" arrow>
                                        <IconButton
                                            sx={{
                                                borderColor: '#AF44CC',
                                                color: '#AF44CC',
                                                '&:hover': {
                                                    color: 'white',
                                                    borderColor: '#AF44CC',
                                                    backgroundColor: "#AF44CC"
                                                },
                                            }}
                                            onClick={increment}
                                            disabled={count === product.stock}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </LightTooltip>
                                </Stack>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={6} md={4} sx={{display: {xs: 'none', sm: 'block'}}}>
                            <CardMedia
                                component="img"
                                sx={{width: 100, height: 100}}
                                image={product.image}
                                title="Imagen del producto"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default CartItem;