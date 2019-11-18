import * as Yup from 'yup';
import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';

class ClienteController {
  // Lista
  async index(req, res) {
    const { page = 1 } = req.query;

    const clientes = await Cliente.findAll({
      order: ['nome'],
      attributes: ['id', 'nome', 'telefone', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Endereco,
          as: 'endereco',
          attributes: ['id', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
        },
      ],
    });

    return res.json(clientes);
  }

  // Cadastra
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      telefone: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      id_endereco: Yup.number().required(),
      senha: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const clienteExists = await Cliente.findOne({
      where: { email: req.body.email },
    });

    if (clienteExists) {
      return res.status(400).json({ error: 'Cliente já cadastrado' });
    }

    const { id } = await Cliente.create(req.body);

    const { nome, telefone, email, endereco } = await Cliente.findByPk(id, {
      include: [
        {
          model: Endereco,
          as: 'endereco',
          attributes: ['id', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
        },
      ],
    });

    return res.json({ id, nome, telefone, email, endereco });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      telefone: Yup.string(),
      email: Yup.string().email(),
      id_endereco: Yup.number(),
      senhaAntiga: Yup.string()
        .min(6)
        .when('senha', (senha, field) => (senha ? field.required() : field)),
      senha: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { email, senhaAntiga, senha } = req.body;
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(400).json({ error: 'Cliente não encontrado' });
    }

    if (email && email !== cliente.email) {
      const clienteExists = await Cliente.findOne({ where: { email } });

      if (clienteExists) {
        return res.status(400).json({ error: 'Cliente já cadastrado' });
      }
    }

    if (senha && !(await cliente.verificaSenha(senhaAntiga))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    await cliente.update(req.body);

    const clienteAtualizado = await Cliente.findByPk(id, {
      attributes: ['id', 'nome', 'telefone', 'email'],
      include: [
        {
          model: Endereco,
          as: 'endereco',
          attributes: ['id', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
        },
      ],
    });

    return res.json(clienteAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(400).json({ error: 'Cliente não encontrado' });
    }

    await Cliente.destroy({ where: { id } });

    return res.json({ message: 'Cliente removido com sucesso' });
  }
}

export default new ClienteController();
