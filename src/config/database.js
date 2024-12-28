// Configurações do Banco de Dados
module.exports = {
    // Dialect: tipo de banco
    dialect: 'postgres',
    // Host: onde o banco está rodando
    host: 'localhost',
    // Port: porta do banco
    port: 5433,
    // Username: usuário do banco
    username: 'postgres',
    // Password: senha do banco
    password: 'postgres',
    // Database: nome do banco
    database: 'devburguer',
    // Define o timezone
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
}
