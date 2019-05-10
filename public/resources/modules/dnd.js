let card;

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
  card = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('undercard', this.outerHTML);
  e.dataTransfer.setData('application/x-moz-node', this);
  //e.dataTransfer.setData('undercard/index', indexOf(this));
  e.dataTransfer.setData('text/uri-list', 'test.com');
  //e.dataTransfer.setData('text/plain', 'testing plain transfer');
  e.dataTransfer.setData('text', 'test');

  this.classList.add('dragging');
  return false;
}

function end(e) {
  card = null;
  this.classList.remove('dragging');
  e.dataTransfer.clearData();
}

function over(e) {
  if (!valid(e) || this.classList.contains('dragging')) return;
  e.preventDefault();
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';

  return false;
}

function leave(e) {
  if (!valid(e)) return;
  this.classList.remove('over');
}

function drop(e) {
  if (!valid(e)) return;

  const local = card; // || appendCard(e.dataTransfer.getData('undercard'));
  if (!local) return;

  this.parentNode.insertBefore(local, this);

  this.classList.remove('over');
  return false;
}

function valid(e) {
  return e.dataTransfer.types.includes('undercard');
}
