import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
  <span class="removeFromCart" data-index="${index}">❌</span>
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;

    this.listElement.addEventListener("click", this.handleListClick.bind(this));
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderCart(cartItems);
  }

  renderCart(list) {
    this.listElement.innerHTML = "";

    if (list.length === 0) {
      this.listElement.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
      const footerElement = document.querySelector(".cart-footer");
      if (footerElement) footerElement.classList.add("hide");
      return;
    }

   const htmlStrings = list.map((item, index) => cartItemTemplate(item, index));
   this.listElement.innerHTML = htmlStrings.join("");

    this.calculateTotal(list);

    }

  calculateTotal(list) {
    const totalElement = document.querySelector(".cart-total");
    const footerElement = document.querySelector(".cart-footer");

    if (list.length > 0 && totalElement && footerElement) {
      const total = list.reduce((sum, item) => sum + item.FinalPrice, 0);
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
      footerElement.classList.remove("hide");
    }
  }

  handleListClick(e) {
    
    if (e.target.classList.contains("removeFromCart")) {
          const itemIndex = parseInt(e.target.dataset.index, 10);
          this.removeItem(itemIndex);
    }
  }

  removeItem(itemIndex) {
    let cartItems = getLocalStorage(this.key) || [];

    if (!Array.isArray(cartItems)) {
      cartItems = [cartItems];
    }
    const flatCartItems = cartItems.flat();

    if (itemIndex >= 0 && itemIndex < flatCartItems.length) {
      flatCartItems.splice(itemIndex, 1); 
    }
    setLocalStorage(this.key, flatCartItems);

    this.renderCart(flatCartItems);
  }
}