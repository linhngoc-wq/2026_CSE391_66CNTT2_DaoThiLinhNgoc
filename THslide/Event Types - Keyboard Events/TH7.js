const input = document.querySelector('#myInput');
const msg = document.querySelector('#msg');
input.addEventListener('keydown', (e) => {
    console.log(`Bạn đang nhấn phím: ${e.key}`);
        if (e.key === "Enter") {
        msg.textContent = "Bạn vừa nhấn phím Enter! 🚀";
        msg.style.color = "blue";
    }
});

input.addEventListener('keyup', (e) => {
    console.log(`Bạn đã thả phím: ${e.key}`);
});