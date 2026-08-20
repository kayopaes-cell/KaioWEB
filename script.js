const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCount = document.getElementById('like-count');
const dislikeCount = document.getElementById('dislike-count');

let likes = 0;
let dislikes = 0;

likeBtn.addEventListener('click', () => {
  if (likeBtn.classList.contains('like-active')) {
    likeBtn.classList.remove('like-active');
    likes--;
  } else {
    likeBtn.classList.add('like-active');
    likes++;
    if (dislikeBtn.classList.contains('dislike-active')) {
      dislikeBtn.classList.remove('dislike-active');
      dislikes--;
    }
  }
  updateCounts();
});

dislikeBtn.addEventListener('click', () => {
  if (dislikeBtn.classList.contains('dislike-active')) {
    dislikeBtn.classList.remove('dislike-active');
    dislikes--;
  } else {
    dislikeBtn.classList.add('dislike-active');
    dislikes++;
    if (likeBtn.classList.contains('like-active')) {
      likeBtn.classList.remove('like-active');
      likes--;
    }
  }
  updateCounts();
});

function updateCounts() {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;
}