import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Layout from '../LayoutAutentificacao'
import { Link } from 'react-router-dom'
export default props =>
    <Layout>
        <Grid item>
            <Link to="/entrar">
                <Button fullWidth variant="contained" color="secondary" >Entrar</Button>
            </Link>
        </Grid>
        <Grid item >
            <Button fullWidth variant="contained" color="primary">Criar conta</Button>
        </Grid>
    </Layout>