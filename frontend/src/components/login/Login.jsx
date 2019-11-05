import React from 'react'


import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import red from '@material-ui/core/colors/red'

const primary = red[500]
export default props =>
    <main>
        <Container maxWidth="xs">
            <Grid container direction="column" spacing={1}>
                <h1>Logo</h1>
                <Grid item>
                    <Button fullWidth variant="contained" color="secondary">Entrar</Button>
                </Grid>
                <Grid item>
                    <Button fullWidth variant="contained" color={primary}>Criar conta</Button>
                </Grid>
            </Grid>
        </Container>
    </main>