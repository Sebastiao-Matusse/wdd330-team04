import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const element = document.querySelector(".prduct-list");

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, element);

productList.init();