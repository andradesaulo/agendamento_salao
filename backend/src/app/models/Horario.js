import Sequelize, { Model } from 'sequelize';

class Horario extends Model {
  static init(sequelize) {
    super.init(
      {
        data_disponivel: Sequelize.DATE,
        hr_inicio: Sequelize.TIME,
        hr_fim: Sequelize.TIME,
      },
      {
        tableName: 'tb_horario',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Profissional, {
      foreignKey: 'id_profissional',
      as: 'profissional',
    });
  }
}

export default Horario;
