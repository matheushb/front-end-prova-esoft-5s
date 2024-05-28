import { baseUrl, setPageUrl } from "./script.js";

const filterModal = document.querySelector("main dialog");
const filterButton = document.querySelector("#filter");
const modalCloseButton = document.querySelector("#close-modal");

modalCloseButton.addEventListener("click", () => {
  filterModal.close();
});

filterButton.addEventListener("click", () => {
  filterModal.showModal();
});

const filterForm = document.querySelector("main dialog form");

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(filterForm);
  const data = Object.fromEntries(formData.entries());

  for (const key of Object.keys(data)) {
    if (data[key] && data[key] !== "selecione") {
      baseUrl.searchParams.set(key, data[key]);
    } else {
      baseUrl.searchParams.delete(key);
    }
  }

  filterModal.close();
  setPageUrl(baseUrl);
});

const filterCount = document.querySelector("#filter-count");

const allowedFilters = ["qtd", "tipo", "de", "ate"];

export const changeFilterCounter = () => {
  let count = 0;
  baseUrl.searchParams.keys().forEach((key) => {
    console.log(key);
    if (allowedFilters.includes(key)) {
      count++;
    }
  });
  filterCount.textContent = count;
};
