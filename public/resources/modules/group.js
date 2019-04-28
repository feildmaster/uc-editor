//import { cardWrapper } from './card.js';

let id = 1;

export default function newGroup() {
  const container = document.createElement('div');
  container.id = `group${id++}`;
  // TODO?: const buttons = cardWrapper();
  return container;
}