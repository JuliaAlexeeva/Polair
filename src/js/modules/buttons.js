const selectButtons = document.querySelectorAll('.left-side-prog__button');
const selectButtonsText = document.querySelectorAll('.right-side-prog__preview');


selectButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Получаем значение атрибута data-target
        let dataAttr = this.getAttribute('data-target')
        // Записываем название класса для включения блока prog__edu, например
        let textClassName = `.prog__${dataAttr}`;

        // Убираем у всех active
        selectButtons.forEach(button => {
            button.classList.remove('active');
        });
        selectButtonsText.forEach(textBlock => {
            textBlock.classList.remove('active');
        });

        // Добавляем только тому тексту и той кнопке, на которую нажали
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            document.querySelector(textClassName).classList.add('active');
        }
    });
});

/*===================================================================================*/

const directionsSpoilerButtonMore = document.querySelector('.db-spoiler__more');
const directionsSpoilerButtonLess = document.querySelector('.db-spoiler__less');
let directionsCards = document.querySelectorAll('.dir-block__card');

directionsSpoilerButtonMore.addEventListener('click', function() {   
    directionsSpoilerButtonMore.classList.add('inactive');
    directionsSpoilerButtonLess.classList.remove('inactive');
    directionsCards.forEach(item => {
        if (item.classList.contains('direction-hidden')) {
            item.classList.remove('direction-hidden');
        }
    });
});

directionsSpoilerButtonLess.addEventListener('click', function() {
    directionsSpoilerButtonLess.classList.add('inactive');
    directionsSpoilerButtonMore.classList.remove('inactive');
    directionsCards.forEach(item => {
        if (!item.classList.contains('direction-show')) {
            item.classList.add('direction-hidden');
        }
    });
});


