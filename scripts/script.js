let baseUrl = new URL('http://servicodados.ibge.gov.br/api/v3/noticias?');

const filterModal = document.querySelector('main dialog');
const filterButton = document.querySelector('#filter');
const modalCloseButton = document.querySelector('#close-modal');

document.addEventListener('DOMContentLoaded', () => {
  const searchParams = new URLSearchParams(window.location.search);

  if (!searchParams.has('qtd')) {
    baseUrl.searchParams.set(searchParams);
    baseUrl.searchParams.set('qtd', 10);
    setPageUrl(baseUrl);
  }
});

modalCloseButton.addEventListener('click', () => {
  filterModal.close();
});

filterButton.addEventListener('click', () => {
  filterModal.showModal();
});

const filterForm = document.querySelector('main dialog form');

filterForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(filterForm);
  const data = Object.fromEntries(formData.entries());

  for (const key of Object.keys(data)) {
    if (data[key] && data[key] !== 'selecione') {
      baseUrl.searchParams.set(key, data[key]);
    }
  }
  setPageUrl(baseUrl);
});

//search input
const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(searchForm);
  const data = Object.fromEntries(formData.entries());

  baseUrl.searchParams.set('busca', data.busca);
  setPageUrl(baseUrl);
});

const fetchIbgeData = async filters => {};

//pagination input
const paginationButton = document.querySelectorAll('.page');

paginationButton.forEach(button => {
  button.addEventListener('click', () => {
    const page = button.textContent;
    baseUrl.searchParams.set('page', page);
    setPageUrl(baseUrl);
  });
});

const setPageUrl = url => {
  window.history.replaceState({}, '', `?${url.toString().split('?')[1]}`);
  handleUrlChange();
};

const handleUrlChange = async () => {
  console.log('éfadggfsad');
};
