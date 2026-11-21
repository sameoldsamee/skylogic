// Mobile menu
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

// Service details dialog
const serviceData = {
  security: {
    title: 'Software Security',
    description: 'Security is a core part of our work. We help clients strengthen their applications through security consulting and software development.',
    items: ['Software security consulting', 'Development and implementation of security features', 'Guidance on secure software architecture']
  },
  development: {
    title: 'Software Development',
    description: 'We develop software around your business requirements, with a focus on backend systems, databases and the infrastructure that supports them.',
    items: ['Custom backend software development', 'Database design and management', 'Software infrastructure management']
  },
  consulting: {
    title: 'Consulting',
    description: 'Discuss your technical challenges with us. We provide practical advice to help you plan your software and make informed technical decisions.',
    items: ['Software architecture consulting', 'Infrastructure planning and guidance', 'Software security advice']
  }
};
const dialog = document.querySelector('#service-dialog');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const data = serviceData[button.dataset.service];
  dialog.querySelector('#service-dialog-title').textContent = data.title;
  dialog.querySelector('#service-description').textContent = data.description;
  dialog.querySelector('#service-list').replaceChildren(...data.items.map(text => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
  dialog.showModal();
}));
dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.querySelector('[data-close-link]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});

// Copy email
const copyStatus = document.querySelector('#copy-status');
document.querySelector('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('ahmedfayez@skylogicsys.com');
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Please select and copy the email address above.';
  }
});

// Footer year
document.querySelector('#year').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
