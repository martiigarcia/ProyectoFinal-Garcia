import React from 'react';
import {Box, Typography} from "@mui/material";

function PageNotFound({}) {

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 500
                }}
            >
                <Typography
                    className="title"
                    variant="h1"
                >
                    404
                </Typography>
                <Typography
                    className="title"
                    variant="h3"
                >
                    Not Found
                </Typography>
            </Box>
        </>
    );
}

export default PageNotFound;