import * as Yup from 'yup';
import Endereco from '../models/Endereco';

class EnderecoController {
  // Cadastra
  async store(req, res) {
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      bairro: Yup.string().required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { rua, numero, bairro, cidade, estado } = req.body;

    const enderecoExists = await Endereco.findOne({
      where: { rua, numero, bairro, cidade, estado },
    });

    if (enderecoExists) {
      return res.json(enderecoExists);
    }

    const endereco = await Endereco.create({
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });

    return res.json(endereco);
  }
}

export default new EnderecoController();
