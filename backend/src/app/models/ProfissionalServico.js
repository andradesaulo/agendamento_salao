import { Model } from 'sequelize';

class ProfissionalServico extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, { foreignKey: 'id_endereco' });
    this.belongsTo(models.Profissional, { foreignKey: 'id_profissional' });
  }
}

export default ProfissionalServico;
