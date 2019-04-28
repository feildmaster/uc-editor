import card from './card.js';
//import group from './group.js';
import tippy from './tippy.js';
import './extras.js';

const container = document.getElementById('cards');

function generate(monster = true) {
  gtag('event', `create_${monster ? 'monster':'spell'}`,);
  const wrapper = card(monster);
  container.append(wrapper);
  tippy(wrapper); // must be done after adding to document
}

document.querySelector('#buttons').style.display = 'block';

window.generate = generate;
