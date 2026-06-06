import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const services = new ExternalServices();
const modal = document.getElementById("quickview-modal");
const modalContent = document.getElementById("modal-product-details");

function renderModalContent(product) {
  return `
    <div class="modal-product-layout">
      <div>
        <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
      </div>
      <div>
        <h3>${product.Brand.Name}</h3>
        <h2>${product.NameWithoutBrand}</h2>
        <p class="product-card__price" style="font-size: 1.3rem; font-weight: bold; color: #30336b;">$${product.FinalPrice.toFixed(2)}</p>
        <p><strong>Color:</strong> ${product.Colors[0].ColorName}</p>
        <div style="margin-top: 15px; font-size: 0.95rem; color: #555;">
          ${product.DescriptionHtmlSimple}
        </div>
        <a href="../product_pages/index.html?product=${product.Id}" class="btn" style="margin-top: 20px; display: inline-block;">View Full Details</a>
      </div>
    </div>
  `;
}

const searchQuery = getParam("search");
const categoryParam = getParam("category");

const currentQuery = searchQuery || categoryParam;

const listElement = document.querySelector(".product-list");

if (listElement && currentQuery) {
  const dataSource = new ExternalServices();
  const myList = new ProductList(
    currentQuery,
    dataSource,
    listElement,
    !!searchQuery,
  );
  myList.init();
}

if (listElement) {
  listElement.addEventListener("click", async (e) => {
    if (e.target.classList.contains("quickview-btn")) {
      const productId = e.target.dataset.id;

      try {
        const product = await services.findProductById(productId);
        modalContent.innerHTML = renderModalContent(product);
        modal.classList.remove("hide");
      } catch (error) {
        console.error("Error loading quick view data:", error);
      }
    }
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-modal") || e.target === modal) {
      modal.classList.add("hide");
      modalContent.innerHTML = "";
    }
  });
}
