import { baseUrl, setPageUrl } from './script.js';

const paginationList = document.querySelector('#pagination');

export const updatePaginationList = async ibgeApiResponse => {
  const { page, totalPages } = ibgeApiResponse;

  paginationList.innerHTML = '';

  let min = page - 4 > 0 ? page - 4 : 1;
  const max = min + 9;
  while (min <= max && min <= totalPages) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'page';
    button.textContent = min;
    if (min === page) {
      button.id = 'current-page';
    } else {
      button.addEventListener('click', async () => {
        baseUrl.searchParams.set('page', button.textContent);
        await setPageUrl(baseUrl);
      });
    }
    li.appendChild(button);
    min = min + 1;
    paginationList.appendChild(li);
  }
};
