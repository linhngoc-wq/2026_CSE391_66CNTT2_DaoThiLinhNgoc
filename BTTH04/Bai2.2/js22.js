const orderForm = document.getElementById('orderForm');
const productSelect = document.getElementById('product');
const qtyInput = document.getElementById('quantity');
const totalDisplay = document.getElementById('totalDisplay');
const noteTextarea = document.getElementById('note');
const charCount = document.getElementById('charCount');

// 1. Tính tổng tiền Realtime
function calculateTotal() {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const price = selectedOption.dataset.price ? parseInt(selectedOption.dataset.price) : 0;
    const qty = parseInt(qtyInput.value) || 0;
    const total = price * qty;
    totalDisplay.innerText = total.toLocaleString('vi-VN') + "đ";
}

productSelect.addEventListener('change', calculateTotal);
qtyInput.addEventListener('input', calculateTotal);

// 2. Đếm ký tự Ghi chú
noteTextarea.addEventListener('input', function() {
    const len = this.value.length;
    charCount.innerText = `${len}/200`;
    if (len > 200) {
        charCount.classList.add('char-red');
        document.getElementById('noteError').innerText = "Ghi chú không được quá 200 ký tự!";
    } else {
        charCount.classList.remove('char-red');
        document.getElementById('noteError').innerText = "";
    }
});

// 3. Hàm Validation
function validateOrder() {
    let isValid = true;

    // Sản phẩm
    if (productSelect.value === "") {
        document.getElementById('productError').innerText = "Vui lòng chọn sản phẩm!";
        isValid = false;
    } else { document.getElementById('productError').innerText = ""; }

    // Số lượng
    const qty = parseInt(qtyInput.value);
    if (isNaN(qty) || qty < 1 || qty > 99) {
        document.getElementById('quantityError').innerText = "Số lượng từ 1 - 99!";
        isValid = false;
    } else { document.getElementById('quantityError').innerText = ""; }

    // Ngày giao hàng
    const dateVal = document.getElementById('deliveryDate').value;
    const today = new Date();
    today.setHours(0,0,0,0);
    const selectedDate = new Date(dateVal);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (!dateVal) {
        document.getElementById('deliveryDateError').innerText = "Vui lòng chọn ngày!";
        isValid = false;
    } else if (selectedDate < today || selectedDate > maxDate) {
        document.getElementById('deliveryDateError').innerText = "Ngày giao từ hôm nay đến 30 ngày tới!";
        isValid = false;
    } else { document.getElementById('deliveryDateError').innerText = ""; }

    // Địa chỉ
    if (document.getElementById('address').value.trim().length < 10) {
        document.getElementById('addressError').innerText = "Địa chỉ phải ít nhất 10 ký tự!";
        isValid = false;
    } else { document.getElementById('addressError').innerText = ""; }

    return isValid;
}

// 4. Xử lý Submit & Modal
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateOrder()) {
        const summary = `
            <p><strong>Sản phẩm:</strong> ${productSelect.value}</p>
            <p><strong>Số lượng:</strong> ${qtyInput.value}</p>
            <p><strong>Tổng tiền:</strong> ${totalDisplay.innerText}</p>
            <p><strong>Ngày giao:</strong> ${document.getElementById('deliveryDate').value}</p>
        `;
        document.getElementById('summaryContent').innerHTML = summary;
        document.getElementById('confirmOverlay').style.display = 'flex';
    }
});

document.getElementById('btnCancel').addEventListener('click', () => {
    document.getElementById('confirmOverlay').style.display = 'none';
});

document.getElementById('btnFinalConfirm').addEventListener('click', () => {
    alert("Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.");
    location.reload(); // Reset trang
});