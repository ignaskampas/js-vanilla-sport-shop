import Storage from '../helpers/Storage.js'
import * as Basket from './Basket.js'

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

function setUpAddToBasketBtns(){
    const buttons = [...document.querySelectorAll(".add-to-basket-btn")];
    buttons.forEach(button => {
        let id = button.dataset.id;
        let inBasket = Basket.inBasket(id);
        if(inBasket){
            button.innerText = "In Basket";
            button.disabled = true;
        }
        button.addEventListener('click', event => {
            event.target.innerText = "In Basket"
            event.target.disabled = true;
            let newBasketProduct = {...Storage.getProduct(id), amount:1}
            let newBasket = [...Basket.getBasket(), newBasketProduct]
            Basket.saveBasket(newBasket)
            Storage.saveBasket(newBasket)
            Basket.setSubtotalAndNrItems()
            Basket.renderNewProductInBasket(newBasketProduct)
            Basket.displayBasket()
        })
    })
}

function displayProducts(products, page_container) {
    let view = `
        <section id="products">
    `
    products.forEach(product => {
        view += `
            <article class="product">
                <div class="product-img-container">
                    <div class="product-img-div-height-setter"></div>
                    <img src=${product.image} class="product-img">
                    <button class="add-to-basket-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to basket
                    </button>
                </div>
                <h3 class="product-info product-title">${product.title}</h3>
                <h4 class="product-info product-brand">${product.brand}</h4>
                <h4 class="product-info product-price">£${product.price}</h4>
            </article>
        `
    })
    view += `</section>`
    page_container.innerHTML += view;
}


let Products = {
    render: async (contentfulQuery, page_container) => {
        await Basket.renderWithoutProducts()
        getProducts(contentfulQuery).then(products => {
            displayProducts(products, page_container)
            Storage.saveProducts(products)
            setUpAddToBasketBtns()
        })
    },
    after_render: async () => {
    }
}

export default Products;