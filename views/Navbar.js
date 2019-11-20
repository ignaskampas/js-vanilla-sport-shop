let Navbar = {
    render: async () => {
        let view =`
            <nav id="main-navbar">
            <a id="logo" href="#home">Sport Zone</a>
            <div id="cart-btn-container">
                <div id="cart-btn">
                    <span id="cart-icon">
                        <i class="fas fa-cart-plus"></i>
                    </span>
                    <div id="nr-cart-items">0</div>
                </div>
            </div>
            </nav>
            <nav id="sub-navbar">
                <ul>
                    <li><a>Trending</a></li>
                    <li><a>Mens</a></li>
                    <li><a>Ladies</a></li>
                </ul>
            </nav>
        `
        return view
    },
    after_render: async () => {}
}

export default Navbar;