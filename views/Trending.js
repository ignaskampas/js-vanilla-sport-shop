import Navbar from './Navbar.js'
import Products from './Products.js'

var timer=null;
var slideIndex, bannerImg, slides;
    var imagePaths = ["./images/banner-images/img1.jpeg", 
    "./images/banner-images/img2.jpeg", 
    "./images/banner-images/img3.jpeg"
    ];

function atomaticallyChangeBannerImgs(){
    clearInterval(timer);
    timer = setInterval(function() {moveSlide(1);}, 3000);
}

function initBanner(){
    slideIndex = 0;
    const banner = document.querySelector('#banner');

    for(var i = 0; i < imagePaths.length; i++){
        const bannerImg = document.createElement('img');
        bannerImg.classList.add('banner-img');
        bannerImg.src = imagePaths[i];
        bannerImg.alt = "Banner Image";
        banner.appendChild(bannerImg);
    }

    slides = document.getElementsByClassName("banner-img");
    slides[slideIndex].style.opacity = 1;

    if(slides.length < 2){
        var arrowBtns = document.getElementsByClassName("arrowDiv");
        arrowBtns[0].style.display="none";
        arrowBtns[1].style.display="none";
    }
}

function moveSlide(nrToIncreaseBy){
    var newSlideIndex = slideIndex + nrToIncreaseBy;
    var i, current, next;
    var moveSlideAnimClass={
        forCurrent: "",
        forNext: ""
    }
    if(newSlideIndex > slideIndex){
        if(newSlideIndex >= slides.length){
            newSlideIndex = 0;
        }
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
    } else if(newSlideIndex < slideIndex){
        if(newSlideIndex < 0){
            newSlideIndex = slides.length-1;
        }
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
    }
    
    if(newSlideIndex != slideIndex){
        next = slides[newSlideIndex];
        current = slides[slideIndex];
        for(i = 0; i < slides.length; i++){
            slides[i].className = "banner-img";
            slides[i].style.opacity = 0;
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        slideIndex = newSlideIndex;
    }
    atomaticallyChangeBannerImgs();
}

function initialiseBannersButtons(){
    var leftArrowBtn = document.getElementById("leftArrowDiv");
    var rightArrowBtn = document.getElementById("rightArrowDiv");
    leftArrowBtn.addEventListener('click', () => {
        moveSlide(-1);
    });
    rightArrowBtn.addEventListener('click', () => {
        moveSlide(1);
    });
}

function addBannersFunctionality (){
    initialiseBannersButtons();
    initBanner();
    atomaticallyChangeBannerImgs();
}

const renderSlideShow = async (header) => {
    let view = `
        <div id="banner">
            <div id="banner-height-setter"></div>
            <div class="arrowDiv" id="leftArrowDiv"><span class="arrow" id="leftArrow"></span></div>
            <div class="arrowDiv" id="rightArrowDiv"><span class="arrow" id="rightArrow"></span></div>
        </div>
    `
    header.innerHTML += view
}

let Trending = {
    render: async (header, page_container) => {
        await Navbar.render();
        await Navbar.after_render();
        var header = document.getElementsByTagName("header")[0];
        await renderSlideShow(header);
        addBannersFunctionality();
        await Products.render({
            'fields.isTrending' : 'true',
            'content_type' : 'product'
        }, page_container);
    }, after_render: async () => {
    }
}

export default Trending;