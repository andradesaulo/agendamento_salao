import Sequelize, { Model } from 'sequelize';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        data_agendamento: Sequelize.DATE,
        hr_inicio: Sequelize.TIME,
        descricao: Sequelize.STRING(60),
        valor_pago: Sequelize.DECIMAL(5, 2),
      },
      {
        tableName: 'tb_agendamento',
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
    this.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
    this.belongsTo(models.Servico, { foreignKey: 'id_servico', as: 'servico' });
  }
}

export default Agendamento;
