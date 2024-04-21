import * as React from 'react';
import viteLogo from '/Users/archivos/uni/cursoReact/primerEntrega/createMyLanding/public/vite.svg'
import LogoDrink from '/Users/archivos/uni/cursoReact/primerEntrega/createMyLanding/public/logoDrink.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Divider, Link, Menu, MenuItem, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useState} from "react";
import CartWidget from "../../CartWidget/CartWidget.jsx";


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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                                marginBottom: 5,
                            }}/>
                            <Link href="/" underline="none">
                                <Typography
                                    className="title"
                                    variant="h6"
                                    sx={{
                                        mr: 2,
                                        display: 'flex',
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
                            <Box sx={{flexGrow: 1, display: 'flex', ml: 5}}>
                                <Typography
                                    sx={{my: 2, color: 'white', display: 'flex',}}
                                    onClick={handleClick}
                                >
                                    Productos
                                </Typography>
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
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: '30ch',
                    },
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(1px 1px 3px rgba(255,255,255,0.3))',
                        mt: 2.5,
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 40,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'left', vertical: 'top'}}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                <Link href="beers" underline="none">
                    <MenuItem onClick={handleClose} sx={{color: 'white'}}>
                        Cervezas
                    </MenuItem>
                </Link>
                <Link href="drinks" underline="none" sx={{color: 'white'}}>
                    <MenuItem onClick={handleClose}>Tragos</MenuItem>
                </Link>
                <Link href="cocktails" underline="none" sx={{color: 'white'}}>
                    <MenuItem onClick={handleClose}>Cocteles</MenuItem>
                </Link>
            </Menu>
        </ThemeProvider>
    )
        ;
}

export default NavBar;
