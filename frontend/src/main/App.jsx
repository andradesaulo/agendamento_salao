
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import Routes from './Routes'
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey'
import grey from '@material-ui/core/colors/grey'
import brown from '@material-ui/core/colors/brown'
import CssBaseline from '@material-ui/core/CssBaseline'
const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: blueGrey,
    },
})
export default props =>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </ThemeProvider>