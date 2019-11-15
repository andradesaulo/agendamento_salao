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
      include: [
        {
          model: Profissional,
          attributes: ['id', 'nome', 'telefone'],
        },
      ],
    });

    return res.json(servicos);
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

    const servicoExists = await Servico.findOne({
      where: { descricao: req.body.descricao },
    });

    if (servicoExists) {
      return res.status(400).json({ error: 'Serviço já existente' });
    }

    const {
      id,
      descricao,
      preco_servico,
      exclusivo,
      duracao,
    } = await Servico.create(req.body);

    return res.json({
      id,
      descricao,
      preco_servico,
      exclusivo,
      duracao,
    });
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
    // Verifica se o usuário logado é administrador
    if (!req.isAdm) {
      return res.status(401).json({
        error: 'Permissão de usuário insuficiente',
      });
    }

    const servicoExists = await Servico.findByPk(req.params.id);

    if (!servicoExists) {
      return res.status(400).json({
        error: 'Serviço não existe',
      });
    }

    await Servico.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      message: 'Serviço removido com sucesso',
    });
  }
}

export default new ServicoController();
