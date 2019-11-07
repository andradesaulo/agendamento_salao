import React from 'react'
import Logo from '../template/Logo'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

export default props =>
        <Box bgcolor="#fff" height="5%" width="100%">
        <Grid container>
            <Grid item xs={6} sm={4} md={2}>
                <Logo/>
            </Grid>
        </Grid>
        </Box>