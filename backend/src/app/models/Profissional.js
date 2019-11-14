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
        freezeTableName: true,
        tableName: 'tb_profissional',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: 'id_endereco' });
    this.belongsToMany(models.Servico, {
      through: 'tb_profissional_servico',
      foreignKey: 'id_profissional',
    });
  }
}

export default Profissional;
