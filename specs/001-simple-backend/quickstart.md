# Backend Quickstart

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na máquina.
2. Navegue até a nova pasta backend: 
   ```bash
   cd backend
   ```
3. Instale as dependências essenciais do projeto:
   ```bash
   npm install express cors sqlite3 bcrypt jsonwebtoken dotenv
   ```
4. Crie um arquivo `.env` na pasta `backend/` com:
   ```env
   PORT=3000
   JWT_SECRET=super_secret_anti_burnout_key_2026
   ```
5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   node src/server.js
   ```
6. O servidor confirmará que está rodando em `http://localhost:3000` e conectará automaticamente ao banco de dados SQLite local.
