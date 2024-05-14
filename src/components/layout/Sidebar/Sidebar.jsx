import React, {useEffect, useState} from 'react';
import {
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';

import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {amber, grey, orange, red} from "@mui/material/colors";
import CartWidget from "../CartWidget/CartWidget.jsx";

const StyledDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        backgroundColor: '#1a237e',
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const categoryRoadMap = [
    {link: "beer-type/lager", name: "Rubia"},
    {link: "beer-type/red", name: "Roja"},
    {link: "beer-type/black", name: "Negra"},
    {link: "beer-type/ipa", name: "IPA"},
];

function Sidebar({isOpen, toggleDrawer}) {

    const [open, setOpen] = React.useState(false);

    const [openList, setOpenList] = React.useState(false);

    const handleClick = () => {
        setOpenList(!openList);
    };

    const handleDrawerClose = () => {
        setOpenList(false);
        setOpen(false);
        toggleDrawer(); // Esto llama a la función para cambiar el estado en Header
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);


    return (
        <>
            <StyledDrawer open={isOpen} onClose={handleDrawerClose}>

                <DrawerHeader sx={{mt: 3}}>

                    <Typography>Opciones </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon/>
                    </IconButton>

                </DrawerHeader>
                <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>

                <List component="nav">
                    <Link to="/" underline="none">
                        <ListItemButton onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Catalogo de cervezas" sx={{color: "#FFFFFF"}}/>
                        </ListItemButton>
                    </Link>

                    <Link to="/cart" underline="none">
                        <ListItemButton onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <CartWidget color={"white"}/>
                            </ListItemIcon>
                            <ListItemText primary="Carrito" sx={{color: "#FFFFFF"}}/>
                        </ListItemButton>
                    </Link>

                    <Divider sx={{backgroundColor: "#AF44CC"}} variant="middle"/>


                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <SportsBarRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Cervezas" sx={{color: "#FFFFFF"}}/>
                        {openList ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>


                    <Collapse in={openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            {categoryRoadMap.map((category, index) => (
                                <Link to={category.link} underline="none" key={index}>
                                    <ListItemButton onClick={handleDrawerClose} sx={{pl: 4}}>
                                        <ListItemIcon>
                                            <ArrowRightIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={category.name} sx={{color: "#FFFFFF"}}/>
                                    </ListItemButton>
                                </Link>
                            ))}


                        </List>
                    </Collapse>

                </List>


            </StyledDrawer>

        </>
    );
}

export default Sidebar;