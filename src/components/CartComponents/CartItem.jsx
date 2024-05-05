import React, {useState} from 'react';
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
import {styled} from "@mui/material/styles";

const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        color: 'rgb(255,255,255)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

function CartItem({product}) {
    const [count, setCount] = useState(1);

    const handleInc = () => {
        if (product.stock > count)
            setCount(count + 1)
    }
    const handleDec = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    return (
        <>
            <Card variant={"outlined"}>
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

                                    <LightTooltip title="Remover del carrito" arrow>
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
                                            onClick={handleDec}
                                            disabled={count === 1}
                                        >
                                            <RemoveIcon/>
                                        </IconButton>
                                    </LightTooltip>

                                    <Typography variant="body1" sx={{m: "auto"}}>{count}</Typography>

                                    <LightTooltip title="Sumar al carrito" arrow>
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
                                            onClick={handleInc}
                                            disabled={count === product.stock}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </LightTooltip>
                                </Stack>
                            </Box>

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