module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_servico', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      preco_servico: {
        allowNull: false,
        type: Sequelize.DECIMAL(5, 2),
      },
      exclusivo: {
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      duracao: {
        allowNull: false,
        type: Sequelize.TIME,
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
    return queryInterface.dropTable('tb_servico');
  },
};
