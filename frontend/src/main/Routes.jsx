import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Entrar from '../components/autenticacao/entrar/Entrar'
import Agendar from '../components/agendar/Agendar'
import TelaInicialAutenticacao from '../components/autenticacao/telaInicial/telaInicial'
export default props => 
    <Switch>
        <Route exact path='/' component={TelaInicialAutenticacao}/>
        <Route path='/entrar' component={Entrar}/>
        <Route path='/agendar' component={Agendar} />
        <Redirect from='*' to='/' />
    </Switch>