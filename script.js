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

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');
header.before(message);

message.style.backgroundColor = '#37383d';
message.style.overflow = 'hidden';
message.style.height =
  Number.parseFloat(window.getComputedStyle(message).height) + 12 + 'px';

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

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
