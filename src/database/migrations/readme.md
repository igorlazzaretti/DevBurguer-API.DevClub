# Migrations

As migrações são utilizadas para versionar as alterações no esquema do banco de dados. Elas permitem que você evolua a estrutura do banco de dados de forma controlada e reproduzível, garantindo que todos os ambientes (desenvolvimento, teste, produção) estejam sincronizados.

## Propósito dos Arquivos de Migração

- **Criar Tabelas**: Definem a estrutura inicial das tabelas no banco de dados.
- **Alterar Tabelas**: Adicionam, removem ou modificam colunas e índices nas tabelas existentes.
- **Popular Dados**: Inserem dados iniciais ou de configuração necessários para a aplicação.
- **Reverter Alterações**: Permitem desfazer mudanças aplicadas anteriormente, garantindo a integridade do banco de dados.

As migrações são geralmente geradas e aplicadas utilizando ferramentas específicas do framework ou ORM (Object-Relational Mapping) que você está utilizando no seu projeto.

## Criando uma Nova Migração

Para criar uma nova migração utilizando Sequelize, você pode usar o seguinte comando:

```sh
yarn sequelize migration:create --name create-users-table
```

Substitua `create-users-table` pelo nome que descreve a migração que você está criando. Este comando gerará um novo arquivo de migração na pasta de migrações.