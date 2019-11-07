import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Logo from '../template/Logo'

export default props => 
    <main>
        <Container maxWidth="xs">
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Logo/>
                </Grid>
                {props.children}
            </Grid>
        </Container>
    </main>