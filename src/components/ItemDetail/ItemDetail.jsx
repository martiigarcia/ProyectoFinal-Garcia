import * as React from 'react';
import {useEffect, useState} from "react";
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {amber, blue, grey, orange, red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from "@mui/material/Link";
import {Box, Grid, Tooltip, tooltipClasses} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart.js";
import Divider from "@mui/material/Divider";
import ItemCount from "../ItemCount/ItemCount.jsx";

const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

// const ExpandMore = styled((props) => {
//     const {expand, ...other} = props;
//     return <IconButton {...other} />;
// })(({theme, expand}) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

export default function ItemDetail({product}) {
    const [expanded, setExpanded] = React.useState(false);
    const [category, setCategory] = useState(null)
    const [color, setColor] = useState(null)

    useEffect(() => {
        if (product.type === "Rubia") {
            setCategory("R")
            setColor(amber[500])
        }
        if (product.type === "Roja") {
            setCategory("R")
            setColor(red[500])
        }
        if (product.type === "Negra") {
            setCategory("N")
            setColor(grey[900])
        }
        if (product.type === "IPA") {
            setCategory("I")
            setColor(orange[500])
        }
    }, [product]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "auto",
                    marginRight: "auto",
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
                                    image="https://periodicodigital.mx/wp-content/uploads/2023/06/que-es-la-cerveza-rubia.jpg"
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
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    // sx={{mt: 5}}
                                >
                                    <ItemCount product={product}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    );
}
