export default function resize(container, {
  size=12,
  minsize=7,
  steps=0.5,
  height=true
} = {}) {
  const type = height ? 'Height' : 'Width';
  container.style.fontSize = '';
  while (container[`scroll${type}`] > container[`client${type}`] && size-steps >= minsize) {
    size -= steps;
    container.style.fontSize = `${size}px`;
  }
}
