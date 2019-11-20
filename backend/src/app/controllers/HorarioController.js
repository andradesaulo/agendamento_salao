import * as Yup from 'yup';
import Horario from '../models/Horario';
import Profissional from '../models/Profissional';

class HorarioController {
  // Busca
  async show(req, res) {
    const { id_profissional } = req.params;

    const profissional = await Profissional.findByPk(id_profissional, {
      include: [
        {
          model: Horario,
          as: 'horarios',
        },
      ],
    });

    if (!profissional) {
      return res.status(400).json({ error: 'Profissional não encontrado' });
    }

    return res.json(profissional.horarios);
  }

  // Cadastra
  async store(req, res) {
    const schema = Yup.object().shape({
      data_disponivel: Yup.string().required(),
      hr_inicio: Yup.string().required(),
      hr_fim: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const { id_profissional } = req.params;
    const { data_disponivel, hr_inicio, hr_fim } = req.body;

    const profissionalExists = await Profissional.findByPk(id_profissional);

    if (!profissionalExists) {
      return res.status(400).json({ error: 'Profissional não encontrado' });
    }

    const horarioExists = await Horario.findOne({
      where: {
        data_disponivel: `${data_disponivel}T00:00:00.000Z`,
        hr_inicio,
        hr_fim,
        id_profissional,
      },
    });

    if (horarioExists) {
      return res
        .status(400)
        .json({ error: 'Horário já cadastrado para esse profissional' });
    }

    const { id } = await Horario.create({
      data_disponivel,
      hr_inicio,
      hr_fim,
      id_profissional,
    });

    const horario = await Horario.findByPk(id, {
      attributes: ['data_disponivel', 'hr_inicio', 'hr_fim'],
      include: [
        {
          model: Profissional,
          as: 'profissional',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
      ],
    });

    return res.json(horario);
  }
}

export default new HorarioController();
