const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu li');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
})


menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    })
})

document.addEventListener('click', (event) => {
    console.log(event.target.classList.value)
    if (event.target.classList.value === "bar" || 
        event.target.classList.value === "hamburger active") {
        return; // Пропускаем обработку, если нажата кнопка бургера
    }
    else {

        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
})