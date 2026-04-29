const db = require('../config/database');

exports.getProgress = (req, res) => {
  db.get(`SELECT xp, estagioAtual FROM gamification WHERE user_id = ?`, [req.userId], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar gamificação' });
    if (!row) return res.status(404).json({ error: 'Progresso não encontrado' });
    res.json(row);
  });
};

exports.addXP = (req, res) => {
  const { amount } = req.body;
  if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Valor XP inválido' });

  db.get(`SELECT xp, estagioAtual FROM gamification WHERE user_id = ?`, [req.userId], (err, row) => {
    if (err || !row) return res.status(500).json({ error: 'Erro no servidor' });
    
    const newXP = row.xp + Number(amount);
    
    const PET_STAGES = [
      { level: 0, requiredXP: 0 },
      { level: 1, requiredXP: 100 },
      { level: 2, requiredXP: 300 },
      { level: 3, requiredXP: 600 }
    ];

    let newStage = row.estagioAtual;
    for (let i = PET_STAGES.length - 1; i >= 0; i--) {
      if (newXP >= PET_STAGES[i].requiredXP) {
        newStage = i;
        break;
      }
    }

    db.run(`UPDATE gamification SET xp = ?, estagioAtual = ? WHERE user_id = ?`, [newXP, newStage, req.userId], function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar XP' });
      res.json({ xp: newXP, estagioAtual: newStage });
    });
  });
};
