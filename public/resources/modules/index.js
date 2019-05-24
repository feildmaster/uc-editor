import serviceWorker from './sw.register.js';
import newGroup from './group.js';

const preloads = [
  serviceWorker(),
];

function ready() {
  document.querySelectorAll('[legacy], #loading').forEach((el) => {
    el.remove();
  });
  document.querySelector('#draggable-live-region').remove();

  newGroup();
}

Promise.all(preloads)
  .then(ready)
  .catch(console.error);

