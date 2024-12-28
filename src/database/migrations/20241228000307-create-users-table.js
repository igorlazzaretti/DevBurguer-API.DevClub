'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Faz ou sobe uma tabela no banco
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // A senha é criptografada aqui
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Se usuário é adm
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        // Valor padrão é falso
        defaultValue: false,
      },
      // Informações de auditoria
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }

    });

  },
  // Desfaz a tabela no banco
  async down(queryInterface) {

    await queryInterface.dropTable('users');

  }
};

// Para rodar a migration, execute o comando:
// yarn sequelize db:migrate

// Para down
// yarn sequelize db:migrate:undo

// Desfaz todos os migrations
// yarn sequelize db:migrate:undo:all