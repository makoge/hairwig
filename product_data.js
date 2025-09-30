const products =[
  {
    sku:"HW01",
    name:"straight human hair",
    price:186,
    length:"16",
    category:"human hair",
    style:"straight",
    img:"/img/straight-human-hair.jpeg",
    imgAlt:"human hair wigs",
    badge:"New",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/straight-human-hair.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]
  },
  {
    sku:"HW02",
    name:"16 inch wavy human hair",
    price:186,
    length:"16",
    category:"human hair",
    style:"wavy",
    img:"/img/wavy-human-hair.jpeg",
    imgAlt:"wavy human hair",
    badge:"New",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/wavy-human-hair.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]
    },

  {
    sku:"HW03",
    name:"wavy human hair",
    price:186,
    length:"13",
    category:"human hair",
    style:"wavy",
    img:"/img/wavy-hair.jpeg",
    imgAlt:"women wigs",
    badge:"Trending",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/wavy-hair.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]

  },
  {
    sku:"HW04",
    name:"deep wave human hair",
    price:186,
    length:"16",
    category:"human hair",
    style:"straight",
    img:"/img/deep-wave.jpeg",
    imgAlt:"women wigs",
    badge:"New",
    variants: [{color:"#1a1a1a", label: "Natural black",img:"/img/deep-wave.jpeg"},
     {color:"#4b2e1f", label:"Chocolate brown", img:"/img/hair_logo.png"}, {color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"}   ]

  },
  {
    sku:"HW05",
    name:"red straight wig",
    price:120,
    length:"13",
    category:"human hair",
    style:"straight",
    img:"/img/red-straight.jpeg",
    imgAlt:"straight human hair",
    badge:"Hot",
    variants:[{
      color:"#1a1a1a", label:"Natural black", img:"/img/black_straight.jpeg"
      },{
    color:"#4b2e1f", label:"Chocolate brown", img:"/img/red-straight.jpeg"
    },{
    color:"#d1b38b", label:"Honey blonde", img:"/img/honey_blonde_straight.jpeg"
  }]
  },
  {
    sku:"HW05",
    name:"red straight wig",
    price:120,
    length:"13",
    category:"human hair",
    style:"straight",
    img:"/img/straight_hair_wig.jpeg",
    imgAlt:"straight human hair",
    badge:"New",
    variants:[{
      color:"#1a1a1a", label:"Natural black", img:"/img/straight_hair_wig.jpeg"
      },{
    color:"#571e0fff", label:"Chocolate brown", img:"/img/hair_wig_red.jpeg"
    },{
    color:"#d1b38b", label:"Honey blonde", img:"/img/hair_logo.png"
  }]
  }
]



const formatCurrency = (n, currency = "EUR", locale = "en-EE") =>
  new Intl.NumberFormat(locale, {style: "currency", currency}).format(n);

const makeSwatches = (variants = []) => variants.map(v =>
  `<button class="swatch" type="button" title="${v.label}"
  aria-label="${v.label}" style="background:${v.color}" data-img="${v.img}"></button>`
).join("");

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<article class="product-card" data-sku="${product.sku}" data-length="${product.length}" data-style="body wave" data-cap="lace front"> 
     <div class="cart-media"  aria-label="human hair">
      <img src="${product.img}" alt="women-wigs" loading="lazy" width="800" height="900" >
       ${product.badge? `<span class="badge">${product.badge}</span>`: ""} 
     </div>
      <div class="cart-body">
        <div class="title-row"> 
        <h3 class="title">${product.name}</h3>
        <div class="price">${formatCurrency(product.price)}</div>
        </div>

        <div class="meta">
          <span>16&quot; . Category</span>
          <span class="dot-sep"></span>
          <span>${product.category}</span>
        </div>
        <div class="swatches" aria-label="available colors">
            ${makeSwatches(product.variants)}
        </div>
        <div class="cart-actions">
          <a class="btn-product" href="#" data-action="add-to-cart">Add to card</a>
          <a class="btn-product-ghost" href="#" data-action="Details">Details</a>
        </div>
      </article>`
      
})
document.querySelector('.js-product-grid').innerHTML = productsHTML

document.addEventListener("click", (e) => {
  const swatch = e.target.closest(".swatch");
  if (!swatch) return;

  const card = swatch.closest(".product-card");
  const imgEl = card.querySelector(".cart-media img");
  const newSrc = swatch.dataset.img;
  const colorLabel = swatch.getAttribute("title") || "variant";

  if (newSrc && imgEl) {
    const preload = new Image();
    preload.onload = () => {imgEl.src = newSrc;};
    preload.src = newSrc;
    const title = card.querySelector(".title")?.textContent?.trim() || "product";imgEl.alt = `${title} - ${colorLabel}`;
  }

  const group = swatch.parentElement;
  group.querySelectorAll(".swatch").forEach(b => {
    b.classList.remove("selected");
    b.setAttribute("aria-pressed", "false");
  });
  swatch.classList.add("selected");
  swatch.setAttribute("aria-pressed", "true");
});

//add to cart code

const cart_key = 'confida_cart_v1';
const loadCart = () => {
   try {return JSON.parse(localStorage.getItem(cart_key)) || [];}
   catch {return [];}
};
const saveCart = (items) => localStorage.setItem(cart_key, JSON.stringify(items));

let cartItems = loadCart();

const updateCartCount = () => {
  const count = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartLink = document.querySelector('.header-right .bts');
  if (cartLink) cartLink.textContent = `cart(${count})`;
};

updateCartCount();

const ensureViewCartLink = (actionsEl) => {
  let view = actionsEl.querySelector('[data-action="view-cart"]');
  if(!view){
    view = document.createElement('a');
    view.className = 'btn-product-ghost';
    view.setAttribute('data-action', 'view-cart');
    view.href = 'cart.html';
    view.textContent = 'view cart';
    actionsEl.appendChild(view);
  } else{
    view.textContent = 'view cart';
    view.href = 'cart.html';
  }
};

const addToCart = (cardEl) => {
  const sku = cardEl.dataset.sku;
  const name = cardEl.querySelector('.title')?.textContent?.trim() || 'Product';
  const priceText = cardEl.querySelector('.price')?.textContent?.trim() || '';
  const img = cardEl.querySelector('.cart-media img')?.getAttribute('src') || '';
  const selectedSwatch = cardEl.querySelector('.swatch.selected');
  const variant = selectedSwatch?.getAttribute('title') || null;

  const existing = cartItems.find(i => i.sku === sku && i.variant === variant);
  if (existing){
    existing.qty = (existing.qty || 1) + 1;
  }else{
    cartItems.push({sku, name, price: priceText, img, variant, qty: 1});
  }
  saveCart(cartItems);
  updateCartCount();

  const addBtn = cardEl.querySelector('[data-action="add-to-cart"]');
  const actionsEl = cardEl.querySelector('.cart-actions');

  if (addBtn) {
    addBtn.textContent = 'Added to cart';
    addBtn.classList.add('added');
    addBtn.setAttribute('aria-disabled', 'true');
    addBtn.setAttribute('tabindex', '-1');
    addBtn.href = '#';

    addBtn.addEventListener('click', (e) => e.preventDefault(), { once: true});
  }
  if (actionsEl) ensureViewCartLink(actionsEl);
};

document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-action="add-to-cart"]');
  if (addBtn) {
    e.preventDefault();
    const card = addBtn.closest('.product-card');
    if (card) addToCart(card);
    return;
  }
  const viewBtn = e.target.closest('[data-action="view-cart"]');
  if (viewBtn){

  }
});