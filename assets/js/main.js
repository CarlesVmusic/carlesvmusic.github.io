
// JS mínim — marca nav actiu i toggles
document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-toggle="reveal"]');
  if(!t) return;
  const expanded = t.getAttribute('aria-expanded') === 'true';
  t.setAttribute('aria-expanded', String(!expanded));
});
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a=>{
    if(a.getAttribute('href')===here) a.classList.add('active');
  });
})();
