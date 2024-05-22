document.addEventListener('DOMContentLoaded', async () => {
  const url = new URL(window.location);
  const filtersToApply = [];

  let baseUrl = 'http://servicodados.ibge.gov.br/api/v3/noticias?';

  const qtd = url.searchParams.get('qtd');

  const params = url.searchParams.values();

  console.log(params);

  if (!qtd) {
    url.searchParams.set('qtd', '10');
    window.history.pushState({}, '', url);
    baseUrl = baseUrl.concat('qtd=10&page=1');
  } else {
    baseUrl = baseUrl.concat(`qtd=${qtd}&`);
  }

  for (const filter of filtersToApply) {
    const key = Object.keys(filter)[0];
    const value = filter[key];
    baseUrl.concat(`${key}=${value}&`);
  }

  console.log(baseUrl);

  //   const data = await fetch(`${baseUrl}`);
});
