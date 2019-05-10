import group from './group.js';

function ready() {
  document.querySelectorAll('[legacy], #loading').forEach((el) => {
    el.remove();
  });
  document.querySelectorAll('.pending').forEach((el) => {
    el.classList.remove('pending');
  });
}

window.onload = ready;
