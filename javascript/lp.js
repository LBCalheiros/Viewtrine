// Areas

const listaBotoes = document.querySelectorAll(".icon-group button");
const titulos = document.querySelectorAll(".areas-ativo h2");
const conteudos = document.querySelectorAll(".areas-ativo ul");

listaBotoes.forEach((botao, index) => {
  botao.addEventListener("click", () => {
    listaBotoes.forEach((btn) => btn.classList.remove("icon-ativo"));
    titulos.forEach((titulo) => titulo.classList.remove("services-titulo"));
    conteudos.forEach((lista) => lista.classList.remove("services-ativo"));

    botao.classList.add("icon-ativo");
    titulos[index].classList.add("services-titulo");
    conteudos[index].classList.add("services-ativo");
  });
});

// Hamburguer

const hamburguer = document.querySelector(".hamburguer");
const hamburguerFechar = document.querySelector(".hamburguer-fechar");
const hamburguerMenu = document.querySelector(".hamburguer-menu");

function abrirHamburguer() {
  hamburguerMenu.classList.remove("hamburguer-saindo");
  hamburguerMenu.classList.add("hamburguer-ativo");
}

function fecharHamburguer() {
  hamburguerMenu.classList.remove("hamburguer-ativo");
  hamburguerMenu.classList.add("hamburguer-saindo");
}

hamburguer.addEventListener("click", abrirHamburguer);
hamburguerFechar.addEventListener("click", fecharHamburguer);

// Scroll horizontal

const slider = document.querySelector(".pessoas-container");

let isDown = false;
let startX;
let scrollLeft;
let velX = 0;
let momentumID;

function beginMomentum() {
  slider.scrollLeft -= velX;
  velX *= 0.98;

  if (Math.abs(velX) > 0.5) {
    momentumID = requestAnimationFrame(beginMomentum);
  }
}

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("dragging");

  cancelAnimationFrame(momentumID);

  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;

  document.body.style.userSelect = "none";
});

slider.addEventListener("mouseleave", () => {
  if (!isDown) return;
  isDown = false;
  slider.classList.remove("dragging");
  beginMomentum();
  document.body.style.userSelect = "";
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("dragging");
  beginMomentum();
  document.body.style.userSelect = "";
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;

  const currentScroll = slider.scrollLeft;
  slider.scrollLeft = scrollLeft - walk;

  velX = (currentScroll - slider.scrollLeft) * 0.8;
});
slider.addEventListener("wheel", () => {}, { passive: true });
