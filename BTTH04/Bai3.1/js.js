const form = document.getElementById('registerForm');
const passInput = document.getElementById('password');

// 1. Đếm ký tự họ tên
const nameInput = document.getElementById('fullname');
const nameCounter = document.getElementById('nameCounter');

nameInput.addEventListener('input', function() {
    nameCounter.innerText = `${this.value.length}/50`;
    validateField(this, /^[a-zA-ZÀ-ỹ\s]{3,50}$/, 'nameError', 'Tên từ 3-50 ký tự, chỉ chứa chữ');
});

// 2. Ẩn/Hiện mật khẩu
document.getElementById('togglePass').addEventListener('click', function() {
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    this.innerText = isPass ? '🙈' : '👁️';
});

// 3. Kiểm tra độ mạnh mật khẩu Realtime
passInput.addEventListener('input', function() {
    const val = this.value;
    const bar = document.getElementById('strengthBar');
    const txt = document.getElementById('strengthText');
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    bar.className = '';
    if (val === "") { bar.style.width = "0"; txt.innerText = ""; }
    else if (score <= 1) { bar.classList.add('weak'); txt.innerText = "Yếu"; txt.style.color = "red"; }
    else if (score <= 3) { bar.classList.add('medium'); txt.innerText = "Trung bình"; txt.style.color = "orange"; }
    else { bar.classList.add('strong'); txt.innerText = "Mạnh"; txt.style.color = "green"; }
});

// 4. Logic Validation chung
function validateField(input, regex, errorId, msg) {
    const isOk = regex.test(input.value.trim());
    document.getElementById(errorId).innerText = isOk ? '' : msg;
    input.style.borderColor = isOk ? '#ddd' : 'red';
    return isOk;
}

// 5. Submit Form
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isName = validateField(nameInput, /^[a-zA-ZÀ-ỹ\s]{3,50}$/, 'nameError', 'Tên không hợp lệ');
    const isEmail = validateField(document.getElementById('email'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'emailError', 'Email sai định dạng');
    const isPhone = validateField(document.getElementById('phone'), /^0[0-9]{9}$/, 'phoneError', 'SĐT phải có 10 số, bắt đầu bằng 0');
    const isPass = passInput.value.length >= 8;
    const isConfirm = document.getElementById('confirmPassword').value === passInput.value;

    if (!isPass) document.getElementById('passError').innerText = "Mật khẩu tối thiểu 8 ký tự";
    if (!isConfirm) document.getElementById('confirmError').innerText = "Mật khẩu không khớp";

    if (isName && isEmail && isPhone && isPass && isConfirm) {
        form.style.display = 'none';
        document.getElementById('successMsg').style.display = 'block';
        document.getElementById('welcomeUser').innerText = `Đăng ký thành công! Chào ${nameInput.value} 🎉`;
    }
});