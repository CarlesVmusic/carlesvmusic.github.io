(function(){
  var release = new Date('2025-11-29T00:00:00+01:00'); // Europe/Madrid
  if (new Date() >= release){
    var b = document.getElementById('encen-banner');
    if (!b) return;
    var btns = b.querySelectorAll('a');
    // [0] Pre-save → Spotify (posa l'URL definitiva quan la tinguis)
    btns[0].textContent = 'Escolta a Spotify';
    btns[0].setAttribute('href',''); // ← URL Spotify
  }
})();