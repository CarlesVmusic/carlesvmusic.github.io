(() => {
  const form = document.getElementById('customSongForm');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = id => document.getElementById(id).value.trim();
    const body = [
      `Nom: ${value('custom-name')}`,
      `Correu: ${value('custom-email')}`,
      '', 'La meva proposta:', value('custom-story'), '',
      `Caràcter musical: ${value('custom-style') || 'Per parlar-ne'}`,
      `Lletra: ${value('custom-lyrics') || 'Per parlar-ne'}`,
      `Data important: ${value('custom-date') || 'Sense data indicada'}`,
      '', 'M’agradaria valorar una cançó personalitzada en català i conèixer l’enfocament, el preu i el termini abans de començar.'
    ].join('\n');
    window.location.href = `mailto:carlesvmusic@gmail.com?subject=${encodeURIComponent('Proposta de cançó personalitzada')}&body=${encodeURIComponent(body)}`;
    document.getElementById('custom-status').textContent = 'El correu està preparat: revisa’l i envia’l des de la teva aplicació. Si no s’obre, escriu a carlesvmusic@gmail.com. La proposta encara no s’ha enviat.';
  });
})();
