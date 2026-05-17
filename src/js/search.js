import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const products = await dataSource.getData();

  const filteredProducts = products.filter((item) =>
    item.Name.toLowerCase().includes(query)
  );

  const productList = document.querySelector(".product-list");

  productList.innerHTML = filteredProducts
    .map(
      (item) => `
      <li class="product-card">
        <a href="product_pages/?product=${item.Id}">
          <img src="${item.Image}" alt="${item.NameWithoutBrand}" />
          <h3 class="card__brand">${item.Brand.Name}</h3>
          <h2 class="card__name">${item.NameWithoutBrand}</h2>
          <p class="product-card__price">$${item.FinalPrice}</p>
        </a>
      </li>
    `
    )
    .join("");
});