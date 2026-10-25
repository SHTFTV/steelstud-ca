/* Rambo work retains Rambo enquiry ownership across static pages and client navigation. */
(() => {
const markup = "<div id=\"rambo-network-contact\" data-business=\"rambo\"><aside class=\"rambo-contact-card\" aria-label=\"Contact Rambo Wall and Ceiling Limited\"><button type=\"button\" class=\"rambo-contact-close\" aria-label=\"Hide Rambo contact card\">\u00d7</button><div class=\"rambo-contact-heading\"><div class=\"rambo-contact-logo\" role=\"img\" aria-label=\"Rambo R badge and safety vest\"><div class=\"rambo-logo-turn\"><div class=\"rambo-logo-face rambo-logo-front\"><img src=\"https://www.rambowalls.com/brand-motion/rambo-r-transparent.png\" width=\"64\" height=\"64\" alt=\"\"/></div><div class=\"rambo-logo-face rambo-logo-back\"><img src=\"https://www.rambowalls.com/brand-motion/rambo-vest-transparent.png\" width=\"64\" height=\"64\" alt=\"\"/></div></div></div><div><p class=\"rambo-contact-brand\">Rambo Wall &amp; Ceiling</p><p class=\"rambo-contact-title\">Let\u2019s build your project.</p></div></div><div class=\"rambo-contact-actions\"><a class=\"rambo-contact-call\" href=\"tel:+17787732790\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z\"/></svg><span><small>Call now</small><strong>778-773-2790</strong></span></a><a href=\"sms:+17789547555\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8.5 8.5 0 0 1 8 8v.5z\"/></svg><span><small>Text Rambo</small><strong>778-954-7555</strong></span></a><a href=\"mailto:rambowallceiling@gmail.com\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m22 6-10 7L2 6\"/></svg><span><small>Email</small><strong class=\"rambo-contact-email\">rambowallceiling@gmail.com</strong></span></a><a href=\"https://www.google.com/maps?cid=12643128656142868159\" target=\"_blank\" rel=\"noopener noreferrer\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z\"/></svg><strong>Find us on Google \u2197</strong></a></div><button type=\"button\" class=\"rambo-contact-motion\" aria-pressed=\"false\">Pause logo</button></aside><button type=\"button\" class=\"rambo-contact-reopen\" aria-label=\"Open Rambo contact card\" hidden><img src=\"https://www.rambowalls.com/brand-motion/rambo-r-transparent.png\" width=\"28\" height=\"28\" alt=\"\"/>Contact Rambo</button></div>";
let host, hidden = false, paused = false, scheduled = false, route = location.pathname;
function sync() {
  const current = location.pathname;
  if (current !== route) { route = current; hidden = false; }
  // A photo credit, teaser or site navigation never assigns the whole page to Rambo.
  const contentRoute = /^\/(?:blog|projects?)\/[^/]+/.test(location.pathname);
  const assigned = contentRoute && document.documentElement.hasAttribute('data-rambo-contact-owner');
  host = document.getElementById('rambo-network-contact');
  if (!host && assigned) { document.body.insertAdjacentHTML('beforeend', markup); host = document.getElementById('rambo-network-contact'); }
  if (!host) return;
  host.hidden = !assigned;
  document.documentElement.toggleAttribute('data-rambo-contact-owner', assigned);
  host.querySelector('.rambo-contact-card').hidden = hidden;
  host.querySelector('.rambo-contact-reopen').hidden = !hidden;
}
function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(() => { scheduled = false; sync(); }); } }
document.addEventListener('click', event => {
  const button = event.target.closest('#rambo-network-contact button');
  if (!button) return;
  if (button.matches('.rambo-contact-close')) { hidden = true; sync(); host.querySelector('.rambo-contact-reopen').focus(); }
  if (button.matches('.rambo-contact-reopen')) { hidden = false; sync(); host.querySelector('.rambo-contact-close').focus(); }
  if (button.matches('.rambo-contact-motion')) { paused = !paused; host.querySelector('.rambo-contact-card').classList.toggle('rambo-contact-paused', paused); button.setAttribute('aria-pressed', String(paused)); button.textContent = paused ? 'Play logo' : 'Pause logo'; }
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && host && !host.hidden && !hidden) { hidden = true; sync(); host.querySelector('.rambo-contact-reopen').focus(); } });
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync); else sync();
new MutationObserver(schedule).observe(document.getElementById('root') || document.querySelector('main') || document.body, {childList:true, subtree:true});
window.addEventListener('popstate', schedule);
})();
