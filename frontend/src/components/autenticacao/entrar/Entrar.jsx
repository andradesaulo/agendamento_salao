import React from 'react'
import Layout from '../layoutAutenticacao'
import Botao from '../../../components/template/botao'
import Input from '../../../components/template/input'
export default props => (
    <Layout>
        <form>
            <Input rotuloInput="Email" tipo="email" id="email"/>
            <Input rotuloInput="Senha" tipo="password" id="senha"/>
            <Botao tamanho_e_espacamento="mt-3" tipoBotao="primary">
                Entrar
            </Botao>
        </form>
    </Layout>
)