const db = require('../config/database');

const runNotificationJob = () => {
  // Roda a cada 1 hora (3600000 ms)
  setInterval(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Busca tarefas pendentes com prazo para hoje ou atrasadas
    db.all(`
      SELECT t.id, t.titulo, t.prazo, u.email, u.name 
      FROM tasks t
      JOIN users u ON t.user_id = u.id
      WHERE t.status = 'pendente' AND t.prazo <= ?
    `, [today], (err, rows) => {
      if (err) {
        console.error('Erro ao rodar notification job:', err);
        return;
      }

      if (rows && rows.length > 0) {
        console.log(`[JOB] Encontradas ${rows.length} tarefas pendentes.`);
        rows.forEach(task => {
          // Aqui integraríamos com um provedor de email (Nodemailer) ou Web Push real
          console.log(`[SIMULAÇÃO DE PUSH/EMAIL] Para: ${task.email} (${task.name})`);
          console.log(`Mensagem: Oi! Notei que a tarefa "${task.titulo}" está pendente. Que tal fazermos com calma hoje? 💙🐧`);
        });
      }
    });
  }, 3600000);
  
  console.log('Notification Job agendado (roda a cada 1h).');
};

module.exports = runNotificationJob;
