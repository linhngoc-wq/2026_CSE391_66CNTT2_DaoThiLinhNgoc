// 1. Khởi tạo mảng lưu trữ
let students = [];

const fullnameInput = document.getElementById('fullname');
const scoreInput = document.getElementById('score');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');

// 2. Hàm tính xếp loại
function getGrade(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 3. Hàm cập nhật thống kê
function updateStats() {
    const total = students.length;
    const avg = total > 0 
        ? (students.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2) 
        : "0.00";
    
    document.getElementById('totalStudents').innerText = total;
    document.getElementById('avgScore').innerText = avg;
}

// 4. Hàm Render (vẽ) lại bảng
function renderTable() {
    tableBody.innerHTML = ""; // Xóa bảng cũ

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        // Yêu cầu: Điểm < 5 tô màu vàng
        if (student.score < 5) {
            row.classList.add('low-score');
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.grade}</td>
            <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    updateStats();
}

// 5. Xử lý sự kiện Thêm
function addStudent() {
    const name = fullnameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // Kiểm tra hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    // Thêm vào mảng
    students.push({
        name: name,
        score: score,
        grade: getGrade(score)
    });

    renderTable();

    // Reset form và focus
    fullnameInput.value = "";
    scoreInput.value = "";
    fullnameInput.focus();
}

btnAdd.addEventListener('click', addStudent);

// 6. Xử lý phím Enter tại ô Điểm
scoreInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") addStudent();
});

// 7. Event Delegation cho nút Xóa
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1); // Xóa khỏi mảng
        renderTable(); // Vẽ lại
    }
});

