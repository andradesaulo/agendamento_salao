import * as Yup from 'yup';
import Cliente from '../models/Cliente';

class ClienteController {
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

    const { nome, telefone, email, senha, id_endereco } = req.body;

    const { id } = await Cliente.create({
      nome,
      telefone,
      email,
      senha,
      id_endereco,
    });

    return res.json({
      id,
      nome,
      telefone,
      email,
      id_endereco,
    });
  }
}

export default new ClienteController();
