const form = document.getElementById('registerForm');

// Các Regex chuẩn
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^0[0-9]{9}$/;
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const regexName = /^[a-zA-ZÀ-ỹ\s]+$/;

// Hàm hiển thị lỗi
function showError(id, msg) {
    const input = document.getElementById(id);
    const errorSpan = document.getElementById(id + 'Error') || document.querySelector(`#${id} + .error-msg`);
    if (errorSpan) errorSpan.innerText = msg;
    input.classList.add('input-error');
    input.classList.remove('input-success');
}

// Hàm xóa lỗi
function clearError(id) {
    const input = document.getElementById(id);
    const errorSpan = document.getElementById(id + 'Error') || document.querySelector(`#${id} + .error-msg`);
    if (errorSpan) errorSpan.innerText = '';
    input.classList.remove('input-error');
    input.classList.add('input-success');
}

// Các hàm Validate từng trường
function validateName() {
    const val = document.getElementById('fullname').value.trim();
    if (val.length < 3 || !regexName.test(val)) {
        showError('fullname', 'Tên từ 3 ký tự, chỉ chứa chữ cái');
        return false;
    }
    clearError('fullname'); return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    if (!regexEmail.test(val)) {
        showError('email', 'Email không đúng định dạng');
        return false;
    }
    clearError('email'); return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    if (!regexPhone.test(val)) {
        showError('phone', 'SĐT phải có 10 số và bắt đầu bằng số 0');
        return false;
    }
    clearError('phone'); return true;
}

function validatePass() {
    const val = document.getElementById('password').value;
    if (!regexPass.test(val)) {
        showError('password', 'Mật khẩu yếu (cần 8 ký tự, 1 hoa, 1 thường, 1 số)');
        return false;
    }
    clearError('password'); return true;
}

function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || confirm === "") {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp');
        return false;
    }
    clearError('confirmPassword'); return true;
}

// --- GẮN SỰ KIỆN ---

// 1. Validate realtime khi người dùng rời khỏi ô (blur)
document.getElementById('fullname').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('password').addEventListener('blur', validatePass);
document.getElementById('confirmPassword').addEventListener('blur', validateConfirm);

// 2. Xóa lỗi khi đang nhập (input)
form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => clearError(input.id));
});

// 3. Xử lý khi Submit form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn load lại trang

    // Gọi tất cả các hàm validate
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPassValid = validatePass();
    const isConfirmValid = validateConfirm();

    if (isNameValid && isEmailValid && isPhoneValid && isPassValid && isConfirmValid) {
        const name = document.getElementById('fullname').value;
        form.style.display = 'none';
        document.getElementById('successMsg').style.display = 'block';
        document.getElementById('welcomeUser').innerText = `Đăng ký thành công! 🎉 Chào mừng ${name}`;
    }
});
