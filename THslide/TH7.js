const form = document.querySelector('#myForm');
const username = document.querySelector('#username');
const msg = document.querySelector('#msg');

username.addEventListener('input', (e) => {
    if (e.target.value.length < 5) {
        msg.textContent = "Tên quá ngắn!";
    } else {
        msg.textContent = "";
    }
});

username.addEventListener('focus', () => {
    username.style.backgroundColor = "#e8f0fe";
});

username.addEventListener('blur', () => {
    username.style.backgroundColor = "white";
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    console.log('Dữ liệu đã sẵn sàng để gửi đi:', username.value);
    alert('Form đã được gửi thành công mà không load lại trang!');
});