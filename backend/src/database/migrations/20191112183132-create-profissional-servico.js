module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_profissional_servico', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_profissional: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tb_profissional', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_servico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tb_servico', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('tb_profissional_servico');
  },
};
