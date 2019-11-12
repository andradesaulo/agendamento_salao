module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_profissional_servico', {
      id_profissional: {
        allowNull: false,
        primaryKey: true,
        references: { model: 'tb_profissional', key: 'id_profissional' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      id_servico: {
        allowNull: false,
        primaryKey: true,
        references: { model: 'tb_endereco', key: 'id_endereco' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
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
