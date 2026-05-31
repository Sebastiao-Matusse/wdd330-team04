import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {

  constructor(key) {
    this.key = key;
    this.list = getLocalStorage(key);
    this.externalServices = new ExternalServices();
  }

  calculateSubtotal() {

    const subtotal = this.list.reduce((sum, item) => {
      return sum + item.FinalPrice;
    }, 0);

    document.querySelector("#subtotal").textContent =
      subtotal.toFixed(2);

    return subtotal;
  }

  calculateOrderTotal() {

    const subtotal = this.calculateSubtotal();

    const itemCount = this.list.length;

    const shipping =
      10 + (itemCount - 1) * 2;

    const tax = subtotal * 0.06;

    const total =
      subtotal + shipping + tax;

    document.querySelector("#shipping").textContent =
      shipping.toFixed(2);

    document.querySelector("#tax").textContent =
      tax.toFixed(2);

    document.querySelector("#orderTotal").textContent =
      total.toFixed(2);

    return {
      shipping,
      tax,
      total
    };
  }

  packageItems(items) {

    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    }));
  }

  async checkout(form) {

    const formData =
      new FormData(form);

    const data =
      Object.fromEntries(formData.entries());

    const totals =
      this.calculateOrderTotal();

    data.orderDate = new Date();

    data.items =
      this.packageItems(this.list);

    data.orderTotal =
      totals.total.toFixed(2);

    data.shipping =
      totals.shipping;

    data.tax =
      totals.tax.toFixed(2);

    const result =
      await this.externalServices.checkout(data);

    console.log(result);
  }
}