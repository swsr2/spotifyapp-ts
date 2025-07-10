import { Alert, AlertTitle, Typography } from '@mui/material'
import React from 'react'   

interface ErrorMessageProps {
    errorMessage: string
}

const ErrorMessage = ({errorMessage}:ErrorMessageProps) => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography variant="body1">
                {errorMessage}
            </Typography>
        </Alert>
    )
}

export default ErrorMessage