import React from 'react'
import Logo from '../../components/template/logo'
export default props => (
    <div class="container d-flex flex-column col-9 col-sm-6 col-md-6 col-lg-3">
        <Logo/>
        {props.children}
    </div>
)