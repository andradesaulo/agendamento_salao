module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_endereco', {
      id_endereco: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rua: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      numero: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      estado: {
        allowNull: false,
        type: Sequelize.CHAR(2),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tb_endereco');
  },
};
