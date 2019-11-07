import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Layout from '../LayoutAutentificacao'
import Link from '@material-ui/core/Link'
import {LinkRouter} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

export default class Entrar extends React.Component{
    render(){
    return (
        <Layout>
            <Grid item>
                <TextField fullWidth label = 'Email' variant="filled"/>
            </Grid>
            <Grid item>
                <TextField fullWidth label = 'Senha' variant="filled"/>
            </Grid>
            <Grid container xs={12} justify="space-between">
                <Grid item xs={4}>
                    <Typography variant="caption">
                        <Link href="#">
                            Esqueci minha senha
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth variant="contained" color="primary">Entrar</Button>
                </Grid>
            </Grid>
        </Layout>
    )}
}
