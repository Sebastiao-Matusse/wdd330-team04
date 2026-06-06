import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1, 
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemSubtotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubtotal();
  }

  calculateItemSubtotal() {
    const subtotalElement = document.querySelector(
      `${this.outputSelector} #checkout-subtotal`,
    );

    this.itemSubtotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice,
      0,
    );

    if (subtotalElement) {
      subtotalElement.textContent = `$${this.itemSubtotal.toFixed(2)}`;
    }
  }

  calculateOrdertotal() {
    const shippingElement = document.querySelector(
      `${this.outputSelector} #checkout-shipping`,
    );
    const taxElement = document.querySelector(
      `${this.outputSelector} #checkout-tax`,
    );
    const totalElement = document.querySelector(
      `${this.outputSelector} #checkout-total`,
    );

    if (this.list.length > 0) {
      this.shipping = 10 + (this.list.length - 1) * 2;
    } else {
      this.shipping = 0;
    }

    this.tax = this.itemSubtotal * 0.06;

    this.orderTotal = this.itemSubtotal + this.shipping + this.tax;

    if (shippingElement)
      shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${this.tax.toFixed(2)}`;
    if (totalElement)
      totalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkoutForm(formElement) {
    const orderPayload = formDataToJSON(formElement);

    orderPayload.orderDate = new Date().toISOString();
    orderPayload.orderTotal = this.orderTotal.toFixed(2);
    orderPayload.tax = this.tax.toFixed(2);
    orderPayload.shipping = this.shipping;
    orderPayload.items = packageItems(this.list);

    console.log("Sending an order object to the server:", orderPayload);

    try {
      const res = await this.services.checkout(orderPayload);
      console.log("Successful server response:", res);
      return res;
    } catch (err) {
      console.error("Server rejected the order or an error occurred:", err);
      throw err;
    }
  }
}
