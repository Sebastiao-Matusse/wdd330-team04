import getLocalStorage from "./utils.mjs"

export default class ProductDatails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

        // this.category = category;
        // this.path = `../json/${this.category}.json`;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.product);

        // the product details are needed before rendering the HTML
        this.renderProductDetails();

        // once the HTML is rendered, add a listener to the Add to Cart button
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));

        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.



    }

    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product)
        setLocalStorage("so-cart", cartItems);
    }



    renderProductDetails() {
        // generate and populae the HTML to display the product details
        const tenplate = document.querySelector("product-card")
        const productList = document.querySelector("product-list")

        products.forEach(product => {
            const clone = template.content.cloneNode(true);
            const [title, productName, img, price, color, description, addToCartBtn] = clone.querySelectorAll("h3, h2, img, p, p, p, button")

            title.textcontent = this.product.Brand.Name;
            productName.textcontent = this.product.NameWithoutBrand
            img.src = this.product.Image
            img.alt = this.product.NameWithoutBrand
            price.textcontent = this.product.FinalPrice
            color.textcontent = this.product.Colors.ColorName
            description.textcontent = this.product.DescriptionHtmlSimple
            addToCartBtn.dataset = this.productId

            productList.appendChild(clone);
        });


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
