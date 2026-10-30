/*
  COMO ADICIONAR UM JOGO:
  1. Crie uma pasta dentro de "jogos", por exemplo: jogos/meu-jogo/
  2. Coloque o jogo HTML nessa pasta com o nome "index.html".
  3. Adicione um objeto à lista "games" abaixo, preenchendo título, descrição,
     categoria, símbolo e caminho.
  4. Envie os arquivos atualizados para a hospedagem.
*/
const games = [
  {
    title: "Meu Primeiro Jogo",
    description: "Este é um espaço de demonstração. Substitua este exemplo pelo seu primeiro jogo!",
    category: "Plataforma",
    symbol: "👾",
    tag: "DEMO",
    path: "jogos/meu-primeiro-jogo/index.html",
    color: "linear-gradient(135deg,#55417e,#252044)"
  },
  
  {
    title: "cobra",
    description: "Enfrente uma cobra gigante em uma aventura de ação!",
    category: "Ação",
    symbol: "⚔️",
    tag: "NOVO",
    path: "jogos/cobra-jogo/index.html"
  }
];

const grid = document.getElementById("game-grid");
const search = document.getElementById("search");
const count = document.getElementById("game-count");
const empty = document.getElementById("empty-state");
let activeCategory = "Todos";

function renderGames() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");
  const visible = games.filter(game => {
    const matchesText = `${game.title} ${game.description} ${game.category}`.toLocaleLowerCase("pt-BR").includes(term);
    const matchesCategory = activeCategory === "Todos" || game.category === activeCategory;
    return matchesText && matchesCategory;
  });
  count.textContent = String(visible.length).padStart(2, "0");
  grid.innerHTML = "";
  empty.hidden = visible.length !== 0;

  visible.forEach(game => {
    const card = document.createElement("article");
    card.className = "game-card";
    const cover = document.createElement("div");
    cover.className = "game-cover";
    cover.style.background = game.color || "linear-gradient(135deg,#483b70,#211a38)";
    const symbol = document.createElement("span");
    symbol.className = "cover-symbol";
    symbol.textContent = game.symbol || "🎮";
    const tag = document.createElement("span");
    tag.className = "cover-tag";
    tag.textContent = game.tag || "JOGO";
    cover.append(tag, symbol);

    const info = document.createElement("div");
    info.className = "game-info";
    const title = document.createElement("h3");
    title.textContent = game.title;
    const description = document.createElement("p");
    description.textContent = game.description;
    const footer = document.createElement("div");
    footer.className = "game-footer";
    const category = document.createElement("span");
    category.className = "category";
    category.textContent = game.category.toUpperCase();
    const play = document.createElement("button");
    play.className = "play-button";
    play.textContent = "JOGAR ▶";
    play.addEventListener("click", () => openGame(game));
    footer.append(category, play);
    info.append(title, description, footer);
    card.append(cover, info);
    grid.append(card);
  });
}

function openGame(game) {
  document.getElementById("player-title").textContent = game.title.toUpperCase();
  document.getElementById("game-frame").src = game.path;
  const modal = document.getElementById("player-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeGame() {
  const modal = document.getElementById("player-modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("game-frame").src = "about:blank";
  document.body.style.overflow = "";
}
search.addEventListener("input", renderGames);
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderGames();
  });
});
document.getElementById("close-player").addEventListener("click", closeGame);
document.getElementById("fullscreen").addEventListener("click", () => {
  const frame = document.getElementById("game-frame");
  if (frame.requestFullscreen) frame.requestFullscreen();
});
document.getElementById("player-modal").addEventListener("click", event => {
  if (event.target.id === "player-modal") closeGame();
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeGame(); });
document.getElementById("year").textContent = new Date().getFullYear();
renderGames();
