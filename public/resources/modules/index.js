import newGroup from './group.js';

function ready() {
  document.querySelectorAll('[legacy], #loading').forEach((el) => {
    el.remove();
  });
  document.querySelector('#draggable-live-region').remove();

  newGroup();
}

window.onload = ready;
