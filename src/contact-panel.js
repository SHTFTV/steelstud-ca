(() => {
  const panel = document.getElementById('steelstud-help');
  const toggle = document.getElementById('steelstud-contact-toggle');
  const dismiss = panel?.querySelector('.float-close');
  if (!panel || !toggle || !dismiss) return;

  function setOpen(open) {
    panel.hidden = !open;
    toggle.hidden = open;
    toggle.setAttribute('aria-expanded', String(open));
    (open ? dismiss : toggle).focus({ preventScroll: true });
  }

  toggle.addEventListener('click', () => setOpen(true));
  dismiss.addEventListener('click', () => setOpen(false));
  // Check higher-layer UI before its bubbling handler closes it and restores focus.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || panel.hidden || event.defaultPrevented) return;
    if (document.querySelector('.lightbox:not([hidden])')) return;
    event.preventDefault();
    setOpen(false);
  }, true);
})();
