export default class ProductDatails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

        // this.category = category;
        // this.path = `../json/${this.category}.json`;
    }

    init() { }

    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product)
        setLocalStorage("so-cart", cartItems);
    }



    renderProductDetails() {
        // generate and populae the HTML to display the product details

    }

    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}
