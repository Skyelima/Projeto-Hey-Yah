const db = require('../config/database');

const initDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        escala TEXT DEFAULT 'flexivel'
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        titulo TEXT,
        descricao TEXT,
        categoria TEXT,
        prioridade TEXT,
        prazo TEXT,
        status TEXT DEFAULT 'pendente',
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS gamification (
        user_id INTEGER PRIMARY KEY,
        xp INTEGER DEFAULT 0,
        estagioAtual INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    console.log('Tabelas sincronizadas no banco de dados.');
  });
};

module.exports = initDatabase;
