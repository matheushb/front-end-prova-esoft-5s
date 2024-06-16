import { differenceInExtense } from "./date-utils.js";
import { changeFilterCounter } from "./filter-form.js";
import { updatePaginationList } from "./pagination-form.js";

export let baseUrl = new URL(
  "https://servicodados.ibge.gov.br/api/v3/noticias?"
);

document.addEventListener("DOMContentLoaded", async () => {
  const searchParams = new URLSearchParams(window.location.search);

  setParams(searchParams);
  if (!searchParams.get("qtd")) {
    baseUrl.searchParams.set("qtd", 10);
    return await setPageUrl(baseUrl);
  }

  changeFilterCounter();
  if (searchParams.has("busca")) {
    updateInputValue(searchParams.get("busca"));
  }

  await updateNewsList();
});

const setParams = (searchParams) => {
  searchParams
    .toString()
    .split("&")
    .forEach((param) => {
      const [key, value] = param.split("=");
      if (!key || !value) return;
      baseUrl.searchParams.set(key, value);
    });
};

export const setPageUrl = async (url) => {
  changeFilterCounter();
  window.history.replaceState({}, "", `?${url.toString().split("?")[1]}`);
  await updateNewsList();
};

const fetchNewsData = async () => {
  return await fetch(baseUrl.toString()).then((res) => res.json());
};

const updateNewsList = async () => {
  const newsList = await fetchNewsData();
  if (newsList.items.length === 0) return alert("Nenhuma notícia encontrada");
  await updatePaginationList(newsList);
  const ul = document.querySelector("main ul");
  ul.innerHTML = "";

  for (const news of newsList.items) {
    const li = document.createElement("li");
    li.innerHTML = `
    <img
      id="noticia-img"
      src="https://agenciadenoticias.ibge.gov.br/${
        JSON.parse(news.imagens).image_intro
      }"
      alt="imagem-noticia"
    />
    <h2 id="noticia-title">
      ${news.titulo}
    </h2>
    <p id="noticia-paragraph">
    ${news.introducao}
    </p>
    <div id="omega">
      <p id="noticia-tags">#${news.editorias.split(";").join(" #")}</p>
      <p id="noticia-date">Publicado ${differenceInExtense(
        news.data_publicacao
      )}</p>
    </div>
    <a id="noticia-anchor" href="${news.link}" target="_blank">Leia mais</a>
  `;

    ul.appendChild(li);
    ul.appendChild(document.createElement("hr"));
  }
};

const updateInputValue = (busca) => {
  const input = document.querySelector("#search-bar");
  console.log(input);
  input.value = busca;
};
