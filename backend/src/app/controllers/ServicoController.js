import * as Yup from 'yup';
import Servico from '../models/Servico';
import Profissional from '../models/Profissional';

class ServicoController {
  // Lista
  async index(req, res) {
    const { page = 1 } = req.query;

    const servicos = await Servico.findAll({
      order: ['descricao'],
      attributes: ['id', 'descricao', 'preco_servico', 'exclusivo', 'duracao'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(servicos);
  }

  async show(req, res) {
    const { id_profissional } = req.params;

    const profissional = await Profissional.findByPk(id_profissional, {
      include: {
        association: 'servicos',
        through: { attributes: [] },
      },
    });

    if (!profissional) {
      return res.status(400).json({ error: 'Profissional não encontrado' });
    }

    return res.json(profissional);
  }

  // Cadastra
  async store(req, res) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      preco_servico: Yup.number().required(),
      exclusivo: Yup.boolean().required(),
      duracao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { id_profissional } = req.params;
    const { descricao, preco_servico, exclusivo, duracao } = req.body;

    const profissional = await Profissional.findByPk(id_profissional);

    if (!profissional) {
      return res.status(400).json({ error: 'Profissional não encontrado' });
    }

    const [servico] = await Servico.findOrCreate({
      where: {
        descricao,
        preco_servico,
        exclusivo,
        duracao,
      },
    });

    await profissional.addServico(servico);

    return res.json(servico);
  }

  // Atualiza
  async update(req, res) {
    const schema = Yup.object().shape({
      descricao: Yup.string()
        .max(30)
        .required(),
      preco_servico: Yup.number().required(),
      exclusivo: Yup.boolean().required(),
      duracao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const servico = await Servico.findByPk(req.params.id);

    if (req.body.descricao !== servico.descricao) {
      const servicoExists = await Servico.findOne({
        where: { descricao: req.body.descricao },
      });

      if (servicoExists) {
        return res.status(400).json({ error: 'Serviço já existente' });
      }
    }

    const {
      id,
      descricao,
      preco_servico,
      exclusivo,
      duracao,
    } = await servico.update(req.body);

    return res.json({
      id,
      descricao,
      preco_servico,
      exclusivo,
      duracao,
    });
  }

  // Remove
  async delete(req, res) {
    const { id_profissional, id_servico } = req.params;

    const profissional = await Profissional.findByPk(id_profissional);

    if (!profissional) {
      return res.status(400).json({
        error: 'Profissional não encontrado',
      });
    }

    const servico = await Servico.findByPk(id_servico);

    if (!servico) {
      return res.status(400).json({
        error: 'Serviço não encontrado',
      });
    }

    await profissional.removeServico(servico);

    return res.status(200).json({
      message: 'Serviço removido com sucesso',
    });
  }
}

export default new ServicoController();
