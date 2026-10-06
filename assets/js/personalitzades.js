(() => {
  const form = document.getElementById('customSongForm');
  const link = document.querySelector('[data-proposal-link]');
  if (link) link.addEventListener('click', () => {
    requestAnimationFrame(() => document.getElementById('custom-name').focus({preventScroll: true}));
  });
  if (!form) return;
  form.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Continuant amb l’enviament…';
    document.getElementById('custom-status').textContent = 'Completa la comprovació antispam si apareix. El servei confirmarà l’enviament.';
  });
  window.addEventListener('pageshow', () => {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = false;
    button.textContent = 'Envia la meva proposta →';
  });
})();
