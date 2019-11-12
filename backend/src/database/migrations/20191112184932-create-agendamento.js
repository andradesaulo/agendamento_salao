module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_agendamento', {
      id_agendamento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_profissional: {
        allowNull: false,
        references: { model: 'tb_profissional', key: 'id_profissional' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      id_cliente: {
        allowNull: false,
        references: { model: 'tb_cliente', key: 'id_cliente' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      id_servico: {
        allowNull: false,
        references: { model: 'tb_servico', key: 'id_servico' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      data_agendamento: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      hr_inicio: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      valor_pago: {
        allowNull: false,
        type: Sequelize.DECIMAL(5, 2),
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
    return queryInterface.dropTable('tb_agendamento');
  },
};
