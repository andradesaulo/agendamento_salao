module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_cliente', {
      id_cliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_endereco: {
        allowNull: false,
        references: { model: 'tb_endereco', key: 'id_endereco' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(60),
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
    return queryInterface.dropTable('tb_cliente');
  },
};