function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
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

const baseURL =
  "https://wdd330-backend.onrender.com";

export default class ExternalServices {

  async checkout(payload) {

    const url =
      `${baseURL}/checkout`;

    const options = {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify(payload)
    };

    const response =
      await fetch(url, options);

    return response.json();
  }
}