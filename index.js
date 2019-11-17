var slideIndex, bannerImg, slides;
var timer=null;
var imagePaths = ["./images/banner-images/img1.jpeg", 
"./images/banner-images/img2.jpeg", 
"./images/banner-images/img3.jpeg", 
//"./images/banner-images/img4.jpeg"];
];
var leftArrowBtn = document.getElementById("leftArrowDiv");
var rightArrowBtn = document.getElementById("rightArrowDiv");
leftArrowBtn.addEventListener('click', () => {
    moveSlide(-1);
});
rightArrowBtn.addEventListener('click', () => {
    moveSlide(1);
});
function atomaticallyChangeBannerImgs(){
    clearInterval(timer);
    timer = setInterval(function() {moveSlide(1);}, 3000);
}
atomaticallyChangeBannerImgs();

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
initBanner();

function moveSlide(nrToIncreaseBy){
    newSlideIndex = slideIndex + nrToIncreaseBy;
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