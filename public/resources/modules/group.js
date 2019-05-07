import card from './card.js';
import draggable from './dnd.js';
import tip from './tippy.js';

let id = 1;

export default function newGroup() {
  const container = document.createElement('div');
  container.innerHTML = document.querySelector('#group').innerHTML;
  setupName.call(container);
  container.querySelector('.monster').parentElement.onclick = () => generate(true, container);
  container.querySelector('.spell').parentElement.onclick = () => generate(false, container);
  container.id = `group${id++}`;
  container.classList.add('group', 'pending');
  document.body.append(container);
  return container;
}

export function generate(monster, container) {
  gtag('event', `create_${monster ? 'monster':'spell'}`,);
  const wrapper = card(monster);
  wrapper.draggable = true;
  container.querySelector('.cards').append(wrapper);

  //draggable(wrapper);
  tip(wrapper); // must be done after adding to document
}

// Initialize the first group
newGroup();

function setupName() {
  const name = this.querySelector('.group-name');
  const input = this.querySelector('.group-name + input');
  name.onclick = () => {
    name.style.display = 'none';
    input.value = '';
    input.focus();
  };
  input.onblur = () => {
    name.style.display = '';
    const text = input.value.trim();
    if (text)
      name.textContent = text;
  };
  if (id > 1) {
    //name.textContent = `Group ${id}`;
  }
  input.placeholder = name.textContent;
}