
window.addEventListener('scroll', 
         function(){
          const header = document.querySelector('header');
          if(window.scrollY > 50) {
            header.classList.add('scrolled');
          } else{
            header.classList.remove('scrolled')
          }
         });


const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const formatCurrency = (n, currency = "EUR", locale = "en-EE") =>
  new Intl.NumberFormat(locale, {style: "currency", currency}).format(n);

const makeSwatches = (colors =[]) => colors.map(c => `<button class="swatch" type="button" title="${c}" aria-label=${c}" style="background:$(c)"></button>`).join("");

