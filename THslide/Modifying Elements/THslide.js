const title = document.getElementById('title');
title.textContent = "Tiêu đề đã được thay đổi!";

const box = document.getElementById('content-box');
box.innerHTML = `
    <div style="color: blue; padding: 10px; border: 1px solid blue;">
        <h3>Được chèn từ JS</h3>
        <p>Đây là nội dung HTML mới.</p>
    </div>
`;

const newItem = document.createElement('li');
newItem.textContent = "Mục mới được tạo từ createElement";
newItem.style.color = "green";

const list = document.getElementById('myList');
list.appendChild(newItem);

const elementToRemove = document.getElementById('remove-me');
if (elementToRemove) {
    elementToRemove.remove(); 
    console.log("Đã xóa phần tử thành công!");
}
