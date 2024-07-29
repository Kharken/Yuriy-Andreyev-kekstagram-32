import { photos } from './setup.js';
import { container } from './thumbs.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = document.querySelector('.social__comment');
const socialCaption = document.querySelector('.social__caption');
const socialCommentsShownCount = document.querySelector('.social__comment-shown-count');
const socialCommentsTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentsLoader = document.querySelector('.comments-loader');
const bigPictureCancelButton = document.querySelector('.big-picture__cancel');

let commentsShown = 0;
const comments = [];
const COMMENTS_STEP = 5;

const onBigPictureCancelClick = () => {
  closeBigPicture();
  hideBigPicture();
};

const onEscKeyClick = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
    hideBigPicture();
  }

};

function closeBigPicture(){
  bigPicture.classList.add('hidden');
  bigPictureCancelButton.removeEventListener('click', onBigPictureCancelClick);
}
function hideBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyClick);
  commentsShown = 0;
}

const openBigPicture = (pictureId) => {
  const currentPicture = photos.find((photo) => photo.id === Number(pictureId));


  bigPictureImg.src = currentPicture.url;
  likesCount.textContent = currentPicture.likes;

  renderComments(currentPicture);


};

function createComment({avatar, name, message}) {
  const socialComment = socialCommentTemplate.cloneNode(true);

  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;
  return socialComment;
}
function renderComments(currentPicture){
  commentsShown += COMMENTS_STEP;
  if (commentsShown >= currentPicture.comments.length) {
    socialCommentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(currentPicture.comments[i]);
    fragment.appendChild(comment);

  }
  socialComments.innerHTML = '';
  socialComments.append(fragment);
  socialCaption.textContent = currentPicture.description;
  socialCommentsTotalCount.textContent = currentPicture.comments.length;
  socialCommentsShownCount.textContent = commentsShown;


  bigPicture.classList.remove('hidden');
  bigPictureCancelButton.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyClick);
}
socialCommentsLoader.addEventListener('click', renderComments);


const showCard = () => {
  container.addEventListener('click', (evt) => {
    const currentPhoto = evt.target.closest('.picture');

    if (currentPhoto) {
      openBigPicture(currentPhoto.dataset.pictureId);
    }
  });
};

export { showCard };
