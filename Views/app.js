const menu = document.querySelector('#menu');
const icon = document.querySelector('#icon');
const cards = document.querySelector('.card');

icon.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden')
    }
});

icon.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth'});
});

cards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.transform = 'translateY(-5px) !important';
    });
  
    card.addEventListener('mouseout', () => {
      card.style.transform = 'translateY(0) !important';
    });
  });