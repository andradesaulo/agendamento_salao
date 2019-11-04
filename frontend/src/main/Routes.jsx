import React from 'react'
import { Route, Redirect } from 'react-router'


import Login from '../components/login/Login'

export default props => 
    <div>
        <Route exact path='/' component={Login} />
        <Redirect from='*' to='/' />
    </div>