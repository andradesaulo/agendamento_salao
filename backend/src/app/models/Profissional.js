import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Profissional extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(60),
        telefone: Sequelize.STRING(20),
        email: Sequelize.STRING(60),
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
      },
      {
        tableName: 'tb_profissional',
        sequelize,
      }
    );

    this.addHook('beforeSave', async profissional => {
      if (profissional.senha) {
        profissional.senha_hash = await bcrypt.hash(profissional.senha, 8);
      }
    });

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

  verificaSenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default Profissional;
