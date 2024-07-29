const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1, 19}$/i;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_ERROR_TEXT = 'Некорректно заполнено поле "Хэш-тег"';

document.querySelector('#upload-file').addEventListener('change', (evt) => {
  evt.preventDefault();
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
});

document.querySelector('#upload-cancel').addEventListener('click', (evt) => {
  evt.preventDefault();
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('#upload-file').value = '';
});

document.body.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.querySelector('#upload-file').value = '';
  }
});


function areValidSymbols(value) {
  return HASHTAG_SYMBOLS.test(value);
}

function isValidCount(tags) {
  return tags.length <= MAX_HASHTAG_COUNT;
}

function areUniqueTags(tags) {
  const arrayLowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return arrayLowerCaseTags.length === new Set(arrayLowerCaseTags).size;
}

function normalizeTags(tags) {
  return tags.trim().split(' ').filter((tag) => tag.trim().length);
}

function validateHashTags(tags) {
  return areValidSymbols(tags) && isValidCount(tags) && validateHashTags(normalizeTags(tags)) && areUniqueTags(tags);
}
const toValidateHashTags = validateHashTags();

const uploadForm = document.querySelector('#upload-select-image');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(document.querySelector('.text__hashtags'),
  toValidateHashTags,
  HASHTAG_ERROR_TEXT);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


