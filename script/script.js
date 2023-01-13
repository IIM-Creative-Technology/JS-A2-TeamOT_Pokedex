// avoir pokemon recherchés dans l'input

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultContainer = document.querySelector("#result-container");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = searchInput.value;
  resultContainer.innerHTML = "Loading...";
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      resultContainer.innerHTML = `
                <p>Name: ${data.name}</p>
                <p>ID: ${data.id}</p>
                <img src="${data.sprites.front_default}">
            `;
    })
    .catch((error) => {
      resultContainer.innerHTML = "Pokemon not found.";
    });
});

// avoir une liste de pokemon
let pokemon = document.getElementById("pokemon");
let pokemonShiny = document.getElementById("pokemonShiny");

function getPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=6")
    .then((response) => response.json())
    .then((data) => {
      let pokemon = data.results;
      let output = "";
      pokemon.forEach(function (poke) {
        output += `
            <div class="card">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.slice(
                  34,
                  -1
                )}.png" alt="${poke.name}">
                <h2>${poke.name}</h2>
                <a href="${poke.url}">Details</a>  

            </div>
            `;
      });
      document.getElementById("pokemon").innerHTML = output;
    });
}
getPokemon();

// supprime la fonction getPokemon pour avoir une liste de pokemonShiny

function removePokemon() {
  pokemon.innerHTML = "";
}

// avoir une liste de pokemonShiny

function getPokemonShiny() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=6")
    .then((response) => response.json())
    .then((data) => {
      let pokemonShiny = data.results;
      let output = "";
      pokemonShiny.forEach(function (poke) {
        output += `
              <div class="cardShiny">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${poke.url.slice(
                    34,
                    -1
                  )}.png" alt="${poke.name}">
                  <h2>${poke.name}</h2>
                  <a href="${poke.url}">Details</a> 
                  
  
              </div>
              `;
      });
      document.getElementById("pokemonShiny").innerHTML = output;
    });
}

// konami code
const touche = [];
const codeSecret = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  touche.push(e.key);
  console.log(touche);

  if (touche.join("").includes(codeSecret)) {
    alert("✨it's glitter time!✨");
    getPokemonShiny();
    removePokemon();
    initConfetti();
    render();
  }
  console.log(touche);
});



// animation du canvas quand on passe en mode shiny


canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 500;
const gravity = 0.7;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
{ front: 'red', back: 'darkred' },
{ front: 'antiquewhite', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'gold', back: 'darkgold' }];


randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 20) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });

  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

   
    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  window.requestAnimationFrame(render);
};

window.addEventListener('click', function () {
  initConfetti();
}); // ré-active la fonction au click 

