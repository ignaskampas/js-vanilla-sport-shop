class Storage {
    static saveBasket(basket){
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    static getBasket(){
        return localStorage.getItem("basket")?JSON.parse(localStorage.getItem("basket")):[];    
    }
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
}

export default Storage;