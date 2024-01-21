const competenciesVideoButton = document.querySelector('.cb-video__button-player');
const competenciesVideoPoster = document.querySelector('.cb-video__poster');
const competenciesVideo = document.getElementById('competencies_video');

competenciesVideoButton.addEventListener('click', playVideo);

function playVideo() {
    competenciesVideo.classList.add('paused');   
    if (competenciesVideo.classList.contains('paused')) {
        competenciesVideoPoster.classList.add('play');
        competenciesVideoButton.classList.add('play');
        competenciesVideo.play();
    }
}

// Возврат poster при окончании видео
competenciesVideo.addEventListener('ended', function() {
    competenciesVideoPoster.classList.remove('play');
    competenciesVideoButton.classList.remove('play');
});

// чтобы при включенном видео и переходе на другую вкладку видео ставилось бы на паузу
window.onfocus = function () {
    competenciesVideo.classList.contains('paused') ? competenciesVideo.play() : competenciesVideo.pause();
    // if (competenciesVideo.classList.contains('paused')) {
    //     competenciesVideo.play();
    // } else {
    //     competenciesVideo.pause();
    // }
 }
 
 // когда покидаем вкладку
 window.onblur = function () {
    competenciesVideo.pause();
 }
 // пауза видео происходит только когда onblur прописано, onfocus не срабатывает почему-то,
 // но совместно работает и при переходе в другое окно или в другую вкладку браузера