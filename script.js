// Elementos do DOM
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');

// Estado inicial com leitura direta do localStorage
const state = {
  like: {
    count: parseInt(localStorage.getItem('like_count')) || 0,
    active: localStorage.getItem('like_active') === 'true',
    btn: likeBtn,
    countEl: likeCount,
    activeClass: 'like-active'
  },
  dislike: {
    count: parseInt(localStorage.getItem('dislike_count')) || 0,
    active: localStorage.getItem('dislike_active') === 'true',
    btn: dislikeBtn,
    countEl: dislikeCount,
    activeClass: 'dislike-active'
  }
};

// Salva e atualiza o estado visual
function syncUI() {
  ['like', 'dislike'].forEach(type => {
    const item = state[type];
    item.countEl.textContent = item.count;
    item.btn.classList.toggle(item.activeClass, item.active);
    localStorage.setItem(`${type}_count`, item.count);
    localStorage.setItem(`${type}_active`, item.active);
  });
}

// Lógica de alternância
function handleReaction(type) {
  const current = state[type];
  const opposite = state[type === 'like' ? 'dislike' : 'like'];

  
  if (opposite.active) {
    opposite.active = false;
    opposite.count = Math.max(0, opposite.count - 1);
  }


  current.active = !current.active;
  current.count += current.active ? 1 : -1;
  current.count = Math.max(0, current.count);

  syncUI();
}



// Event Listeners
likeBtn.addEventListener('click', () => handleReaction('like'));
dislikeBtn.addEventListener('click', () => handleReaction('dislike'));

// Renderização inicial
syncUI();