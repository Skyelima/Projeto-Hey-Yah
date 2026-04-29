# Gamification & Alerts Quickstart

## Como Testar a Feature Localmente

1. Abra o arquivo `index.html` no navegador (Live Server recomendado ou simplesmente duplo clique).
2. Na interface principal, você deverá ver uma nova seção dedicada ao **Mascote (Pinguim)**.
3. Para testar a evolução:
   - Cadastre algumas tarefas.
   - Conclua uma tarefa clicando nela ou mudando seu status.
   - Observe a barra de experiência (XP) do pet aumentar.
   - Se quiser forçar a evolução sem precisar concluir 10 tarefas, abra o DevTools (F12) > Console e digite:
     `addXP(100)` para pular direto para o Estágio 1 (Bebê).
4. Para testar os Alertas:
   - Cadastre uma tarefa com data de vencimento para "Ontem".
   - Recarregue a página.
   - Um balão de fala aparecerá perto do Pinguim com uma mensagem amigável sugerindo reagendar a tarefa atrasada.
