"use strict";

import URLParser from "./services/URLParser.js";
import Trending from "./views/Trending.js"
import Mens from "./views/Mens.js"

const routes = {
    '/' : Trending
    , '/trending' : Trending
    , '/mens' : Mens
    // , '/ladies' : Ladies
    // , '/p/:id' : PostShow
};


const router = async () => {

    const header = null || document.getElementsByTagName("header")[0];
    const page_container = null || document.getElementById('page_container');

    let request = URLParser.parseRequestURL();

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    await page.render(header, page_container);
    await page.after_render();

}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);