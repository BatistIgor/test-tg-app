let Iduser = "2121";
let firstName = " ";
let lastName = " ";

document.addEventListener('DOMContentLoaded', () => {
  incrementCounter();
  Telegram.WebApp.ready();

  const telegramUserId = Telegram.WebApp.initDataUnsafe.user?.id;
  const telegramFirstName = Telegram.WebApp.initDataUnsafe.user?.first_name;
  const telegramLastName = Telegram.WebApp.initDataUnsafe.user?.last_name;

  if (telegramUserId) {
    Iduser = telegramUserId || Iduser;
      firstName = telegramFirstName || firstName;
      lastName = telegramLastName || lastName;
  }

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
    body: JSON.stringify({ userId: Iduser }),})
  .then(response => response.json())
  .then(data => {
      document.getElementById("count").innerText = data.count;
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
}