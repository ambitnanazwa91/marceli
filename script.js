const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const privacyDialog = document.querySelector('#privacy-dialog');

function setHeaderState() {
  header.classList.toggle('scrolled', window.scrollY > 18);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#privacy-open').addEventListener('click', () => privacyDialog.showModal());
privacyDialog.querySelector('.dialog-close').addEventListener('click', () => privacyDialog.close());
privacyDialog.addEventListener('click', (event) => {
  if (event.target === privacyDialog) privacyDialog.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

