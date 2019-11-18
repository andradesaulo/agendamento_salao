import React from 'react'

export default props =>
    <button class={props.tamanho_e_espacamento+' btn btn-'+props.tipoBotao}>
        {props.children}
    </button>