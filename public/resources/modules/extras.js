let val = false;

export function toggle() {
    val = !val;
    document.body.classList.toggle('showExtras', val);
}

export default function value() {
  return val;
}

if (/(?:\?|\&)extras\b/i.test(location.search)) {
  toggle();
}
