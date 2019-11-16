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
        freezeTableName: true,
        tableName: 'tb_endereco',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Cliente, { foreignKey: 'id_endereco', as: 'clientes' });
    this.hasMany(models.Profissional, {
      foreignKey: 'id_endereco',
      as: 'profissionais',
    });
  }
}

export default Endereco;
