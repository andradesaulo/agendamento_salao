import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Cliente extends Model {
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
        sequelize,
        tableName: 'tb_cliente',
      }
    );

    this.addHook('beforeSave', async cliente => {
      if (cliente.senha) {
        cliente.senha_hash = await bcrypt.hash(cliente.senha, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, {
      foreignKey: 'id_endereco',
      as: 'endereco',
    });
  }

  verificaSenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default Cliente;
