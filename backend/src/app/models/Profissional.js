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
        tableName: 'tb_profissional',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, {
      foreignKey: 'id_endereco',
      as: 'endereco',
    });
    this.belongsToMany(models.Servico, {
      foreignKey: 'id_profissional',
      through: 'tb_profissional_servico',
      as: 'servicos',
    });
  }
}

export default Profissional;
