const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Erro ao criptografar senha.' });

    db.run(
      `INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)`,
      [email, hash, name],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
          }
          return res.status(500).json({ error: 'Erro interno no banco de dados.' });
        }
        
        const userId = this.lastID;
        // Inicia o gamification profile
        db.run(`INSERT INTO gamification (user_id, xp, estagioAtual) VALUES (?, 0, 0)`, [userId]);
        
        res.status(201).json({ message: 'Usuário registrado com sucesso!', userId });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro interno.' });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao verificar senha.' });
      if (!result) return res.status(401).json({ error: 'Credenciais inválidas.' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  });
};
