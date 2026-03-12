const img = document.getElementById('myImage');
img.src = "https://via.placeholder.com/150/0000FF/FFFFFF?text=Gemini"; 

img.alt = "Ảnh đã được thay đổi";
img.title = "Di chuột vào ảnh để thấy tiêu đề";

const box = document.getElementById('myBox');
box.classList.add('highlight'); 
console.log("Đã thêm class highlight");

setTimeout(() => {
    box.classList.remove('highlight');
    console.log("Đã xóa class highlight");
}, 3000);

const btn = document.getElementById('btnToggle');
btn.addEventListener('click', () => {
    box.classList.toggle('active');
    
    if (box.classList.contains('active')) {
        console.log("Trạng thái hiện tại: Đang Active");
    } else {
        console.log("Trạng thái hiện tại: Đã tắt Active");
    }
});