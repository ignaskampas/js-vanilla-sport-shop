"use strict";

import URLParser from "./services/URLParser.js";
import Trending from "./views/Trending.js"
import Mens from "./views/Mens.js"
import Ladies from "./views/Ladies.js"

const routes = {
    '/' : Trending
    , '/trending' : Trending
    , '/mens' : Mens
    , '/ladies' : Ladies
};

var lastPage;

const router = async () => {
    var header = null || document.getElementsByTagName("header")[0];
    const page_container = null || document.getElementById('page_container');
    let request = URLParser.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') 
        + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    if(lastPage === Trending){
        Trending.stopSlideShow();
    }
    await page.render(header, page_container);
    lastPage = page;
}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);