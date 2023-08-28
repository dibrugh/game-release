import "swiper/scss";
import "../styles/reset.scss";
import "../styles/styles.scss";

import Swiper from 'swiper'
import { Navigation } from 'swiper/modules';
import { languages } from "./languages";
Swiper.use([Navigation]);

const header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');
const menuButton = document.querySelector('.header-menu__button');
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');
const checkbox = document.querySelectorAll('.checkbox');
const faqItem = document.querySelectorAll('.faq-item');
const sections = document.querySelectorAll('.section');
const language = document.querySelectorAll('.language');
const buyButton = document.querySelectorAll('.buy-button');
const modal = document.querySelector('.modal');
const modalVersion = document.querySelector('.modal-version');
const modalPrice = document.querySelector('.modal-total__price');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');

const values = [
    {
        price: 19.99,
        title: "Standard Edition",
    },
    {
        price: 18.99,
        title: "Standard Edition",
    },
    {
        price: 29.99,
        title: "Deluxe Edition",
    },
];

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

// FAQ
const handleFaqItem = ({ currentTarget: target }) => {
    target.classList.toggle(classes.opened);
    // анимирование высоты
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector('p').clientHeight;
    const content = target.querySelector('.faq-item__content');

    content.style.height = `${isOpened ? height : 0}px`;
}

faqItem.forEach(el => el.addEventListener('click', handleFaqItem));

// Отрисовка параллельно скролу
const handleScroll = () => {
    const { scrollY: y, innerHeight: h } = window;
    sections.forEach((section) => {
        // Если долистали до секции
        if (y > section.offsetTop - h / 1.5) section.classList.remove(classes.hidden);
    });
}

window.addEventListener('scroll', handleScroll);

// Toggle languages
const setTexts = () => {
    const lang = localStorage.getItem('lang') || 'en';
    const content = languages[lang];

    Object.entries(content).forEach(([key, value]) => {
        const items = document.querySelectorAll(`[data-text="${key}"]`);
        items.forEach(el => el.innerText = value);
    });
}

const toggleLanguage = ({ target }) => {
    const { lang } = target.dataset;

    if (!lang) return;
    // Запоминаем установленное значение
    localStorage.setItem('lang', lang);
    setTexts();
}
language.forEach(el => el.addEventListener('click', toggleLanguage));

setTexts();

// Modal window
const handleBuyButton = ({ currentTarget: target }) => {
    const { value } = target.dataset;

    if (!value) return;

    const { price, title } = values[value];
    modalVersion.innerText = title;
    modalPrice.innerText = `${price}$`;
    modal.classList.add(classes.opened);
    overlay.classList.add(classes.opened);
};

buyButton.forEach(el => el.addEventListener('click', handleBuyButton));

const closeModal = () => {
    modal.classList.remove(classes.opened);
    overlay.classList.remove(classes.opened);
}
modalClose.addEventListener('click', closeModal);