# Como instalar e testar o back-end
Primeiro, baixe ou clone o repositório em sua máquina.
Em seguida, abra o projeto no VSCode ou editor de preferência.
No terminal, navegue até a pasta back-end
```
cd backend
```
Depois, certifique-se de ter o npm instalado em sua máquina e rode o comando para instalar as dependências do projeto:
```
npm i
```
Após a instalação de todas as depências você deve inserir no projeto as configurações do seu banco de dados PostgreSQL.
Para isso abra o arquivo "./backend/src/config/database.js"
Insira as informações do seu banco de dados PostgreSQL, exemplo:
```
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: '5432',
  username: 'postgres',
  password: 'postgres',
  database: 'salao_beleza',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
Após configurar o backend para se conectar ao seu banco de dados postgres, no terminal rode o comando
```
npx sequelize-cli db:create
```
Isso irá criar um database com o nome informado no arquivo de configuracao do banco de dados acima.
Por fim, rode as migrations do backend para que as tabelas sejam criadas dentro do banco de dados.
```
npx sequelize-cli db:migrate
```
Pronto, agora o backend já está pronto para ser utilizado, para subí-lo rode o comando no terminal:
```
npm run dev
```
