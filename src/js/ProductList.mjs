import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement, sortInput) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    this.list = [];
    this.sortInput = sortInput;
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);

    this.renderList(this.list);
  }

  renderList(list) {
    this.listElement.innerHTML = ""; // clear current rendered list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortList(list, sortValue) {
    const sorted = [...list];
    switch (sortValue) {
      case "price-asc":
        return sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
      case "price-desc":
        return sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
      case "name-asc":
        return sorted.sort((a, b) =>
          a.NameWithoutBrand.localeCompare(b.NameWithoutBrand),
        );
      case "name-desc":
        return sorted.sort((a, b) =>
          b.NameWithoutBrand.localeCompare(a.NameWithoutBrand),
        );
      default:
        return sorted;
    }
  }

  initSort() {
    if (!this.sortInput) return;
    this.sortInput.addEventListener("change", () => {
      const sorted = this.sortList(this.list, this.sortInput.value);
      this.renderList(sorted);
    });
  }
}
