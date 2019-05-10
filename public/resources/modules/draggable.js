import 'https://cdnjs.cloudflare.com/ajax/libs/draggable/1.0.0-beta.8/draggable.bundle.js';
import {editing} from './card.js';

const instance = new Draggable.Sortable([], {
  draggable: '.cardWrapper',
  classes: {
    'source:dragging': 'dragging',
  },
  //handle: '.name',
}).removePlugin(Draggable.Draggable.Plugins.Focusable, Draggable.Draggable.Plugins.Announcement)
  //.removeSensor(Draggable.Sensors.TouchSensor)
  .on('drag:start', (e) => {
    if (editing) e.cancel();
  });

export default function setup(group) {
  instance.addContainer(group.querySelector('.cards'));
}

export function isDragging() {
  return instance && instance.isDragging();
}
