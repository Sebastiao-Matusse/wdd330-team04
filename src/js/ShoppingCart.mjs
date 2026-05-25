import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderCart(cartItems);
  }

  renderCart(list) {
    if (list.length === 0) {
      this.listElement.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
      return;
    }

    renderListWithTemplate(cartItemTemplate, this.listElement, list);

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
}
