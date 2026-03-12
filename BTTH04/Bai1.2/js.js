// --- 1. KHỞI TẠO DỮ LIỆU & DOM ELEMENTS ---
let students = []; // Mảng gốc chứa tất cả sinh viên
let sortDirection = 0; // 0: mặc định, 1: tăng dần, -1: giảm dần

// Lấy các phần tử DOM
const fullnameInput = document.getElementById('fullname');
const scoreInput = document.getElementById('score');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const txtSearch = document.getElementById('txtSearch');
const filterRank = document.getElementById('filterRank');
const sortScoreBtn = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');
const totalStudentsSpan = document.getElementById('totalStudents');
const avgScoreSpan = document.getElementById('avgScore');

// --- 2. HÀM TIỆN ÍCH (LOGIC) ---

/**
 * Tính xếp loại dựa trên điểm số.
 * @param {number} score
 * @returns {string} Xếp loại (Giỏi, Khá, Trung bình, Yếu)
 */
function getGrade(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

/**
 * Cập nhật hiển thị tổng số sinh viên và điểm trung bình.
 * @param {Array<Object>} data - Mảng sinh viên hiện tại (đã lọc/sắp xếp).
 */
function updateStats(data) {
    const total = data.length;
    const sumScores = data.reduce((sum, s) => sum + s.score, 0);
    const avg = total > 0 ? (sumScores / total).toFixed(2) : "0.00";
    
    totalStudentsSpan.innerText = total;
    avgScoreSpan.innerText = avg;
}

// --- 3. HÀM CHÍNH XỬ LÝ GIAO DIỆN & LOGIC (FILTER + SORT + RENDER) ---

/**
 * Áp dụng tất cả bộ lọc, sắp xếp và vẽ lại bảng.
 * Đây là hàm trung tâm được gọi mỗi khi có thay đổi dữ liệu hoặc bộ lọc.
 */
const applyFilters = () => {
    const keyword = txtSearch.value.toLowerCase().trim(); // Từ khóa tìm kiếm (chuẩn hóa)
    const rankTarget = filterRank.value; // Xếp loại cần lọc

    // BƯỚC 1: LỌC DỮ LIỆU TỪ MẢNG GỐC
    let filteredStudents = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword); // Kiểm tra tên
        const matchesRank = (rankTarget === "All") || (getGrade(s.score) === rankTarget); // Kiểm tra xếp loại
        return matchesName && matchesRank; // Chỉ trả về khi khớp cả hai điều kiện
    });

    // BƯỚC 2: SẮP XẾP DỮ LIỆU ĐÃ LỌC
    if (sortDirection !== 0) {
        filteredStudents.sort((a, b) => {
            // Sắp xếp tăng dần hoặc giảm dần theo điểm
            return sortDirection === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    // BƯỚC 3: VẼ LẠI BẢNG VÀ CẬP NHẬT THỐNG KÊ
    renderTable(filteredStudents);
    updateStats(filteredStudents);
};

/**
 * Vẽ lại bảng sinh viên dựa trên một mảng dữ liệu.
 * @param {Array<Object>} data - Mảng sinh viên cần hiển thị.
 */
function renderTable(data) {
    tableBody.innerHTML = ""; // Xóa tất cả các hàng hiện có trong bảng

    // Nếu không có dữ liệu, hiển thị thông báo
    if (data.length === 0) {
        const noResultRow = document.createElement('tr');
        noResultRow.innerHTML = `<td colspan="5" style="text-align:center; padding: 20px; color: #6c757d;">Không tìm thấy kết quả phù hợp</td>`;
        tableBody.appendChild(noResultRow);
        return;
    }

    // Duyệt qua từng sinh viên và tạo hàng trong bảng
    data.forEach((student) => {
        const row = document.createElement('tr');
        
        // Thêm class 'low-score' nếu điểm dưới 5 để CSS tự động tô màu
        if (student.score < 5) {
            row.classList.add('low-score');
        }

        // Tìm chỉ mục gốc của sinh viên trong mảng 'students' để đảm bảo xóa đúng
        const originalIndex = students.indexOf(student);

        row.innerHTML = `
            <td>${originalIndex + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${getGrade(student.score)}</td>
            <td><button class="btn-delete" data-index="${originalIndex}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// --- 4. GẮN CÁC SỰ KIỆN (EVENT LISTENERS) ---

// Sự kiện Thêm sinh viên mới
btnAdd.addEventListener('click', () => {
    const name = fullnameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (từ 0 đến 10)!");
        return;
    }

    // Thêm sinh viên vào mảng gốc
    students.push({ name, score });
    
    // Áp dụng bộ lọc và vẽ lại bảng để hiển thị sinh viên mới
    applyFilters();

    // Xóa dữ liệu trên form và focus vào ô tên
    fullnameInput.value = "";
    scoreInput.value = "";
    fullnameInput.focus();
});

// Sự kiện nhấn Enter ở ô điểm để thêm nhanh
scoreInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        btnAdd.click(); // Kích hoạt sự kiện click của nút "Thêm"
    }
});

// Sự kiện Xóa sinh viên (sử dụng Event Delegation trên tbody)
tableBody.addEventListener('click', (e) => {
    // Kiểm tra xem phần tử được click có phải là nút xóa không
    if (e.target.classList.contains('btn-delete')) {
        const indexToDelete = parseInt(e.target.getAttribute('data-index')); // Lấy index gốc

        // Xác nhận trước khi xóa
        if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${students[indexToDelete].name} không?`)) {
            students.splice(indexToDelete, 1); // Xóa khỏi mảng gốc
            applyFilters(); // Cập nhật lại giao diện
        }
    }
});

// Sự kiện tìm kiếm realtime khi người dùng gõ vào ô tìm kiếm
txtSearch.addEventListener('input', applyFilters);

// Sự kiện lọc theo xếp loại khi người dùng thay đổi lựa chọn
filterRank.addEventListener('change', applyFilters);

// Sự kiện sắp xếp khi click vào tiêu đề cột "Điểm"
sortScoreBtn.addEventListener('click', () => {
    // Chuyển đổi trạng thái sắp xếp: Mặc định -> Tăng dần -> Giảm dần
    if (sortDirection === 0 || sortDirection === -1) {
        sortDirection = 1; // Đổi sang tăng dần
        sortIcon.textContent = "▲"; // Cập nhật icon
    } else {
        sortDirection = -1; // Đổi sang giảm dần
        sortIcon.textContent = "▼"; // Cập nhật icon
    }
    applyFilters(); // Áp dụng sắp xếp và cập nhật bảng
});

// Gọi hàm applyFilters lần đầu để hiển thị bảng rỗng hoặc dữ liệu ban đầu
applyFilters();