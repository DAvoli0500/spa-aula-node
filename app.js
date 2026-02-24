const app = document.getElementById("app");

const pages = {
    "/": () => `
    <section class="card">
    <h2>Início</h2>
    <p>Isso é uma SPA: Navegação sem carregar a página.</p>
    <p>Use o menu para trocar de página</p>
    `,
    "/alunos": () => {
        const alunos = ["Ana", "Bruno", "Carlos", "Diana"];
        return `
        <section class="card">
        <h2>Alunos</h2>
        <ul>
            ${alunos.map((a) => `<li> ${a} </li>`).join("")}
        </ul>
        </section>
        `;
    },
    "/sobre": () => `
    <section class="card">
    <h2>Sobre</h2>
    <p>Exemplo simples de roteamento no front-end (sem framework).</p>
    <p>Próximo passo: carregar via fetch e criar componentes.</p>
    </section>
    `,
};

function setActiveLink(path) {
    const links = document.querySelectorAll("a[data-link]").forEach((a) => {
       const isActive = a.getAttribute("href") === path;
         a.classList.toggle("active", isActive);
    });
};

function render() {
    const path = window.location.pathname;
    const page = pages[path] ?? (() => `
    <section class="card">
    <h2>404</h2>
    <p>Página não encontrada: <code>${path}</code></p>
    <p><a href="/" data-link>Início</a></p>
    </section>`);  
    
    app.innerHTML = page();
    setActiveLink(path);
}

function navigateTo(url) {
    window.history.pushState({}, "", url);
    render();
}
document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;

    e.preventDefault();
    navigateTo(link.getAttribute("href"));
});
window.addEventListener("popstate", render);

render();