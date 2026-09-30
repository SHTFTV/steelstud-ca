import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const html = await readFile(new URL('../dist/projects/index.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]).find(text => text.includes('site-lightbox'));
assert.ok(script, 'Built gallery must include its interaction script');

function gallery(count) {
  const listeners = {};
  const document = {
    activeElement: null,
    body: { classList: { add() {}, remove() {} } },
    querySelector: () => null,
    addEventListener: (name, callback) => { listeners[name] = callback; },
  };
  function element(extra = {}) {
    return {
      hidden: false, disabled: false, dataset: {}, events: {},
      addEventListener(name, callback) { this.events[name] = callback; },
      focus() { document.activeElement = this; },
      removeAttribute(name) { delete this[name]; },
      querySelector: () => null,
      ...extra,
    };
  }
  const close = element(), previous = element(), next = element(), image = element(), caption = element();
  const box = element({ hidden: true,
    querySelector: selector => ({ '.lightbox-close': close, '.lightbox-prev': previous, '.lightbox-next': next })[selector],
    contains: target => [close, previous, next, image, caption].includes(target),
  });
  const items = Array.from({ length: count }, (_, index) => element({ dataset: { src: `/image-${index}.jpg`, alt: `Photo ${index}` } }));
  document.querySelectorAll = () => items;
  document.getElementById = id => ({ 'site-lightbox': box, 'lightbox-image': image, 'lightbox-caption': caption })[id] || null;
  vm.runInNewContext(script, { document });
  items[0].focus();
  items[0].events.click({ preventDefault() {} });
  const key = (key, shiftKey = false) => {
    let prevented = false;
    listeners.keydown({ key, shiftKey, preventDefault() { prevented = true; } });
    return prevented;
  };
  return { document, items, box, close, previous, next, image, key };
}

test('gallery wraps focus within the modal and restores the opener on Escape', () => {
  const g = gallery(2);
  assert.equal(g.document.activeElement, g.close);
  assert.equal(g.key('Tab', true), true);
  assert.equal(g.document.activeElement, g.next);
  assert.equal(g.key('Tab'), true);
  assert.equal(g.document.activeElement, g.close);
  assert.equal(g.key('Tab'), false, 'Let the browser move between interior controls');
  g.items[0].focus();
  assert.equal(g.key('Tab'), true, 'Recover focus if it has moved behind the modal');
  assert.equal(g.document.activeElement, g.close);
  assert.equal(g.key('ArrowRight'), true);
  assert.equal(g.image.src, '/image-1.jpg');
  g.key('Escape');
  assert.equal(g.box.hidden, true);
  assert.equal(g.document.activeElement, g.items[0]);
  assert.equal(g.key('Tab'), false, 'Closed galleries must not intercept navigation');
});

test('a single photograph excludes hidden navigation buttons from the focus cycle', () => {
  const g = gallery(1);
  assert.equal(g.previous.hidden, true);
  assert.equal(g.next.hidden, true);
  assert.equal(g.key('Tab'), true);
  assert.equal(g.document.activeElement, g.close);
  assert.equal(g.key('Tab', true), true);
  assert.equal(g.document.activeElement, g.close);
});
