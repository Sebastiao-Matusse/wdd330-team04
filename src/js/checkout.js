import CheckoutProcess from "../js/CheckoutProcess.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

const checkout =
  new CheckoutProcess("so-cart");

checkout.calculateSubtotal();

document
  .querySelector("#zip")
  .addEventListener("blur", () => {

    checkout.calculateOrderTotal();
  });

document
  .querySelector("#checkout-form")
  .addEventListener("submit",
    async (event) => {

      event.preventDefault();

      await checkout.checkout(event.target);
    });