import 'https://cdnjs.cloudflare.com/ajax/libs/draggable/1.0.0-beta.8/draggable.bundle.min.js';
import {editing} from './card.js';

const instance = new Draggable.Sortable([], {
  draggable: '.cardWrapper',
  classes: {
    'source:dragging': 'dragging',
  },
}).removePlugin(Draggable.Draggable.Plugins.Focusable)
  .on('drag:start', (e) => {
    if (editing) e.cancel()
  });

export default function setup(group) {
  instance.addContainer(group.querySelector('.cards'));
}

export function isDragging() {
  return instance && instance.isDragging();
}
