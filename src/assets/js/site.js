/* Aerovant Technologies. No dependencies. Everything here is an enhancement:
   the site reads and navigates correctly with JavaScript turned off. */
(function () {
  'use strict';
  var d = document;

  /* ---- navigation ---- */
  var toggle = d.querySelector('.hdr__toggle'), nav = d.getElementById('nav');
  function closeSubs(except) {
    d.querySelectorAll('.nav__has.is-open').forEach(function (li) {
      if (li === except) return;
      li.classList.remove('is-open');
      li.querySelector('.nav__more').setAttribute('aria-expanded', 'false');
    });
  }
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.hdr__label').textContent = open ? 'Close' : 'Menu';
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) {
      var more = e.target.closest('.nav__more');
      if (more) {
        var li = more.parentNode, open = !li.classList.contains('is-open');
        closeSubs(li);
        li.classList.toggle('is-open', open);
        more.setAttribute('aria-expanded', String(open));
      } else if (e.target.closest('a')) { setMenu(false); closeSubs(); }
    });
    d.addEventListener('click', function (e) { if (!e.target.closest('.nav__has')) closeSubs(); });
    d.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openSub = d.querySelector('.nav__has.is-open');
      if (openSub) { closeSubs(); openSub.querySelector('.nav__more').focus(); }
      else if (nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
  }

  /* ---- attack surface: plates and rows share one active layer ---- */
  function attackSurface(box) {
    var rows = box.querySelectorAll('.as__row'), plates = box.querySelectorAll('.as-plate');
    function activate(i) {
      rows.forEach(function (r) {
        var on = r.dataset.layer === String(i);
        r.classList.toggle('is-active', on);
        r.querySelector('.as__btn').setAttribute('aria-pressed', String(on));
      });
      plates.forEach(function (p) { p.classList.toggle('is-active', p.dataset.layer === String(i)); });
    }
    rows.forEach(function (r) {
      var i = r.dataset.layer;
      r.addEventListener('mouseenter', function () { activate(i); });
      r.querySelector('.as__btn').addEventListener('focus', function () { activate(i); });
      r.addEventListener('click', function () { activate(i); });
    });
    plates.forEach(function (p) {
      p.addEventListener('mouseenter', function () { activate(p.dataset.layer); });
      p.addEventListener('click', function () { activate(p.dataset.layer); });
    });
    activate(1); // Applications: where most teams are already looking
  }

  /* ---- one-shot "in view" flag (drives the journey line) ---- */
  function inView(els) {
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- contact form ---- */
  function contactForm(form) {
    var status = form.querySelector('[data-status]'), button = form.querySelector('button[type="submit"]');
    var topic = new URLSearchParams(location.search).get('topic') || (location.hash.split('topic=')[1] || '');
    var select = form.querySelector('select[name="requirement"]');
    if (topic && select) Array.prototype.forEach.call(select.options, function (o) { if (o.value.toLowerCase().indexOf(decodeURIComponent(topic).toLowerCase()) === 0) select.value = o.value; });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form), label = button.querySelector('span');
      var original = label.textContent;
      button.disabled = true; label.textContent = 'Sending';
      status.className = 'form__status'; status.textContent = '';
      // Second copy to the Google Sheet used by the previous site. Fire and forget.
      if (form.dataset.sheet) {
        var row = {};
        ['name', 'email', 'company', 'requirement', 'message'].forEach(function (k) { row[k] = data.get(k) || ''; });
        try { fetch(form.dataset.sheet, { method: 'POST', mode: 'no-cors', body: JSON.stringify(row) }); } catch (err) {}
      }
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.success) throw new Error(j.message || 'failed'); }); })
        .then(function () {
          form.reset();
          status.className = 'form__status is-ok';
          status.textContent = 'Message sent. We will reply to your work email.';
        })
        .catch(function () {
          status.className = 'form__status is-err';
          status.textContent = 'The message did not send. Check your connection and try again, or email us directly.';
        })
        .then(function () { button.disabled = false; label.textContent = original; status.focus(); });
    });
  }

  function init(root) {
    root.querySelectorAll('[data-as]').forEach(attackSurface);
    inView(Array.prototype.slice.call(root.querySelectorAll('[data-inview]')));
    root.querySelectorAll('form[data-contact]').forEach(contactForm);
  }
  window.AerovantInit = init;
  init(d);
})();
