import card from './card.js';
import draggable from './draggable.js';
import tip from './tippy.js';

let id = 0;

export default function newGroup() {
  const container = document.createElement('div');
  container.innerHTML = document.querySelector('#group').innerHTML;
  setupName.call(container);
  container.querySelector('.monster').parentElement.onclick = () => generate(true, container);
  container.querySelector('.spell').parentElement.onclick = () => generate(false, container);
  container.id = `group${id++}`;
  container.classList.add('group', 'pending');
  document.body.append(container);
  
  draggable(container);
  container.querySelector('.cards').removeAttribute('tabIndex');

  return container;
}

function generate(monster, container) {
  gtag('event', `create_${monster ? 'monster':'spell'}`,);
  const wrapper = card(monster);
  container.querySelector('.cards').append(wrapper);

  tip(wrapper); // must be done after adding to document
}

// Initialize the first group
newGroup();

function setupName() {
  const name = this.querySelector('.group-name');
  const input = this.querySelector('.group-name + input');
  name.onclick = () => {
    name.style.display = 'none';
    input.value = name.textContent;
    input.focus();
  };
  input.onblur = () => {
    name.style.display = '';
    const text = input.value.trim();
    if (text)
      name.textContent = text;
  };
  if (id > 0) {
    name.textContent = `Group ${id}`;
  }
  input.placeholder = name.textContent;
}