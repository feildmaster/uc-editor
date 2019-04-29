let dragging = false;

export default function (el) {
  if (!el.draggable) throw new Error('Element not draggable');
  if (el.draggable) {
    el.addEventListener('dragstart', start, false);
    el.addEventListener('dragend', end, false);
  }
  el.addEventListener('dragover', over, false);
  el.addEventListener('dragleave', leave, false);
  el.addEventListener('drop', drop, false);
}

function start(e) {
  dragging = true;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.id);

  this.classList.add('dragging');
}

function end(e) {
  dragging = false;
  this.classList.remove('dragging');
}

function over(e) {
  if (!dragging) return;
  e.preventDefault();
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';

  return false;
}

function leave(e) {
  if (!dragging) return;
  console.log('drag:leave', e);
  this.classList.remove('over');
}

function drop(e) {
  if (!dragging) return;
  console.log('drag:drop', e);
  // TODO: If moving left, place before. if moving right, place after
  // if (e.stopPropagation) { // Stops some browsers from redirecting.
  //   e.stopPropagation();
  // }

  // // Don't do anything if dropping the same column we're dragging.
  // if (original != this) {
  //   this.parentNode.insertBefore(el, this);
  // } else {
  //   original.classList.remove('dragElm');
  // }
  e.dataTransfer.clearData(); // clear cache
  this.classList.remove('over');
  // return false;
}
