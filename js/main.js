document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('.highlight-last-word');
    
    elements.forEach(function(element) {
        var words = element.textContent.split(/\s+/);
        words = words.slice(0, -1);
        var html = '';
        
        words.forEach(function(word, index) {
            if (index === words.length - 1 || index === 0) {
                html += '<span>' + word + '</span> ';
            }
            else {
            html += '<span>' + word + "&nbsp;" + '</span> ';
            }
        });
        
        element.innerHTML = html;
    });
});


async function getProductData() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/devices1/");
        if (!response.ok) {
            throw new Error('Ошибка сервера');
        }
        data = await response.json();
        console.log(data.devices_data);
        return data
    } catch (error) {
        console.error('Ошибка:', error.message);
        return null;
    }
}

async function postCardId(card_id) {
  try {
    const url = "http://localhost:8000/api/v1/selectcard/";
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card_id }),
    });

    if (!response.ok) {
      throw new Error('Ошибка сервера');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    return null;
  }
}

function showProductList(products) {
  const template = document.getElementById('product-template');
  if (!template) {
    console.error('Шаблон продукта не найден');
    return;
  }

  // const dynamicContent = document.createElement('div');
  // dynamicContent.id = 'dynamic-content';

  const dynamicTemplate = template.content.cloneNode(true);
  const productContainer = dynamicTemplate.querySelector('.cards');
  document.getElementById('cards').innerHTML = '';

  products.forEach(product => {
    const productItem = dynamicTemplate.querySelector('.card').cloneNode(true);

    productItem.setAttribute('id', product.id);
    
    productItem.querySelector('.card__image').src = product.photo || 'xex';
    console.log("Photo is " + product.photo);
    if (product.name.length > 25) {
        productItem.querySelector('.card__title').textContent = product.name.slice(0, 35) + '...' || 'xwx';
    }
    else {
        productItem.querySelector('.card__title').textContent = product.name || 'xwx';
    }
    
    if (product.category === "Ориентирование") {
        productItem.querySelector('.category__image').src = './img/Orientation.svg';
    } 
    else if (product.category === "Обучение") {
        productItem.querySelector('.category__image').src = './img/Learning.svg';
    }
    else if (product.category === "Бытовые") {
        productItem.querySelector('.category__image').src = './img/Domestic.svg';
    }
    productItem.querySelector('.category__name').textContent = product.category || 'xww';

    document.getElementById('cards').appendChild(productItem);

  });
  const cards = document.querySelector('.cards')
  const productss = Array.from(cards.children);
  productss.forEach(product => {
    product.addEventListener('click', async () => {
      const productId = product.id;
      await postCardId(productId);
      window.location.href = `page.html`;
    });
  })

}


document.addEventListener('DOMContentLoaded', async () => {
  const products = await getProductData();
  showProductList(products.devices_data);
});


const categories = document.querySelectorAll('.categories p');
console.log(categories);

const categories2 = document.querySelectorAll(".select-category option");

console.log(categories2);

const productsContainer = document.querySelector('.cards');
console.log(productsContainer);



// function sortProductsByCategory(categoryName, categoryText) {

//   categories.forEach(cat => cat.classList.remove('active'));

//   const selectedCategory = document.querySelector(`.${categoryName}`);
//   selectedCategory.classList.add('active');

//   const products = Array.from(productsContainer.children);
//   console.log(products)
//   const filteredProducts = products.filter(product => {
//     const categoryElement = product.querySelector('.category__name');
//     console.log(categoryElement)
//     return categoryElement.textContent.trim() === categoryText.trim();
//   });

//   productsContainer.innerHTML = '';
//   filteredProducts.forEach(product => productsContainer.appendChild(product));
// }




function sortProductsByCategory(categoryName, categoryText) {

  console.log(categoryName, categoryText)
  categories.forEach(cat => cat.classList.remove('active'));

  const selectedCategory = document.querySelector(`.${categoryName}`);
  selectedCategory.classList.add('active');

  const products = Array.from(productsContainer.children);
  console.log(products[1].style.display)


  // Устанавливаем display: block для всех товаров
  products.forEach(product => {
    product.style.display = 'block'
  });

  if (categoryName === 'all') {
    productsContainer.innerHTML = '';
    products.forEach(product => productsContainer.appendChild(product));
    return;
  } 


  // Фильтруем и скрываем неотносящиеся к выбранной категории товары
    const filteredProducts = products.filter(product => {
    const categoryElement = product.querySelector('.category__name');
    return categoryElement && categoryElement.textContent.trim() === categoryText.trim();
  });

  // Скрываем товары, которые не отображаются в filteredProducts
  filteredProducts.forEach(product => product.style.display = 'block');
  products.forEach(product => {
    if (!filteredProducts.includes(product)) {
      product.style.display = 'none';
    }
  });

  console.log(filteredProducts)

  productsContainer.innerHTML = '';
  products.forEach(product => productsContainer.appendChild(product));
}

categories.forEach(cat => {
  cat.addEventListener('click', () => sortProductsByCategory(cat.className, cat.innerHTML));
});


const selectElement = document.querySelector('.select-category');

// Добавляем обработчик события change
selectElement.addEventListener('change', function(event) {
  const selectedOption = event.target.options[event.target.selectedIndex];
  sortProductsByCategory(selectElement.value, selectedOption.text);
});


function sortProductsByCategory2(categoryName) {
  const selectedCategory = document.getElementById('categorySelect');
  
  // Обновляем выбранную категорию
  selectedCategory.value = categoryName;

  const products = Array.from(productsContainer.children);

  // Скрываем все товары
  products.forEach(product => product.style.display = 'block');

  let filteredProducts;
  switch(categoryName) {
    case 'all':
      filteredProducts = products; // Все товары
      break;
    case 'orient':
      filteredProducts = products.filter(product => 
        product.querySelector('.category__name').textContent.trim() === 'Ориентирование'
      );
      break;
    case 'learn':
      filteredProducts = products.filter(product => 
        product.querySelector('.category__name').textContent.trim() === 'Обучение'
      );
      break;
    case 'work':
      filteredProducts = products.filter(product => 
        product.querySelector('.category__name').textContent.trim() === 'Бытовые'
      );
      break;
  }

  // Показываем только отфильтрованные товары
  filteredProducts.forEach(product => {
    product.style.display = 'block';
    productsContainer.appendChild(product);
  });
}

// Добавляем обработчик события для селектора
// document.getElementById('categorySelect').addEventListener('change', () => {
//   console.log(this.value)
//   sortProductsByCategory2(this.value);
// });


// Добавьте этот скрипт в конец вашего HTML файла или в файл scripts.js

// Функция для скролла вниз
function scrollToBottom() {
  // Скроллим вниз на весь экран
  window.scrollTo(  {
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

// Функция для скролла вверх
function scrollToTop() {
  // Скроллим вверх на весь экран
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}



function showInfo() {
  window.location.href = `info.html`;
}

function scrollToProducts() {
  const productsContainer = document.querySelector('.products-container');
  
  if (productsContainer) {
    // Скроллим до верхней границы контейнера продуктов
    window.scrollTo({
      top: productsContainer.offsetTop,
      behavior: 'smooth'
    });
  } else {
    console.error('Контейнер продуктов не найден');
  }
}

// Добавляем обработчик клика к кнопке "Контакты"
document.addEventListener('DOMContentLoaded', function() {
  const contactButton = document.querySelector('.contacts-button'); // Замените '.contact-button' на класс или id вашей кнопки
  const toolsButton = document.querySelector('.devices-button');
  const mainButton = document.querySelector('.main-button');
  const infoButton = document.querySelector('.info-button');  
  const footerButton = document.querySelector('.footer-button');


  if (mainButton) {
    mainButton.addEventListener('click', scrollToTop);
  } else {
    console.error('Кнопка контактов не найдена');
  }
  
  if (contactButton) {
    contactButton.addEventListener('click', scrollToBottom);
  } else {
    console.error('Кнопка контактов не найдена');
  }

  if (toolsButton) {
    toolsButton.addEventListener('click', scrollToProducts);
  } else {
    console.error('Кнопка контактов не найдена');
  }

  if (infoButton) {
    infoButton.addEventListener('click', showInfo);
  } else {
    console.error('Кнопка контактов не найдена');
  }

  if (footerButton) {
    footerButton.addEventListener('click', scrollToTop);
  } else {
    console.error('Кнопка контактов не найдена');
  }
});

function openGoogleMail() {
    var mailto = 'mailto:sonar.tiflo@mail.ru';
    if (navigator.canIUse && navigator.canIUse('clipboard')) {
        // Проверяем поддержку API Clipboard API
        navigator.clipboard.writeText(mailto).then(
            function() {
                console.log('Адрес вставлен в буфер обмена');
            }).catch(function(err) {
                console.error('Ошибка при копировании:', err);
            });
        
        // Открываем Google Mail с предустановленным адресом
        window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&to=sonar.tiflo@mail.ru', '_blank');
    } else {
        // Если Clipboard API не поддерживается, открываем Google Mail с предустановленным адресом
        window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&to=sonar.tiflo@mail.ru', '_blank');
    }
}



