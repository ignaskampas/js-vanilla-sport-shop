const client = contentful.createClient({
    space: "0p8spcjsdi1x",
    accessToken: "L8IFGlI5w7pKn_ALsXcWB7IRbAOY_jG8tZHQyqY-_kE"
})

const getProducts = async (contentfulQuery) => {
    try{
        let contentful = await client.getEntries(contentfulQuery);
        let products = contentful.items;
        products = products.map(item => {
            const {title, price, brand, description, isTrending, category} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title, price, brand, description, isTrending, category, id, image}
        });
        return products;
    } catch(error){
        console.log(error)
    }
}

let Products = {
    render: async (contentfulQuery) => {
        console.log("products: \n" + getProducts(contentfulQuery).then(data => console.log(data)));
    },after_render: async () => {
    }
}

export default Products;