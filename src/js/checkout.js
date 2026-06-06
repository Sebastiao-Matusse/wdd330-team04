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

    const myForm = e.target;

    const isFormValid = myForm.checkValidity();

    myForm.reportValidity();

    if (!isFormValid) {
      console.log(
        "The form is invalid. Submission was interrupted by the browser.",
      );
      return;
    }

    try {
      const response = await myCheckout.checkoutForm(myForm);

      if (response) {
        console.log("Order successfully placed! Server response:", response);
        localStorage.removeItem("so-cart");
        window.location.href = "./success.html";
      }
    } catch (error) {
      console.error("Critical error when submitting:", error);
    }
  });
