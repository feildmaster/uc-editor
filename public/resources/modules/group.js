import { cardWrapper } from './card.js';

let id = 1;

export default function newGroup() {
  const container = document.createElement('div');
  container.id = `group${id++}`;
  const buttons = cardWrapper();
  container.append(buttons);
  container.add = add.bind(container);
  return container;
}

function add(el) {
  this.insertBefore(el, this.lastChild);
}