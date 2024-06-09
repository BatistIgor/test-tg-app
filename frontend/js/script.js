Telegram.WebApp.ready();
const telegramId = Telegram.WebApp.initDataUnsafe.user?.id;

if (!telegramId) {
  document.body.innerHTML = '<h1>Telegram ID not found</h1>';
  throw new Error('Telegram ID not found');
}

document.getElementById('incrementButton').addEventListener('click', () => {
  fetch('/api/increment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ telegramId }),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('count').innerText = data.count;
  })
  .catch(error => console.error('Error:', error));
});

// Fetch user data on load
fetch(`/api/user/${telegramId}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('count').innerText = data.count;
  })
  .catch(error => console.error('Error:', error));