import Sequelize from 'sequelize';

import Endereco from '../app/models/Endereco';
import Horario from '../app/models/Horario';
import Profissional from '../app/models/Profissional';
import ProfissionalServico from '../app/models/ProfissionalServico';
import Servico from '../app/models/Servico';

import databaseConfig from '../config/database';

const models = [Endereco, Horario, Profissional, ProfissionalServico, Servico];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
