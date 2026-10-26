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
        var subject = 'Website enquiry from ' + d.get('name') + (d.get('company') ? ', ' + d.get('company') : '');
        var body = 'Hi hundrd, I’m ' + d.get('name') + (d.get('company') ? ' from ' + d.get('company') : '') + '.\n\n' +
          (d.get('message') || 'I’d like to talk about a website.') + '\n\nReply to: ' + d.get('email');
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

  /* ---------- hero cube ---------- */
  function cube() {
    var cv = document.getElementById('cube');
    if (!cv) return;
    var SPEED = 1, WAVE = 0.5, N = 200;
    var m = { yawOff: 0, pitOff: 0, vYaw: 0, vPit: 0, hx: 0, hy: 0, tx: 0, ty: 0, drag: false, moved: 0, lx: 0, ly: 0, burstAt: -1e9, introAt: performance.now() };
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
    var up = function () { if (m.drag && m.moved < 5) m.burstAt = performance.now(); m.drag = false; kick(); };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', function () { m.tx = 0; m.ty = 0; });
    cv.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); m.burstAt = performance.now(); kick(); } });

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
    var vox = [];
    for (var kk = 0; kk < 10; kk++) for (var j = 0; j < 10; j++) for (var i = 0; i < 10; i++) {
      if (!(i === 0 || i === 9 || j === 0 || j === 9 || kk === 0 || kk === 9)) continue;
      var b = [i - 4.5, 4.5 - j, 4.5 - kk];
      var u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
      var bl = Math.sqrt(b[0]*b[0] + b[1]*b[1] + b[2]*b[2]);
      vox.push({
        b: b, sig: (i === 9 && j === 9 && kk === 0), ph: (i + j + kk) * 0.35,
        sd: [r * Math.cos(th), r * Math.sin(th), u], sr: 10 + rnd() * 14, delay: rnd() * 0.55,
        od: [b[0] / bl + (rnd() - 0.5) * 0.5, b[1] / bl + (rnd() - 0.5) * 0.5, b[2] / bl + (rnd() - 0.5) * 0.5], ok: 0.6 + rnd() * 0.8
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
      var burstK = (now - m.burstAt) / 1000;
      var burst = burstK >= 0 && burstK < 3 ? 6 * burstK * Math.exp(-3.2 * burstK) : 0;

      var yaw = t * 0.45 + 0.6 + m.yawOff + m.hx, pit = 0.5 + 0.22 * Math.sin(t * 0.3) + m.pitOff + m.hy, rol = 0.12 * Math.sin(t * 0.23);
      var cY = Math.cos(yaw), sY = Math.sin(yaw), cP = Math.cos(pit), sP = Math.sin(pit), cR = Math.cos(rol), sR = Math.sin(rol);
      var rot = function (x, y, z) {
        var x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
        var y2 = y * cP - z1 * sP, z2 = y * sP + z1 * cP;
        return [x1 * cR - y2 * sR, x1 * sR + y2 * cR, z2];
      };
      var D = 34, K = 0.86 * N * D / 17.3, h = 0.3;
      var faces = [];
      for (var vi = 0; vi < vox.length; vi++) {
        var vx = vox[vi], base = vx.b;
        var a = Math.max(0, Math.min(1, (introK * 0.85 - vx.delay)));
        var ea = 1 - Math.pow(1 - a, 4), scat = (1 - ea) * vx.sr;
        var push = 1 + WAVE * 0.06 * (1 + Math.sin(t * 1.2 + vx.ph));
        var bo = burst * 5.5 * vx.ok;
        var cx = base[0] * push + vx.sd[0] * scat + vx.od[0] * bo;
        var cy = base[1] * push + vx.sd[1] * scat + vx.od[1] * bo;
        var cz = base[2] * push + vx.sd[2] * scat + vx.od[2] * bo;
        for (var f = 0; f < 6; f++) {
          var n = FACES[f][0], cs = FACES[f][1], outward = false;
          for (var ax = 0; ax < 3; ax++) { if (n[ax] !== 0 && Math.abs(base[ax]) === 4.5 && (base[ax] > 0 ? 1 : -1) === n[ax]) outward = true; }
          if (!outward && burst < 0.02 && ea > 0.999) continue;
          var nr = rot(n[0], n[1], n[2]);
          var c = rot(cx + n[0] * h, cy + n[1] * h, cz + n[2] * h);
          if (-nr[0] * c[0] - nr[1] * c[1] + nr[2] * (D - c[2]) <= 0) continue;
          var pts = [], zs = 0, bad = false;
          for (var v = 0; v < 4; v++) {
            var q = rot(cx + cs[v][0] * h, cy + cs[v][1] * h, cz + cs[v][2] * h);
            if (D - q[2] < 2) { bad = true; break; }
            var sc = K / (D - q[2]);
            pts.push([N / 2 + q[0] * sc, N / 2 - q[1] * sc]);
            zs += q[2];
          }
          if (bad) continue;
          var bright = nr[0] * L[0] + nr[1] * L[1] + nr[2] * L[2]; if (bright < 0) bright = 0;
          var dk = 1 - bright, dark = dk > 0.6 ? 1 : dk > 0.3 ? 0.62 : 0.42;
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
      var busy = burst > 0.001 || m.drag || Math.abs(m.vYaw) > 1e-4;
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
  cube();
})();
