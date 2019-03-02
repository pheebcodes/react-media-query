export let _matches = false;
let listeners = [];

window.matchMedia = jest.fn(() => {
  return {
    get matches() {
      return _matches;
    },
    addListener(cb) {
      listeners = [...listeners, cb];
    },
    removeListener(cb) {
      listeners = listeners.filter(l => l !== cb);
    }
  };
});

export function setMatches(matches) {
  _matches = matches;
  listeners.forEach(l => l());
}
