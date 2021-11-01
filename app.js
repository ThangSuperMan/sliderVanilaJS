
// Query Selectors
const slideContainer = document.querySelector('.container');
const slideList = document.querySelector('.slides');
let slideItems = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');

// Variables
let slideFunctionInterval;
let index = 1;
const intervalTime = 3000;

const firstClone = slideItems[0].cloneNode(true);
const lastClone = slideItems[slideItems.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slideList.appendChild(firstClone);
slideList.prepend(lastClone);

const slideWidth = slideItems[index].clientWidth;

slideList.style.transform = `translateX(${-slideWidth * index}px)`;

// Functions
const getSlideItems = () => document.querySelectorAll('.slide');

function startSlide() {
    getSlideItems();

    slideFunctionInterval = setInterval(() => {
        moveToNextSlide();
    }, intervalTime);

}

function moveToPreviousSlide() {
    slideItems = getSlideItems();
    if (index <= 0) {
        return;
    }
    index--;
    slideList.style.transform = `translateX(${-slideWidth * index}px)`;
    slideList.style.transition = 'all .7s ease-in-out';
}

function moveToNextSlide() {
    console.log(`Index: ${index}`)
    slideItems = getSlideItems();
    console.log(slideItems[length - 1]);
    //   index >= 3
    if (index >= (slideItems.length - 1)) {
        return;
    }
    index++;
    slideList.style.transform = `translateX(${-slideWidth * index}px)`;
    slideList.style.transition = 'all .7s ease-in-out';
}

// Event Listeners
slideContainer.addEventListener('mouseenter', () => {
    // Stop move slide
    clearInterval(slideFunctionInterval);
})

slideContainer.addEventListener('mouseleave', () => {
    // Continue move slide
    startSlide();
})

slideList.addEventListener('transitionend', () => {
    if (slideItems[index].id === firstClone.id) {
        index = 1;
        slideList.style.transition = 'none';
        slideList.style.transform = `translateX(${-slideWidth * index}px)`;
    } 
    
    if (slideItems[index].id  === lastClone.id) {
        index = slideItems.length - 2;
        slideList.style.transition = 'none';
        slideList.style.transform = `translateX(${-slideWidth * index}px)`;
    }
})

// Handle next and prev image slide
nextBtn.addEventListener('click', () => {
    console.log('Next');
    moveToNextSlide();
})

prevBtn.addEventListener('click', () => {
    moveToPreviousSlide();
})

startSlide();
