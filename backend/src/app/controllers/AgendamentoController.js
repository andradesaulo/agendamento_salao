import * as Yup from 'yup';

import Agendamento from '../models/Agendamento';
import Cliente from '../models/Cliente';
import Profissional from '../models/Profissional';
import Servico from '../models/Servico';

class AgendamentoController {
  // Lista
  async index(req, res) {
    const { page = 1, id_cliente, id_profissional } = req.query;

    const whereQuery = {};

    if (id_cliente) {
      whereQuery.id_cliente = id_cliente;
    }

    if (id_profissional) {
      whereQuery.id_profissional = id_profissional;
    }

    const agendamentos = await Agendamento.findAll({
      order: ['data_agendamento'],
      attributes: [
        'id',
        'data_agendamento',
        'hr_inicio',
        'descricao',
        'valor_pago',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
        {
          model: Profissional,
          as: 'profissional',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
        {
          model: Servico,
          as: 'servico',
          attributes: ['descricao', 'preco_servico', 'exclusivo', 'duracao'],
        },
      ],
      where: whereQuery,
    });

    return res.json(agendamentos);
  }

  // Cadastra
  async store(req, res) {
    const schema = Yup.object().shape({
      data_agendamento: Yup.string().required(),
      hr_inicio: Yup.string().required(),
      descricao: Yup.string(),
      valor_pago: Yup.number(),
      id_cliente: Yup.number().required(),
      id_profissional: Yup.number().required(),
      id_servico: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const {
      data_agendamento,
      hr_inicio,
      id_cliente,
      id_profissional,
      id_servico,
    } = req.body;

    const clienteExists = await Cliente.findByPk(id_cliente);

    if (!clienteExists) {
      return res.status(400).json({ error: 'Cliente não encontrado' });
    }

    const profissionalExists = await Profissional.findByPk(id_profissional);

    if (!profissionalExists) {
      return res.status(400).json({ error: 'Profissional não encontrado' });
    }

    const servicoExists = await Servico.findByPk(id_servico);

    if (!servicoExists) {
      return res.status(400).json({ error: 'Serviço não encontrado' });
    }

    const agendamentoExists = await Agendamento.findOne({
      where: {
        data_agendamento: `${data_agendamento}T00:00:00.000Z`,
        hr_inicio,
        id_cliente,
        id_profissional,
      },
    });

    if (agendamentoExists) {
      return res.status(400).json({ error: 'Agendamento já cadastrado' });
    }

    const { id } = await Agendamento.create(req.body);

    const agendamento = await Agendamento.findByPk(id, {
      attributes: ['data_agendamento', 'hr_inicio', 'descricao', 'valor_pago'],
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
        {
          model: Profissional,
          as: 'profissional',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
        {
          model: Servico,
          as: 'servico',
          attributes: ['descricao', 'preco_servico', 'exclusivo', 'duracao'],
        },
      ],
    });

    return res.json(agendamento);
  }
}

export default new AgendamentoController();
