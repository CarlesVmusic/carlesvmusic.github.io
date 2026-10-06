(() => {
 const link=document.querySelector('[data-proposal-link]');
 if(link) link.addEventListener('click',()=>requestAnimationFrame(()=>document.getElementById('custom-name').focus({preventScroll:true})));
})();
