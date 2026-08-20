// Seleção dos elementos do DOM
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');

// Carrega os dados do localStorage (ou define valores padrão)
const savedLikes = parseInt(localStorage.getItem('like_count')) || 0;
const savedDislikes = parseInt(localStorage.getItem('dislike_count')) || 0;
const savedLikeActive = localStorage.getItem('like_active') === 'true';
const savedDislikeActive = localStorage.getItem('dislike_active') === 'true';

// Estado da aplicação inicializado com os dados salvos
const state = {
  like: { count: savedLikes, active: savedLikeActive, btn: likeBtn, countEl: likeCount, activeClass: 'like-active' },
  dislike: { count: savedDislikes, active: savedDislikeActive, btn: dislikeBtn, countEl: dislikeCount, activeClass: 'dislike-active' }
};

// Função para atualizar a interface com base no estado atual
function updateUI() {
  state.like.countEl.textContent = state.like.count;
  state.dislike.countEl.textContent = state.dislike.count;

  state.like.btn.classList.toggle(state.like.activeClass, state.like.active);
  state.dislike.btn.classList.toggle(state.dislike.activeClass, state.dislike.active);
}

// Função para salvar o estado atual no localStorage
function saveToStorage() {
  localStorage.setItem('like_count', state.like.count);
  localStorage.setItem('dislike_count', state.dislike.count);
  localStorage.setItem('like_active', state.like.active);
  localStorage.setItem('dislike_active', state.dislike.active);
}

// Função genérica para alternar as reações
function handleReaction(type) {
  const current = state[type];
  const opposite = state[type === 'like' ? 'dislike' : 'like'];

  // Se a reação oposta estiver ativa, desativa ela primeiro
  if (opposite.active) {
    opposite.active = false;
    opposite.count--;
  }

  // Alterna o estado da reação atual (liga/desliga)
  current.active = !current.active;
  current.count += current.active ? 1 : -1;

  // Atualiza a tela e salva as alterações
  updateUI();
  saveToStorage();
}

// Inicializa a interface com os valores salvos assim que a página carrega
updateUI();

// Event Listeners
likeBtn.addEventListener('click', () => handleReaction('like'));
dislikeBtn.addEventListener('click', () => handleReaction('dislike'));