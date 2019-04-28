import tippy from 'https://unpkg.com/tippy.js@4.3.0/esm/index.min.js?module';
import {value as extras} from './extras.js';

// Important! Wrapper must exist on document before registering
export default function registerTips(wrapper) {
  const nameCell = wrapper.querySelector('.name');
  const monster = wrapper.querySelector('table.monster') !== null;
  tippy(nameCell, {
    theme: 'black',
    target: 'input',
    arrow: false,
    content: document.getElementById('selectSoul').innerHTML,
    placement: 'right-start',
    distance: -5,
    onMount(e) {
      e.popper.querySelectorAll('span.selectable').forEach((span) => {
        span.onclick = modifySoul.bind(span, nameCell, e.popper);
      });
    },
    onShow(e) {
      return !monster || extras();
    },
  });
  tippy(wrapper.querySelector('.image'), {
    content: 'Click to Select Image',
    placement: 'top',
    trigger: 'mouseenter',
    size: 'small',
    interactive: false,
  });
  // TODO: Set description keywords to allow insertion
  tippy(wrapper.querySelector('.description textarea'));
  tippy(wrapper.querySelector('.rarity'), {
    theme: 'black',
    trigger: 'mouseenter',
    hideOnClick: true,
    arrow: false,
    content: document.getElementById('selectRarity').innerHTML,
    placement: 'top',
    size: 'small',
    distance: -1,
    shouldPopperHideOnBlur() { return true; },
    onMount(e) {
      const tip = e.popper._tippy;
      e.popper.querySelectorAll('img.selectable').forEach((item) => {
        item.onclick = () => {
          editEvent('rarity');
          e.popper.querySelector('img.active').classList.remove('active');
          item.classList.add('active');
          tip.reference.querySelector('img').src = item.src;
          tip.hide();
        };
      });
    },
  });
  const tribe = wrapper.querySelector('.tribe');
  tippy(tribe, {
    theme: 'black',
    trigger: 'mouseenter focus',
    hideOnClick: false,
    arrow: false,
    content: document.getElementById('selectTribe').innerHTML,
    placement: 'top-end',
    onMount(e) {
      e.popper.querySelectorAll('img.selectable').forEach((item) => {
        item.onclick = () => {
          editEvent('tribe');
          e.popper.querySelector('img.active').classList.remove('active');
          item.classList.add('active');
          tribe.classList.toggle('none', item.src.includes('MONSTER'));
          tribe.classList.toggle('smallerIcon', item.src.includes('SPIDER'));
          tribe.src = item.src;
          e.popper._tippy.hide();
        };
      });
    },
  });
}

function modifySoul(nameCell, popper) {
  const activeSoul = popper.querySelector('span.selectable.active');
  const input = nameCell.querySelector('input');
  if (this === activeSoul) {
    input.focus();
    return;
  } else if (activeSoul) {
    activeSoul.classList.remove('active');
    nameCell.classList.remove(activeSoul.textContent);
  }
  editEvent('soul');
  this.classList.add('active');
  // Modify the cell
  nameCell.classList.add(this.textContent);
  input.focus();
}

tippy.setDefaults({
  content: document.getElementById('descriptionTip').innerHTML,
  placement: 'right-end',
  a11y: false,
  arrow: true,
  trigger: 'manual',
  duration: 0,
  hideOnClick: false,
  //performance: true,
  shouldPopperHideOnBlur() { return false },
  interactive: true,
  ignoreAttributes: true,
  animateFill: false,
});
