import { formatCurrency } from "./utils.js";

import { updateCartCount} from "./utils.js";

import { loadCart } from "./utils.js";

import { cart_key } from "./utils.js";

import { saveCart } from "./utils.js";

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
      
 document.addEventListener('DOMContentLoaded', () => {
  cartItems = loadCart();
  renderCart();
  updateCartCount(cartItems);
});

