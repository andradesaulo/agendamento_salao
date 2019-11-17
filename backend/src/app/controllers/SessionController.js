import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { email, senha } = req.body;

    const cliente = await Cliente.findOne({
      where: { email },
      include: [
        {
          model: Endereco,
          as: 'endereco',
        },
      ],
    });

    if (!cliente) {
      return res.status(401).json({ error: 'Cliente não encontrado' });
    }

    if (!(await cliente.verificaSenha(senha))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, nome, telefone } = cliente;

    return res.json({
      cliente: {
        id,
        nome,
        email,
        telefone,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
