const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const serviceDialog = document.querySelector('#service-dialog');
const contactDialog = document.querySelector('#contact-dialog');
const serviceData = {
  security: {
    title: 'Software security',
    description: 'Security is a core part of our work. We help clients strengthen their applications through security consulting and software development.',
    items: ['Software security consulting', 'Development and implementation of security features', 'Guidance on secure software architecture']
  },
  development: {
    title: 'Software development',
    description: 'We develop software around your business requirements, with a focus on backend systems, databases and the infrastructure that supports them.',
    items: ['Custom backend software development', 'Database design and management', 'Software infrastructure management']
  },
  consulting: {
    title: 'Consulting',
    description: 'Discuss your technical challenges with us. We provide practical advice to help you plan your software and make informed technical decisions.',
    items: ['Software architecture consulting', 'Infrastructure planning and guidance', 'Software security advice']
  }
};
function openContact(topic) {
  if (serviceDialog.open) serviceDialog.close();
  document.querySelector('#contact-dialog-title').textContent = topic || 'Contact Skylogic';
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-phone').textContent = 'Copy mobile number';
  contactDialog.showModal();
}
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openContact(button.dataset.contact)));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const data = serviceData[button.dataset.service];
  document.querySelector('#service-dialog-title').textContent = data.title;
  document.querySelector('#service-description').textContent = data.description;
  document.querySelector('#service-list').replaceChildren(...data.items.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  serviceDialog.showModal();
}));
document.querySelector('#service-contact').addEventListener('click', () => openContact('Discuss your needs'));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
document.querySelector('#copy-phone').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('+8801713300200');
    document.querySelector('#copy-phone').textContent = 'Copied';
    document.querySelector('#copy-status').textContent = 'Phone number copied to clipboard.';
  } catch {
    document.querySelector('#copy-status').textContent = 'Please select and copy the phone number above.';
  }
});
