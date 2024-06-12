document.addEventListener('DOMContentLoaded', () => {
    const tapButtons = document.querySelectorAll('.actions__btn');
    const range = document.querySelector('.range');

    let maxRange = 500;
    range.max = maxRange;
    range.value = maxRange;

    tapButtons.forEach(tapButton => {
        tapButton.addEventListener('click', () => {
            if (range.value > 0) {
                range.value--;
            }
        });
    });

    setInterval(() => {
        if (range.value < maxRange) {
            range.value++;
        }
    }, 2000);
});