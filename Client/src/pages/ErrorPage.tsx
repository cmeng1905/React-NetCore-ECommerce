import { Alert, AlertTitle, Button, Container, List, ListItem } from '@mui/material'
import requests from '../api/request'
import { useState } from 'react'

export default function ErrorPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    function getValidationErrors() {
        requests.Errors.getValidationError().catch(err => setValidationErrors(err));
    }
    return (
        <Container>
            {
                validationErrors.length > 0 && (
                    <Alert severity='error' sx={{ mb: 2 }}>
                        <AlertTitle>Validation errors</AlertTitle>
                        <List>
                            {validationErrors.map((error, index) => (
                                <ListItem key={index}>{error}</ListItem>
                            ))}
                        </List>
                    </Alert>
                )
            }
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get400Error().catch(err => console.log(err))}>400 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get401Error().catch(err => console.log(err))}>401 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get404Error().catch(err => console.log(err))}>404 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get500Error().catch(err => console.log(err))}>500 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={getValidationErrors}>Validation Error</Button>
        </Container>
    )
}
