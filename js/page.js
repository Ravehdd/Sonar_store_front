
async function getSelectedProductData() {
        try {
        const response = await fetch("http://localhost:8000/api/v1/selectcard/");
        if (!response.ok) {
            throw new Error('Ошибка сервера');
        }
        data = await response.json();
        // console.log(data);
        return data
    } catch (error) {
        console.error('Ошибка:', error.message);
        return null;
    }
}

function fillDeviceInfo(deviceData) {
  const mainInfo = document.querySelector('.main-info');
  const description = document.querySelector('.description');

  if (!mainInfo || !description) {
    console.error('Основная информация или описание устройства не найдено');
    return;
  }

  // Заполняем основную информацию
  mainInfo.querySelector('.main-image').src = deviceData.photo;
  mainInfo.querySelector('.main-title').textContent = deviceData.name;
  mainInfo.querySelector('.category').querySelector('.category-text').textContent = "⠀" + (deviceData.category).toLowerCase();

  // Заполняем описание
  const descriptionTitle = mainInfo.querySelector('.main-description');
  descriptionTitle.textContent = deviceData.description[0]["description_paragraph"];

  // Заполняем описание подробно
  const descriptionTextDiv = description.querySelector('.description-text');
  const descriptionText = descriptionTextDiv.querySelector('.justify-text');
  console.log(descriptionText)
  deviceData.description.forEach(paragraph => {
      descriptionText.textContent = paragraph["description_paragraph"];
      console.log(paragraph["description_paragraph"])
      descriptionTextDiv.append(descriptionText.cloneNode(true));
  })
  const first_paragraph = descriptionTextDiv.querySelector('.justify-text');
  descriptionTextDiv.removeChild(first_paragraph);
}


document.addEventListener('DOMContentLoaded', async () => {
  const product = await getSelectedProductData();
  fillDeviceInfo(product);
  console.log(product)
});




