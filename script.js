// Seleção dos elementos do DOM
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');

// Estado da aplicação
const state = {
  like: { count: 0, active: false, btn: likeBtn, countEl: likeCount, activeClass: 'like-active' },
  dislike: { count: 0, active: false, btn: dislikeBtn, countEl: dislikeCount, activeClass: 'dislike-active' }
};

// Função genérica para alternar as reações
function handleReaction(type) {
  const current = state[type];
  const opposite = state[type === 'like' ? 'dislike' : 'like'];

  // Se a reação oposta estiver ativa, desativa ela primeiro
  if (opposite.active) {
    opposite.active = false;
    opposite.count--;
    opposite.btn.classList.remove(opposite.activeClass);
  }

  // Alterna o estado da reação atual (liga/desliga)
  current.active = !current.active;
  current.count += current.active ? 1 : -1;
  current.btn.classList.toggle(current.activeClass, current.active);

  // Atualiza os contadores na tela
  current.countEl.textContent = current.count;
  opposite.countEl.textContent = opposite.count;
}

// Event Listeners
likeBtn.addEventListener('click', () => handleReaction('like'));
dislikeBtn.addEventListener('click', () => handleReaction('dislike'));