document.querySelectorAll('[data-clip-image]').forEach(image => {
  function fallback() { image.onerror = null; image.src = image.dataset.fallback; }
  image.onerror = fallback;
  if (image.complete && !image.naturalWidth) fallback();
});
/* One player per gallery; YouTube is loaded only after a play action. */
document.querySelectorAll('[data-clip-gallery]').forEach(gallery => {
  const screen = gallery.querySelector('[data-clip-screen]');
  const title = gallery.querySelector('[data-clip-title]');
  const duration = gallery.querySelector('[data-clip-duration]');
  const fallback = gallery.querySelector('[data-clip-fallback]');
  const choices = [...gallery.querySelectorAll('[data-clip-id]')];
  const poster = gallery.querySelector('.clip-poster');
  const initialChoice = choices.find(choice => choice.dataset.slug === location.hash.slice(1));
  if (initialChoice && poster) {
    const {clipId, title: name, duration: length} = initialChoice.dataset;
    poster.dataset.video = clipId;
    poster.dataset.title = name;
    poster.dataset.duration = length;
    poster.setAttribute('aria-label', `Reprodueix ${name}`);
    const image = poster.querySelector('img');
    image.dataset.fallback = initialChoice.querySelector('img').dataset.fallback;
    image.src = image.dataset.fallback;
    image.alt = `Fotograma del videoclip ${name}`;
    title.textContent = name;
    duration.textContent = length;
    fallback.href = `https://www.youtube.com/watch?v=${clipId}`;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === initialChoice)));
  }
  function play(id, name, length) {
    if (!/^[\w-]{11}$/.test(id)) return;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
    frame.title = `${name} — Carles V · Videoclip`;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    screen.replaceChildren(frame);
    title.textContent = name;
    duration.textContent = length;
    fallback.href = `https://www.youtube.com/watch?v=${id}`;
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice.dataset.clipId === id)));
  }
  poster?.addEventListener('click', () => play(poster.dataset.video, poster.dataset.title, poster.dataset.duration));
  choices.forEach(choice => choice.addEventListener('click', () => {
    play(choice.dataset.clipId, choice.dataset.title, choice.dataset.duration);
    if (screen.getBoundingClientRect().bottom < 120) {
      screen.scrollIntoView({block:'center', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
  }));
});
