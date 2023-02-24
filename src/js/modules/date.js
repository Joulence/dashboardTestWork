export function thisDate() {
    let thisDate = document.getElementById('thisDate');
    thisDate.textContent = new Date().getFullYear();
}