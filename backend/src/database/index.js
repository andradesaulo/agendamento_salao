import Sequelize from 'sequelize';

import Agendamento from '../app/models/Agendamento';
import Cliente from '../app/models/Cliente';
import Endereco from '../app/models/Endereco';
import Horario from '../app/models/Horario';
import Profissional from '../app/models/Profissional';
import Servico from '../app/models/Servico';

import databaseConfig from '../config/database';

const models = [Agendamento, Cliente, Endereco, Horario, Profissional, Servico];

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
