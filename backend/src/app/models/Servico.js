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
        tableName: 'tb_servico',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Profissional, {
      foreignKey: 'id_servico',
      through: 'tb_profissional_servico',
      as: 'profissionais',
    });
    this.hasMany(models.Agendamento, {
      foreignKey: 'id_servico',
      as: 'agendamentos',
    });
  }
}

export default Servico;
