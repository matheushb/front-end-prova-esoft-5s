document.addEventListener('DOMContentLoaded', async () => {
  const url = new URL(window.location);
  const filtersToApply = [];

  let baseUrl = 'http://servicodados.ibge.gov.br/api/v3/noticias?';

  const qtd = url.searchParams.get('qtd');

  if (!qtd) {
    url.searchParams.set('qtd', '10');
    window.history.pushState({}, '', url);
    baseUrl = baseUrl.concat('qtd=10&page=1');
  } else {
    baseUrl = baseUrl.concat(`qtd=${qtd}&`);
  }

  console.log(baseUrl);

  //   const data = await fetch(`${baseUrl}`);
});

const filterModal = document.querySelector('main dialog');
const filterButton = document.querySelector('#filter');

filterButton.addEventListener('click', () => {
  console.log(filterModal);
  filterModal.showModal();
});
