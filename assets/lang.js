/* Language toggle.
   French is the default because the company is Québécoise and Cap sur le
   Secondaire is French-first. The choice is remembered per visitor, and the
   URL never changes — Apple, Google and the App Store link the policy pages
   directly, and those links have to keep resolving to the same document. */
(function () {
  var KEY = 'hs-lang';
  var root = document.documentElement;

  function apply(lang) {
    root.classList.remove('lang-fr', 'lang-en');
    root.classList.add('lang-' + lang);
    root.setAttribute('lang', lang === 'fr' ? 'fr-CA' : 'en-CA');
    var btn = document.querySelector('.langtoggle');
    if (btn) {
      btn.textContent = lang === 'fr' ? 'English' : 'Français';
      btn.setAttribute('aria-label',
        lang === 'fr' ? 'Switch to English' : 'Afficher en français');
    }
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) { saved = null; }
  apply(saved === 'en' || saved === 'fr' ? saved : 'fr');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.langtoggle');
    if (!btn) return;
    var next = root.classList.contains('lang-fr') ? 'en' : 'fr';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (err) { /* private mode */ }
  });
})();
