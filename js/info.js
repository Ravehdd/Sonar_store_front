async function postDeviceName(device_name) {
  try {
    const url = "http://localhost:8000/api/v1/selectcard/";
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device_name }),
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

const devices = document.querySelectorAll('text');
// console.log(devices[1].innerHTML);

devices.forEach(device => {
    console.log(device.innerHTML.slice(1, -1));
    device.addEventListener('click', async () => {
      const device_name = device.innerHTML.slice(1, -1);
      console.log(device_name);
      await postDeviceName(device_name);
      window.location.href = `page.html`;
    });
  })