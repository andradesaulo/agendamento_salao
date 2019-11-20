import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'shopping-basket',
    title: 'Produtos',
    subtitle: 'Cadastro de produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/products'
const baseUrlUsers = 'http://localhost:3001/users'

const initialState = {
    products: { description: '', quantity: '', price: '', marca: '', id_usuario: '' },
    list: [],
    listUsers: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
        axios(baseUrlUsers).then(resp => {
            this.setState({ listUsers: resp.data })
        })
    }

    clear() {
        this.setState({ products: initialState.products })
    }

    save() {
        const products = this.state.products
        const method = products.id ? 'put' : 'post'
        const url = products.id ? `${baseUrl}/${products.id}` : baseUrl
        axios[method](url, products)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ products: initialState.products, list })
            })
    }

    getUpdatedList(products, add = true) {
        const list = this.state.list.filter(u => u.id !== products.id)
        if(add) list.unshift(products)
        return list
    }

    updateField(event) {
        const products = { ...this.state.products }
        products[event.target.name] = event.target.value
        this.setState({ products })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                                name="description"
                                value={this.state.products.description}
                                onChange={e => this.updateField(e)}
                                placeholder="Entre com a descrição..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="number" className="form-control"
                                name="quantity"
                                value={this.state.products.quantity}
                                onChange={e => this.updateField(e)}
                                placeholder="Entre com a quantidade..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="number" className="form-control"
                                name="price"
                                value={this.state.products.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Entre com o preço..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Marca</label>
                            <input type="text" className="form-control"
                                name="marca"
                                value={this.state.products.marca}
                                onChange={e => this.updateField(e)}
                                placeholder="Entre com a marca..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Usuário</label>
                            <select 
                                className="form-control"
                                name="id_usuario"
                                value={this.state.products.id_usuario}
                                onChange={e => this.updateField(e)}>
                                    {
                                      this.state.listUsers.map(users => {
                                        return <option value={users.id}> {users.name} </option>
                                    })
                                    }
                            </select>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(products) {
        this.setState({ products })
    }

    remove(products) {
        axios.delete(`${baseUrl}/${products.id}`).then(resp => {
            const list = this.getUpdatedList(products, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-6">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Marca</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(products => {
            return (
                <tr key={products.id}>
                    <td>{products.id}</td>
                    <td>{products.description}</td>
                    <td>{products.quantity}</td>
                    <td>{products.price}</td>
                    <td>{products.marca}</td>
                    <td>{products.id_usuario}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(products)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(products)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}