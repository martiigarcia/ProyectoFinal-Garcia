import * as React from 'react';
import LogoDrink from '/Users/archivos/uni/cursoReact/primerEntrega/createMyLanding/public/logoDrink.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import CartWidget from "../../CartWidget/CartWidget.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import ExpandLessIcon from "@mui/icons-material/ExpandLess.js";
import {Link} from "react-router-dom";


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            horizontal: 'left', vertical: 'bottom'
        }}
        transformOrigin={{
            horizontal: 'left', vertical: 'top'
        }}
        PaperProps={{
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
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(140,65,255)' : '#e05eff',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '&:active': {
                backgroundColor: '#e05eff'
                // backgroundColor: alpha(
                //     theme.palette.primary.main,
                //     theme.palette.action.selectedOpacity,
                // ),
            },
        },
    },
}));

function BeerMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setExpanded(!expanded)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setExpanded(!expanded)
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id="beer-option-button"
                aria-controls={open ? 'beer-option-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                endIcon={expanded ?
                    <ExpandLessIcon/> :
                    <ExpandMoreIcon/>}
                sx={{color: '#ffffff'}}
            >
                Cervezas
            </Button>
            <StyledMenu
                id="beer-option-menu"
                MenuListProps={{
                    'beer-option': 'beer-option-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Link to="/beer-type/lager" underline="none">
                    <MenuItem sx={{color: 'white'}} onClick={handleClose}>
                        Rubia
                    </MenuItem>
                </Link>
                <Link to="/beer-type/red" underline="none">
                    <MenuItem sx={{color: 'white'}} onClick={handleClose}>
                        Roja
                    </MenuItem>
                </Link>
                <Link to="/beer-type/black" underline="none">
                    <MenuItem sx={{color: 'white'}} onClick={handleClose}>
                        Negra
                    </MenuItem>
                </Link>
                <Link to="/beer-type/ipa" underline="none">
                    <MenuItem sx={{color: 'white'}} onClick={handleClose}>
                        IPA
                    </MenuItem>
                </Link>
            </StyledMenu>
        </>
    );
}

function NavBar() {
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

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{flexGrow: 1, mb: 5, width: "100%"}}>
                <AppBar position="static" color="primary" enableColorOnDark>
                    <Toolbar>
                        <img src={LogoDrink} style={{
                            width: 50,
                            height: 60,
                            marginRight: 2,
                            marginLeft: 2,
                            marginTop: 2,
                            marginBottom: 5,
                        }}/>
                        <Link to="/" underline="none">
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
                            <BeerMenu/>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Link to="cart" underline="none">
                                <CartWidget/>
                            </Link>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>


        </ThemeProvider>
    );
}

export default NavBar;



