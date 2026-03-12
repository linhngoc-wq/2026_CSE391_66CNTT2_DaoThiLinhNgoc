const box = document.querySelector('#myBox'); 

box.addEventListener('click', () => {
    console.log('--- EVENT: CLICK ---');
});

box.addEventListener('mousedown', () => {
    console.log('1. mousedown (Vừa nhấn xuống)');
    box.style.transform = "scale(0.9)";
});

box.addEventListener('mouseup', () => {
    console.log('2. mouseup (Vừa thả ra)');
    box.style.transform = "scale(1)"; 
});

box.addEventListener('mouseenter', () => {
    box.style.backgroundColor = "lightblue";
});

box.addEventListener('mouseleave', () => {
    box.style.backgroundColor = "transparent";
});