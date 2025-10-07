export const formatCurrency = (n, currency = "EUR", locale = "en-EE") =>
  new Intl.NumberFormat(locale, {style: "currency", currency}).format(n);



export const updateCartCount = ( cartItems=[]) => {
  const count = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const cartLink = document.querySelector('.header-right .bts') || document.querySelector('.bts');
  if (cartLink) cartLink.textContent = `cart(${count})`;
};



export const cart_key = 'confida_cart_v1';

export const loadCart = () => {
   try {return JSON.parse(localStorage.getItem(cart_key)) || [];}
   catch {return [];}
};

export const saveCart = (items) => localStorage.setItem(cart_key, JSON.stringify(items));