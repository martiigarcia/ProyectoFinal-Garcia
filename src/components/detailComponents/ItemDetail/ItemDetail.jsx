import React, {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {amber, grey, orange, red} from '@mui/material/colors';
import {Box, Button, Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import ItemCount from "../ItemCount/ItemCount.jsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Context from "../../../context/CartContext.jsx";
import {Link} from "react-router-dom";

const categoryColorMap = {
    "Rubia": {category: "R", color: amber[500]},
    "Roja": {category: "R", color: red[500]},
    "Negra": {category: "N", color: grey[900]},
    "IPA": {category: "I", color: orange[500]},
};
const MySwal = withReactContent(Swal)

export default function ItemDetail({product}) {
    const [category, setCategory] = useState(null)
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const {addItem} = useContext(Context);


    const handleAddProduct = (quantity) => {
        const item = {
            id: product.id,
            name: product.name,
            priceperpinta: product.priceperpinta,
            stock: product.stock,
            image: product.image,
        }
        setQuantity(quantity)
        addItem(item, quantity)

        const text = `Se han agregado ${quantity} productos al carrito exitosamente.`;

        MySwal.fire({
            title: <p>¡Éxito!</p>,
            html: text,
            icon: "success",
        }).then(() => {
            console.log("Exito...")
        })
    }

    useEffect(() => {
        const {category, color} = categoryColorMap[product.type] || {};
        if (category && color) {
            setCategory(category);
            setColor(color);
        }
    }, [product]);

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: "auto",
                    mr: "auto",
                    mt: "auto",
                    mb: "auto",
                    width: "75%",
                }}
            >
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        {/*Header: */}
                        <Grid item xs={12}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            bgcolor: color,
                                            color: color === "#212121" ? "#ffffff" : "#000000",
                                            border: "2px solid #ffffff"
                                        }}
                                        aria-label="avatar">
                                        {category}
                                    </Avatar>
                                }
                                title={product.name}
                                subheader={"Precio por pinta: $" + product.priceperpinta}
                            />
                        </Grid>

                        {/*Imagen del producto: */}
                        <Grid item xs={12} sm={12} md={6}>
                            <Grid item xs={12} sx={{ml: 2, mr: 2, mb: 2}}>
                                <CardMedia
                                    sx={{width: '100%', height: 'auto'}}
                                    component="img"
                                    image={product.image}
                                    alt="Foto del producto"
                                />
                            </Grid>


                        </Grid>

                        {/*Informacion del producto: */}
                        <Grid item xs={12} sm={12} md={6}>
                            {/*Descripcion: */}
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography
                                    sx={{
                                        m: "auto",
                                    }}
                                >
                                    {product.description}
                                </Typography>
                                <Divider sx={{
                                    mt: 1, mb: 1
                                }}/>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} sx={{ml: 2, mr: 2}}>

                                {/*Informacion:*/}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography sx={{textAlign: 'left'}}>Alcohol: {product.alcohol}%</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography sx={{textAlign: 'left'}}>IBU: {product.ibu}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography sx={{textAlign: 'left'}}>Sabor: {product.taste}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography sx={{textAlign: 'left'}}>Color: {product.color}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography sx={{textAlign: 'left'}}>Cuerpo: {product.body}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography sx={{textAlign: 'left'}}>Espuma: {product.foam}</Typography>
                                    </Grid>
                                </Grid>

                                {/*Botones: */}

                                {quantity > 0 ? (
                                    <>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="space-evenly"
                                            alignItems="center"
                                            sx={{mt: 5}}
                                        >
                                            <Link to={"/cart"}>
                                                <Button
                                                    sx={{
                                                        mt: 2,
                                                        mb: 2,
                                                        borderColor: '#AF44CC',
                                                        color: '#AF44CC',
                                                        '&:hover': {
                                                            color: 'white',
                                                            borderColor: '#AF44CC',
                                                            backgroundColor: "#AF44CC"
                                                        },
                                                    }}
                                                    aria-label="go to cart"
                                                >
                                                    Ir al carrito
                                                </Button>
                                            </Link>
                                            <Link to={"/"}>
                                                <Button
                                                    sx={{
                                                        mt: 2,
                                                        mb: 2,
                                                        borderColor: '#AF44CC',
                                                        color: '#AF44CC',
                                                        '&:hover': {
                                                            color: 'white',
                                                            borderColor: '#AF44CC',
                                                            backgroundColor: "#AF44CC"
                                                        },
                                                    }}
                                                    aria-label="keep buying"
                                                >
                                                    Seguir comprando
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </>
                                ) : (
                                    <><Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                        sx={{mt: 5}}
                                    >
                                        <ItemCount
                                            stock={product.stock}
                                            quantity={1}
                                            addProduct={handleAddProduct}
                                        />
                                    </Grid>

                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    );
}
