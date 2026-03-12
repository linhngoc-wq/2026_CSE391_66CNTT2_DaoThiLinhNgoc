let currentStep = 1;
const steps = document.querySelectorAll(".step-content");
const circles = document.querySelectorAll(".circle");
const progressLine = document.getElementById("progressLine");

function updateUI() {
    steps.forEach((step, i) => step.classList.toggle("active", i === currentStep - 1));
    circles.forEach((circle, i) => circle.classList.toggle("active", i < currentStep));
    progressLine.style.width = ((currentStep - 1) / (circles.length - 1)) * 100 + "%";
    
    if (currentStep === 3) {
        document.getElementById('summaryBox').innerHTML = `
            <p><strong>Họ tên:</strong> ${document.getElementById('ms_name').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('ms_email').value}</p>
            <p><strong>Ngày sinh:</strong> ${document.getElementById('ms_dob').value}</p>
        `;
    }
}

document.querySelectorAll(".btn-next").forEach(btn => {
    btn.addEventListener("click", () => {
        // Validation đơn giản
        if(currentStep === 1 && !document.getElementById('ms_name').value) return alert("Nhập tên!");
        if(currentStep === 2 && !document.getElementById('ms_email').value) return alert("Nhập Email!");
        
        currentStep++;
        updateUI();
    });
});

document.querySelectorAll(".btn-prev").forEach(btn => {
    btn.addEventListener("click", () => {
        currentStep--;
        updateUI();
    });
});

document.getElementById("multiStepForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Đăng kí thành công!");
});