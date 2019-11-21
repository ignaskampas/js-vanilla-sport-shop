import Navbar from './Navbar.js'
import Products from './Products.js'

let Mens = {
    render: async (header, page_container) => {
        header.innerHTML = await Navbar.render();
        await Navbar.after_render();
        await Products.render({
            'fields.category' : 'mens',
            'content_type' : 'product'
        }, page_container);
    }, after_render: async () => {
    }
}

export default Mens;