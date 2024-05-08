import React, {useContext, useState} from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {Divider, FormControl, Grid, InputAdornment, InputLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
import Context from "../../../context/CartContext.jsx";

const MySwal = withReactContent(Swal)

function CheckoutForm() {
    const {cart, getTotal, clearCart} = useContext(Context)
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        repeatedEmail: '',
        phone: '',
        paymentMethod: ''
    })
    const [order, setOrder] = useState({})
    const [emailMatch, setEmailMatch] = useState(true)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    const validateEmails = () => {
        if (user.email === user.repeatedEmail) {
            setEmailMatch(true)
        } else {
            setEmailMatch(false)
        }
    }
    const validateForm = () => {
        const errors = {}
        if (!user.name) {
            errors.name = "Tenés que agregar un nombre"
        }
        // mínimo de caracteres para el nombre
        // número de teléfono válido, chequear algún mínimo
        // pueden validar directamente acá los emails
        setError(errors)
        return Object.keys(errors).length === 0
    }

    const buy = () => {

        const order = {
            buyer: user,
            cart: cart,
            total: getTotal(),
            date: "hoy"
        }

        const text = `La compra se ha realizado exitosamente.<br/>Se registro una venta por el monto total de: $${order.total}<br/>El dia: ${order.date}`;

        MySwal.fire({
            title: <p>¡Éxito!</p>,
            html: text,
            icon: "success",
        }).then(() => {
            // clearCart()
            navigate('/')
        })


    }


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
                                    <Grid item xs={12} sm={12} md={12} sx={{mt: 5, mb: 2}}>
                                        <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                        <Button
                                            onClick={() => buy()}
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