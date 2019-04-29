import card from './card.js';
import group from './group.js';
import draggable from './dnd.js';
import tippy from './tippy.js';

const container = group();
document.body.append(container);

function generate(monster = true) {
  gtag('event', `create_${monster ? 'monster':'spell'}`,);
  const wrapper = card(monster);
  wrapper.draggable = true;
  draggable(wrapper);
  container.add(wrapper);
  tippy(wrapper); // must be done after adding to document
}

document.querySelector('#buttons').style.display = 'block';

function ready() {
  document.querySelector('#loading').remove();
}

window.generate = generate;

ready(); // TODO: Trigger on event
