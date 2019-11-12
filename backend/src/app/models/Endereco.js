import Sequelize, { Model } from 'sequelize';

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        rua: Sequelize.STRING(80),
        numero: Sequelize.INTEGER,
        bairro: Sequelize.STRING(30),
        cidade: Sequelize.STRING(30),
        estado: Sequelize.CHAR(2),
      },
      {
        sequelize,
      }
    );
  }
}

export default Endereco;
