const title = document.getElementById('main-title');
console.log("Kết quả getElementById:", title);

const button = document.querySelector('#myBtn');
console.log("Kết quả querySelector (ID):", button);

const firstDesc = document.querySelector('.description');
console.log("Kết quả querySelector (Class - phần tử đầu tiên):", firstDesc);

const allDescriptions = document.querySelectorAll('.description');
console.log("Kết quả querySelectorAll (Danh sách các class):", allDescriptions);

console.log(`Tìm thấy ${allDescriptions.length} đoạn văn có class 'description'`);