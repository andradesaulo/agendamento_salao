module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_agendamento', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_profissional: {
        allowNull: false,
        references: { model: 'tb_profissional', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      id_cliente: {
        allowNull: false,
        references: { model: 'tb_cliente', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      id_servico: {
        allowNull: false,
        references: { model: 'tb_servico', key: 'id' },
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
        type: Sequelize.STRING(60),
      },
      valor_pago: {
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
