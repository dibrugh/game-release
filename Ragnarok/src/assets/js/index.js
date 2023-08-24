import "../styles/reset.scss";
import "../styles/mixins.scss";
import "../styles/styles.scss";

const header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');

// List of classes
const classes = {
    opened: 'opened',
}
// Burger-menu
const menuButton = document.querySelector('.header-menu__button');

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