import * as Yup from 'yup';
import Endereco from '../models/Endereco';
import Profissional from '../models/Profissional';

class ProfissionalController {
  // Lista
  async index(req, res) {
    const { page = 1 } = req.query;

    const profissionais = await Profissional.findAll({
      order: ['id'],
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

    return res.json(profissionais);
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

    const profissionalExists = await Profissional.findOne({
      where: { email: req.body.email },
    });

    if (profissionalExists) {
      return res.status(400).json({ error: 'Profissional já cadastrado' });
    }

    const { id } = await Profissional.create(req.body);

    const { nome, telefone, email, endereco } = await Profissional.findByPk(
      id,
      {
        include: [
          {
            model: Endereco,
            as: 'endereco',
            attributes: ['id', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
          },
        ],
      }
    );

    return res.json({ id, nome, telefone, email, endereco });
  }

  // Atualiza
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

    const profissional = await Profissional.findByPk(id);

    if (email && email !== profissional.email) {
      const profissionalExists = await Profissional.findOne({
        where: { email },
      });

      if (profissionalExists) {
        return res.status(400).json({ error: 'Profissional já cadastrado' });
      }
    }

    if (senha && !(await profissional.verificaSenha(senhaAntiga))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    await profissional.update(req.body);

    const profissionalAtualizado = await Profissional.findByPk(id, {
      attributes: ['id', 'nome', 'telefone', 'email'],
      include: [
        {
          model: Endereco,
          as: 'endereco',
          attributes: ['id', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
        },
      ],
    });

    return res.json(profissionalAtualizado);
  }

  // Remove
  async delete(req, res) {
    const { id } = req.params;

    const profissional = await Profissional.findByPk(id);

    if (!profissional) {
      return res.status(400).json({ error: 'Profissional não encontrado' });
    }

    await Profissional.destroy({ where: { id } });

    return res.json({ message: 'Profissional removido com sucesso' });
  }
}

export default new ProfissionalController();
