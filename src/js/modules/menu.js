export function onclick() {
    let hamMenu = document.getElementById("hamMenu");
    let navMenu = document.getElementById("nav")
    hamMenu.addEventListener("click", btnPressed);
    hamMenu.addEventListener("click", showMenu);

    function btnPressed() {
        let isHavMenu = (hamMenu.classList.length > 1) ?
        hamMenu.classList.remove("is-open") :
        hamMenu.classList.add("is-open");
        return isHavMenu;
      }

      function showMenu() {
        let x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
          navMenu.style.background = "";
        } else {
          x.style.display = "block";
          navMenu.style.background = "#fff";
        }
      }
}