const db = require('../config/database');

exports.generateSuggestions = (req, res) => {
  // Busca tarefas do banco para analisar
  db.all(`SELECT * FROM tasks WHERE user_id = ?`, [req.userId], (err, tasks) => {
    if (err) return res.status(500).json({ error: 'Erro interno ao buscar tarefas' });
    
    db.get(`SELECT escala FROM users WHERE id = ?`, [req.userId], (err, user) => {
      if (err || !user) return res.status(500).json({ error: 'Usuário não encontrado' });

      const pending = tasks.filter(t => t.status === 'pendente');
      const highPriority = pending.filter(t => t.prioridade === 'alta');
      const schedule = user.escala || 'flexivel';

      // Esta lógica antes estava no frontend. Agora no backend, podemos futuramente chamar a API da OpenAI aqui de forma segura.
      const suggestions = [];

      suggestions.push({ 
        title: '📅 Cronograma Otimizado', 
        text: `Com base nas suas ${pending.length} tarefas pendentes e escala ${schedule}, recomendo: manhã para tarefas de alta prioridade, tarde para tarefas moderadas.`, 
        tag: 'Cronograma' 
      });

      suggestions.push({ 
        title: '😴 Janela de Descanso', 
        text: 'Detectei alta carga cognitiva. Sugiro uma pausa de 20 minutos às 15h para recuperação mental.', 
        tag: 'Bem-estar' 
      });

      if (highPriority.length > 0) {
        suggestions.push({ 
          title: '📊 Reorganização de Prioridades', 
          text: `Você tem ${highPriority.length} tarefas de alta prioridade. Considere delegar ou adiar as menos urgentes.`, 
          tag: 'Priorização' 
        });
      }

      if (pending.length > 0) {
        suggestions.push({ 
          title: '🎯 Foco Recomendado', 
          text: `Comece por "${pending[0].titulo}" — é sua tarefa mais antiga pendente.`, 
          tag: 'Produtividade' 
        });
      } else {
        suggestions.push({ 
          title: '🎯 Foco Recomendado', 
          text: 'Todas as tarefas concluídas! Hora de descansar.', 
          tag: 'Produtividade' 
        });
      }

      if (['12x36','plantao'].includes(schedule)) {
        suggestions.push({ 
          title: '⚠️ Alerta de Escala (RN02)', 
          text: 'Em dia de plantão, evite tarefas de alta densidade cognitiva após 8 horas de trabalho contínuo.', 
          tag: 'Regra RN02' 
        });
      }

      // US3: Empatia se o usuário tem muitas tarefas pendentes (possível burnout)
      if (pending.length >= 5) {
        suggestions.push({ 
          title: '💙 O Pinguim diz:', 
          text: 'Estou vendo que há muitas tarefas acumuladas. Respire fundo, faça pausas e não hesite em adiar o que não é urgente.', 
          tag: 'Empatia' 
        });
      }

      res.json(suggestions);
    });
  });
};
