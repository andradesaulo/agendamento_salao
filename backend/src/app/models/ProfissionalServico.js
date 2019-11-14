import { Model } from 'sequelize';

class ProfissionalServico extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        freezeTableName: true,
        tableName: 'tb_profissional_servico',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Profissional, {
      foreignKey: 'id',
    });
    this.belongsTo(models.Servico, {
      foreignKey: 'id',
    });
  }
}

export default ProfissionalServico;
