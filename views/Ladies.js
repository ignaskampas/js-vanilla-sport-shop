import Navbar from './Navbar.js'
import Products from './Products.js'

let Ladies = {
    render: async (header, page_container) => {
        await Navbar.render();
        await Products.render({
            'fields.category' : 'ladies',
            'content_type' : 'product'
        }, page_container);
    }
}

export default Ladies;