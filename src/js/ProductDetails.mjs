import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // get product details from data source
    this.product = await this.dataSource.findProductById(this.productId);

    // render product to the page
    this.renderProductDetails();

    // attach event listener AFTER rendering
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    cartItems.push(this.product);

    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
  if (!this.product) {
    console.error("Product not found:", this.productId);
    return;
  }

  document.querySelector("h3").textContent =
    this.product.Brand?.Name ?? "";

  document.querySelector("h2").textContent =
    this.product.NameWithoutBrand;

  const img = document.getElementById("productImage");
  img.src = this.product.Image;
  img.alt = this.product.NameWithoutBrand;

  document.getElementById("productPrice").textContent =
    `$${this.product.FinalPrice}`;

  document.getElementById("productColor").textContent =
    this.product.Colors?.[0]?.ColorName ?? "";

  document.getElementById("productDesc").innerHTML =
    this.product.DescriptionHtmlSimple;
}
}