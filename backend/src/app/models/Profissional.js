import Sequelize, { Model } from 'sequelize';

class Profissional extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(60),
        telefone: Sequelize.STRING(20),
        email: Sequelize.STRING(60),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: 'id_endereco' });
  }
}

export default Profissional;
