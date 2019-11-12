module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_horario', {
      id_horario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_profissional: {
        allowNull: false,
        references: { model: 'tb_profissional', key: 'id_profissional' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      data_disponivel: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      hr_inicio: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      hr_fim: {
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
    return queryInterface.dropTable('tb_horario');
  },
};
