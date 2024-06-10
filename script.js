'use strict';

///////////////////////////////////////
// Modal window

// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });
// const header=document.querySelector(".header");
// const message=document.createElement("div");// createElement is used to create elementd in the html
// message.classList.add("cookie-message"); //will add class 
// message.innerHTML='We Use Cookies To Improve The Functionality And Analytics <button class="btn btn--close-cookie">Got It</button>';
// // header.prepend(message);//message element will get added to header at the top by using prepend
// header.append(message);//message element will get added to header at the last by using prepend
// // header.before(message)//This will add message bofore header element 
// // header.after(message)//This will add message after header element 
// // message.remove()//this will remove the message element from the html
// console.log(message);
// //Styles
// message.style.backgroundColor="#37383d";
// // message.style.width="110%";
// // document.documentElement.style.setProperty("--color-primary","black");
// const logo=document.querySelector(".nav__logo");
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);
// logo.setAttribute("designer","farhan"); // this will set an attribute in the logo element of value farhan
// console.log(logo.getAttribute("designer")); //this will return the value of attribute designer
///////////////////////////////////////////////////////
const btnScrollTo=document.querySelector(".btn--scroll-to");
const section1=document.querySelector("#section--1");
btnScrollTo.addEventListener("click",function(){
  section1.scrollIntoView({behavior:"smooth"});
})
const alertMessage=function(){
  alert("Get Out");
}
// const h1=document.querySelector("h1");
// h1.addEventListener("mouseenter",alertMessage);
// h1.removeEventListener("mouseenter",alertMessage);
// const randomNumber=(min,max)=>{
// return Math.trunc(Math.random()*(max-min+1)+min);
// }
// const randomColor=()=>{
//   return `"rgb(${randomNumber(0,255)},${randomNumber(0,255)},${randomNumber(0,255)})"`;
// }
// document.querySelector(".nav__link").addEventListener("click",function(e){
//  this.style.backgroundColor=randomColor();
// //  console.log(this.style.backgroundColor=)
// })
// document.querySelector(".nav").addEventListener("click",function(e){})
document.querySelector(".nav__links").addEventListener('click',function(e){
  e.preventDefault()
  if(e.target.classList.contains("nav__link")){
    const id=e.target.getAttribute('href');
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior:"smooth"})
  }
})
// element.parentNode and element.parentElement --> will show the div in which the element is present
// element.children --> will show you what the the tags which are prsent in the element
// element.previousElementSibling --> will show you the tag prsent before the given element
// element.nextElementSibling -->Will show you the tag present after the given element
// element.closest(".class") --> this will return the closest parent element of that class
//tabs section
const tabContainer=document.querySelector(".operations__tab-container");
const tabsContent=document.querySelectorAll(".operations__content");
const tabs=document.querySelectorAll(".operations__tab");
tabContainer.addEventListener('click',function(e){
  const clicked=e.target.closest(".operations__tab");
  if(!clicked) return;
  tabs.forEach(t=>{
    t.classList.remove("operations__tab--active")
  })
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach(e=>{
    e.classList.remove("operations__content--active")
  })
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
    // asign data-tab="2" in the html element then use clicked.dataset.tab
  
})
//Sticky NavBar
const nav=document.querySelector(".nav")
const init=section1.getBoundingClientRect()
console.log(init)
window.addEventListener("scroll",function(){
  if(this.window.scrollY>init.top){
    nav.classList.add("sticky");
  }
  else{
    nav.classList.remove("sticky");
  }
})
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//
// Lazy loading images
const targerImg = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

targerImg.forEach(img => imgObserver.observe(img));
//
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();