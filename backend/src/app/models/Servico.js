import Sequelize, { Model } from 'sequelize';

class Servico extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING(30),
        preco_servico: Sequelize.DECIMAL(5, 2),
        exclusivo: Sequelize.BOOLEAN,
        duracao: Sequelize.TIME,
      },
      {
        sequelize,
      }
    );
  }
}

export default Servico;
