import { generateRandomInteger, uniqueID, getRandomIndex } from './utils.js';
import { descriptions, messages, names, photosID, COUNT_OF_PHOTOS, COUNT_OF_LIKES_MIN, COUNT_OF_LIKES_MAX, COUNT_OF_COMMENTS_MIN, COUNT_OF_COMMENTS_MAX, COUNT_OF_AVATARS } from './data.js';

function Comment(id, avatar, message, name) {
  this.id = id;
  this.avatar = avatar;
  this.message = message;
  this.name = name;
}

// const comment1 = new Comment(uniqueID(), photosID[0], messages[0], names[0]);
// console.log('comment1', comment1);

function generateComments() {
  const comments = [];
  for (let i = COUNT_OF_COMMENTS_MIN; i < COUNT_OF_COMMENTS_MAX; i++) {
    comments.push(new Comment(
      uniqueID(),
      `img/avatar-${generateRandomInteger(1, COUNT_OF_AVATARS)}.svg`,
      messages[getRandomIndex(messages)],
      names[getRandomIndex(names)]),
    );
  }
  return comments;
}


function Card(id, url, description, likes, comments) {
  this.id = id;
  this.url = url;
  this.description = description;
  this.likes = likes;
  this.comments = comments;
}

function generateCards() {
  const cards = [];
  for (let i = 0; i < COUNT_OF_PHOTOS; i++) {
    cards.push(new Card(
      photosID[i],
      `photos/${photosID[i]}.jpg`,
      descriptions[i],
      generateRandomInteger(COUNT_OF_LIKES_MIN, COUNT_OF_LIKES_MAX),
      generateComments()
    ));


  }
  return cards;
}
const photos = generateCards();

export {photos};
