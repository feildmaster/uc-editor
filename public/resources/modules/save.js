export default function saveCard(card) {
  card.classList.toggle('saving', true);
  image(card).then((url) => {
    const link = document.createElement('a');
    link.download = `${card.querySelector('.name input').value||'undercard'}.png`;
    link.href = url;
    link.click();
  }).catch((error) => console.error('Ooops.', error))
  .then(() => {
    card.classList.toggle('saving', false);
  });
}

export function image(element) {
  return domtoimage.toPng(element, {filter});
}

function filter(node) {
  return node.nodeName !== 'IMG' || node.src;
}
