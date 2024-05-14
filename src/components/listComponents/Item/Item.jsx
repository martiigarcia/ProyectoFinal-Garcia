import * as React from 'react';
import {useEffect, useState} from "react";
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {amber, grey, orange, red} from '@mui/material/colors';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Link} from "react-router-dom";
import {Tooltip, tooltipClasses} from "@mui/material";
import Button from "@mui/material/Button";

const categoryColorMap = { //Ver si es mejor dejar toodo junto (incial y color) o que solo quede con el color
    "Rubia": {category: "R", color: amber[500]},
    "Roja": {category: "R", color: red[500]},
    "Negra": {category: "N", color: grey[900]},
    "IPA": {category: "I", color: orange[500]},
};

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


export default function Item({product}) {
    const [category, setCategory] = useState(null)
    const [color, setColor] = useState(null)

    useEffect(() => {
        setCategory(product.type.charAt(0).toUpperCase());
        const {category, color} = categoryColorMap[product.type] || {};
        if (category && color) {
            setColor(color);
        }
    }, []);

    return (
        <>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <>
                            <LightTooltip title={"Cerveza " + product.type} arrow placement="top">
                                <Avatar
                                    sx={{
                                        bgcolor: color,
                                        color: color === "#212121" ? "#ffffff" : "#000000",
                                        border: "2px solid #ffffff",
                                        '&:hover': {
                                            color: 'white',
                                            borderColor: '#AF44CC',
                                            backgroundColor: "#AF44CC"
                                        },
                                    }}
                                    aria-label="recipe">
                                    {category}
                                </Avatar>
                            </LightTooltip>
                        </>
                    }
                    title={product.name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={product.image}
                    alt="image of a beer"
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary"
                                sx={{fontWeight: product.stock === 0 && "bold"}}
                    >
                        {product.stock === 0 ? "SIN STOCK" : `Precio por pinta: $${product.priceperpinta}`}
                    </Typography>


                </CardContent>
                <CardActions disableSpacing sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                    {/*<LightTooltip title="Marcar Favorita" arrow>*/}
                    {/*    <IconButton aria-label="add to favorites">*/}
                    {/*        <FavoriteIcon*/}
                    {/*            style={{color: "#AF44CC"}}*/}
                    {/*        />*/}
                    {/*    </IconButton>*/}
                    {/*</LightTooltip>*/}


                    <LightTooltip title="Ver detalle de cerveza" arrow>
                        <Link to={"/item/" + product.id}>
                            <Button aria-label="detail"
                                    sx={{
                                        borderColor: '#AF44CC',
                                        color: '#AF44CC',
                                        '&:hover': {
                                            color: 'white',
                                            borderColor: '#AF44CC',
                                            backgroundColor: "#AF44CC"
                                        },
                                    }}
                                    endIcon=
                                        {
                                            <InfoOutlinedIcon/>
                                        }
                            >
                                Ver en detalle
                            </Button>
                        </Link>
                    </LightTooltip>

                    {/*<LightTooltip title="Añadir al carrito" arrow>*/}
                    {/*    <IconButton aria-label="add to shopping cart" sx={{ml: 'auto'}}>*/}
                    {/*        <AddShoppingCartIcon*/}
                    {/*            style={{color: "#AF44CC"}}*/}
                    {/*        />*/}
                    {/*    </IconButton>*/}
                    {/*</LightTooltip>*/}
                </CardActions>
            </Card>
        </>
    );
}
