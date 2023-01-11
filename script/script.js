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
                <p></p> 

            </div>
            `;
      });
      document.getElementById("pokemon").innerHTML = output;
    });
}
getPokemon();


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
                  <p></p> 
  
              </div>
              `;
        });
        document.getElementById("pokemonShiny").innerHTML = output;
      });
  }
  getPokemonShiny();