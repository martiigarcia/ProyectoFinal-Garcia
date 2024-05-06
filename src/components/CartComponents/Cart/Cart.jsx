import React, {useEffect, useState, useContext} from 'react';
import {Alert, Box, Button, Card, CardContent, Container, Divider, Grid, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import CartItemList from "../CartItemList/CartItemList.jsx";
import Context from "../../../context/CartContext.jsx";
import {Link} from "react-router-dom";
import Loader from "../../Loader/Loader.jsx";

function Cart() {
    const [loading, setLoading] = useState(false);

    const {cart, getTotal, removeItem, clearCart, getQuantity} = useContext(Context);

    return (
        <>
            {/*{loading ? (*/}
            {/*    <>*/}
            {/*        <Loader/>*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <>*/}
            <Container>
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: "auto",
                        mr: "auto",
                        mt: "auto",
                        mb: "auto",
                        width: "100%",
                        border: 2,
                        borderColor: "#AF44CC",
                        boxShadow: "1px 1px 20px rgba(175, 68, 204, 0.5)" // Cambia el color y la opacidad según lo necesites
                    }}
                >
                    <Grid item xs={12} sm={12} md={12} sx={{ml: 2, mr: 2, mt: 2}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        ml: "auto",
                                        mr: "auto",
                                        mt: 2,
                                        // mb: 2,
                                        width: "75%",
                                    }}>
                                    <CardHeader
                                        title="Mi Carrito"
                                        subheader="Información de mi carrito de compras"
                                    />
                                    <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        ml: "auto",
                                        mr: "auto",
                                        // mt: 2,
                                        mb: 2,
                                        width: "75%",
                                        // border: 2,
                                        // borderColor: "#090202",
                                        // boxShadow: "1px 1px 20px rgba(175, 68, 204, 0.5)" // Cambia el color y la opacidad según lo necesites
                                    }}>

                                    <Grid container spacing={1}>

                                        {/*Informacion del monto y pagos*/}
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    ml: 2, mr: 2,
                                                    // mt: 2,
                                                    mb: 2,
                                                }}>
                                                <CardHeader
                                                    title="Monto"
                                                    subheader="Información del monto"
                                                />
                                                <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>

                                                {cart.length !== 0 ? (
                                                    <Box sx={{mt: 3}}>

                                                        <Typography>Importe total a pagar:
                                                            ${getTotal().toFixed(2)}</Typography>
                                                        <Typography>Cantidad total de
                                                            productos: {getQuantity()}</Typography>


                                                        {/*Boton Comprar:*/}
                                                        <Grid item xs={12} sm={12} md={12} sx={{mb: 2, mt:3}}
                                                              container
                                                              direction="column"
                                                              justifyContent="space-between"
                                                              alignItems="center">

                                                            <Link to={"/checkout"}>
                                                                <Button variant="outlined"
                                                                        sx={{
                                                                            mb: 2,
                                                                            borderColor: '#AF44CC',
                                                                            color: '#AF44CC',
                                                                            '&:hover': {
                                                                                color: 'white',
                                                                                borderColor: '#AF44CC',
                                                                                backgroundColor: "#AF44CC"
                                                                            },
                                                                        }}
                                                                >
                                                                    Realizar compra
                                                                </Button>
                                                            </Link>

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
                                                                    onClick={() => clearCart()}
                                                            >
                                                                Vaciar carrito
                                                            </Button>


                                                        </Grid>


                                                    </Box>
                                                ) : (
                                                    <Typography>
                                                        No hay productos agregados al carrito
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>

                                        {/*Lista productos: */}
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    ml: 2,
                                                    mr: 2,
                                                    // mt: 2,
                                                    mb: 2,
                                                    maxHeight: '500px', // Altura máxima para el contenedor
                                                    overflowY: 'auto', // Añade desplazamiento vertical cuando sea necesario
                                                }}>
                                                <CardHeader
                                                    title="Productos"
                                                    subheader="Información de productos seleccionados"
                                                />
                                                <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                                <CardContent>

                                                    {cart.length !== 0 ? (
                                                        <CartItemList products={cart}/>
                                                    ) : (
                                                        <Typography>No hay productos agregados al
                                                            carrito</Typography>
                                                    )}

                                                </CardContent>
                                            </Box>
                                        </Grid>


                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            {/*    </>*/}
            {/*)}*/}

        </>
    );
}

export default Cart;
