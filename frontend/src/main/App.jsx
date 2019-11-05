
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import Routes from './Routes'
import red from '@material-ui/core/colors/red';
const theme = createMuiTheme({
    palette: {
        primary: red;
    },
})
export default props =>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </ThemeProvider>