import Sequelize from 'sequelize';

import Servico from '../app/models/Servico';

import databaseConfig from '../config/database';

const models = [Servico];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
