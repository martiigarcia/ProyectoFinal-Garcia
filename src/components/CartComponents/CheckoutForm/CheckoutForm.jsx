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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const MySwal = withReactContent(Swal)

function CheckoutForm() {
    const {cart, getTotal, clearCart} = useContext(Context)
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        paymentMethod: ''
    })
    const [order, setOrder] = useState({})
    const [emailMatch, setEmailMatch] = useState(true)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [payment, setPayment] = React.useState('');

    const selectPaymentMethod = (event) => {
        setPayment(event.target.value);
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    };


    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    const validateEmail = () => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
        const isValidEmail = emailRegex.test(user.email);
        if (isValidEmail) {
            setEmailMatch(true)
            return true
        } else {
            setEmailMatch(false)
            return false
        }
    }


    const validateForm = () => {
        const errorsDetected = {}
        if (!user.name) {
            errorsDetected.name = "El campo 'Nombre' es obligatorio."
        } else {
            // mínimo de caracteres para el nombre
        }
        if (!user.surname) {
            errorsDetected.surname = "El campo 'Apellido' es obligatorio."
        } else {
            // mínimo de caracteres para el apeliido

        }
        if (!user.email) {
            errorsDetected.email = "El campo 'Email' es obligatorio."
        } else {
            if (!validateEmail()) {
                errorsDetected.email = "El campo 'Email' es incorrecto. Formato: marti@example.com."
            }
        }
        if (!user.phone) {
            errorsDetected.phone = "El campo 'Telefono' es obligatorio."
        } else {
            // número de teléfono válido, chequear algún mínimo

        }
        if (!user.paymentMethod) {
            errorsDetected.payment = "El campo 'Metodo de pago' es obligatorio."
        } else {
            //ver si valido que sea alguna de las 4 opciones
        }

        setErrors(errorsDetected)
        return Object.keys(errorsDetected).length === 0
    }

    const buy = () => {

        //Valido el formulario para ver si prosigo en realizar la compra o muestro errores
        if (validateForm()) {
            const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                date: "hoy" //hacer bien la fecha
            }

            // Restar stock de productos seleccionados (y desp ver como muestro en el inicio si alguno no tiene mas stock)
            // Cargar orden de compra

            const text = `La compra se ha realizado exitosamente.<br/>Se registro una venta por el monto total de: $${order.total}<br/>El dia: ${order.date}`;

            MySwal.fire({
                title: <p>¡Éxito!</p>,
                html: text,
                icon: "success",
            }).then(() => {
                // clearCart()
                // navigate('/')
            })
        }


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
                                                       placeholder="Martina" name="name"
                                                       onChange={(event) => updateUser(event)}
                                                       error={errors.name}
                                                       helperText={errors.name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }}>
                                            <TextField fullWidth variant="outlined" label="Apellido" color="secondary"
                                                       placeholder="García" name="surname"
                                                       onChange={(event) => updateUser(event)}
                                                       error={errors.surname}
                                                       helperText={errors.surname}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }}>
                                            <TextField fullWidth variant="outlined" label="Correo" color="secondary"
                                                       type="email"
                                                       placeholder="correo@example.com" name="email"
                                                       onChange={(event) => updateUser(event)}
                                                       error={errors.email}
                                                       helperText={errors.email}/>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }} color="secondary"
                                                     variant="filled">
                                            <TextField fullWidth variant="outlined" label="Telefono" color="secondary"
                                                       placeholder="111689854" name="phone" type="number"
                                                       onChange={(event) => updateUser(event)}
                                                       error={errors.phone}
                                                       helperText={errors.phone}/>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }}>
                                            <InputLabel id="select-payment-label" color="secondary"
                                                        error={errors.payment}>
                                                Método de pago
                                            </InputLabel>
                                            <Select
                                                labelId="select-payment"
                                                id="select-payment"
                                                value={payment}
                                                label="Metodo de pago"
                                                onChange={selectPaymentMethod}
                                                color="secondary"
                                                name="paymentMethod"
                                                error={errors.payment}
                                                helperText={errors.payment}
                                            >
                                                <MenuItem value="creditCard">Tarjeta de crédito</MenuItem>
                                                <MenuItem value="debitCard">Tarjeta de débito</MenuItem>
                                                <MenuItem value="cash">Efectivo o Transferecia</MenuItem>
                                                <MenuItem value="other">Arreglar con el vendedor</MenuItem>
                                            </Select>
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