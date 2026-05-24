import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";


function cartProductCardTemplate(product) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${product.Image}" alt="Image of ${product.Name}">
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${product.quantity}</p>
  <p class="cart-card__price">${product.FinalPrice}</p>
</li>`

}


export default class CartProductList {
    constructor(listElement) {

        this.listElement = listElement;
    }

    init() {
        const cartlist = this.getCartData()
        this.renderCartContents(cartlist)
        // console.log(productList)

    }


    getCartData() {
        const cartItems = getLocalStorage("so-cart") || [];
        return cartItems;

    }

    groupCartItems(cartItems) {
        const grouped = [];

        cartItems.forEach(item => {
            const found = grouped.find(i => i.Id === item.Id);

            if (found) {
                found.quantity++;
            } else {
                grouped.push({ ...item, quantity: 1 });
            }
        });

        return grouped;
    }


    renderCartContents(cartItems) {
        const groupCartItems = this.groupCartItems(cartItems);

        renderListWithTemplate(cartProductCardTemplate, this.listElement, groupCartItems);
    }
}


