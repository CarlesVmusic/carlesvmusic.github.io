
PUBLICACIÓ INSTANTÀNIA — ENCÉN LA NIT

1) PÀGINA DEL SINGLE
   Copia la carpeta /musica/encen-la-nit/ al teu repo.
   - Posa la imatge a: /musica/encen-la-nit/assets/cover.jpeg
   - Posa el mp3 demo a: /musica/encen-la-nit/assets/demos/2.mp3

2) PORTADA (INDEX EXISTENT)
   - Obre el teu index.html original.
   - Afegeix el contingut de snippets/banner.html just després de la teva secció hero.
   - Afegeix l’style de snippets/banner-style.css al teu <head> (o al teu CSS global).
   - Afegeix el JS de snippets/banner-script.js abans de </body>.

3) TRACKS.JSON (si fas servir catàleg dinàmic)
   - Obre /tracks.json i enganxa l’objecte de snippets/tracks.encen-la-nit.json dins del teu array.
   - O bé mantén les targetes “hardcoded” i ignora això.

4) EL 29/11 (UN COP PUBLICAT A SPOTIFY)
   - A /musica/encen-la-nit/index.html: canvia el botó “Pre-save a Spotify” a l’URL definitiva del tema.
   - Al banner-script.js: substitueix l''href' buit per l’URL de Spotify (si vols que canvï automàticament).
