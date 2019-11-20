import React from 'react'
import logo from '../../assets/imgs/logo.png'
export default props => (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#"><img src={logo} class="img-fluid" style={{width:200+'px'}}  alt=""/></a>
        <div>
            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Agendar</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Agendamentos</a>
            </li>
            </ul>
        </div>
    </nav>
)