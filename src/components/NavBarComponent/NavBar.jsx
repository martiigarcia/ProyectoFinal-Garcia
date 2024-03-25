import * as React from 'react';
import viteLogo from '/vite.svg'
import LogoDrink from '/logoDrink.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Divider, Link, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useState} from "react";
import CartWidget from "../CartWidgetComponent/CartWidget.jsx";


function NavBar() {

    const [openMenu, setOpenMenu] = useState(false)

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#757ce8',
                main: '#1a237e',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                main: '#e05eff'
                // main: '#ff9100'
            }
        },
    });

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" color="primary" enableColorOnDark>
                    <Container maxWidth="xl">
                        <Toolbar>

                            <img src={LogoDrink} style={{
                                width: 50,
                                height: 60,
                                marginRight: 2,
                                marginLeft: 2,
                                marginTop: 2,
                                marginBottom: 5
                            }}/>
                            <Link href="home" underline="none">
                                <Typography
                                    className="title"
                                    variant="h6"
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'none', md: 'flex'},
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        color: 'secondary.main',
                                        textDecoration: 'none',
                                        textShadow: '1px 1px 20px rgba(255, 255, 255, 1)',
                                    }}
                                >
                                    Brewland Oasis
                                </Typography>
                            </Link>
                            <Divider orientation="vertical" flexItem variant="middle"/>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, ml: 5}}>
                                <Link href="productos" underline="none">
                                    <Typography
                                        sx={{my: 2, color: 'white', display: {xs: 'none', md: 'flex'},}}
                                        onClick={handleOpenMenu}
                                    >
                                        Productos
                                    </Typography>
                                </Link>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Link href="cart" underline="none">
                                    <CartWidget/>
                                </Link>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
        ;
}

export default NavBar;
