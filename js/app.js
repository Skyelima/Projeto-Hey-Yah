/* ============================================
   Hey Ya! — App Logic
   ============================================ */

// ===== STATE =====
const MOCK_USER = { username: 'admin', password: '1234', nome: 'Admin', email: 'admin@heyya.app' };

const DEFAULT_TASKS = [
  { id: 1, titulo: 'Estudar Java Collections', descricao: 'Revisar ArrayList, HashMap e TreeSet', prazo: todayStr(), categoria: 'estudo', prioridade: 'alta', status: 'pendente', criadoEm: Date.now() },
  { id: 2, titulo: 'Reunião de equipe', descricao: 'Alinhamento semanal do projeto UNICID', prazo: todayStr(), categoria: 'trabalho', prioridade: 'media', status: 'pendente', criadoEm: Date.now() },
  { id: 3, titulo: 'Caminhada 30min', descricao: 'Atividade física leve para descanso mental', prazo: todayStr(), categoria: 'saude', prioridade: 'baixa', status: 'concluida', criadoEm: Date.now() },
  { id: 4, titulo: 'Implementar CRUD de Tarefas', descricao: 'Finalizar UC2-UC5 do projeto Hey Ya!', prazo: todayStr(), categoria: 'trabalho', prioridade: 'alta', status: 'pendente', criadoEm: Date.now() },
  { id: 5, titulo: 'Ler artigo sobre MongoDB', descricao: 'Entender schema flexível para o projeto', prazo: tomorrowStr(), categoria: 'estudo', prioridade: 'media', status: 'pendente', criadoEm: Date.now() },
];

const BADGES = [
  { id: 'first_task', icon: '🎯', nome: 'Primeira Tarefa', desc: 'Crie sua primeira tarefa', condition: (s) => s.totalCreated >= 1 },
  { id: 'five_done', icon: '⭐', nome: '5 Concluídas', desc: 'Conclua 5 tarefas', condition: (s) => s.totalDone >= 5 },
  { id: 'ten_done', icon: '🌟', nome: '10 Concluídas', desc: 'Conclua 10 tarefas', condition: (s) => s.totalDone >= 10 },
  { id: 'schedule_set', icon: '⚙️', nome: 'Organizado', desc: 'Configure sua escala', condition: (s) => !!s.schedule },
  { id: 'streak_3', icon: '🔥', nome: '3 Seguidas', desc: 'Complete 3 no mesmo dia', condition: (s) => s.todayDone >= 3 },
  { id: 'ai_user', icon: '🤖', nome: 'Tech Savvy', desc: 'Use sugestões da IA', condition: (s) => s.aiUsed },
  { id: 'all_cats', icon: '🌈', nome: 'Equilibrado', desc: 'Tarefas em todas as categorias', condition: (s) => s.categories >= 4 },
  { id: 'level_5', icon: '👑', nome: 'Veterano', desc: 'Alcance nível 5', condition: (s) => s.level >= 5 },
];

const AI_TIPS = [
  'Com base na sua escala, sugiro blocos de estudo de 45min seguidos de 15min de pausa.',
  'Você tem 2 tarefas de alta prioridade hoje. Foque nelas antes das 14h para máxima produtividade.',
  'Seu nível de cansaço estimado está moderado. Considere uma caminhada de 15min entre tarefas.',
  'Padrão detectado: Você é mais produtivo entre 9h e 12h. Agende tarefas complexas nesse período.',
  'Dica: Divida tarefas grandes em subtarefas de 25min (Técnica Pomodoro).',
  'Sua escala atual permite 3h de estudo hoje. Recomendo priorizar Java Collections.',
  'Atenção RN01: Evite acumular mais de 3 tarefas urgentes — prevenção de burnout ativada.',
];

function todayStr() { return new Date().toISOString().split('T')[0]; }
function tomorrowStr() { const d = new Date(); d.setDate(d.getDate()+1); return d.toISOString().split('T')[0]; }

// ===== DATA LAYER (localStorage mock for MongoDB - UC11) =====
function loadData(key, fallback) {
  try { const d = localStorage.getItem('heyya_'+key); return d ? JSON.parse(d) : fallback; }
  catch { return fallback; }
}
function saveData(key, data) { localStorage.setItem('heyya_'+key, JSON.stringify(data)); }

function getTasks() { return loadData('tasks', null) || JSON.parse(JSON.stringify(DEFAULT_TASKS)); }
function saveTasks(tasks) { saveData('tasks', tasks); }
function getUserData() { return loadData('user', { pontos: 170, nivel: 2, escala: '5x2', aiUsed: true, totalCreated: 8, totalDone: 4 }); }
function saveUserData(data) { saveData('user', data); }

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLoginCanvas();
  initLogin();
  initMobile();
  // Check if already logged in
  if (loadData('loggedIn', false)) showApp();
  // Start mascot routine
  initMascot();
});

// ===== LOGIN =====
function initLogin() {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    if (user === MOCK_USER.username && pass === MOCK_USER.password) {
      saveData('loggedIn', true);
      showApp();
    } else {
      const el = document.getElementById('loginError');
      el.textContent = '❌ Credenciais inválidas. Tente novamente.';
      document.getElementById('loginPass').value = '';
      setTimeout(() => el.textContent = '', 3000);
    }
  });
}

function showApp() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appContainer').classList.remove('hidden');
  document.getElementById('appContainer').classList.add('flex');
  refreshAll();
}

function logout() {
  saveData('loggedIn', false);
  document.getElementById('appContainer').classList.add('hidden');
  document.getElementById('appContainer').classList.remove('flex');
  document.getElementById('loginScreen').style.display = '';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

// ===== NAVIGATION =====
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${page}"]`).classList.add('active');
  // Close mobile sidebar
  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.add('-translate-x-full');
  if (overlay) overlay.classList.remove('active');
  // Refresh page data
  if (page === 'dashboard') refreshDashboard();
  if (page === 'tasks') renderTasks();
  if (page === 'schedule') refreshSchedule();
  if (page === 'gamification') refreshGamification();
}
window.navigateTo = navigateTo;

function initMobile() {
  document.getElementById('mobileToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
    document.getElementById('sidebarOverlay').classList.toggle('active');
  });
  document.getElementById('sidebarOverlay')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebarOverlay').classList.remove('active');
  });
}

// ===== REFRESH ALL =====
function refreshAll() {
  const userData = getUserData();
  document.getElementById('userName').textContent = MOCK_USER.nome;
  document.getElementById('userAvatar').textContent = MOCK_USER.nome[0];
  document.getElementById('userLevel').textContent = '🏆 Nível ' + userData.nivel;
  const tasks = getTasks();
  document.getElementById('taskCount').textContent = tasks.filter(t=>t.status==='pendente').length;
  refreshDashboard();
  renderTasks();
  refreshSchedule();
  refreshGamification();
}

// ===== DASHBOARD =====
function refreshDashboard() {
  const tasks = getTasks();
  const userData = getUserData();
  const today = todayStr();
  const todayTasks = tasks.filter(t => t.prazo === today);
  const done = tasks.filter(t => t.status === 'concluida').length;
  const pending = tasks.filter(t => t.status === 'pendente').length;

  document.getElementById('statTotal').textContent = tasks.length;
  document.getElementById('statDone').textContent = done;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statPoints').textContent = userData.pontos;

  // Today tasks
  const container = document.getElementById('dashTasks');
  if (todayTasks.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>Nenhuma tarefa para hoje</p></div>';
  } else {
    container.innerHTML = todayTasks.map(t => `
      <div class="flex items-center gap-4 p-4 bg-black rounded-2xl mb-2 active:bg-white/5 transition-colors" onclick="toggleTaskStatus(${t.id})">
        <div class="w-6 h-6 rounded-full border-2 border-gray-800 flex items-center justify-center ${t.status==='concluida'?'bg-blue-500 border-transparent':''}">
          ${t.status==='concluida'?'<span class="text-white text-[10px]">✓</span>':''}
        </div>
        <div class="flex-1">
          <div class="text-sm font-semibold text-white ${t.status==='concluida'?'line-through opacity-50':''}">${esc(t.titulo)}</div>
          <div class="text-[10px] text-gray-500 mt-0.5">${catLabel(t.categoria)}</div>
        </div>
        <div class="text-[10px] font-black uppercase tracking-wider ${t.prioridade==='alta'?'text-red-500':t.prioridade==='media'?'text-yellow-500':'text-green-500'}">
          ${t.prioridade}
        </div>
      </div>
    `).join('');
  }

  // XP bar
  const xpForLevel = userData.nivel * 100;
  const xpInLevel = userData.pontos % 100;
  const pct = Math.min((xpInLevel / 100) * 100, 100);
  document.getElementById('dashXpBar').style.width = pct + '%';
  document.getElementById('dashXpText').textContent = `${xpInLevel} / 100 XP`;
  document.getElementById('dashLevelText').textContent = 'Nível ' + userData.nivel;

  // Badges mini
  const stats = getStats();
  document.getElementById('dashBadges').innerHTML = BADGES.slice(0,4).map(b => `
    <div class="badge-item ${b.condition(stats)?'earned':''}">${b.icon} ${b.nome}</div>
  `).join('');

  // AI tip
  document.getElementById('dashAiTip').textContent = AI_TIPS[Math.floor(Math.random()*AI_TIPS.length)];

  // Bar chart
  renderBarChart();
}

function renderBarChart() {
  const days = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const chart = document.getElementById('barChart');
  chart.innerHTML = days.map(d => {
    const e = Math.random()*80+20, t = Math.random()*80+10, s = Math.random()*60+10;
    return `<div class="bar-group">
      <div class="bar estudo" style="height:${e}%"></div>
      <div class="bar trabalho" style="height:${t}%"></div>
      <div class="bar saude" style="height:${s}%"></div>
      <div class="bar-label">${d}</div>
    </div>`;
  }).join('');
}

// ===== TASKS CRUD (UC2-UC5) =====
let currentFilter = 'all';

function renderTasks() {
  const tasks = getTasks();
  const list = document.getElementById('tasksList');
  let filtered = tasks;

  if (currentFilter === 'pendente') filtered = tasks.filter(t=>t.status==='pendente');
  else if (currentFilter === 'concluida') filtered = tasks.filter(t=>t.status==='concluida');
  else if (['estudo','trabalho','saude','pessoal'].includes(currentFilter)) filtered = tasks.filter(t=>t.categoria===currentFilter);

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>Nenhuma tarefa encontrada</p></div>';
    return;
  }

  list.innerHTML = filtered.map(t => `
    <div class="glass-card task-card ${t.status==='concluida'?'done':''}">
      <div class="task-check" onclick="toggleTaskStatus(${t.id})"></div>
      <div class="task-info">
        <div class="task-title">${esc(t.titulo)}</div>
        <div class="task-desc">${esc(t.descricao)}</div>
        <div class="task-tags">
          <span class="task-tag tag-${t.categoria}">${catLabel(t.categoria)}</span>
          <span class="mini-task-priority priority-${t.prioridade}">${t.prioridade.toUpperCase()}</span>
          ${t.prazo ? `<span style="font-size:0.7rem; color:var(--text-muted);">📅 ${formatDate(t.prazo)}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="task-btn" onclick="editTask(${t.id})" title="Editar">✏️</button>
        <button class="task-btn delete" onclick="deleteTask(${t.id})" title="Excluir">🗑️</button>
      </div>
    </div>
  `).join('');

  document.getElementById('taskCount').textContent = tasks.filter(t=>t.status==='pendente').length;
}

function filterTasks(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTasks();
}
window.filterTasks = filterTasks;

function toggleTaskStatus(id) {
  const tasks = getTasks();
  const task = tasks.find(t=>t.id===id);
  if (!task) return;
  const wasCompleted = task.status === 'concluida';
  task.status = wasCompleted ? 'pendente' : 'concluida';
  saveTasks(tasks);

  // Gamification: award points
  if (!wasCompleted) {
    const userData = getUserData();
    let points = 10;
    if (task.prioridade === 'alta') points = 25;
    else if (task.prioridade === 'media') points = 15;
    userData.pontos += points;
    userData.totalDone = (userData.totalDone||0) + 1;
    userData.todayDone = (userData.todayDone||0) + 1;
    userData.nivel = Math.floor(userData.pontos / 100) + 1;
    saveUserData(userData);
    document.getElementById('userLevel').textContent = '🏆 Nível ' + userData.nivel;
  }

  renderTasks();
  refreshDashboard();
}
window.toggleTaskStatus = toggleTaskStatus;

// UC3 - Create Task
function openTaskModal(editId) {
  document.getElementById('taskModal').classList.add('active');
  if (editId) {
    const task = getTasks().find(t=>t.id===editId);
    if (!task) return;
    document.getElementById('modalTitle').textContent = 'Editar Tarefa';
    document.getElementById('taskSubmitBtn').textContent = 'Salvar Alterações';
    document.getElementById('taskEditId').value = editId;
    document.getElementById('taskTitleInput').value = task.titulo;
    document.getElementById('taskDescInput').value = task.descricao;
    document.getElementById('taskCatInput').value = task.categoria;
    document.getElementById('taskPriorityInput').value = task.prioridade;
    document.getElementById('taskDeadlineInput').value = task.prazo;
  } else {
    document.getElementById('modalTitle').textContent = 'Nova Tarefa';
    document.getElementById('taskSubmitBtn').textContent = 'Criar Tarefa';
    document.getElementById('taskEditId').value = '';
    document.getElementById('taskForm').reset();
    document.getElementById('taskDeadlineInput').value = todayStr();
  }
  checkRN01();
}
window.openTaskModal = openTaskModal;

function closeTaskModal() {
  document.getElementById('taskModal').classList.remove('active');
  document.getElementById('rnWarning').classList.remove('visible');
}
window.closeTaskModal = closeTaskModal;

// RN01 - Eisenhower Prevention
function checkRN01() {
  const tasks = getTasks();
  const today = todayStr();
  const highToday = tasks.filter(t => t.prioridade === 'alta' && t.prazo === today && t.status === 'pendente').length;
  const warn = document.getElementById('rnWarning');
  if (highToday >= 3) warn.classList.add('visible');
  else warn.classList.remove('visible');
}

document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const tasks = getTasks();
  const editId = document.getElementById('taskEditId').value;
  const titulo = document.getElementById('taskTitleInput').value.trim();
  if (!titulo) return;

  const taskData = {
    titulo,
    descricao: document.getElementById('taskDescInput').value.trim(),
    categoria: document.getElementById('taskCatInput').value,
    prioridade: document.getElementById('taskPriorityInput').value,
    prazo: document.getElementById('taskDeadlineInput').value || todayStr(),
  };

  if (editId) {
    // UC4 - Edit
    const idx = tasks.findIndex(t=>t.id===parseInt(editId));
    if (idx >= 0) Object.assign(tasks[idx], taskData);
  } else {
    // UC3 - Create
    const newId = tasks.length ? Math.max(...tasks.map(t=>t.id)) + 1 : 1;
    tasks.push({ id: newId, ...taskData, status: 'pendente', criadoEm: Date.now() });
    const userData = getUserData();
    userData.totalCreated = (userData.totalCreated||0) + 1;
    saveUserData(userData);
  }

  saveTasks(tasks);
  closeTaskModal();
  renderTasks();
  refreshDashboard();
});

// UC4 - Edit Task
function editTask(id) { openTaskModal(id); }
window.editTask = editTask;

// UC5 - Delete Task
function deleteTask(id) {
  if (!confirm('Excluir esta tarefa?')) return;
  let tasks = getTasks();
  tasks = tasks.filter(t=>t.id!==id);
  saveTasks(tasks);
  renderTasks();
  refreshDashboard();
}
window.deleteTask = deleteTask;

// ===== SCHEDULE (UC1) =====
function selectSchedule(type, el) {
  document.querySelectorAll('.schedule-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  const userData = getUserData();
  userData.escala = type;
  saveUserData(userData);
  refreshSchedule();
}
window.selectSchedule = selectSchedule;

function refreshSchedule() {
  const userData = getUserData();
  const labels = { '12x36':'12×36 (Plantão)', '5x2':'5×2 (Comercial)', '6x1':'6×1 (Intensiva)', 'plantao':'Plantão Esporádico', 'flexivel':'Flexível' };
  const statusEl = document.getElementById('scheduleStatusText');

  if (userData.escala) {
    document.querySelectorAll('.schedule-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.schedule === userData.escala);
    });
    statusEl.innerHTML = `✅ Escala configurada: <strong style="color:var(--accent-primary);">${labels[userData.escala]||userData.escala}</strong><br><span style="color:var(--text-muted); font-size:0.8rem;">A IA vai adaptar sugestões conforme seu regime de trabalho.</span>`;
    // RN02 check
    if (['12x36','plantao'].includes(userData.escala)) {
      statusEl.innerHTML += `<br><span style="color:var(--warning); font-size:0.8rem; margin-top:8px; display:inline-block;">⚠️ RN02: Em dias de plantão, tarefas cognitivas pesadas serão bloqueadas após a 8ª hora.</span>`;
    }
  } else {
    statusEl.textContent = 'Nenhuma escala configurada ainda. Selecione uma opção acima.';
  }
}

// ===== AI SUGGESTIONS (UC8, UC10) =====
function generateAISuggestions() {
  const btn = document.getElementById('btnGenerate');
  btn.classList.add('loading');
  btn.textContent = '⏳ Processando...';

  const userData = getUserData();
  userData.aiUsed = true;
  saveUserData(userData);

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = '🤖 Gerar Sugestões Inteligentes';

    const tasks = getTasks();
    const pending = tasks.filter(t=>t.status==='pendente');
    const schedule = userData.escala || 'flexivel';

    const suggestions = [
      { title: '📅 Cronograma Otimizado', text: `Com base nas suas ${pending.length} tarefas pendentes e escala ${schedule}, recomendo: manhã para tarefas de alta prioridade, tarde para tarefas moderadas.`, tag: 'Cronograma' },
      { title: '😴 Janela de Descanso', text: 'Detectei alta carga cognitiva. Sugiro uma pausa de 20 minutos às 15h para recuperação mental.', tag: 'Bem-estar' },
      { title: '📊 Reorganização de Prioridades', text: `Você tem ${tasks.filter(t=>t.prioridade==='alta'&&t.status==='pendente').length} tarefas de alta prioridade. Considere delegar ou adiar as menos urgentes.`, tag: 'Priorização' },
      { title: '🎯 Foco Recomendado', text: pending.length > 0 ? `Comece por "${pending[0].titulo}" — é sua tarefa mais antiga pendente.` : 'Todas as tarefas concluídas! Hora de descansar.', tag: 'Produtividade' },
    ];

    if (['12x36','plantao'].includes(schedule)) {
      suggestions.push({ title: '⚠️ Alerta de Escala (RN02)', text: 'Em dia de plantão, evite tarefas de alta densidade cognitiva após 8 horas de trabalho contínuo.', tag: 'Regra RN02' });
    }

    document.getElementById('aiSuggestionsList').innerHTML = suggestions.map(s => `
      <div class="glass-card ai-card">
        <h4>${s.title}</h4>
        <p>${s.text}</p>
        <span class="ai-tag">${s.tag}</span>
      </div>
    `).join('');

    refreshGamification();
  }, 1500);
}
window.generateAISuggestions = generateAISuggestions;

// ===== GAMIFICATION (UC9) =====
function getStats() {
  const tasks = getTasks();
  const userData = getUserData();
  const today = todayStr();
  const cats = new Set(tasks.map(t=>t.categoria));
  return {
    totalCreated: userData.totalCreated || tasks.length,
    totalDone: userData.totalDone || tasks.filter(t=>t.status==='concluida').length,
    todayDone: userData.todayDone || tasks.filter(t=>t.status==='concluida'&&t.prazo===today).length,
    schedule: userData.escala,
    aiUsed: userData.aiUsed,
    categories: cats.size,
    level: userData.nivel,
    pontos: userData.pontos,
  };
}

function refreshGamification() {
  const userData = getUserData();
  const stats = getStats();
  const titles = ['Iniciante','Aprendiz','Dedicado','Focado','Veterano','Mestre','Lendário'];
  const titleIdx = Math.min(userData.nivel-1, titles.length-1);

  document.getElementById('gamifLevel').textContent = userData.nivel;
  document.getElementById('gamifTitle').textContent = titles[titleIdx];
  document.getElementById('gamifPoints').textContent = userData.pontos + ' pontos XP';

  const xpInLevel = userData.pontos % 100;
  const pct = Math.min((xpInLevel/100)*100, 100);
  document.getElementById('gamifXpBar').style.width = pct+'%';
  document.getElementById('gamifXpText').textContent = `${xpInLevel} / 100 XP`;

  // Badges
  document.getElementById('badgesGrid').innerHTML = BADGES.map(b => {
    const earned = b.condition(stats);
    return `<div class="glass-card badge-card ${earned?'':'locked'}">
      <div class="badge-icon">${b.icon}</div>
      <h4>${b.nome}</h4>
      <p>${b.desc}</p>
    </div>`;
  }).join('');
}

// ===== LOGIN CANVAS =====
function initLoginCanvas() {
  const canvas = document.getElementById('loginCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function create() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width*canvas.height)/15000), 80);
    for (let i=0; i<count; i++) {
      particles.push({
        x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
        r: Math.random()*1.5+0.5, alpha: Math.random()*0.4+0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0; i<particles.length; i++) {
      for (let j=i+1; j<particles.length; j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if (dist<120) {
          ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(108,99,255,${0.06*(1-dist/120)})`; ctx.lineWidth=0.5; ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(108,99,255,${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); create(); draw();
  window.addEventListener('resize', () => { resize(); create(); });
}

// ===== MASCOT LOGIC =====
function initMascot() {
  setInterval(() => {
    // Check if on login screen or app screen
    const isLogin = document.getElementById('loginScreen').style.display !== 'none';
    if (Math.random() > 0.4) { // 60% chance for testing
      if (isLogin) triggerLoginMascot();
      else triggerMascot();
    }
  }, 5000); // Check every 5s
}

function triggerLoginMascot() {
  const container = document.getElementById('loginMascot');
  const video = document.getElementById('loginMascotVideo');
  if (!container || !video) return;

  video.play();
  container.style.left = window.innerWidth + 'px';

  setTimeout(() => {
    container.style.transition = 'none';
    container.style.left = '-250px';
    video.pause();
    video.currentTime = 0;
    setTimeout(() => {
      container.style.transition = 'all 3000ms ease-linear';
    }, 50);
  }, 3500);
}

function triggerMascot() {
  const container = document.getElementById('mascotContainer');
  const video = document.getElementById('mascotVideo');
  if (!container || !video) return;

  video.play();
  container.style.left = window.innerWidth + 'px';

  setTimeout(() => {
    container.style.transition = 'none';
    container.style.left = '-250px';
    video.pause();
    video.currentTime = 0;
    setTimeout(() => {
      container.style.transition = 'all 4000ms ease-linear';
    }, 50);
  }, 4500);
}

function triggerCapAnimation() {
  const container = document.getElementById('capContainer');
  const video = document.getElementById('capVideo');
  if (!container || !video) return;

  container.classList.remove('hidden');
  video.currentTime = 0;
  video.play();

  setTimeout(() => {
    container.classList.add('hidden');
  }, 3000); // Duration of the bottle cap video
}

// ===== HELPERS =====
function esc(s) { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function catLabel(c) { return {estudo:'📚 Estudo', trabalho:'💼 Trabalho', saude:'❤️ Saúde', pessoal:'🌟 Pessoal'}[c]||c; }
function formatDate(d) { if(!d) return ''; const [y,m,day]=d.split('-'); return `${day}/${m}`; }

// Global functions for onclick handlers
window.logout = logout;
window.openTaskModal = openTaskModal;
window.closeTaskModal = closeTaskModal;
window.toggleTaskStatus = toggleTaskStatus;
window.editTask = editTask;
window.deleteTask = deleteTask;
window.filterTasks = filterTasks;
window.selectSchedule = selectSchedule;
window.generateAISuggestions = generateAISuggestions;
window.navigateTo = navigateTo;
