import React from 'react';
import {Box, Typography} from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

function PageError({}) {

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
                <ReportProblemOutlinedIcon sx={{fontSize: 80}}/>
                <Typography
                    className="title"
                    variant="h1"
                >
                    Error

                </Typography>
                <Typography
                    className="title"
                    variant="h3"
                >
                    Algo salio mal...
                </Typography>

                <Typography
                    className="title"
                    variant="body1"
                >
                    Recargue la página o vuelva a intentar más tarde
                </Typography>
            </Box>
        </>
    );
}

export default PageError;