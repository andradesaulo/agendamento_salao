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
        freezeTableName: true,
        tableName: 'tb_servico',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Profissional, {
      through: 'tb_profissional_servico',
      foreignKey: 'id_servico',
    });
  }
}

export default Servico;
