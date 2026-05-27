import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const searchQuery = getParam("search");
const categoryParam = getParam("category");

const currentQuery = searchQuery || categoryParam;

const listElement = document.querySelector(".product-list");

if (listElement && currentQuery) {
  const dataSource = new ProductData();
  const myList = new ProductList(
    currentQuery,
    dataSource,
    listElement,
    !!searchQuery,
  );
  myList.init();
}
