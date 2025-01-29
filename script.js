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
  section.classList.add('section--hidden');
  sectObserver.observe(section);
});
