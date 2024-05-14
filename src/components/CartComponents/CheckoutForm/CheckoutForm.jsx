import React, {useContext, useState} from 'react'
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {Collapse, Divider, FormControl, Grid, InputLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
import Context from "../../../context/CartContext.jsx";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {Timestamp, addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore'
import {db} from "../../../config/firebase.jsx";

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
    const [card, setCard] = useState({
        ownerCard: '',
        numberCard: '',
        codeCard: '',
        dateMonthCard: '',
        dateYearCard: ''
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [payment, setPayment] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);
    const [expiredDate, setExpiredDate] = React.useState(false);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Obtener el año actual

    const selectPaymentMethod = (event) => {
        setPayment(event.target.value);
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))

        if (event.target.value === "creditCard" || event.target.value === "debitCard") {
            setExpanded(true);
        } else {
            setExpanded(false);

            clearCardErrors()
        }
    };

    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    const updateCard = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const errorsDetected = {}

        if (name === "dateMonthCard") {
            if (value > 12 || value < 1)
                errorsDetected.dateMonthCard = "El mes debe ser un numero comprendido entre el 1 (Enero) y 12 (Diciembre)."
        }

        if (name === "dateYearCard") {
            if (parseInt(value) < currentYear) {
                errorsDetected.dateYearCard = "El año debe ser igual o mayor al año actual.";
            }
        }

        setErrors(errorsDetected)

        setCard((card) => ({
            ...card,
            [name]: value
        }))
    }

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
        if (user.email.match(emailRegex)) {
            return true
        } else {
            return false
        }
    }

    const validateExpiredDate = () => {
        // Validación de la fecha de vencimiento
        const expirationDate = new Date(card.dateYearCard, card.dateMonthCard - 1);

        if (expirationDate <= currentDate) {
            setExpiredDate(true)
            return true
        } else {
            setExpiredDate(false)
            return false
        }
    }

    const validateCard = () => {

        const errorsDetected = {};

        if (!card.ownerCard) {
            errorsDetected.ownerCard = "El nombre del titulo de la tarjeta no puede ser vacio.";
        } else {
            if (card.ownerCard.length < 3) {
                errorsDetected.ownerCard = "El nombre del titular debe tener al menos 3 caracteres.";
            } else {
                //Validacion del nombre del titular
                const ownerRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.'-][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]*$/;
                if (!card.ownerCard.match(ownerRegex)) {
                    errorsDetected.ownerCard = "Solo se pueden ingresar carateres alfabéticos.";
                }
            }
        }

        // Validacion del numero de tarjeta
        if (!card.numberCard) {
            errorsDetected.numberCard = "El número de tarjeta no puede ser vacio.";
        } else {
            if (card.numberCard.length !== 16) {
                errorsDetected.numberCard = "El número de tarjeta debe tener exactamente 16 dígitos.";
            } else {
                const numberCardRegex = /^(?:\d{4} ?){4}$/;
                if (!card.numberCard.match(numberCardRegex)) {
                    errorsDetected.numberCard = "Se deben ingresar 16 digitos, puede contener espacios cada 4 digitos.";
                }
            }
        }
        // Validacion de fecha de vencimeinto
        validateExpiredDate()

        // Validación del código de seguridad (CVV)
        if (!card.codeCard) {
            errorsDetected.codeCard = "El código de seguridad de la tarjeta no puede ser vacio.";
        } else {
            const codeCardRegex = /^[0-9]{3,4}$/;
            if (!card.codeCard.match(codeCardRegex)) {
                errorsDetected.codeCard = "El código de seguridad debe tener 3 o 4 dígitos numericos.";
            }
        }
        setErrors((prevErrors) => {
            return Object.assign({}, prevErrors, errorsDetected);
        });
        return Object.keys(errorsDetected).length === 0
    }

    const clearCardErrors = () => {
        setCard({
            ownerCard: '',
            numberCard: '',
            codeCard: '',
            dateMonthCard: '',
            dateYearCard: ''
        })
        setExpiredDate(false)

        // Eliminar errores de tarjeta si existen
        if (errors.hasOwnProperty("ownerCard")) {
            delete errors.ownerCard;
        }
        if (errors.hasOwnProperty("numberCard")) {
            delete errors.numberCard;
        }
        if (errors.hasOwnProperty("codeCard")) {
            delete errors.codeCard;
        }
        if (errors.hasOwnProperty("dateMonthCard")) {
            delete errors.dateMonthCard;
        }
        if (errors.hasOwnProperty("dateYearCard")) {
            delete errors.dateYearCard;
        }
    }

    const validateForm = () => {
        setErrors({})

        const errorsDetected = {}

        if (!user.name) {
            errorsDetected.name = "El campo 'Nombre' es obligatorio."
        } else {
            // Validacion de cantidad de caracteres minimos
            if (user.name.length < 3) {
                errorsDetected.name = "El nombre debe tener al menos 3 caracteres.";
            } else {
                //Validacion del nombre
                const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.'-][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]*$/;
                if (!user.name.match(nameRegex)) {
                    errorsDetected.name = "Solo se pueden ingresar carateres alfabéticos.";
                }
            }
        }

        if (!user.surname) {
            errorsDetected.surname = "El campo 'Apellido' es obligatorio."
        } else {
            // Validacion de cantidad de caracteres minimos
            if (user.surname.length < 3) {
                errorsDetected.surname = "El apellido debe tener al menos 3 caracteres.";
            } else {
                // Validacion del apellido por regex
                const surnameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð .'-]+$/;
                if (!user.surname.match(surnameRegex)) {
                    errorsDetected.surname = "Solo se pueden ingresar carateres alfabéticos.";
                }
            }
        }

        if (!user.email) {
            errorsDetected.email = "El campo 'Email' es obligatorio."
        } else {
            if (!validateEmail()) {
                errorsDetected.email = "El campo 'Email' es incorrecto. Formato: usuario@example.com."
            }
        }

        if (!user.phone) {
            errorsDetected.phone = "El campo 'Telefono' es obligatorio."
        } else {
            // número de teléfono válido, chequear algún mínimo
            const phoneRegex = /^\+\d{2}\s?\d{10,12}$/;
            if (!user.phone.match(phoneRegex)) {
                errorsDetected.phone = "El formato del teléfono es inválido. Debe ser un teléfono con código de país y área, por ejemplo: +541112344321 o +54 1112344321.";
            }
        }

        if (!user.paymentMethod) {
            errorsDetected.payment = "El campo 'Metodo de Pago' es obligatorio."
        } else {
            if (user.paymentMethod === "creditCard" || user.paymentMethod === "debitCard") {
                validateCard();
            } else {
                if (user.paymentMethod === "cash" || user.paymentMethod === "other") {
                    clearCardErrors()

                    // Eliminar errores de tarjeta si existen de errorsDetected
                    if (errorsDetected.hasOwnProperty("ownerCard")) {
                        delete errorsDetected.ownerCard;
                    }
                    if (errorsDetected.hasOwnProperty("numberCard")) {
                        delete errorsDetected.numberCard;
                    }
                    if (errorsDetected.hasOwnProperty("codeCard")) {
                        delete errorsDetected.codeCard;
                    }
                    if (errorsDetected.hasOwnProperty("dateMonthCard")) {
                        delete errorsDetected.dateMonthCard;
                    }
                    if (errorsDetected.hasOwnProperty("dateYearCard")) {
                        delete errorsDetected.dateYearCard;
                    }

                }
            }
        }

        setErrors((prevErrors) => {
            return Object.assign({}, prevErrors, errorsDetected);
        });
        return Object.keys(errorsDetected).length === 0
    }

    const buy = async () => {

        const loadingSwal = Swal.fire({
            title: "Estado de compra: En proceso...",
            html: "La orden de compra fue confirmada.",
            didOpen: () => {
                Swal.showLoading();
            }
        });

        //Con validateForm ya valido t0dos los campos ya que al final se cuentan tod0s los campos de error detectados
        if (validateForm()) {

            const ordersCollection = collection(db, 'purchaseOrders')

            try {

                const order = {
                    buyer: user, //usuario comprador
                    card: (user.paymentMethod === "creditCard" || user.paymentMethod === "debitCard") ? card : null, // card es opcional si el metodo de pago es de tarjeta de credito o debito
                    cart: cart, //carrito
                    total: getTotal(), //total del carrito
                    date: Timestamp.now(),  // Fecha actual
                    status: "COMPLETA"
                };

                for (const item of cart) {
                    const productRef = doc(db, 'products', item.id)
                    const productDoc = await getDoc(productRef)
                    const currentStock = productDoc.data().stock
                    await updateDoc(productRef, {
                        stock: currentStock - item.quantity
                    })

                }

                const orderDocRef = await addDoc(ordersCollection, order)

                // Cerrar SweetAlert de carga
                loadingSwal.close();

                const text = `La compra se ha realizado exitosamente!
                        <br/>El dia: ${order.date.toDate().toLocaleDateString('es-ES')}
                         <br/>Código de compra: ${orderDocRef.id}`
                ;

                MySwal.fire({
                    title: <p>¡Éxito!</p>,
                    html: text,
                    icon: "success",
                }).then(() => {
                    clearCart()
                    navigate('/')
                })

            } catch (error) {
                loadingSwal.close();
                await MySwal.fire({
                    title: <p>Error</p>,
                    text: "Algo salio mal... " + error.message,
                    icon: "error",
                })
            }
        } else {
            loadingSwal.close();
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
                                                       error={!!errors.name}
                                                       helperText={errors.name}
                                                       autoComplete="name"
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
                                                       error={!!errors.surname}
                                                       helperText={errors.surname}
                                                // autoComplete="surname"
                                            />
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
                                                       error={!!errors.email}
                                                       helperText={errors.email}
                                                       autoComplete="email"/>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }} color="secondary"
                                                     variant="filled">
                                            <TextField fullWidth variant="outlined" label="Telefono" color="secondary"
                                                       placeholder="+54 11 1234-4321" name="phone" type="text"
                                                       onChange={(event) => updateUser(event)}
                                                       error={!!errors.phone}
                                                       helperText={errors.phone ? errors.phone : "El numero de telefono debe incluir codigo de pais y area"}
                                                       autoComplete="phone"/>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth sx={{
                                            mb: 1,
                                            mt: 2
                                        }}>
                                            <InputLabel id="select-payment-label" color="secondary"
                                                        error={!!errors.payment}>
                                                Método de pago
                                            </InputLabel>
                                            <Select
                                                labelId="select-payment-label"
                                                id="select-payment"
                                                value={payment}
                                                label="Metodo de pago"
                                                onChange={selectPaymentMethod}
                                                color="secondary"
                                                name="paymentMethod"
                                                error={!!errors.payment}
                                                // helperText={errors.payment}
                                            >
                                                <MenuItem value="creditCard">Tarjeta de crédito</MenuItem>
                                                <MenuItem value="debitCard">Tarjeta de débito</MenuItem>
                                                <MenuItem value="cash">Efectivo o Transferecia</MenuItem>
                                                <MenuItem value="other">Arreglar con el vendedor</MenuItem>
                                            </Select>

                                        </FormControl>


                                        <Collapse in={expanded} timeout="auto" unmountOnExit
                                        >
                                            <CardContent>
                                                <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                                <CardHeader
                                                    title="Datos de la tarjeta"
                                                    subheader="Ingrese sus datos de su tarjeta para completar la compra"
                                                />
                                                <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <FormControl fullWidth sx={{
                                                        mb: 1,
                                                        mt: 2
                                                    }} color="secondary"
                                                                 variant="filled">
                                                        <TextField fullWidth variant="outlined" label="Numero"
                                                                   color="secondary"
                                                                   placeholder="1234567891011121" name="numberCard"
                                                                   type="number"
                                                                   onChange={(event) => updateCard(event)}
                                                                   error={!!errors.numberCard}
                                                                   helperText={errors.numberCard ? errors.numberCard : "Debe ingresar 16 digitos."}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} sx={{mt: 3}}>
                                                    <Grid container direction="row" alignItems="center">
                                                        <Typography
                                                            sx={{
                                                                textAlign: 'left',
                                                                color: "#666666"
                                                            }}
                                                            variant="body1"
                                                        >Fecha de vencimiento:
                                                        </Typography>
                                                    </Grid>
                                                    <FormControl
                                                        sx={{
                                                            mb: 3,
                                                            mt: 2,
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}
                                                        color="secondary"
                                                        variant="filled">

                                                        <TextField fullWidth variant="outlined"
                                                                   label="Mes de Vencimiento" color="secondary"
                                                                   placeholder="4" name="dateMonthCard" type="number"
                                                                   inputProps={{
                                                                       step: 1,
                                                                       min: 1,
                                                                       max: 12,
                                                                       inputMode: 'numeric',
                                                                   }}
                                                                   onChange={(event) => updateCard(event)}
                                                                   error={!!errors.dateMonthCard || !!expiredDate}
                                                                   helperText={errors.dateMonthCard ? errors.dateMonthCard : "Ingrese el mes que aparece en su tarjeta."}
                                                        />

                                                        <TextField fullWidth variant="outlined"
                                                                   label="Año de Vencimiento" color="secondary"
                                                                   placeholder="2024" name="dateYearCard" type="number"
                                                                   onChange={(event) => updateCard(event)}
                                                                   error={!!errors.dateYearCard || !!expiredDate}
                                                                   helperText={errors.dateYearCard ? errors.dateYearCard : "Ingrese el año que aparece en su tarjeta."}
                                                        />
                                                    </FormControl>
                                                    {expiredDate && (
                                                        <Typography
                                                            sx={{
                                                                textAlign: 'left',
                                                                color: "#d91919"
                                                            }}>La tarjeta se encuentra con fecha de vencimiento
                                                            expirada.</Typography>)}

                                                </Grid>


                                                <Grid item xs={12} sm={12} md={12}>
                                                    <FormControl fullWidth sx={{
                                                        mb: 1,
                                                        mt: 2
                                                    }} color="secondary"
                                                                 variant="filled">
                                                        <TextField fullWidth variant="outlined"
                                                                   label="Titular de la tarjeta" color="secondary"
                                                                   placeholder="Lucas B. Suarez" name="ownerCard"
                                                                   type="text"
                                                                   onChange={(event) => updateCard(event)}
                                                                   error={!!errors.ownerCard}
                                                                   helperText={errors.ownerCard ? errors.ownerCard : "Debe ingresar el nombre completo como aparece en la tarjeta."}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <FormControl fullWidth sx={{
                                                        mb: 1,
                                                        mt: 2
                                                    }} color="secondary"
                                                                 variant="filled">
                                                        <TextField fullWidth variant="outlined"
                                                                   label="Código (CVV | CSC)"
                                                                   color="secondary"
                                                                   placeholder="123" name="codeCard" type="number"
                                                                   onChange={(event) => updateCard(event)}
                                                                   error={!!errors.codeCard}
                                                                   helperText={errors.codeCard ? errors.codeCard : "CVV - CSC: Debe ingresar 3 o 4 digitos."}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                            </CardContent>
                                        </Collapse>
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