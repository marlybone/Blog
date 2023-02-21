const menu = document.querySelector('#menu');
const icon = document.querySelector('#icon');

icon.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden')
    }
})