import { photos } from './setup.js';
import { generateThumbnails } from './thumbs.js';
import { showCard } from './full-size-pictures.js';


generateThumbnails(photos);
showCard(photos);


