import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const originalPrice =
    product.SuggestedRetailPrice || product.ListPrice || product.FinalPrice;
  const finalPrice = product.FinalPrice || 0;
  const discountAmount = originalPrice - finalPrice;

  let priceHTML = `<p class="product-card__price">$${Number(finalPrice).toFixed(2)}</p>`;
  let badgeHTML = "";

  if (discountAmount > 0 && originalPrice > 0) {
    const discountPercent = Math.round((discountAmount / originalPrice) * 100);

    priceHTML = `
            <div class="price-container">
                <span class="product-card__old-price">$${Number(originalPrice).toFixed(2)}</span>
                <span class="product-card__price">$${Number(finalPrice).toFixed(2)}</span>
            </div>
        `;

    badgeHTML = `<span class="discount-badge">-${discountPercent}%</span>`;
  }

  const imageSrc =
    product.Images && product.Images.PrimaryMedium
      ? product.Images.PrimaryMedium
      : "";

  return `
    <li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <div class="product-card__image-wrapper">
        <img src="${imageSrc}" alt="Image of ${product.Name}">
        ${badgeHTML} 
      </div>
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      ${priceHTML} 
    </a>
    <button class="btn quickview-btn" data-id="${product.Id}">Quick View</button>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement, isSearch = false) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.isSearch = isSearch;
  }

  async init() {
    const productList = await this.dataSource.getData(this.category);
    this.renderList(productList || []);

    const titleElement = document.querySelector(".category-title");
    if (titleElement) {
      if (this.isSearch) {
        titleElement.textContent = `Search Results for: "${this.category}"`;
      } else {
        titleElement.textContent = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
      }
    }
  }

  renderList(list) {
    this.listElement.innerHTML = "";

    if (list.length === 0) {
      this.listElement.innerHTML = `<p class="no-results">No products found matching your request.</p>`;
      return;
    }

    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

// function renderCartContents() {
//     const cartItems = getLocalStorage("so-cart");
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }
