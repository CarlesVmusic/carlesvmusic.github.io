/* 30 October 2026, 00:00 Europe/Madrid (UTC+01:00). */
(function () {
  'use strict';
  const releaseAt = Date.parse('2026-10-30T00:00:00+01:00');
  let timer;
  function updateRelease() {
    clearTimeout(timer);
    const remaining = releaseAt - Date.now();
    if (remaining <= 0) {
      document.documentElement.dataset.albumReleased = 'true';
      document.querySelectorAll('[data-release-copy]').forEach(function (node) {
        node.textContent = node.getAttribute('data-release-copy');
      });
      document.querySelectorAll('[data-release-show]').forEach(function (node) { node.hidden = false; });
    } else {
      timer = setTimeout(updateRelease, Math.min(remaining, 2147483647));
    }
  }
  updateRelease();
  document.addEventListener('visibilitychange', function () { if (!document.hidden) updateRelease(); });
})();
