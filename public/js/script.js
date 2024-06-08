const socket = io();

const tapButton = document.getElementById('tapButton');
const countDisplay = document.getElementById('count');

tapButton.addEventListener('click', () => {
    socket.emit('increment');
});

socket.on('updateCount', (count) => {
    countDisplay.textContent = count;
});

