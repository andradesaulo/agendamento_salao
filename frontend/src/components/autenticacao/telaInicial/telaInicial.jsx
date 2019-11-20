import React from 'react'
import Layout from '../layoutAutenticacao'
import Botao from '../../../components/template/botao'
import { Link } from 'react-router-dom'
const tam_e_esp ='w-100 mt-3'
export default props => (
    <Layout>
        <Link to="/entrar">
            <Botao tamanho_e_espacamento={tam_e_esp} tipoBotao="secondary">
                Entrar
            </Botao>
        </Link>
        <Link to="/criar_conta">
            <Botao tamanho_e_espacamento={tam_e_esp} tipoBotao="primary">
                Criar conta
            </Botao>
        </Link>
    </Layout>
)