import { Button, Container } from '@mui/material'
import requests from '../api/request'

export default function ErrorPage() {
    return (
        <Container>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get400Error().catch(err => console.log(err))}>400 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get401Error().catch(err => console.log(err))}>401 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get404Error().catch(err => console.log(err))}>404 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.get500Error().catch(err => console.log(err))}>500 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => requests.Errors.getValidationError().catch(err => console.log(err))}>Validation Error</Button>
        </Container>
    )
}
