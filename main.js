/* hundrd.studio — site script. No dependencies. */
(function () {
  'use strict';

  /* ============================================================
     PROJECTS — add an entry here and a new card appears.
     img:   a full-page screenshot in /assets, 1267px wide works well.
     ratio: that image's height / width (e.g. 3026 / 1267).
            The card plays it as a slow scroll-through.
     Leave img out to show a grid placeholder instead.
     A fact with count: true is a number that counts up on scroll.
     ============================================================ */
  var PROJECTS = [
    { name: 'Superior Electric', url: 'https://superiorelectric.in', img: 'assets/superior.jpg', ratio: 3026 / 1267,
      desc: 'Product catalogue for an electrical products company: spec sheets, image carousels and an enquiry cart.',
      facts: [{ label: 'Product families', value: 26, count: true }, { label: 'Images optimised', value: 191, count: true }, { label: 'Spec PDFs', value: 22, count: true }] },
    { name: 'Mandarin Orchid', url: 'https://mandarinorchid.in', img: 'assets/mandarin.jpg', ratio: 2869 / 1267,
      desc: 'Resort website where guests browse stays and make bookings. Hand-built, framework-free and served from Cloudflare’s edge.',
      facts: [{ label: 'Type', value: 'Hospitality' }, { label: 'Stack', value: 'Vanilla JS' }, { label: 'Delivery', value: 'Edge-served' }] },
    { name: 'Thamarai Designers', url: 'https://thamaraidesigners.com', img: 'assets/thamarai.jpg', ratio: 3000 / 1267,
      desc: 'Lookbook and collection for a bespoke embroidery boutique in Coimbatore: hand-finished pieces, occasion collections and private viewings.',
      facts: [{ label: 'Pieces', value: 53, count: true }, { label: 'Collections', value: 4, count: true }, { label: 'Lookbook features', value: 5, count: true }] },
    { name: 'KS Store', url: 'https://ks-pazhamudir.abhinavharisri.workers.dev', img: 'assets/ks.jpg', ratio: 3000 / 1267,
      desc: 'Online shop floor for a neighbourhood grocery store: a searchable catalogue, ready-made recipe baskets and a one-tap checkout.',
      facts: [{ label: 'Type', value: 'E-commerce website' }, { label: 'Products', value: 1631, count: true }, { label: 'Shelves', value: 16, count: true }] }
  ];

  /* Show the "Sites live" counter once there are at least this many projects. */
  var SHOW_COUNT_FROM = 10;

  /* Contact form. Paste a Formspree endpoint (https://formspree.io/f/xxxxxxx) to receive
     enquiries by email straight from the form. Left empty, the form drafts the email and
     offers Gmail or the visitor's own email app to send it. */
  var FORM_ENDPOINT = '';
  var EMAIL = 'hello@hundrd.studio';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'style') n.style.cssText = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }

  /* ---------- work cards ---------- */
  function renderWork() {
    var grid = document.getElementById('work-grid');
    if (!grid) return;
    var mono11 = 'font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted);';
    var numStyle = 'margin: 4px 0 0; font-family: var(--font-mono); font-size: 28px; font-weight: 500; font-variant-numeric: tabular-nums;';
    var txtStyle = 'margin: 4px 0 0; font-size: 16px; font-weight: 500;';
    PROJECTS.forEach(function (pr, i) {
      var ext = /^https?:/.test(pr.url);
      var linkAttrs = { href: pr.url, style: 'display: block;' };
      if (ext) { linkAttrs.target = '_blank'; linkAttrs.rel = 'noopener'; }
      var shot = el('div', { class: 'hd-shot', style: 'aspect-ratio: 16 / 10; border: 1px solid var(--line); background: var(--surface-raised);' });
      if (pr.img) {
        var end = pr.ratio ? -(1 - 0.625 / pr.ratio) * 100 : 0;
        var img = el('img', { class: 'hd-walk', src: pr.img, alt: pr.name + ' website, scrolling from the home page down', loading: 'lazy', decoding: 'async' });
        img.style.setProperty('--end', end.toFixed(2) + '%');
        img.style.setProperty('--delay', (-i * 2) + 's');
        shot.appendChild(img);
      } else {
        shot.appendChild(el('div', { class: 'hd-shot-in hd-ph', style: 'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;' }, [
          el('span', { style: 'font-family: var(--font-mono); font-size: 12px; color: var(--ink-muted); background: var(--surface); padding: 4px 8px;', text: pr.name })
        ]));
      }
      shot.appendChild(el('span', { class: 'hd-visit', style: 'display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; background: var(--ink); color: var(--surface); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em;', text: 'Visit site ↗' }));

      var dl = el('dl', { style: 'margin: 20px 0 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; border-top: 1px solid var(--line); padding-top: 16px;' });
      pr.facts.forEach(function (f) {
        var dd = el('dd', { style: f.count ? numStyle : txtStyle, text: String(f.value) });
        if (f.count) dd.setAttribute('data-count', f.value);
        dl.appendChild(el('div', null, [el('dt', { style: mono11, text: f.label }), dd]));
      });

      grid.appendChild(el('article', { class: 'hd-card rv' }, [
        el('a', linkAttrs, [shot]),
        el('div', { style: 'margin-top: 20px; display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap;' }, [
          el('h3', { style: 'margin: 0; font-size: 24px; line-height: 1.2; font-weight: 500; letter-spacing: -0.02em;' }, [pr.name + ' ', el('span', { class: 'hd-arr', text: '↗' })]),
          el('span', { style: 'display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 8px; border: 1px solid var(--line); border-radius: 2px; font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ok); background: var(--surface-raised);' }, [
            el('span', { style: 'width: 6px; height: 6px; border-radius: 999px; background: var(--ok);' }), 'Live'
          ])
        ]),
        el('p', { style: 'margin: 8px 0 0; font-size: 16px; line-height: 1.6; color: var(--ink-muted);', text: pr.desc }),
        dl
      ]));
    });

    if (PROJECTS.length >= SHOW_COUNT_FROM) {
      document.getElementById('live-num').textContent = String(PROJECTS.length).padStart(2, '0');
      document.getElementById('live-count').hidden = false;
    }

    /* count-up when the cards come into view */
    var nums = grid.querySelectorAll('[data-count]');
    if (reduce || !('IntersectionObserver' in window) || !nums.length) return;
    nums.forEach(function (n) { n.textContent = '0'; });
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      var t0 = performance.now();
      (function tick(now) {
        var k = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
        nums.forEach(function (n) { n.textContent = String(Math.round(+n.getAttribute('data-count') * e)); });
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.15 });
    io.observe(grid);
  }

  /* ---------- contact form ---------- */
  function wireForm() {
    var form = document.getElementById('enquiry'), sent = document.getElementById('sent');
    if (!form || !sent) return;
    var msg = document.getElementById('sent-msg'), btn = form.querySelector('button[type=submit]');
    var tag = document.getElementById('sent-tag'), links = document.getElementById('sent-links');
    function done(text) { if (text) msg.textContent = text; form.hidden = true; sent.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      if (!FORM_ENDPOINT) {
        /* mailto alone does nothing on machines without a mail app set up (common on
           Windows and phones), so offer Gmail in the browser alongside it */
        var purposes = d.getAll('purpose');
        var subject = 'Enquiry from ' + d.get('name') + (d.get('company') ? ', ' + d.get('company') : '') +
          (purposes.length ? ' · ' + purposes.join(', ') : '');
        var body = 'Hi hundrd, I’m ' + d.get('name') + (d.get('company') ? ' from ' + d.get('company') : '') + '.\n\n' +
          (purposes.length ? 'Looking for: ' + purposes.join(', ') + '\n\n' : '') +
          (d.get('message') || 'I’d like to talk about a project.') + '\n\nReply to: ' + d.get('email');
        document.getElementById('sent-gmail').href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL +
          '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        document.getElementById('sent-mailto').href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        tag.textContent = 'Ready to send';
        links.hidden = false;
        done('Your email is drafted. Send it from Gmail or your email app and you’ll hear back within one working day.');
        return;
      }
      btn.disabled = true;
      fetch(FORM_ENDPOINT, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () { btn.disabled = false; alert('That didn’t go through. Please email ' + EMAIL + '.'); });
    });
    document.getElementById('again').addEventListener('click', function () {
      form.reset(); btn.disabled = false; sent.hidden = true; form.hidden = false;
    });
  }

  /* ---------- copy email address ---------- */
  function wireCopy() {
    var b = document.getElementById('copy-email'), note = document.getElementById('copy-note');
    if (!b || !note) return;
    var timer;
    b.addEventListener('click', function () {
      function show(t) { note.textContent = t; clearTimeout(timer); timer = setTimeout(function () { note.textContent = ''; }, 2500); }
      /* older browsers and some in-app webviews block the Clipboard API */
      function legacy() {
        var t = el('textarea', { readonly: '', style: 'position: fixed; opacity: 0;' });
        t.value = EMAIL; document.body.appendChild(t); t.select();
        var ok = false; try { ok = document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(t);
        show(ok ? 'Copied' : 'Couldn’t copy');
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(EMAIL).then(function () { show('Copied'); }, legacy);
      else legacy();
    });
  }

  /* ---------- page vitals: weight, third parties, cookies and load time, measured live ---------- */
  function vitals() {
    var out = document.getElementById('vitals');
    if (!out || !window.performance || !performance.getEntriesByType) return;
    function render() {
      var nav = performance.getEntriesByType('navigation')[0];
      var bytes = nav ? (nav.encodedBodySize || nav.transferSize || 0) : 0, third = 0;
      performance.getEntriesByType('resource').forEach(function (r) {
        bytes += r.encodedBodySize || r.transferSize || 0;
        if (/^https?:/.test(r.name) && new URL(r.name).origin !== location.origin) third++;
      });
      var cookies = document.cookie ? document.cookie.split(';').length : 0;
      var load = nav && nav.loadEventEnd > 0 ? nav.loadEventEnd : performance.now();
      out.textContent = 'This page: ' + Math.round(bytes / 1024) + ' KB · ' + third + ' third-party requests · ' +
        cookies + (cookies === 1 ? ' cookie' : ' cookies') + ' · loaded in ' + (load / 1000).toFixed(1) + 's';
    }
    /* loadEventEnd is only set once the load handlers have finished */
    if (document.readyState === 'complete') render();
    else window.addEventListener('load', function () { setTimeout(render, 0); });
    /* lazy screenshots arrive later, so keep the weight current */
    if ('PerformanceObserver' in window) {
      try { new PerformanceObserver(render).observe({ type: 'resource' }); } catch (err) {}
    }
  }

  /* ---------- X-ray: blueprint view plus the response headers, fetched live ---------- */
  function xray() {
    var btn = document.getElementById('xray-toggle'), panel = document.getElementById('xray-panel');
    if (!btn || !panel) return;
    var list = document.getElementById('xray-list'), sum = document.getElementById('xray-sum'), checked = false;
    /* the full list covers half a phone screen, so it starts folded there */
    document.getElementById('xray-details').open = window.innerWidth > 640;
    var HEADERS = [
      ['content-security-policy', 'Content-Security-Policy'],
      ['strict-transport-security', 'Strict-Transport-Security'],
      ['x-frame-options', 'X-Frame-Options'],
      ['x-content-type-options', 'X-Content-Type-Options'],
      ['referrer-policy', 'Referrer-Policy'],
      ['permissions-policy', 'Permissions-Policy'],
      ['cross-origin-opener-policy', 'Cross-Origin-Opener-Policy']
    ];
    function row(ok, name, val) {
      return el('li', null, [el('span', { class: ok ? 'ok' : 'no', text: (ok ? '✓ ' : '✗ ') + name }),
        val ? el('span', { style: 'display: block; opacity: 0.7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;', text: val }) : null]);
    }
    function check() {
      if (checked) return;
      checked = true;
      sum.textContent = 'Checking…';
      fetch(location.pathname, { method: 'HEAD', cache: 'no-store' }).then(function (r) {
        list.textContent = '';
        var n = 0;
        HEADERS.forEach(function (hd) { var v = r.headers.get(hd[0]); if (v) n++; list.appendChild(row(!!v, hd[1], v)); });
        sum.textContent = n + ' of ' + HEADERS.length + ' security headers on this response';
      }).catch(function () { checked = false; sum.textContent = 'Couldn’t reach the server to check.'; });
    }
    function set(on) {
      document.documentElement.classList.toggle('xray', on);
      btn.setAttribute('aria-pressed', String(on));
      panel.hidden = !on;
      if (on) check();
    }
    function isOn() { return btn.getAttribute('aria-pressed') === 'true'; }
    /* switch with the scanner sweep: a line runs down revealing the blueprint, or back up peeling it off.
       Browsers without view transitions, and reduced motion, just switch. */
    var scan = document.getElementById('hd-scan');
    function swap(on) {
      if (on === isOn()) return;
      if (reduce || !document.startViewTransition || !scan) { set(on); return; }
      var root = document.documentElement;
      root.classList.add(on ? 'scan-down' : 'scan-up');
      scan.className = on ? 'is-top' : 'is-bottom';
      var vt = document.startViewTransition(function () { set(on); scan.className = on ? 'is-bottom' : 'is-top'; });
      vt.finished.finally(function () { root.classList.remove('scan-down', 'scan-up'); scan.className = ''; });
    }
    btn.addEventListener('click', function () { swap(!isOn()); });
    document.getElementById('xray-close').addEventListener('click', function () { swap(false); btn.focus(); });
    var px = document.getElementById('px100');
    if (px) px.addEventListener('click', function () { swap(!isOn()); });
    var wheel = document.getElementById('wheel'), typed = '';
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden && !(wheel && wheel.classList.contains('is-open'))) { swap(false); return; }
      /* typing "xray" anywhere outside a form field */
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed === 'xray') { typed = ''; swap(!isOn()); }
    });
    /* hundrd.studio/#xray opens straight into it, for sharing */
    if (location.hash === '#xray') set(true);
    window.addEventListener('hashchange', function () { if (location.hash === '#xray') swap(true); });

    /* a note for whoever opens the console; typing xray there works too */
    var mono = 'font: 12px ui-monospace, monospace; color: #8A857C;';
    console.log('%chundrd%c\nBuilt by hand, down to the hundredth detail.\nType %cxray%c to see inside.',
      'font: 600 20px system-ui, sans-serif; color: #151412; background: #F5F3EE; padding: 4px 10px; border-left: 4px solid #FF4A1C;',
      mono, mono + ' color: #FF4A1C; font-weight: 600;', mono);
    try {
      Object.defineProperty(window, 'xray', { configurable: true, get: function () {
        var on = !isOn(); swap(on);
        return on ? 'X-ray on. Type xray again to switch it off.' : 'X-ray off.';
      } });
    } catch (err) {}
  }

  /* ---------- hero cube ---------- */
  function cube() {
    var cv = document.getElementById('cube');
    if (!cv) return;
    var SPEED = 1, WAVE = 0.5, N = 200;
    var D = 34, K = 0.86 * N * D / 17.3, h = 0.3;
    var m = { yawOff: 0, pitOff: 0, vYaw: 0, vPit: 0, hx: 0, hy: 0, tx: 0, ty: 0, drag: false, moved: 0, lx: 0, ly: 0, introAt: performance.now(),
      open: 0, openT: 0, hl: -1, hk: [0, 0, 0, 0, 0, 0] }; /* one per arc, plus the red centre (index SEC) */

    /* section wheel: clicking the cube opens it into a ring of five arcs, one per section,
       clockwise from the top. Real links sit over the canvas for keyboard and screen readers. */
    var SECTIONS = [['Work', '#work'], ['Services', '#services'], ['Process', '#process'], ['Studio', '#studio'], ['Contact', '#contact']];
    var SEC = SECTIONS.length, STEP = Math.PI * 2 / SEC, SPAN = STEP - 0.26;
    var secAng = function (s) { return Math.PI / 2 - s * STEP; };
    var unit = K / D / N; /* one world unit at the cube's depth, as a fraction of the canvas width */
    var wrap = document.getElementById('cube-wrap'), wheel = document.getElementById('wheel'), links = [];
    if (wheel) SECTIONS.forEach(function (sc, s) {
      var a = el('a', { href: sc[1], text: sc[0] });
      a.style.left = (50 + Math.cos(secAng(s)) * 4.2 * unit * 100) + '%';
      a.style.top = (50 - Math.sin(secAng(s)) * 4.2 * unit * 100) + '%';
      a.addEventListener('focus', function () { highlight(s); });
      links.push(wheel.appendChild(a));
    });
    /* the red pixel in the centre is the call to action */
    if (wheel) {
      var cta = el('a', { href: '#contact', class: 'hd-cta', text: 'Start a project →' });
      cta.style.left = '50%';
      cta.style.top = (50 + 1.9 * unit * 100) + '%';
      cta.addEventListener('focus', function () { highlight(SEC); });
      links.push(wheel.appendChild(cta));
    }
    function highlight(s) {
      m.hl = s;
      links.forEach(function (a, i) { a.classList.toggle('is-on', i === s); });
      kick();
    }
    function setOpen(o) {
      if (!wheel || (m.openT === 1) === o) return;
      m.openT = o ? 1 : 0;
      wheel.classList.toggle('is-open', o);
      cv.setAttribute('aria-expanded', String(o));
      if (!o) highlight(-1);
      kick();
    }
    /* which arc a pointer is over: SEC for the red centre, -1 outside the ring */
    function sectorAt(e) {
      var r = wheel.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      var dist = Math.sqrt(dx * dx + dy * dy) / (r.width * unit);
      if (dist > 10.5) return -1;
      if (dist < 2.2) return SEC;
      var s = Math.round((Math.PI / 2 - Math.atan2(-dy, dx)) / STEP);
      return ((s % SEC) + SEC) % SEC;
    }
    if (wheel) {
      wheel.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') highlight(sectorAt(e)); });
      wheel.addEventListener('pointerdown', function (e) { highlight(sectorAt(e)); });
      wheel.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') highlight(-1); });
      wheel.addEventListener('click', function (e) {
        if (e.target.closest('a')) { setOpen(false); return; }
        var s = sectorAt(e);
        setOpen(false);
        if (s >= 0) links[s].click();
        else cv.focus();
      });
      wheel.addEventListener('keydown', function (e) {
        var i = links.indexOf(document.activeElement);
        if (e.key === 'Escape') { e.preventDefault(); setOpen(false); cv.focus(); }
        else if (i >= 0 && (e.key === 'ArrowRight' || e.key === 'ArrowDown')) { e.preventDefault(); links[(i + 1) % links.length].focus(); }
        else if (i >= 0 && (e.key === 'ArrowLeft' || e.key === 'ArrowUp')) { e.preventDefault(); links[(i + links.length - 1) % links.length].focus(); }
      });
      wheel.addEventListener('focusout', function (e) { if (!wheel.contains(e.relatedTarget) && e.relatedTarget !== cv) setOpen(false); });
      document.addEventListener('pointerdown', function (e) { if (!wrap.contains(e.target)) setOpen(false); });
    }
    cv.addEventListener('pointerdown', function (e) {
      m.drag = true; m.moved = 0; m.lx = e.clientX; m.ly = e.clientY; m.vYaw = 0; m.vPit = 0;
      if (cv.setPointerCapture && e.pointerId != null) { try { cv.setPointerCapture(e.pointerId); } catch (err) {} }
      kick();
    });
    cv.addEventListener('pointermove', function (e) {
      var r = cv.getBoundingClientRect();
      m.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      m.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
      if (!m.drag) return;
      var dx = e.clientX - m.lx, dy = e.clientY - m.ly;
      m.lx = e.clientX; m.ly = e.clientY; m.moved += Math.abs(dx) + Math.abs(dy);
      m.vYaw = dx * 0.009; m.vPit = dy * 0.007;
      m.yawOff += m.vYaw; m.pitOff = Math.max(-1.1, Math.min(1.1, m.pitOff + m.vPit));
    });
    /* open on click, not pointerup: on touch the click comes after, and would land on the open wheel */
    cv.addEventListener('pointerup', function () { m.drag = false; kick(); });
    cv.addEventListener('click', function () { if (m.moved < 5) setOpen(true); });
    cv.addEventListener('pointercancel', function () { m.drag = false; kick(); });
    cv.addEventListener('pointerleave', function () { m.tx = 0; m.ty = 0; });
    cv.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); if (links[0]) links[0].focus(); }
    });

    var bayer = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];
    var FACES = [
      [[0,0,1],[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]],
      [[0,0,-1],[[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]]],
      [[1,0,0],[[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]]],
      [[-1,0,0],[[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]]],
      [[0,1,0],[[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]]],
      [[0,-1,0],[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]]]
    ];
    var L = [-0.45, 0.75, 0.5], ln = Math.sqrt(L[0]*L[0] + L[1]*L[1] + L[2]*L[2]);
    L = [L[0]/ln, L[1]/ln, L[2]/ln];
    var seed = 7, rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    var vox = [], nv = 0, PER = Math.ceil((1000 - 512) / SEC); /* shell pixels per arc */
    for (var kk = 0; kk < 10; kk++) for (var j = 0; j < 10; j++) for (var i = 0; i < 10; i++) {
      if (!(i === 0 || i === 9 || j === 0 || j === 9 || kk === 0 || kk === 9)) continue;
      var b = [i - 4.5, 4.5 - j, 4.5 - kk];
      var u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
      var sec = nv % SEC, slot = Math.floor(nv++ / SEC);
      vox.push({
        b: b, sig: (i === 9 && j === 9 && kk === 0), ph: (i + j + kk) * 0.35,
        sd: [r * Math.cos(th), r * Math.sin(th), u], sr: 10 + rnd() * 14, delay: rnd() * 0.55,
        /* its place in the open wheel: an arc, a radius across the ring's width, a little depth */
        sec: sec, ra: secAng(sec) + ((slot + rnd()) / PER - 0.5) * SPAN, rr: 6.7 + rnd() * 1.6, rz: (rnd() - 0.5) * 1.2
      });
    }
    var ctx = cv.getContext('2d'), id = new Int32Array(N * N);
    var t = 0, last = performance.now(), raf = null, visible = true;

    function frame(now) {
      raf = null;
      now = now || performance.now();
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      var dpr = window.devicePixelRatio || 1;
      var px = Math.max(80, Math.round(cv.clientWidth * dpr));
      if (cv.width !== px) { cv.width = px; cv.height = px; }

      if (!m.drag) { m.yawOff += m.vYaw; m.pitOff = Math.max(-1.1, Math.min(1.1, m.pitOff + m.vPit)); m.vYaw *= 0.95; m.vPit *= 0.9; m.pitOff *= 0.985; }
      m.hx += (m.tx - m.hx) * 0.06; m.hy += (m.ty - m.hy) * 0.06;

      var introK = reduce ? 1 : (now - m.introAt) / 1000;
      /* wheel: open eases towards its target, each arc's highlight towards the hovered one */
      if (reduce) m.open = m.openT;
      else m.open += Math.max(-dt / 0.7, Math.min(dt / 0.7, m.openT - m.open));
      var hkBusy = false;
      for (var hs = 0; hs <= SEC; hs++) {
        var hkT = hs === m.hl ? 1 : 0;
        m.hk[hs] = reduce ? hkT : m.hk[hs] + (hkT - m.hk[hs]) * Math.min(1, dt * 12);
        if (Math.abs(hkT - m.hk[hs]) > 0.002) hkBusy = true;
      }
      /* the red pixel sits in the hollow centre and leans towards the hovered arc */
      var sigX = 0, sigY = 0;
      for (hs = 0; hs < SEC; hs++) { sigX += m.hk[hs] * Math.cos(secAng(hs)); sigY += m.hk[hs] * Math.sin(secAng(hs)); }

      var yaw = t * 0.45 + 0.6 + m.yawOff + m.hx, pit = 0.5 + 0.22 * Math.sin(t * 0.3) + m.pitOff + m.hy, rol = 0.12 * Math.sin(t * 0.23);
      var cY = Math.cos(yaw), sY = Math.sin(yaw), cP = Math.cos(pit), sP = Math.sin(pit), cR = Math.cos(rol), sR = Math.sin(rol);
      var rot = function (x, y, z) {
        var x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
        var y2 = y * cP - z1 * sP, z2 = y * sP + z1 * cP;
        return [x1 * cR - y2 * sR, x1 * sR + y2 * cR, z2];
      };
      /* face normals and corners turn with the cube even inside the wheel, so pixels keep glinting */
      var RN = [], RC = [];
      for (var f = 0; f < 6; f++) {
        var cs = FACES[f][1];
        RN.push(rot(FACES[f][0][0], FACES[f][0][1], FACES[f][0][2]));
        RC.push([rot(cs[0][0], cs[0][1], cs[0][2]), rot(cs[1][0], cs[1][1], cs[1][2]), rot(cs[2][0], cs[2][1], cs[2][2]), rot(cs[3][0], cs[3][1], cs[3][2])]);
      }
      var faces = [];
      for (var vi = 0; vi < vox.length; vi++) {
        var vx = vox[vi], base = vx.b;
        var a = Math.max(0, Math.min(1, (introK * 0.85 - vx.delay)));
        var ea = 1 - Math.pow(1 - a, 4), scat = (1 - ea) * vx.sr;
        var push = 1 + WAVE * 0.06 * (1 + Math.sin(t * 1.2 + vx.ph));
        var P = rot(base[0] * push + vx.sd[0] * scat, base[1] * push + vx.sd[1] * scat, base[2] * push + vx.sd[2] * scat);
        /* each pixel leaves the cube for its place in the wheel on a slightly different beat */
        var lo = Math.max(0, Math.min(1, m.open * 1.5 - vx.delay * 0.9));
        var eo = lo < 0.5 ? 4 * lo * lo * lo : 1 - Math.pow(-2 * lo + 2, 3) / 2;
        var hv = vx.sig ? 0 : m.hk[vx.sec], hh = h;
        if (eo > 0) {
          var T;
          if (vx.sig) { T = [sigX, sigY, 2]; hh = h * (1 + eo * (0.8 + m.hk[SEC] * 1.2)); }
          else {
            var rr = vx.rr * (1 + (push - 1) * 0.5) + hv * 0.7;
            T = [rr * Math.cos(vx.ra), rr * Math.sin(vx.ra), vx.rz];
          }
          P = [P[0] + (T[0] - P[0]) * eo, P[1] + (T[1] - P[1]) * eo, P[2] + (T[2] - P[2]) * eo];
        }
        for (f = 0; f < 6; f++) {
          var n = FACES[f][0], outward = false;
          for (var ax = 0; ax < 3; ax++) { if (n[ax] !== 0 && Math.abs(base[ax]) === 4.5 && (base[ax] > 0 ? 1 : -1) === n[ax]) outward = true; }
          if (!outward && ea > 0.999 && eo < 0.001) continue;
          var nr = RN[f];
          var c = [P[0] + nr[0] * hh, P[1] + nr[1] * hh, P[2] + nr[2] * hh];
          if (-nr[0] * c[0] - nr[1] * c[1] + nr[2] * (D - c[2]) <= 0) continue;
          var pts = [], zs = 0, bad = false;
          for (var v = 0; v < 4; v++) {
            var rc = RC[f][v], q = [P[0] + rc[0] * hh, P[1] + rc[1] * hh, P[2] + rc[2] * hh];
            if (D - q[2] < 2) { bad = true; break; }
            var sc = K / (D - q[2]);
            pts.push([N / 2 + q[0] * sc, N / 2 - q[1] * sc]);
            zs += q[2];
          }
          if (bad) continue;
          var bright = nr[0] * L[0] + nr[1] * L[1] + nr[2] * L[2]; if (bright < 0) bright = 0;
          var dk = 1 - bright, dark = dk > 0.6 ? 1 : dk > 0.3 ? 0.62 : 0.42;
          /* in the wheel, resting arcs fade back and the hovered arc goes solid */
          dark = dark * (1 - 0.35 * eo);
          dark += (1 - dark) * hv * eo;
          faces.push({ pts: pts, z: zs / 4, dark: dark, sig: vx.sig });
        }
      }
      faces.sort(function (p1, p2) { return p1.z - p2.z; });
      id.fill(-1);
      for (var fi = 0; fi < faces.length; fi++) {
        var p = faces[fi].pts, x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
        for (var e = 0; e < 4; e++) { x0 = Math.min(x0, p[e][0]); x1 = Math.max(x1, p[e][0]); y0 = Math.min(y0, p[e][1]); y1 = Math.max(y1, p[e][1]); }
        x0 = Math.max(0, Math.floor(x0)); y0 = Math.max(0, Math.floor(y0)); x1 = Math.min(N - 1, Math.ceil(x1)); y1 = Math.min(N - 1, Math.ceil(y1));
        for (var yy = y0; yy <= y1; yy++) {
          for (var xx = x0; xx <= x1; xx++) {
            var pxc = xx + 0.5, pyc = yy + 0.5, pos = 0, neg = 0;
            for (var k = 0; k < 4; k++) {
              var a1 = p[k], b1 = p[(k + 1) % 4];
              var ed = (b1[0] - a1[0]) * (pyc - a1[1]) - (b1[1] - a1[1]) * (pxc - a1[0]);
              if (ed > 0) pos++; else if (ed < 0) neg++;
            }
            if (pos === 0 || neg === 0) id[xx + yy * N] = fi;
          }
        }
      }
      var s = cv.width / N, g = s >= 3 ? s * 0.8 : s;
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
          var fid = id[x + y * N];
          if (fid < 0) continue;
          var fc = faces[fid];
          if (fc.sig) { ctx.fillStyle = '#FF4A1C'; ctx.fillRect(x * s, y * s, g, g); }
          else if (fc.dark > (bayer[(x & 7) + (y & 7) * 8] + 0.5) / 64) { ctx.fillStyle = '#151412'; ctx.fillRect(x * s, y * s, g, g); }
        }
      }
      t += dt * 0.75 * SPEED;
      var busy = m.drag || Math.abs(m.vYaw) > 1e-4 || m.open !== m.openT || hkBusy;
      if ((!reduce || busy) && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }

    /* pause when the cube is off screen or the tab is hidden, to save battery */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) kick(); }).observe(cv);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });
    window.addEventListener('resize', kick);
    frame(performance.now());
  }

  renderWork();
  wireForm();
  wireCopy();
  vitals();
  xray();
  cube();
})();
