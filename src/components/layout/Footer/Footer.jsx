import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import Divider from "@mui/material/Divider";

function Copyright() {
    return (
        <Typography variant="body2" color="#FFFFFF" align="center">
            {'Copyright © '}
            <Link to="https://mui.com/" style={{color: '#e05eff'}}>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer({description, title}) {

    return (
        <>
            <Box
                component="footer"
                sx={{
                    mt: 5,
                    mb: 3,
                    width: '100%',
                    // position: location ? 'relative' : 'absolute',
                    position: 'relative', //Aca hay que ver cuando esten los otro componentes de carrito para modificarlo
                    bottom: 0,
                    zIndex: 1000, // Asegura que el Footer esté sobre otros elementos
                }}
            >
                <Divider sx={{backgroundColor: "#ffffff"}} variant="middle"/>
                <Container maxWidth="sm"  sx={{
                    mt: 2,
                    mb: 1,
                }}>
                    <Typography variant="body1" align="center" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                    <Copyright/>
                </Container>
            </Box>
        </>
    );
}

export default Footer;
