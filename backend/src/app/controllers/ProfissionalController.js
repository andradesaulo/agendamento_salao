import * as Yup from 'yup';
import Servico from '../models/Servico';
import Profissional from '../models/Profissional';

class ProfissionalController {
  // Lista
  async index(req, res) {
    const { page = 1 } = req.query;

    const profissionais = await Profissional.findAll({
      order: ['nome'],
      attributes: ['id', 'nome', 'telefone', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Servico,
          attributes: [
            'id',
            'descricao',
            'preco_servico',
            'exclusivo',
            'duracao',
          ],
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

    const { id, nome, telefone, email } = await Profissional.create(req.body);

    return res.json({
      id,
      nome,
      telefone,
      email,
    });
  }

  // Atualiza
  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      telefone: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const profissional = await Profissional.findByPk(req.params.id);

    if (req.body.email !== profissional.email) {
      const profissionalExists = await Profissional.findOne({
        where: { email: req.body.email },
      });

      if (profissionalExists) {
        return res.status(400).json({ error: 'Profissional já cadastrado' });
      }
    }

    const { id, nome, telefone, email } = await profissional.update(req.body);

    return res.json({
      id,
      nome,
      telefone,
      email,
    });
  }

  // Remove
  async delete(req, res) {
    // Verifica se o usuário logado é administrador
    if (!req.isAdm) {
      return res.status(401).json({
        error: 'Permissão de usuário insuficiente',
      });
    }

    const profissionalExists = await Profissional.findByPk(req.params.id);

    if (!profissionalExists) {
      return res.status(400).json({
        error: 'Profissional não cadastrado',
      });
    }

    await Profissional.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: 'Profissional removido com sucesso',
    });
  }
}

export default new ProfissionalController();
