import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
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
                    mt:5,
                    mb:3,
                    width: '100%',
                    // position: location ? 'relative' : 'absolute',
                    position: 'relative', //Aca hay que ver cuando esten los otro componentes de carrito para modificarlo
                    bottom: 0,
                    zIndex: 1000, // Asegura que el Footer esté sobre otros elementos
                }}
            >
                <Container maxWidth="sm">
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
