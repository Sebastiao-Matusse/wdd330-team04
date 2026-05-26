import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();


// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const category = urlParams.get("category") || "tents"; 


// const titleElement = document.querySelector(".category-title");
// if (titleElement) {
//   titleElement.textContent = `Top ${category.charAt(0).toUpperCase() + category.slice(1)}`;
// }

// const listElement = document.querySelector(".product-list");
// const dataSource = new ProductData(category); 
// const productList = new ProductList(category, dataSource, listElement);

// productList.init();
