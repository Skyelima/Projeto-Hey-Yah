require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const aiRoutes = require('./routes/aiRoutes');
const initDatabase = require('./models/schema');
const runNotificationJob = require('./jobs/notificationJob');

const app = express();

app.use(cors());
app.use(express.json());

// Inicia as tabelas do banco
initDatabase();

// Inicia os jobs em background
runNotificationJob();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/ai', aiRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Backend do Hey Ya rodando com sucesso!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
