const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(orderPayload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    };

    const response = await fetch(`${baseURL}checkout`, options);
    return await convertToJson(response);
  }

  async searchAllProducts(query) {
    const categories = ["tents", "backpacks", "hammocks", "sleeping-bags"];

    try {
      const promises = categories.map((category) => this.getData(category));
      const allResults = await Promise.all(promises);
      const allProducts = allResults.flat();
      const cleanQuery = query.toLowerCase().trim();

      return allProducts.filter((product) => {
        const nameMatch = product.Name
          ? product.Name.toLowerCase().includes(cleanQuery)
          : false;

        const brandMatch =
          product.Brand && product.Brand.Name
            ? product.Brand.Name.toLowerCase().includes(cleanQuery)
            : false;

        const descMatch = product.DescriptionHtmlSimple
          ? product.DescriptionHtmlSimple.toLowerCase().includes(cleanQuery)
          : false;

        const categoryMatch = product.Category
          ? product.Category.toLowerCase().includes(cleanQuery)
          : false;

        return nameMatch || brandMatch || descMatch || categoryMatch;
      });
    } catch (error) {
      console.error("Error searching all files:", error);
      return [];
    }
  }
}
