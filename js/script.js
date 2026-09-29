/* =====================================================
   MENU MOBILE
===================================================== */

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


/* Fecha o menu depois de clicar em uma opção */

const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach((link) => {

    link.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

});


/* =====================================================
   DOCUMENTAÇÕES
===================================================== */

const documents = document.querySelectorAll(".document-card");
const totalDocumentos = document.getElementById("totalDocumentos");

totalDocumentos.textContent = documents.length
    .toString()
    .padStart(2, "0");


/* =====================================================
   FILTROS
===================================================== */

const filters = document.querySelectorAll(".filter");

let currentFilter = "todos";

filters.forEach((filter) => {

    filter.addEventListener("click", () => {

        filters.forEach((button) => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        currentFilter = filter.dataset.filter;

        filtrarDocumentos();

    });

});


/* =====================================================
   PESQUISA
===================================================== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    filtrarDocumentos();
});


/* =====================================================
   FUNÇÃO DE FILTRO
===================================================== */

function filtrarDocumentos() {

    const textoPesquisa = searchInput.value
        .toLowerCase()
        .trim();

    documents.forEach((documento) => {

        const titulo = documento
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const descricao = documento
            .querySelector("p")
            .textContent
            .toLowerCase();

        const categoria = documento.dataset.category;

        const categoriaCorreta =
            currentFilter === "todos" ||
            categoria === currentFilter;

        const pesquisaCorreta =
            titulo.includes(textoPesquisa) ||
            descricao.includes(textoPesquisa);

        if (categoriaCorreta && pesquisaCorreta) {
            documento.style.display = "block";
        } else {
            documento.style.display = "none";
        }

    });

}


/* =====================================================
   MENU ATIVO AO ROLAR
===================================================== */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let secaoAtual = "";

    sections.forEach((section) => {

        const posicao =
            section.offsetTop - 150;

        if (window.scrollY >= posicao) {
            secaoAtual = section.id;
        }

    });

    menuLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + secaoAtual
        ) {
            link.classList.add("active");
        }

    });

});
