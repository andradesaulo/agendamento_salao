import React from 'react'

export default props =>
    <React.Fragment>
        <label for={props.id}>{props.rotuloInput}</label>
        <input type={props.tipo} id={props.id} class="form-control" />
    </React.Fragment>