/* Google Analytics (GA4) chargé seulement après consentement — Loi 25 (Québec) */
(function () {
  var GA_ID = 'G-NBF0EQ5ERC';
  var KEY = 'pa-consent';
  var fr = (document.documentElement.lang || 'fr').slice(0, 2) !== 'en';
  var T = fr ? {
    msg: 'Nous utilisons des témoins (Google Analytics) pour mesurer la fréquentation du site de façon anonyme. Acceptez-vous?',
    ok: 'Accepter', no: 'Refuser', manage: 'Gérer les témoins'
  } : {
    msg: 'We use cookies (Google Analytics) to measure site traffic anonymously. Do you accept?',
    ok: 'Accept', no: 'Decline', manage: 'Manage cookies'
  };

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function clearGA() {
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') === 0) {
        ['', '.premiumanalytique.com', '.www.premiumanalytique.com'].forEach(function (d) {
          document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  function banner() {
    if (document.getElementById('pa-consent')) return;
    var b = document.createElement('div');
    b.id = 'pa-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-live', 'polite');
    b.innerHTML = '<p>' + T.msg + '</p><div><button type="button" class="pa-no">' + T.no +
      '</button><button type="button" class="pa-ok">' + T.ok + '</button></div>';
    b.querySelector('.pa-ok').onclick = function () { set('granted'); b.remove(); loadGA(); };
    b.querySelector('.pa-no').onclick = function () {
      var was = get() === 'granted';
      set('denied'); b.remove(); clearGA();
      if (was) location.reload();
    };
    document.body.appendChild(b);
  }

  function manageLink() {
    var copy = document.querySelector('.site-footer .copy');
    if (!copy) return;
    var a = document.createElement('a');
    a.href = '#'; a.textContent = T.manage; a.className = 'pa-manage';
    a.onclick = function (e) { e.preventDefault(); banner(); };
    copy.appendChild(document.createTextNode(' · '));
    copy.appendChild(a);
  }

  function init() {
    var c = get();
    if (c === 'granted') loadGA();
    else if (c !== 'denied') banner();
    manageLink();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
