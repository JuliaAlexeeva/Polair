ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.763494, 37.653313],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            // Контент при наведении
            hintContent: 'Значок метки',
            // hintContent: '<img src="../img/test/5356566.png" style="width: 150px; height: 150px" alt="">',
            // Контент при клике
            balloonContent: '<a href = "https://overcoder.net/">https://overcoder.net/</a>',
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/main/contacts/yamap-point.svg',
            // Для хостинга, там другой путь (+в корень надо картинку положить):
            // iconImageHref: '/mining/yamap-point.svg',
            // Размеры метки.
            iconImageSize: [22, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-10, -24],
        });
        // Нужно поставить запятую, если ещё надо какие-то метки

    myMap.geoObjects
        .add(myPlacemark)
});