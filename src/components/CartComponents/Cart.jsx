import React from 'react';
import {Alert, Box, Button, Card, CardContent, Container, Divider, Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import CartItemList from "./CartItemList.jsx";

function Cart() {
    return (
        <>
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
                                        mb: 2,
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
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        ml: "auto",
                                        mr: "auto",
                                        mt: 2,
                                        mb: 2,
                                        width: "75%",
                                        border: 2,
                                        borderColor: "#090202",
                                        boxShadow: "1px 1px 20px rgba(175, 68, 204, 0.5)" // Cambia el color y la opacidad según lo necesites
                                    }}>

                                    <Grid container spacing={1}>

                                        {/*Informacion del monto y pagos*/}
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Card
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    ml: 2, mr: 2,
                                                    mt: 2,
                                                    mb: 2,
                                                    border: 2,
                                                    borderColor: "#090202",
                                                    boxShadow: "1px 1px 20px rgba(175, 68, 204, 0.5)" // Cambia el color y la opacidad según lo necesites
                                                }}>
                                                <CardHeader
                                                    title="Monto"
                                                    subheader="Información del monto"
                                                />
                                            </Card>
                                        </Grid>

                                        {/*Lista productos: */}
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    ml: 2, mr: 2,
                                                    mt: 2,
                                                    mb: 2,
                                                   }}>
                                                <CardHeader
                                                    title="Productos"
                                                    subheader="Información de productos seleccionados"
                                                />
                                                <Divider sx={{backgroundColor: "#d91919"}} variant="middle"/>
                                                <CardContent>
                                                    <CartItemList/>
                                                </CardContent>
                                            </Box>
                                        </Grid>

                                        {/*Boton Comprar:*/}
                                        <Grid item xs={12} sm={12} md={12} sx={{mb: 2}}>
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
                                                    onClick={console.log("Se realizara la compra")}
                                            >
                                                Realizar compra
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default Cart;
