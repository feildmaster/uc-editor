import saveCard from './save.js';

export default function cardMenu(e) {
  if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
  if (e.target === this.querySelector('.description textarea')) return;
  e.stopPropagation();
  const context = document.querySelector('.context');
  context.style.display = 'unset';
  context.style.left = `${e.pageX}px`;
  context.style.top = `${e.pageY}px`;
  // Delete
  context.querySelector('.delete').onclick = () => {
    this.parentElement.remove();
    context.style.display = '';
  };
  // Download
  context.querySelector('.download').onclick = () => {
    saveCard(this.parentElement);
    context.style.display = '';
  };
  return false;
}

const context = document.querySelector('.context');
const close = () => context.style.display = '';
context.querySelector('.close').onclick = close;
window.addEventListener('contextmenu', close);
window.addEventListener('click', close);
