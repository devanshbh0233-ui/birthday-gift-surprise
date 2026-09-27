/* ---------------- data ---------------- */
const FINALE_LINES = [
  "Happy birthday. I mean every word on this little page.",
  "Whatever this year brings you, I hope it brings you here again, smiling.",
  "You don't need a reason to be celebrated. Today's just a good excuse.",
  "May this year be kinder to you than you are to yourself.",
  "Go on — blow out the candles. I'll still be here after."
];

let current = 0;
const TOTAL = 6;

/* ---------------- build slides ---------------- */
const slidesEl = document.getElementById('slides');

function heartIcon(size = 30) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size}px;height:${size}px"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2.2 5 5.7 5c2 0 3.4 1.1 4.3 2.4C10.9 6.1 12.3 5 14.3 5c3.5 0 5.3 3.6 3.7 6.9C19.5 16.4 12 21 12 21z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
}

function buildSlide1() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 1 OF ${TOTAL}</span>
    <h1 class="big">Happy Birthday.</h1>
    <p class="slide-sub">This whole little page is your gift — six small stops, made just for you. Open it up.</p>
    <div class="gift-wrap">
      <button class="gift-box" id="giftBox" aria-label="Open your gift">
        <span class="lid"></span>
        <span class="base"></span>
        <span class="ribbon-v"></span>
      </button>
      <div class="cta-row">
        <button class="btn" id="openGiftBtn">Open your gift</button>
      </div>
    </div>
  `;
  return el;
}

function buildMediaSlide({ page, title, sub, kind, count }) {
  const el = document.createElement('div');
  const grid = document.createElement('div');
  grid.className = 'media-grid';

  let tiles = '';
  for (let i = 0; i < count; i++) {
    const note = kind === 'video'
      ? '<!-- Add a video that plays right here on the page, e.g. <video controls src="your-video.mp4"></video> -->'
      : '<!-- Add a photo here, e.g. <img src="your-photo.jpg" alt=""> -->';
    tiles += `<div class="media-tile" data-kind="${kind}">${note}</div>`;
  }
  el.innerHTML = `
    <span class="kicker">PAGE ${page} OF ${TOTAL}</span>
    <h2 class="slide-title">${title}</h2>
    <p class="slide-sub">${sub}</p>
  `;
  grid.innerHTML = tiles;
  el.appendChild(grid);
  const continueRow = document.createElement('div');
  continueRow.className = 'cta-row';
  continueRow.style.marginTop = '26px';
  continueRow.innerHTML = `<button class="btn continue-btn">Continue</button>`;
  el.appendChild(continueRow);
  return el;
}

function buildMessageSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 4 OF ${TOTAL}</span>
    <h2 class="slide-title">From the Heart</h2>
    <p class="slide-sub">Say the real thing here.</p>
    <div class="letter">
      <!--
        Write the birthday message right here, replacing the lines below.
        This page is for reading only on the live site — edit the text
        in this file, not on the page itself.
      -->
      <p class="letter-text">Write your message here. Replace this line (and add more &lt;p class="letter-text"&gt; lines if you want more than one paragraph) with whatever you actually want to say.</p>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn">Continue</button>
    </div>
  `;
  return el;
}

function buildFinaleSlide() {
  const el = document.createElement('div');
  const paragraphs = FINALE_LINES.map(line => `<p class="finale-line">${line}</p>`).join('');
  el.innerHTML = `
    <span class="kicker">PAGE 5 OF ${TOTAL}</span>
    <h2 class="slide-title">One More Thing</h2>
    <p class="slide-sub">A little more, all at once.</p>
    <div class="finale-card">
      <div class="finale-text">${paragraphs}</div>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn">Continue</button>
    </div>
  `;
  return el;
}

function buildGoodbyeSlide() {
  const el = document.createElement('div');
  el.innerHTML = `
    <span class="kicker">PAGE 6 OF ${TOTAL}</span>
    <h2 class="slide-title">Until Next Year</h2>
    <p class="slide-sub">That's everything I put together for you.</p>
    <div class="finale-card">
      <div class="finale-text">
        <p class="finale-line">However today goes, I hope it's a good one, start to finish.</p>
        <p class="finale-line">This is the last page — but not the last time I'll say it.</p>
        <p class="finale-line">Happy birthday. Truly. That's the whole wish.</p>
        <p class="finale-line">Goodbye for now.</p>
      </div>
    </div>
    <div class="cta-row" style="margin-top:22px;">
      <button class="btn continue-btn">Continue</button>
    </div>
  `;
  return el;
}

const builders = [
  buildSlide1,
  () => buildMediaSlide({ page: 2, title: 'A Few Favorites', sub: 'Photos worth keeping close. Tap a tile to add your own.', kind: 'photo', count: 4 }),
  () => buildMediaSlide({ page: 3, title: 'A Little Motion', sub: 'Some moments that move. Tap a tile to add a clip.', kind: 'video', count: 2 }),
  buildMessageSlide,
  buildFinaleSlide,
  buildGoodbyeSlide
];

builders.forEach((build, i) => {
  const slide = document.createElement('section');
  slide.className = 'slide' + (i === 0 ? ' active' : '');
  slide.id = 'slide-' + i;
  const inner = document.createElement('div');
  inner.className = 'slide-inner';
  inner.appendChild(build());
  slide.appendChild(inner);
  slidesEl.appendChild(slide);
});

/* ---------------- navigation ---------------- */
function goTo(index) {
  current = (index + TOTAL) % TOTAL;
  document.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === current));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT') return;
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

/* ---------------- delegated events (gift box, continue) ---------------- */
slidesEl.addEventListener('click', (e) => {
  if (e.target.id === 'openGiftBtn') {
    document.getElementById('giftBox').classList.add('opened');
    setTimeout(() => goTo(1), 550);
  }
  if (e.target.closest('#giftBox')) {
    e.target.closest('#giftBox').classList.toggle('opened');
  }
  if (e.target.closest('.continue-btn')) {
    const wasLast = current === TOTAL - 1;
    goTo(current + 1);
    if (wasLast) {
      const box = document.getElementById('giftBox');
      if (box) box.classList.remove('opened');
    }
  }
});

/* ---------------- ambient floating hearts ---------------- */
(function seedHearts() {
  const field = document.getElementById('heartsField');
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 12;
  for (let i = 0; i < count; i++) {
    const size = 14 + Math.random() * 14;
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    h.style.animationDuration = (14 + Math.random() * 10) + 's';
    h.style.animationDelay = (Math.random() * 14) + 's';
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.innerHTML = heartIcon(size);
    field.appendChild(h);
  }
})();