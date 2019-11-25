import Storage from '../helpers/Storage.js'

var basket = Storage.getBasket();
const page_container = document.getElementById('page_container');
var nrBasketProducts
var basketProductsContainer
var subtotal
var basketContainer
var basketTransparentBackground
var closeBasketBtn
var clearBasketBtn
var addToBasketBtns

function tempFunc(){
    document.querySelector('.temp').classList.add('newClass')
}

function tempFunc2(){
    document.querySelector('.temp').classList.add('newClass2')
    console.log("executed tempFunc2()")
}

// idet i abudu page_container ir i basketTransparentBackground a new <p> ir paziuret
// ar abudu naujus p elements parodo inside of Elements in dev tools
export function displayBasket(){
    console.log("exe")
    console.log(basketTransparentBackground)
    basketTransparentBackground = document.querySelector('.basket-transparent-background')
    //document.querySelector('.basket-transparent-background').classList.add('visible')
    basketTransparentBackground.classList.add('visible')
    //basketTransparentBackground.style.visibility = 'visible'
    //console.log(basketTransparentBackground.classList)
    basketContainer = document.querySelector('.basket-container')
    basketContainer.classList.add("display-basket")
    page_container.innerHTML += `<p class="temp">hello</p>`
    tempFunc()
}

export function hideBasket(){
    console.log("hideBasket() executed")
    basketTransparentBackground = document.querySelector('.basket-transparent-background')
    basketTransparentBackground.classList.remove("visible")
    basketContainer = document.querySelector('.basket-container')
    basketContainer.classList.remove("display-basket")
    console.log("hideBasket() executed")
}

export function inBasket(id){
    return basket.find(product => product.id === id)
}

export function getBasket(){
    return basket;
}

export function saveBasket(newBasket){
    basket = newBasket
}

export function setSubtotalAndNrItems(){
    let nrItems = 0;
    let priceTotal = 0;
    basket.map(product => {
        nrItems += product.amount
        priceTotal += product.price * product.amount
    })
    subtotal.innerText = parseFloat(priceTotal.toFixed(2))
    nrBasketProducts.innerText = nrItems
}

function setNavbarCartBtnEvLis(){
    const cartBtn = document.getElementById("cart-btn")
    cartBtn.addEventListener('click', () => {
        displayBasket()

    })
}

function getButton(id){
    return addToBasketBtns.find(button => button.dataset.id === id)
}

function clearBasket(){
    console.log("executed")
    let basketProductIds = basket.map(product => product.id)
    basketProductIds.forEach(id => removeProduct(id))
    while(basketProductsContainer.children.length > 0){
        basketProductsContainer.removeChild(basketProductsContainer.children[0])
    }
    hideBasket()
}

function setBasketProductsContainerEvLis(){
    basketProductsContainer.addEventListener('click', event => {
        if(event.target.classList.contains("remove-product-btn")){
            let btn = event.target
            let id = btn.dataset.id;
            basketProductsContainer.removeChild(btn.parentElement.parentElement)
            removeProduct(id)
        } else if(event.target.classList.contains("fa-chevron-up")){
            let btn = event.target 
            let id = btn.dataset.id
            let product = basket.find(product => product.id === id)
            product.amount = product.amount += 1
            Storage.saveBasket(basket)
            setSubtotalAndNrItems()
            btn.nextElementSibling.innerText = product.amount
        } else if(event.target.classList.contains("fa-chevron-down")){
            let btn = event.target
            let id = btn.dataset.id
            let product = basket.find(product => product.id === id)
            product.amount = product.amount - 1
            if(product.amount > 0){
                Storage.saveBasket(basket)
                setSubtotalAndNrItems()
                btn.previousElementSibling.innerText = product.amount
            } else{
                basketProductsContainer.removeChild(btn.parentElement.parentElement)
                removeProduct(id)
            }
        }
    })
}

export async function renderWithoutProducts(){
    let view = `
        <div class="basket-transparent-background">
            <div class="basket-container">
                <span class="close-basket-btn">
                    <i class="fas fa-window-close"></i> 
                </span>
                <h2>Your Shopping Basket</h2>
                <div id="basket-products-container"></div>
                <div class="basket-footer">
                    <h3>Subtotal: £<span id="subtotal">0</span></h3>
                    <button class="clear-basket-btn">Clear Basket</button>
                </div>
            </div>
        </div>
    `
    page_container.innerHTML = view
    addToBasketBtns = [...document.querySelectorAll(".add-to-basket-btn")]
    basketTransparentBackground = document.querySelector('.basket-transparent-background')
    basketContainer = document.querySelector('.basket-container')
    subtotal = document.getElementById('subtotal')
    nrBasketProducts = document.getElementById('nr-basket-products')
    basketProductsContainer = document.getElementById('basket-products-container')
    setSubtotalAndNrItems()
    setNavbarCartBtnEvLis()
    setBasketProductsContainerEvLis()
    closeBasketBtn = document.querySelector('.close-basket-btn')
    closeBasketBtn.addEventListener('click', () => {
        hideBasket()
    })
    clearBasketBtn = document.querySelector('.clear-basket-btn')
    clearBasketBtn.addEventListener('click', () => {
        clearBasket()
    })
    // window.setInterval(function(){
    //     console.log(basketTransparentBackground)
    //     console.log(basketTransparentBackground.classList)
    // }, 5000)
    // setTimeout(function(){
    //     //tempFunc2()
    //     //document.querySelector('.basket-transparent-background').classList.add('visible')
    // }, 10000)
} 

export function renderNewProductInBasket(product){
    const div = document.createElement('div')
    div.classList.add('basket-product')
    div.innerHTML = `
        <img src=${product.image} alt="product" />
        <div>
            <h4>${product.title}</h4>
            <h5>${product.brand}<h5>
            <h5>${product.price}</h5>
            <span class="remove-product-btn" data-id=${product.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${product.id}></i>
            <p class="product-amount">${product.amount}</p>
            <i class="fas fa-chevron-down" data-id=${product.id}></i>
        </div>
    `
    basketProductsContainer.appendChild(div)
}

function removeProduct(id){
    basket = basket.filter(product => product.id !== id)
    this.setSubtotalAndNrItems()
    Storage.saveBasket(basket)
    let button = getButton(id)
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to basket`
}