const mainBlock = document.querySelector('main');
const mainBody = document.body;
// Fixed header menu variables:
const bunnerBeforeBurger = document.querySelector('.top-headblock');
const navMenuMain = document.querySelector('.header__bot');
// SEARCH BUTTON
const mobileSearchButton = document.getElementById('search_mobile');
const mobileSearchInput = document.querySelector('.search-input__field-mob');
// PROGRAMMS BUTTON
const programmsButton = document.querySelectorAll('.programms_button');
const catalogBlock = document.querySelector('.header__catalog-button');
// Кнопки из того же блока, только класс отличный от класса обработчика programmsButton
const catalogButtonDesk = document.querySelector('.catalog__button');
const catalogButtonMob = document.querySelector('.header__burger-catalog');

// Переменная нужна для того, что: когда фиксируется main, то значение проскролленых пикселей
// становится = 0 и в проверке, где обработчик scroll, плашка меню не фиксируется,
// поэтому при клике на 'Каталог программ' задаем ей значение проскроленных пикселей 
// и это значение также участвует в проверке в обработчике
var clickScrollValueGlobal;

/*===================================================================================*/
// Фиксация шапки после скролла блока "Версия для слабовидящих"
window.addEventListener('scroll', function() {
    let windowScrollTop = window.pageYOffset;
    let paddingTopForMain = parseInt(navMenuMain.offsetHeight);
 
    if (windowScrollTop > bunnerBeforeBurger.offsetHeight || clickScrollValueGlobal > bunnerBeforeBurger.offsetHeight) {
        navMenuMain.style.background = 'var(--background__scroll-menu)';
        navMenuMain.style.position = 'fixed';
        navMenuMain.style.top = '0';
        navMenuMain.style.left = '0';
        navMenuMain.style.boxShadow = '0px 5px 25px rgba(0, 93, 255, 0.15)';
        mainBlock.style.paddingTop = `${paddingTopForMain}px`;
    } else {
        navMenuMain.style.backgroundColor = 'transparent';
        navMenuMain.style.position = '';
        navMenuMain.style.top = '';
        navMenuMain.style.left = '';
        navMenuMain.style.boxShadow = '';
        mainBlock.style.paddingTop = '';
    }
});

/*===================================================================================*/
// SEARCH BUTTON
mobileSearchButton.addEventListener('click', searchFunc);
function searchFunc() {
    mobileSearchInput.classList.toggle('active');
    mobileSearchInput.value = '';    
}
/*===================================================================================*/
// PROGRAMMS BUTTON
programmsButton.forEach(item => {
    item.addEventListener('click', function () {
        let windowScrollTop = window.pageYOffset;       
        // Перезаписываю глобльную переменную
        clickScrollValueGlobal = windowScrollTop;
       
        var deviceHeight = mainBody.clientHeight;
        var currentCoordValue = coordValue() * (-1) + deviceHeight;
        
        // Значение отступа до фиксации шапки
        let topValueCatalogStart = parseInt(navMenuMain.offsetHeight) + parseInt(bunnerBeforeBurger.offsetHeight);
        // Значение отступа после фиксации шапки
        let topValueCatalogFixed = parseInt(navMenuMain.offsetHeight);

        catalogBlock.classList.toggle('active');
        mainBody.classList.toggle('lock');
        catalogButtonDesk.classList.toggle('active');
        catalogButtonMob.classList.toggle('active');

        if (catalogBlock.classList.contains('active')) { 
            navMenuMain.style.background = `var(--background__scroll-menu)`;
            mainBlock.style.position = 'fixed';
            mainBlock.style.top = currentCoordValue + 'px';
            if (windowScrollTop < bunnerBeforeBurger.offsetHeight) {
                catalogBlock.style.top = `${topValueCatalogStart}px`;
            } else {
                catalogBlock.style.top = `${topValueCatalogFixed}px`;
            } 

            window.addEventListener('resize', function() {
                // Перезапись значений при изменении ширины устройства
                let topValueCatalogStart = parseInt(navMenuMain.offsetHeight) + parseInt(bunnerBeforeBurger.offsetHeight);
                let topValueCatalogFixed = parseInt(navMenuMain.offsetHeight);
                if (windowScrollTop < bunnerBeforeBurger.offsetHeight) {
                    catalogBlock.style.top = `${topValueCatalogStart}px`;
                } else {
                    catalogBlock.style.top = `${topValueCatalogFixed}px`;
                } 
            });

        } else {
            navMenuMain.style.background = 'transparent';
            mainBlock.style.position = '';
            mainBlock.style.top = '';
            mainBody.classList.remove('lock');
            window.scrollTo(0, (-currentCoordValue + bunnerBeforeBurger.offsetHeight));
        }
    });
})
/*===================================================================================*/
// Функция для определения координаты main (для фиксации main на IOS)
function coordValue() {
    let currentMainCoord = mainBlock.getBoundingClientRect().top;
    return currentMainCoord;
}
/*===================================================================================*/







