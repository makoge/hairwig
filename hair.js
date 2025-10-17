import { formatCurrency, 
  updateCartCount, 
  loadCart, 
  cart_key, 
  saveCart, 
  products, 
  makeSwatches } from "./utils.js";


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
  const galleryImages = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  galleryImages.forEach(img => {
    img.addEventListener("click", () =>{
      lightbox.classList.add("show");
      lightboxImg.src=img.src;
      lightboxImg.alt = img.alt || "expanded image";
    });
    
  });
  lightboxClose.addEventListener("click", ()=> lightbox.classList.remove("show"));
  lightbox.addEventListener("click", (e) =>{
    if (e.target === lightbox) lightbox.classList.remove("show");

  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("show");

  });
});
      
 

let cartItems = loadCart();
updateCartCount(cartItems)

document.addEventListener('DOMContentLoaded', () => {
  cartItems = loadCart();
  updateCartCount(cartItems);
const track = document.querySelector('.js-sc-track');
if (!track){
  console.warn('[home] .js-sc-track not found - skipping home product render');
  return;
}

function cardTemplate(product){
  return `<article class="sc-card product-card" data-sku="${product.sku}" > 
       <div class="sc-media cart-media"  aria-label="${product.category}">
        <img src="${product.img}" alt="${product.imgAlt || product.name}" loading="lazy" width="500" height="500" >
         ${product.badge? `<span class="sc-badge badge">${product.badge}</span>`: ""} 
       </div>
        <div class="sc-body cart-body">
          <div class="sc-title title-row"> 
          <h3 class="title">${product.name}</h3>
          <div class="price">${formatCurrency(product.price)}</div>
          </div>
  
          <div class="sc-meta meta">
            <span>Category</span>
            <span>${product.category}</span>
          </div>
          <div class="swatches" aria-label="available colors">
              ${makeSwatches(product.variants)}
          </div>
          <div class="sc-actions cart-actions">
            <a class="btn-product" href="#" data-action="add-to-cart">Add to card</a>
            <a class="btn-product-ghost" href="#" data-action="details">Details</a>
          </div>
        </article>`;
}
const items = products.slice(0, 4);
track.innerHTML = products.map(cardTemplate).join('');

const prevBtn = document.querySelector('.sc-prev');
const nextBtn = document.querySelector('.sc-next');

function cardStep(){
  const first = track.querySelector('.sc-card');
  const gap = parseFloat(getComputedStyle(track).gap) || 16;
  return first ? first.getBoundingClientRect().width + gap : 320;
};

const atStart = () => track.scrollLeft <= 2;
const atEnd = () => (track.scrollLeft + track.clientWidth) >= (track.scrollWidth - 2);
 const updateButtons = () => {
  if (prevBtn) prevBtn.disabled = atStart();
  if (nextBtn) nextBtn.disabled = atEnd();
 };

 const scrollByStep = (dir = 1) => {
  track.scrollBy({ left: cardStepStep()* dir, behavior: 'smooth'});
 };
 prevBtn?.addEventListener('click', () => scrollByStep(-1));
 nextBtn?.addEventListener('resize', updateButtons);
 updateButtons();
});



