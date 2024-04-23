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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Tooltip, tooltipClasses} from "@mui/material";

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
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{
                                bgcolor: color,
                                color: color === "#212121" ? "#ffffff" : "#000000",
                                border: "2px solid #ffffff"
                            }}
                            aria-label="recipe">
                            {category}
                        </Avatar>
                    }
                    title={product.name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="https://periodicodigital.mx/wp-content/uploads/2023/06/que-es-la-cerveza-rubia.jpg"
                    alt="image of a beer"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Precio por pinta: $ {product.priceperpinta}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <LightTooltip title="Marcar Favorita" arrow>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon
                                style={{color: "#AF44CC"}}
                            />
                        </IconButton>
                    </LightTooltip>
                    <LightTooltip title="Ver detalle de cerveza" arrow>
                        <Link href={"/item/" + product.id}>
                            <IconButton aria-label="detail">
                                <InfoOutlinedIcon
                                    style={{color: "#AF44CC"}}
                                />
                            </IconButton>
                        </Link>
                    </LightTooltip>
                    <LightTooltip title="Añadir al carrito" arrow>
                        <IconButton aria-label="add to shopping cart" sx={{ml: 'auto'}}>
                            <AddShoppingCartIcon
                                style={{color: "#AF44CC"}}
                            />
                        </IconButton>
                    </LightTooltip>
                </CardActions>
            </Card>
        </>
    );
}
