import React from 'react'
import { Switch, Route, Redirect } from 'react-router'


import Login from '../components/autenticacao/login/Login'
import Entrar from '../components/autenticacao/entrar/Entrar'
import Cliente from '../components/cliente/Cliente'
export default props => 
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/entrar' component={Entrar} />
            <Route path='/cliente' component={Cliente} />
            <Redirect from='*' to='/' />
        </Switch>