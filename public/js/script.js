let userId = "2121";
let firstName = "Какой-то";
let lastName = ". . .";

document.addEventListener('DOMContentLoaded', () => {
  Telegram.WebApp.ready();

  // Попытка получить данные пользователя из Telegram Web Apps
  const telegramUserId = Telegram.WebApp.initDataUnsafe.user?.id;
  const telegramFirstName = Telegram.WebApp.initDataUnsafe.user?.first_name;
  const telegramLastName = Telegram.WebApp.initDataUnsafe.user?.last_name;

  // Если данные пользователя получены из Telegram, используем их
  if (telegramUserId) {
      userId = telegramUserId || userId;
      firstName = telegramFirstName || firstName; // Используем значение из Telegram, если оно есть
      lastName = telegramLastName || lastName;   // Используем значение из Telegram, если оно есть
  }

  // Отображение ID пользователя на странице
  const userNameElement = document.getElementById('userName');
  if (firstName) {
      userNameElement.textContent = firstName + (lastName ? ` ${lastName}` : '');
  } else {
      userNameElement.textContent = 'User name not available';
  }
});

function incrementCounter() {
  fetch('/increment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: "2121" }),})
  .then(response => response.json())
  .then(data => {
      document.getElementById("count").innerText = data.count;
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
}