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

function displayProducts (products, page_container) {
    let view = `
        <section id="products">
    `
    products.forEach(product => {
        view += `
            <article class="product">
                <div class="product-img-container">
                    <img src=${product.image}
                    class="product-img">
                    <button class="add-to-basket-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to basket
                    </button>
                </div>
                <h4>${product.brand}</h4>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
        `
    })
    view += `</section>`
    page_container.innerHTML = view;
}


let Products = {
    render: async (contentfulQuery, page_container) => {
        //console.log("products: \n" + getProducts(contentfulQuery).then(data => console.log(data)));
        getProducts(contentfulQuery).then(products => {
            displayProducts(products, page_container)
        }).then(() => {
            // set up Add to basket buttons. Or do this in displayProducts
        })
    },
    after_render: async () => {
    }
}

export default Products;