// Seleciona todos os cards da página
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
  const likeBtn = card.querySelector('.like-btn');
  const dislikeBtn = card.querySelector('.dislike-btn');
  const likeCount = card.querySelector('.like-count');
  const dislikeCount = card.querySelector('.dislike-count');

  // Recupera o estado individual de cada card usando o índice
  let state = {
    like: {
      count: parseInt(localStorage.getItem(`card_${index}_like_count`)) || 0,
      active: localStorage.getItem(`card_${index}_like_active`) === 'true',
      btn: likeBtn,
      countEl: likeCount,
      activeClass: 'like-active'
    },
    dislike: {
      count: parseInt(localStorage.getItem(`card_${index}_dislike_count`)) || 0,
      active: localStorage.getItem(`card_${index}_dislike_active`) === 'true',
      btn: dislikeBtn,
      countEl: dislikeCount,
      activeClass: 'dislike-active'
    }
  };

  function syncUI() {
    ['like', 'dislike'].forEach(type => {
      const item = state[type];
      item.countEl.textContent = item.count;
      item.btn.classList.toggle(item.activeClass, item.active);
      localStorage.setItem(`card_${index}_${type}_count`, item.count);
      localStorage.setItem(`card_${index}_${type}_active`, item.active);
    });
  }

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

  likeBtn.addEventListener('click', () => handleReaction('like'));
  dislikeBtn.addEventListener('click', () => handleReaction('dislike'));

  syncUI();
});