import React from 'react'
import Logo from '../template/Logo'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle';

export default props =>
    <AppBar position="static">
        <Grid container justify="space-between" alignItems="center">
            <Grid item xs={5} sm={4} md={2} >
                <Logo/>
            </Grid>
            <Grid>
                <IconButton>
                    <AccountCircle/>
                </IconButton>
            </Grid>
        </Grid>
    </AppBar>