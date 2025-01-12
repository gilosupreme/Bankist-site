'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
