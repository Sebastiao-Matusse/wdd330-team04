import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

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
