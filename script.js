document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os cards da página
  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
    const likeBtn = card.querySelector('.like-btn');
    const dislikeBtn = card.querySelector('.dislike-btn');
    const likeCount = card.querySelector('.like-count');
    const dislikeCount = card.querySelector('.dislike-count');

    // Carrega do localStorage os dados específicos deste card
    let likes = parseInt(localStorage.getItem(`card_${index}_likes`)) || 0;
    let dislikes = parseInt(localStorage.getItem(`card_${index}_dislikes`)) || 0;
    let userReaction = localStorage.getItem(`card_${index}_userReaction`) || null;

    // Atualiza a interface gráfica
    function render() {
      likeCount.textContent = likes;
      dislikeCount.textContent = dislikes;

      likeBtn.classList.toggle('like-active', userReaction === 'like');
      dislikeBtn.classList.toggle('dislike-active', userReaction === 'dislike');

      // Salva a reação do usuário
      localStorage.setItem(`card_${index}_likes`, likes);
      localStorage.setItem(`card_${index}_dislikes`, dislikes);
      localStorage.setItem(`card_${index}_userReaction`, userReaction || '');
    }

    // Clique no botão de Like
    likeBtn.addEventListener('click', () => {
      if (userReaction === 'like') {
        likes--;
        userReaction = null;
      } else {
        if (userReaction === 'dislike') {
          dislikes--;
        }
        likes++;
        userReaction = 'like';
      }
      render();
    });

    // Clique no botão de Dislike
    dislikeBtn.addEventListener('click', () => {
      if (userReaction === 'dislike') {
        dislikes--;
        userReaction = null;
      } else {
        if (userReaction === 'like') {
          likes--;
        }
        dislikes++;
        userReaction = 'dislike';
      }
      render();
    });

    // Renderiza o estado inicial ao carregar a página
    render();
  });
});