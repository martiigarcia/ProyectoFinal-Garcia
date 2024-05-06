import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {Divider, FormControl, Grid, InputAdornment, InputLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";

const ariaLabel = {'aria-label': 'description'};

function CheckoutForm() {


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


                    <Grid item xs={12} sm={12} md={12} sx={{ml: 2, mr: 2, mt: 2, mb: 2}}>
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
                                        title="Formulario de pago"
                                        subheader="Ingrese sus datos para completar la compra"
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
                                        mt: 2,
                                        mb: 2,
                                        width: "75%",
                                    }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth
                                                     sx={{
                                                         mb: 1,
                                                     }}
                                        >
                                            <TextField fullWidth variant="outlined" label="Nombre" color="secondary"
                                                       placeholder="Martina"/>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }}>
                                            <TextField fullWidth variant="outlined" label="Apellido" color="secondary"
                                                       placeholder="García"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }}>
                                            <TextField fullWidth variant="outlined" label="Correo" color="secondary"
                                                       placeholder="correo@example.com"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }} color="secondary"
                                                     variant="filled">
                                            <TextField fullWidth variant="outlined" label="Telefono" color="secondary"
                                                       placeholder="111689854"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }} color="secondary"
                                                     variant="filled">
                                            <TextField fullWidth variant="outlined" label="Metodo de pago"
                                                       color="secondary"
                                                       placeholder="Agregar metodos de pago"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{mt: 5, mb:2}}>
                                        <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                        <Button
                                            sx={{
                                                mt: 2, mb: 2,
                                                borderColor: '#AF44CC',
                                                color: '#AF44CC',
                                                '&:hover': {
                                                    color: 'white',
                                                    borderColor: '#AF44CC',
                                                    backgroundColor: "#AF44CC"
                                                },
                                            }}>Comprar</Button>
                                        <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default CheckoutForm;