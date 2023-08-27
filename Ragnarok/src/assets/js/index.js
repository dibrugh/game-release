import "swiper/scss";
import "../styles/reset.scss";
import "../styles/styles.scss";

import Swiper from 'swiper'
import { Navigation } from 'swiper/modules';
Swiper.use([Navigation]);

const header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');
const menuButton = document.querySelector('.header-menu__button');
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');
const checkbox = document.querySelectorAll('.checkbox');

const checkboxes = {
    // Заранее присвоили data-аттрибут для чекбоксов в html
    requirements: ["minimum", "recommended"],
    versions: ["standard", "limited"],
}


let isPlay = false;

// List of classes
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active',
}
// Burger-menu
const toggleMenu = () => {
    header.classList.toggle(classes.opened);
}
menuButton.addEventListener('click', toggleMenu);

// Smooth scroll to sections
const scrollToSection = (e) => {
    // Убираем стандартное поведение, когда моментально переходит на нужное место
    e.preventDefault();
    // Получаем ссылку каждого элемента
    const href = e.currentTarget.getAttribute('href');
    if (!href && !href.startsWith('#')) return;

    // Убираем символ # из пути
    const section = href.slice(1);
    // Вычисляем расстояние от секции до верха и тут же делаем проверку через ?.
    const top = document.getElementById(section)?.offsetTop || 0;
    window.scrollTo({ top, behavior: 'smooth' })
};

menuLink.forEach((el) => el.addEventListener('click', scrollToSection));

// Timer
// Получаем значения для таймера
const getTimerValues = (diff) => ({
    seconds: (diff / 1000) % 60,
    minutes: (diff / (1000 * 60)) % 60,
    hours: (diff / (1000 * 60 * 60)) % 24,
    // Не самое точное вычисление дней)
    days: (diff / (1000 * 60 * 60 * 24)) % 30,
})

const formatValue = (value) => value < 10 ? `0${value}` : value;

// Записываем значения таймера
const setTimerValues = (values) => {
    // Будем передавать объект, который получаем при выхове getTimerValues
    Object.entries(values).forEach(([key, value]) => {
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(Math.floor(value));
    });
}

const startTimer = (date) => {
    // Присваиваем имя, чтобы потом по нему можно было очищать
    const id = setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime();
        if (diff < 0) {
            clearInterval(id);
            return;
        }
        setTimerValues(getTimerValues(diff))
    }, 1000);

};
startTimer("November 19, 2023 00:00:00");

// Video
const handleVideo = ({ target }) => {
    const info = target.parentElement;

    isPlay = !isPlay;
    // Если убираем курсор, то надпись пропадает
    info.classList.toggle(classes.hidden, isPlay);
    target.innerText = isPlay ? `Pause` : `Play`;
    isPlay ? video.play() : video.pause();
}
videoButton.addEventListener('click', handleVideo);

// Explore section
const handleCheckbox = ({ currentTarget: { checked, name } }) => {
    // Забираем класс active из объекта classes
    const { active } = classes;
    // В массиве 2 элемента, поэтому можно обращаться по индексу 1 или 0, т.е можно привести true/false у checked к числу
    console.log(`${name}`, checked, Number(checked));
    const value = checkboxes[`${name}`][Number(checked)];


    const list = document.getElementById(value);
    // name = requirements или versions
    const tabs = document.querySelectorAll(`[data-${name}]`);
    // Для удаления классов у других элементов
    const siblings = list.parentElement.children;
    for (const item of siblings) item.classList.remove(active);

    for (const tab of tabs) {
        tab.classList.remove(active);
        tab.dataset[name] === value && tab.classList.add(active);
    }

    list.classList.add(active)
}

checkbox.forEach(el => el.addEventListener('click', handleCheckbox))


// Swiper
const initSlider = () => {
    // Первым параметром css-селектор или html элемент, вторым настройки
    new Swiper('.swiper', {
        // бесконечный
        loop: true,
        slidesPerView: 2,
        spaceBetween: 40,
        initialSlide: 2,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};

initSlider();