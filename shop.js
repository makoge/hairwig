
window.addEventListener('scroll', 
         function(){
          const header = document.querySelector('header');
          if(window.scrollY > 50) {
            header.classList.add('scrolled');
          } else{
            header.classList.remove('scrolled')
          }
         });


document.addEventListener("DOMContentLoaded", () =>{
const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (toggleBtn && navLinks){
  toggleBtn.addEventListener("click", () =>{
    navLinks.classList.toggle("open");
  });
}else{
  console.info("[hair] menu-toggle or navLinks not found- skipping toggle");
}

  const submenuToggle = document.querySelector(".submenu-toggle");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (submenuToggle && dropdownContent) {
    submenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownContent.classList.toggle("open");
    });
  }

});

