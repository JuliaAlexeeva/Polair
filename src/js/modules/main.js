// ==================================================================================

// Language Selector
const htmlBlock = document.documentElement;
const languageSelector = document.querySelectorAll('.lang_selector');

window.addEventListener('load', windowLoadLang);

function windowLoadLang() {
    let currentLanguage = localStorage.getItem('user-language');
    let searchPlaceholder = document.getElementById('search_field');
   
    if (currentLanguage == '') {
        currentLanguage = localStorage.setItem('user-language', 'russian');
        currentLanguage = localStorage.getItem('user-language');
        htmlBlock.classList.remove('english');
        searchPlaceholder.placeholder = 'Поиск...';
        htmlBlock.classList.add(currentLanguage);
    } else {
        if (currentLanguage == 'russian') {
            if (htmlBlock.classList.contains('english') || !(htmlBlock.classList.contains('english'))) {
                htmlBlock.classList.remove('english');
                htmlBlock.classList.add('russian');
                searchPlaceholder.placeholder = 'Поиск...';
            }
        }
        if (currentLanguage == 'english') {
            if (htmlBlock.classList.contains('russian') || !(htmlBlock.classList.contains('russian'))) {
                htmlBlock.classList.remove('russian');
                htmlBlock.classList.add('english');
                searchPlaceholder.placeholder = 'Search...';
            }
        }
    }

    languageSelector.forEach(item => {
        item.addEventListener('click', function (event) {
            if (event.target.classList.contains('language-selector__russian')) {
                let currentLanguage = localStorage.setItem('user-language', 'russian');
                htmlBlock.classList.remove('english');
                htmlBlock.classList.add('russian');
                searchPlaceholder.placeholder = 'Поиск...';     
            } else {
                let currentLanguage = localStorage.setItem('user-language', 'english');
                htmlBlock.classList.remove('russian');
                htmlBlock.classList.add('english');
                searchPlaceholder.placeholder = 'Search...';
            }
        });
    });
}

// ==================================================================================
// Popups

// Получаю все объекты с классом popup__link
const popupLinks = document.querySelectorAll('.popup__link');
// Получаем тег body, чтобы блокировать скролл внутри него, когда вылезает попап
const body = document.querySelector('body');
// Получаем все объекты (навешиваю класс на теге header)
const lockPadding = document.querySelectorAll('.lock-padding');

// Данная переменная для того, чтобы не было двойных нажатий на попап, когда он ещё не закрылся/открылся
let unlock = true;

// Время анимации
const timeout = 800;

// Вешаем события на ссылки popup-link
// сперва делается проверка, есть ли они вообще 
if (popupLinks.length > 0) {
    // с помощью цикла все перебираем 
    for (let index = 0; index < popupLinks.length; index++) {
        // в переменную получаем каждую ссылку
        const popupLink = popupLinks[index];
        // навешиваем функцию при клике на каждую ссылку
        popupLink.addEventListener("click", function (e) {
            // в новую переменную получаем из ссылки атрибут
            // (#popup, например и убираем # и получаем чистое имя popup = название попапа)
            const popupName = popupLink.getAttribute('href').replace('#', '');
            // после получаем в переменную сам объект попапа, id=popup
            const currentPopup = document.getElementById(popupName);
            // полученный объект отправляется в функцию popupOpen (открытие попапа)
            popupOpen(currentPopup);
            // так как это ссылка, то этим свойством запрещаем перезагружать страницу
            e.preventDefault();
        });
    }
}

// Получаем объекты с таким классом
const popupCloseIcon = document.querySelectorAll('.close-popup');
// Проверка на наличие
if (popupCloseIcon.length > 0) {
    // перебор через цикл и выполнение кода ниже для каждого элемента
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        // нашевиваем обработчик и функцию
        el.addEventListener('click', function (e) {
            // в функцию popupClose отправляем объект, который является ближайшим родителем класса .popup
            // то есть скрипт пробежится вверх по дереву пока не найдет класс .popup - найдет и его будет закрывать
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

// Функция открытия попапа (получаем значение, которое передается выше)
function popupOpen(currentPopup) { // popup__search
    // Проверяем, есть ли такой объект и открыта ли переменная unlock (вверху открыта = true)
    if (currentPopup && unlock) {
        // И после сразу закрываем открытый попап
        // получаем объект popup с классом open
        const popupActive = document.querySelector('.popup.open');
        // и если он существует
        if (popupActive) {
            // то отправляем в функцию и закрываем
            popupClose(popupActive, false);
        } else {
            // если такого нет, то мы блокируем скрол для body (через функцию bodyLock)
            bodyLock(coordValue());
        }
        // После всей процедуры к нашему попапу добавляем класс open и он открывается (так в css сделано)
        currentPopup.classList.add('open');
        // навешиваем событие при клике
        currentPopup.addEventListener("click", function (e) {
            // если нету в родителях popup__content
            // то есть вне белой области, то есть если мы тыкнули куда-то, где нет родителя popup__content
            if (!e.target.closest('.popup__content')) {
                // то мы попап закроем
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

// Передаем активный объект | вторая переменная для того, если внутри попапа есть ещё попап и чтобы не нужно было опять скрывать скрол, когда уже скрыт
function popupClose(popupActive, doUnlock = true) {
    if (unlock) { // переменная в самом начале true
        // у активного убираем класс open
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock(); // вызываем функцию
        }
    }
}

function bodyLock(scrollValue) {
    // для того, чтобы скрывать скролл страницы это делается, чтобы не было небольшого смещения попапа на ширину полосы прокрутки
    // Расчитываем разницу между шириной окна и ширной объекта внутри него (чтобы получить ширину скрола)
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    
    if (lockPadding.length > 0) {
        // lockPadding в самом начале получали объекты с классом lock-padding
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            // добавляем каждому отступ справа высчитанный выше
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock'); // класс в css прописан

    // для блокировки скролла для IOS 
    body.style.position = 'fixed';
    body.style.top = scrollValue + 'px';

    // блокируем переменную
    unlock = false;
    // и через время анимации возвращаем в true, чтобы не было повторных нажатий на попап
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    // для разблокировки скролла для IOS
    let scrollCoord = coordValue() * (-1);

    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }

        body.style.paddingRight = '0px';
        body.classList.remove('lock');

        // для разблокировки скролла для IOS
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, scrollCoord);

    }, timeout); // чтобы скрол появлялся только тогда, когда закончится анимация
    // блокируем переменную
    unlock = false;
    // и через время анимации возвращаем в true, чтобы не было повторных нажатий на попап
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Закрытие через кнопку Esc
document.addEventListener('keydown', function (e) {
    if (e.which === 27) { // код 27 = коду клавиши Esc
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// ==================================================================================
// Burger menu

// Функция с фиксацией body для IOS, так как там не работает свойство overflow: hidden
// которое присваивается body через класс lock (в nullstyle)
const burgerButton = document.querySelector('.head-top__action-burger');
const burgerMenu = document.querySelector('.burger-menu__block');
const mainBody = document.body;
const mainBlock = document.querySelector('main');
const headerBlock = document.querySelector('.header');

window.addEventListener('load', function() {
    let marginTopForMain = parseInt(headerBlock.offsetHeight);
    mainBlock.style.marginTop = `${marginTopForMain}px`;
});
/*----------------------------------------------------------------------*/
burgerButton.addEventListener('click', function () {
    var deviceHeight = mainBody.clientHeight;
    var currentCoordValue = coordValue() * (-1) + deviceHeight;
    let windowScrollTop = window.pageYOffset;

    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    mainBody.classList.toggle('lock');
    
    mainBody.style.position = 'fixed';
    if (windowScrollTop > 0) {
        mainBody.style.top = currentCoordValue + 'px';
    }
    if (!(burgerButton.classList.contains('active'))) {
        mainBody.style.position = '';
        mainBody.style.top = '';
        window.scrollTo(0, (-currentCoordValue));
    }
});
/*----------------------------------------------------------------------*/
// Добавление тени header снизу при начале скролла
window.addEventListener('scroll', function () {
    let windowScrollTop = window.pageYOffset;

    if (windowScrollTop > 0) {
        headerBlock.style.boxShadow = '0px 5px 25px rgba(0, 93, 255, 0.15)';
    } else {
        headerBlock.style.boxShadow = '';
    }
});
/*----------------------------------------------------------------------*/
// TODO: чтобы при изменении ширины экрана убирался active у Бургера
window.addEventListener('resize', resizeBurger);
// переменная для того, чтобы код при resize отработала единожды
var isResize = false;
export function resizeBurger() {
    let marginTopForMain = parseInt(headerBlock.offsetHeight);
    mainBlock.style.marginTop = `${marginTopForMain}px`;
    let currentDeviceWidth = window.innerWidth;

    if (currentDeviceWidth >= 768 && !isResize) {
        burgerButton.classList.remove('active');
        burgerMenu.classList.remove('active');
        headerBlock.classList.remove('active-burger');
        mainBody.classList.remove('lock');
        mainBody.style.position = '';
        mainBody.style.top = '';
        isResize = true;
    } else if (currentDeviceWidth < 991 && isResize) {
        isResize = false;
    }
}
// ==================================================================================

// Функция для определения координаты body при скролле (для фиксации body на IOS)
function coordValue() {
    const currentWindowCoord = body.getBoundingClientRect().top;
    return currentWindowCoord;
}

// ==================================================================================
// Header navigation slider
const buttonsSliderBlock = document.querySelector('.menu__list');

window.addEventListener('load', sliderNavigationInit);
window.addEventListener('resize', sliderNavigationInit);

function sliderNavigationInit() {
    let currentDeviceWidth = window.innerWidth;
    if (currentDeviceWidth < 991.98) {
        $(document).ready(function () {
            $('.menu__list').length && $('.menu__list').not('.slick-initialized').slick({
                arrows: false, // опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
                dots: false, // опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
                
                slidesToShow: 1, // опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
                slidesToScroll: 1, // опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
                initialSlide: 0, // опция, стартовый слайд, по умолчанию 0
                
                speed: 1000, // опция, скорость прокрутки слайдов, по умолчанию 300мс
                easing: 'linear', // опция, тип анимации
                infinite: false, // опция, когда прокрутка достигает конца слайдов, то кнопка становится неактивна (добавляется класс slick-disabled) (БЕСКОНЕЧНАЯ ПРОКРУТКА ПРИ TRUE)
                autoplay: false, // опция, автоматический проигрыш слайдов, по умолчанию false
                autoplaySpeed: 10000, // опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
                edgeFriction: 0.5, // опция, сопротивление при пролистывании краев небесконечных каруселей, работает при infinite: false значение по умолчанию 0.15 (от 0 до 1)
        
                pauseOnFocus: false, // опция, пауза автопрокрутки при фокусе на слайдере
                pauseOnHover: false, // опция пауза автопрокрутки при наведении на слайдере
                pauseOnDotsHover: false, // опция пауза автопрокрутки при наведении на точки управления
                draggable: true, // опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
                swipe: true, // опция, включает свайп слайдов на моб устройствах (по умолчанию true)
                waitForAnimate: false, // опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
                touchThreshold: 5, // опция, сколько свайпов сделать, чтобы осуществился переход на телефоне
                touchMove: true, // опция, разрешает тянуть слайд, который переключаем
        
                centerMode: false, // опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
                variableWidth: true, // опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
                adaptiveHeight: false, // опция, по умолчанию false, слайдер автоматически подстраивается по высоте под конкретный слайд (нужно дописать стиль .slick-track {align-items: flex-start}) ПОЧЕМУ-ТО КОГДА TRUE - ТО ВЫДАЕТ ОШИБКУ WEBPACK
                
                rows: 1, // опция, устанавливаем ряды (этажи для слайдов)
                slidesPerRow: 1, // опция, число слайдов на ряду
                vertical: false, // опция, вертикальный скрол ( по умолчанию flase) (ещё нужно отключить display:flex)
                verticalSwiping: false, // опция, что вертикальный скролл был (по умолчанию false)
        
                // asNavFor: ".main__banner-container", // опция, чтобы связать с другим слайдером
                mobileFirst: false, // опция, если указать true, то все breakpoint будут как min-width то есть только при этом breakpoint и выше будут выполняться настройки
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            // На IOS не работают эти свойства, поэтому просто задавать меньший margin нужно
                            centerMode: false,
                            variableWidth: false,
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 420,
                        settings: {
                            centerMode: false,
                            variableWidth: false,
                            slidesToShow: 1.5,
                        }
                    },
                ],
            });
        });
    }
    // Отключение slick-slider
    if (currentDeviceWidth > 991.98 && buttonsSliderBlock.classList.contains('slick-initialized')) {
        $('.menu__list').slick('unslick');
    }
}

// ==================================================================================
// DropDown blocks
const dropDownBlocksHeader = document.querySelectorAll('.drop-down__block-header');
const dropDownBlockFooter = document.querySelector('.drop-down__block-footer');

document.addEventListener('click', function() {
    if (!event.target.closest('.drop-down__block-header')) {
        dropDownBlocksHeader.forEach(button => {
            button.classList.remove('active');
        });
    }
    if (!event.target.closest('.drop-down__block-footer')) {
        dropDownBlockFooter.classList.remove('active');
    }
});

dropDownBlocksHeader.forEach(button => {
    button.addEventListener('click', function(e) {
        button.classList.toggle('active');
    });
});
dropDownBlockFooter.addEventListener('click', function () {
    dropDownBlockFooter.classList.toggle('active');
});

// ==================================================================================
// Brands slider
const bannerSliderBlock = document.querySelector('.banner__items');

let initSliderBanner = sliderBannerInit();
function sliderBannerInit() {
    $(document).ready(function () {
        $('.banner__items').length && $('.banner__items').not('.slick-initialized').slick({
            arrows: false, // опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
            dots: true, // опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
            
            slidesToShow: 1, // опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
            slidesToScroll: 1, // опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
            initialSlide: 0, // опция, стартовый слайд, по умолчанию 0
            
            speed: 1000, // опция, скорость прокрутки слайдов, по умолчанию 300мс
            easing: 'linear', // опция, тип анимации
            infinite: true, // опция, когда прокрутка достигает конца слайдов, то кнопка становится неактивна (добавляется класс slick-disabled) (БЕСКОНЕЧНАЯ ПРОКРУТКА ПРИ TRUE)
            autoplay: true, // опция, автоматический проигрыш слайдов, по умолчанию false
            autoplaySpeed: 7000, // опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
            edgeFriction: 0.5, // опция, сопротивление при пролистывании краев небесконечных каруселей, работает при infinite: false значение по умолчанию 0.15 (от 0 до 1)
    
            pauseOnFocus: false, // опция, пауза автопрокрутки при фокусе на слайдере
            pauseOnHover: false, // опция пауза автопрокрутки при наведении на слайдере
            pauseOnDotsHover: false, // опция пауза автопрокрутки при наведении на точки управления
            draggable: true, // опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
            swipe: true, // опция, включает свайп слайдов на моб устройствах (по умолчанию true)
            waitForAnimate: false, // опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
            touchThreshold: 5, // опция, сколько свайпов сделать, чтобы осуществился переход на телефоне
            touchMove: true, // опция, разрешает тянуть слайд, который переключаем
    
            centerMode: false, // опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
            variableWidth: false, // опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
            adaptiveHeight: false, // опция, по умолчанию false, слайдер автоматически подстраивается по высоте под конкретный слайд (нужно дописать стиль .slick-track {align-items: flex-start}) ПОЧЕМУ-ТО КОГДА TRUE - ТО ВЫДАЕТ ОШИБКУ WEBPACK
            
            rows: 1, // опция, устанавливаем ряды (этажи для слайдов)
            slidesPerRow: 1, // опция, число слайдов на ряду
            vertical: false, // опция, вертикальный скрол ( по умолчанию flase) (ещё нужно отключить display:flex)
            verticalSwiping: false, // опция, что вертикальный скролл был (по умолчанию false)
    
            // asNavFor: ".main__banner-container", // опция, чтобы связать с другим слайдером
            mobileFirst: false, // опция, если указать true, то все breakpoint будут как min-width то есть только при этом breakpoint и выше будут выполняться настройки
        });
    });
}

// ******************Доработка для паузы и воспроизведения при наведении для слайдера
$('.banner__items').on('mouseenter', function () {
    $('.banner__items').slick('slickPause');
});
$('.banner__items').on('mouseleave', function () {
    $('.banner__items').slick('slickPlay');
});
// **************************************************************************************************

// ==================================================================================
// Для большей поддержки clamp в браузерах (вызывает ошибку кода)
// var clampElem = document.querySelector(".news-info__preview");
// $clamp(clampElem, {clamp: 2});
// ==================================================================================

// ==================================================================================
// Brands slider
const brandsSliderBlock = document.querySelector('.brands__cards');

window.addEventListener('load', sliderBrandsInit);
window.addEventListener('resize', sliderBrandsInit);

function sliderBrandsInit() {
    let currentDeviceWidth = window.innerWidth;
    if (currentDeviceWidth < 767.98) {
        $(document).ready(function () {
            $('.brands__cards').length && $('.brands__cards').not('.slick-initialized').slick({
                arrows: false, // опция для стрелок, по умолчанию true, но если нам стрелки не нужны, то ставим false
                dots: false, // опция для точек управления, по умолчанию false (их отдельно нужно стилизовать)
                
                slidesToShow: 1, // опция, кол-во слайдов, которое показывается за раз, по умолчанию 1
                slidesToScroll: 1, // опция, кол-во слайдо, которое будет прокручиваться при нажатии кнопки, по умолчанию 1
                initialSlide: 0, // опция, стартовый слайд, по умолчанию 0
                
                speed: 1000, // опция, скорость прокрутки слайдов, по умолчанию 300мс
                easing: 'linear', // опция, тип анимации
                infinite: true, // опция, когда прокрутка достигает конца слайдов, то кнопка становится неактивна (добавляется класс slick-disabled) (БЕСКОНЕЧНАЯ ПРОКРУТКА ПРИ TRUE)
                autoplay: false, // опция, автоматический проигрыш слайдов, по умолчанию false
                autoplaySpeed: 10000, // опция, определяет скорость автопроигрыша, по умолчанию 3000мс (хорошо сочетается для большого числа слайдов и когда infinite:true)
                edgeFriction: 0.5, // опция, сопротивление при пролистывании краев небесконечных каруселей, работает при infinite: false значение по умолчанию 0.15 (от 0 до 1)
        
                pauseOnFocus: false, // опция, пауза автопрокрутки при фокусе на слайдере
                pauseOnHover: false, // опция пауза автопрокрутки при наведении на слайдере
                pauseOnDotsHover: false, // опция пауза автопрокрутки при наведении на точки управления
                draggable: true, // опция, включает свайп слайдов на ПК с помощью мыши (по умолчанию true), но на мобильных устройствах все будет работать
                swipe: true, // опция, включает свайп слайдов на моб устройствах (по умолчанию true)
                waitForAnimate: false, // опция, по умолчанию true, разрешает перелистывание ещё до того, как прогрузилась анимация прокрутки (ставим false)
                touchThreshold: 5, // опция, сколько свайпов сделать, чтобы осуществился переход на телефоне
                touchMove: true, // опция, разрешает тянуть слайд, который переключаем
        
                centerMode: false, // опция, по умолчанию false (добавляет класс slick-center для главного слайда) ------------------------------------------------------------------------------------------ эти два сочетания и использовать в работе Base (true)
                variableWidth: true, // опция, по умолчанию false, впихивает по ширине все слайды, обреза с краю, которые не вместились, хорошо работает с centerMode:true --------------------------------- эти два сочетания и использовать в работе Base (true)
                adaptiveHeight: false, // опция, по умолчанию false, слайдер автоматически подстраивается по высоте под конкретный слайд (нужно дописать стиль .slick-track {align-items: flex-start}) ПОЧЕМУ-ТО КОГДА TRUE - ТО ВЫДАЕТ ОШИБКУ WEBPACK
                
                rows: 1, // опция, устанавливаем ряды (этажи для слайдов)
                slidesPerRow: 1, // опция, число слайдов на ряду
                vertical: false, // опция, вертикальный скрол ( по умолчанию flase) (ещё нужно отключить display:flex)
                verticalSwiping: false, // опция, что вертикальный скролл был (по умолчанию false)
        
                // asNavFor: ".main__banner-container", // опция, чтобы связать с другим слайдером
                mobileFirst: false, // опция, если указать true, то все breakpoint будут как min-width то есть только при этом breakpoint и выше будут выполняться настройки
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            // На IOS не работают эти свойства, поэтому просто задавать меньший margin нужно
                            centerMode: false,
                            variableWidth: false,
                            dots: true,
                        }
                    },
                ],
            });
        });
    }
    // Отключение slick-slider
    if (currentDeviceWidth > 767.98 && brandsSliderBlock.classList.contains('slick-initialized')) {
        $('.brands__cards').slick('unslick');
    }
}