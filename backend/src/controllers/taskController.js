const db = require('../config/database');

exports.getAll = (req, res) => {
  db.all(`SELECT * FROM tasks WHERE user_id = ?`, [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { titulo, descricao, categoria, prioridade, prazo } = req.body;
  const sql = `INSERT INTO tasks (user_id, titulo, descricao, categoria, prioridade, prazo, status) 
               VALUES (?, ?, ?, ?, ?, ?, 'pendente')`;
  
  db.run(sql, [req.userId, titulo, descricao, categoria, prioridade, prazo], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao criar tarefa' });
    
    db.get(`SELECT * FROM tasks WHERE id = ?`, [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, categoria, prioridade, prazo, status } = req.body;
  
  // Primeiro verifica se a tarefa pertence ao usuário
  db.get(`SELECT * FROM tasks WHERE id = ? AND user_id = ?`, [id, req.userId], (err, task) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    const sql = `UPDATE tasks SET titulo=?, descricao=?, categoria=?, prioridade=?, prazo=?, status=? WHERE id=?`;
    db.run(sql, [
      titulo || task.titulo, 
      descricao || task.descricao, 
      categoria || task.categoria, 
      prioridade || task.prioridade, 
      prazo || task.prazo, 
      status || task.status, 
      id
    ], function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
      res.json({ message: 'Tarefa atualizada com sucesso' });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM tasks WHERE id = ? AND user_id = ?`, [id, req.userId], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao deletar tarefa' });
    if (this.changes === 0) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa deletada' });
  });
};
