const mainBlock = document.querySelector('main');
const mainBody = document.body;

const headerTop = document.querySelector('.header__top');
const headerBot = document.querySelector('.header__bot');

// Фиксация шапки после скролла блока "headerTop"
window.addEventListener('scroll', function() {
    let windowScrollTop = window.pageYOffset;
    let paddingTopForMain = parseInt(headerBot.offsetHeight);
 
    if (windowScrollTop > headerTop.offsetHeight) {
        headerBot.style.position = 'fixed';
        headerBot.style.top = '0';
        headerBot.style.left = '0';
        mainBlock.style.paddingTop = `${paddingTopForMain}px`;
    } else {
        headerBot.style.position = 'relative';
        headerBot.style.top = 'unset';
        headerBot.style.left = 'unset';
        mainBlock.style.paddingTop = '';
    }
});