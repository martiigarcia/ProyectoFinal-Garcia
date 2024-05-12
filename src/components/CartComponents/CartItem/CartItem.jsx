import React, {useState, useEffect, useContext} from 'react';
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
import Context from "../../../context/CartContext.jsx";


const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgb(9,2,2)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

function CartItem({product}) {

    const {
        count,
        increment,
        remove
    } = useCounter(
        product.quantity,
        product.stock);

    const {addItem, removeItem} = useContext(Context);
    const [subtotal, setSubtotal] = useState(product.priceperpinta)

    const updateItem = () => {
        increment()
        addItem(product, 1)
    }

    const deleteItem = () => {
        remove();
        removeItem(product.id)
    }

    const getSubtotal = () => {
        let subtotal = (count * product.priceperpinta).toFixed(2)
        setSubtotal(subtotal)
    }
    useEffect(() => {
        getSubtotal()
    }, [count]);

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
                                            onClick={() => deleteItem()}
                                            // onClick={remove}
                                            disabled={count <= 0}
                                        >
                                            {count <= 1 ?
                                                <DeleteOutlineIcon/> : <RemoveIcon/>}
                                        </IconButton>
                                    </LightTooltip>

                                    <Typography variant="body1" sx={{m: "auto"}}>{count}</Typography>

                                    {/*Boton de agregar al carrito*/}
                                    <LightTooltip
                                        title={count === product.stock ? "Stock máximo el producto alcanzado" : "Sumar un elemento"}
                                        arrow>
                                         <span>
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
                                            onClick={() => updateItem()}
                                            disabled={count === product.stock}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                         </span>
                                    </LightTooltip>
                                </Stack>
                            </Box>

                            <Typography>Subtotal: ${subtotal}</Typography>
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