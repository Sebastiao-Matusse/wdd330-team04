import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".order-summary");
myCheckout.init();

document.getElementById("zip").addEventListener("blur", () => {
  myCheckout.calculateOrdertotal();
});

document
  .getElementById("checkout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await myCheckout.checkoutForm(e.target);

      console.log(
        "The task is completed! The answer has been received.:",
        response,
      );
    } catch (error) {
      console.error("Error processing order in form:", error);
    }
  });
