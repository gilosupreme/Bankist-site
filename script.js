'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLinks = document.querySelector('.nav__links');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');

// window.addEventListener('load', () => {
//   document.documentElement.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: 'smooth',
//   });
// });

const openModal = function (e) {
  e.preventDefault(); //prevents hrefs with value '#' from taking us to top of the page
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnModal =>
  btnModal.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
// Cookie message section
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');
header.prepend(message);

message.style.backgroundColor = '#37383d';
message.style.overflow = 'hidden';
message.style.width = '100vw';
message.style.height =
  Number.parseFloat(window.getComputedStyle(message).height) + 12 + 'px';

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());
///////////////////////////////////////
// Smooth scroll
document.querySelector('.btn--scroll-to').addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementById('section--1').offsetTop,
    behavior: 'smooth',
  });
});

navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document
      .querySelector(id)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
///////////////////////////////////////
// Tabbed component
tabsContainer.addEventListener('click', e => {
  const clickedBtn = e.target.closest('.operations__tab');
  //remove active class from all btns first
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  if (!clickedBtn) return;

  clickedBtn.classList.add('operations__tab--active');
  //remove active class on all tab content containers
  tabContent.forEach(tc => tc.classList.remove('operations__content--active'));

  const activeContentNum = clickedBtn.dataset.tab;
  const activeContent = document.querySelector(
    `.operations__content--${activeContentNum}`
  );

  activeContent.classList.add('operations__content--active');
});
///////////////////////////////////////
// Nav Hover
const handleHover = function (e) {
  const hovered = e.target;

  if (e.target.classList.contains('nav__link')) {
    const navSiblings = document.querySelectorAll('.nav__link');

    navSiblings.forEach(link => {
      if (link != hovered) {
        link.style.opacity = this;
        document.querySelector('.nav__logo').style.opacity = this;
      }
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
///////////////////////////////////////
// Sticky Navbar using Scroll Event - not recommended
/////////////////////////////////////

// window.addEventListener('scroll', e => {
//   const stickyPos = document.getElementById('section--1').offsetTop;

//   if (window.scrollY > stickyPos) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
//ANOTHER WAY OF DOING IT USING BOUNDINGCLIENTRECT()
// const stickyPos = document
//   .getElementById('section--1')
//   .getBoundingClientRect().y;

// if (stickyPos <= 0) {
//   nav.classList.add('sticky');
// } else {
//   nav.classList.remove('sticky');
// }
// });

///////////////////////////////////////
// Sticky Navbar using IntersectionObserver API
/////////////////////////////////////
const sticky = entries => {
  const [entry] = entries; //destructure the array to get one entry

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navHeight = window.getComputedStyle(nav).height;

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}`,
};

const navObserver = new IntersectionObserver(sticky, options);

navObserver.observe(header);

///////////////////////////////////////
// Reveal elements on scroll using IntersectionObserver API
/////////////////////////////////////
const showSections = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionOptions = {
  root: null,
  threshold: 0.25,
};

const sectObserver = new IntersectionObserver(showSections, sectionOptions);

allSections.forEach(section => {
  // section.classList.add('section--hidden');
  sectObserver.observe(section);
});

///////////////////////////////////////
// Lazy Loading images IntersectionObserver API
/////////////////////////////////////

const lazyLoad = (entries, imgObserver) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  imgObserver.unobserve(entry.target);
};

const lazyOptions = {
  root: null,
  threshold: 0.1,
};

const lazyObserver = new IntersectionObserver(lazyLoad, lazyOptions);

const lazyImgs = document.querySelectorAll('img[data-src]');

lazyImgs.forEach(img => {
  lazyObserver.observe(img);
});

const slides = document.querySelectorAll('.slide');
const slideLen = slides.length - 1;
const next = document.querySelector('.slider__btn--right');
const prev = document.querySelector('.slider__btn--left');
const dotCont = document.querySelector('.dots');

let currSlide = 0;

const createDots = () => {
  slides.forEach((_, i) => {
    dotCont.insertAdjacentHTML(
      'beforeend',
      `<button class ="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const goToSlide = slide => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  });
};

goToSlide(0);

const nextSlide = () => {
  if (currSlide === slideLen) {
    currSlide = 0;
  } else {
    currSlide++;
  }

  goToSlide(currSlide);
};

const prevSlide = () => {
  if (currSlide === 0) {
    currSlide = slideLen;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
};

next.addEventListener('click', nextSlide);

prev.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();

  e.key === 'ArrowLeft' && prevSlide();
});

dotCont.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const targetSlide = e.target.dataset.slide;
    goToSlide(targetSlide);
  }
});
