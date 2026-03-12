const btn = document.getElementById('mainBtn');
const box = document.getElementById('myBox');

btn.addEventListener('click', function() {
    console.log("Nút đã được click!");
});

btn.addEventListener('click', () => {
    console.log("Đây là listener thứ 2 của nút bấm");
});

box.addEventListener('mouseenter', () => {
    box.style.borderColor = "red";
    box.textContent = "Bạn vừa đưa chuột vào!";
});

box.addEventListener('mouseleave', () => {
    box.style.borderColor = "#333";
    box.textContent = "Bạn đã đưa chuột ra ngoài!";
});

box.addEventListener('click', () => {
    box.textContent = "Bạn đã click trúng tôi rồi! 🎉";
    
    box.classList.toggle('bg-blue');
});
