export { value, toggle };
let val = false;

function toggle() {
    val = !val;
    document.body.classList.toggle('showExtras', val);
}

function value() {
  return val;
}

if (/(?:\?|\&)extras\b/i.test(location.search)) {
  toggle();
}
