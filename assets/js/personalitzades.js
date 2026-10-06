(() => {
  const form = document.getElementById('customSongForm');
  const link = document.querySelector('[data-proposal-link]');
  if (link) link.addEventListener('click', () => {
    requestAnimationFrame(() => document.getElementById('custom-name').focus({preventScroll: true}));
  });
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('custom-status');
  let pending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    pending = true;
    button.disabled = true;
    button.textContent = 'Enviant…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Enviant la proposta…';
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: new FormData(form), headers: {'Accept': 'application/json'}
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data || data.ok === false || data.errors?.length) {
        const errors = data?.errors || [];
        if (errors.some(error => /captcha/i.test(error.code || '') || /captcha/i.test(error.message || ''))) {
          status.textContent = 'Cal completar una comprovació antispam. Continuaràs a Formspree per confirmar l’enviament.';
          form.submit();
          return;
        }
        throw new Error('submission-failed');
      }
      form.reset();
      form.querySelector('.form-options').open = false;
      status.textContent = 'Proposta enviada. Obrint la confirmació…';
      window.location.assign(new URL('gracies-proposta.html', window.location.href).href);
    } catch (_) {
      status.textContent = 'No he pogut confirmar l’enviament. He conservat la proposta perquè puguis tornar-ho a provar. També pots escriure a carlesvmusic@gmail.com.';
    } finally {
      pending = false;
      button.disabled = false;
      button.textContent = 'Envia la meva proposta →';
      form.removeAttribute('aria-busy');
    }
  });
})();
