import React from 'react';
import {Drawer} from "@mui/material";

function Sidebar({openX, onClose}) {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>

            <Drawer open={openX} onClose={toggleDrawer(false)}>
                Menu lateral
            </Drawer>

        </>
    );
}

export default Sidebar;