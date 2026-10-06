(() => {
  document.querySelectorAll('form[data-confirmation]').forEach(form => {
    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById(form.dataset.status);
    const buttonLabel = button.textContent;
    let pending = false;
    const showStatus = text => {
      status.textContent = text;
      status.classList.add('form-feedback');
      status.setAttribute('tabindex', '-1');
      status.focus({preventScroll: true});
      status.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    };
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || !form.reportValidity()) return;
      pending = true;
      button.disabled = true;
      button.textContent = 'Enviant…';
      form.setAttribute('aria-busy', 'true');
      showStatus('Enviant el missatge. Un moment, si us plau…');
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 25000);
      let navigating = false;
      try {
        const response = await fetch(form.action, {
          method: 'POST', body: new FormData(form),
          headers: {'Accept': 'application/json'}, signal: controller.signal
        });
        // A successful HTTP response confirms acceptance; its JSON body is optional.
        if (response.ok) {
          navigating = true;
          showStatus('Enviat correctament. Obrint la confirmació…');
          window.location.assign(new URL(form.dataset.confirmation, window.location.href).href);
          return;
        }
        const data = await response.json().catch(() => ({}));
        const errors = Array.isArray(data.errors) ? data.errors : [];
        if (errors.some(error => /captcha/i.test(error.code || '') || /captcha/i.test(error.message || ''))) {
          navigating = true;
          showStatus('Cal completar una comprovació antispam. Continuaràs a Formspree per confirmar l’enviament.');
          HTMLFormElement.prototype.submit.call(form);
          return;
        }
        throw new Error('submission-failed');
      } catch (error) {
        showStatus(error.name === 'AbortError'
          ? 'El servei està trigant massa i no puc confirmar l’enviament. El text es conserva. Comprova el correu abans de repetir la prova, o escriu a carlesvmusic@gmail.com.'
          : 'No s’ha pogut confirmar l’enviament. El text es conserva perquè puguis tornar-ho a provar. També pots escriure a carlesvmusic@gmail.com.');
      } finally {
        clearTimeout(timer);
        if (!navigating) {
          pending = false;
          button.disabled = false;
          button.textContent = buttonLabel;
          form.removeAttribute('aria-busy');
        }
      }
    });
    window.addEventListener('pageshow', () => {
      pending = false;
      button.disabled = false;
      button.textContent = buttonLabel;
      form.removeAttribute('aria-busy');
    });
  });
})();
