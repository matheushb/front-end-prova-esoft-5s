import { baseUrl, setPageUrl } from './script.js';

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(searchForm);
  const data = Object.fromEntries(formData.entries());

  if (!Object.values(data)[0]) {
    baseUrl.searchParams.delete('busca');
  } else {
    baseUrl.searchParams.set('busca', data.busca);
  }
  setPageUrl(baseUrl);
});
