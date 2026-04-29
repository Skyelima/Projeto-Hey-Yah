// gamification.js
const PET_STAGES = [
  { level: 0, name: "Ovo", requiredXP: 0, image: "assets/ovo.svg" },
  { level: 1, name: "Bebê Pinguim", requiredXP: 100, image: "assets/bebe.svg" },
  { level: 2, name: "Pinguim Jovem", requiredXP: 300, image: "assets/jovem.svg" },
  { level: 3, name: "Pinguim Adulto", requiredXP: 600, image: "assets/adulto.svg" }
];

function initGamification() {
  let userData = JSON.parse(localStorage.getItem('heyya_userData')) || {};
  if (!userData.pet) {
    userData.pet = {
      tipo: "pinguim",
      xp: 0,
      estagioAtual: 0,
      itensDesbloqueados: [],
      itemEquipado: null
    };
    localStorage.setItem('heyya_userData', JSON.stringify(userData));
  }
  renderPet();
  checkAlerts();
}

function addXP(amount) {
  let userData = JSON.parse(localStorage.getItem('heyya_userData')) || {};
  if (!userData.pet) return;
  
  userData.pet.xp += amount;
  
  // Verifica evolução
  let newStage = userData.pet.estagioAtual;
  for (let i = PET_STAGES.length - 1; i >= 0; i--) {
    if (userData.pet.xp >= PET_STAGES[i].requiredXP) {
      newStage = i;
      break;
    }
  }
  
  userData.pet.estagioAtual = newStage;
  localStorage.setItem('heyya_userData', JSON.stringify(userData));
  
  renderPet();
  
  // Animação de sucesso (US3)
  const petImg = document.getElementById('petImage');
  if (petImg) {
    petImg.classList.add('jump-anim');
    setTimeout(() => petImg.classList.remove('jump-anim'), 500);
  }
}

function renderPet() {
  let userData = JSON.parse(localStorage.getItem('heyya_userData')) || {};
  if (!userData.pet) return;
  
  const stage = PET_STAGES[userData.pet.estagioAtual];
  
  const petImageEl = document.getElementById('petImage');
  const petNameEl = document.getElementById('petName');
  const petXpEl = document.getElementById('petXpText');
  const petBarEl = document.getElementById('petXpBar');
  
  if (petImageEl) petImageEl.src = stage.image;
  if (petNameEl) petNameEl.textContent = stage.name;
  
  // Calcula XP para a próxima fase
  let nextStageXP = stage.requiredXP;
  if (userData.pet.estagioAtual < PET_STAGES.length - 1) {
    nextStageXP = PET_STAGES[userData.pet.estagioAtual + 1].requiredXP;
  } else {
    nextStageXP = userData.pet.xp; // Nível Máximo
  }
  
  if (petXpEl) {
    if (userData.pet.estagioAtual === PET_STAGES.length - 1) {
      petXpEl.textContent = `${userData.pet.xp} XP (Nível Máximo!)`;
      if (petBarEl) petBarEl.style.width = '100%';
    } else {
      petXpEl.textContent = `${userData.pet.xp} / ${nextStageXP} XP`;
      if (petBarEl) {
        const pct = Math.min(100, Math.max(0, ((userData.pet.xp - stage.requiredXP) / (nextStageXP - stage.requiredXP)) * 100));
        petBarEl.style.width = `${pct}%`;
      }
    }
  }
}

function checkAlerts() {
  const tasksStr = localStorage.getItem('heyya_tasks');
  if (!tasksStr) return;
  
  const tasks = JSON.parse(tasksStr);
  const today = new Date().toISOString().split('T')[0];
  
  let hasLateTasks = false;
  let hasTodayTasks = false;
  
  tasks.forEach(t => {
    if (t.status === 'pendente' && t.prazo) {
      if (t.prazo < today) hasLateTasks = true;
      if (t.prazo === today) hasTodayTasks = true;
    }
  });
  
  const balloon = document.getElementById('petBalloon');
  const balloonText = document.getElementById('petBalloonText');
  
  if (balloon && balloonText) {
    if (hasLateTasks) {
      balloonText.innerHTML = "Oi! Notei que temos tarefas atrasadas.<br>Que tal reagendar para fazermos com calma hoje? 💙";
      balloon.style.display = 'block';
    } else if (hasTodayTasks) {
      balloonText.innerHTML = "Temos tarefas para hoje!<br>Vamos fazer no nosso ritmo. 🐧";
      balloon.style.display = 'block';
    } else {
      balloon.style.display = 'none';
    }
  }
}

// Expõe globalmente para uso rápido e testabilidade no Console
window.addXP = addXP;

function schedulePenguinRun() {
  const runPenguin = () => {
    const mascot = document.getElementById('mascotContainer');
    if (mascot) {
      mascot.classList.add('mascot-run-anim');
      setTimeout(() => mascot.classList.remove('mascot-run-anim'), 4500);
    }
  };
  
  // Roda de 5 em 5 minutos (300000 ms)
  setInterval(runPenguin, 300000);
}

document.addEventListener('DOMContentLoaded', () => {
  initGamification();
  schedulePenguinRun();
});
