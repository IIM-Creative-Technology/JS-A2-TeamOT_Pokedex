fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
  .then((response) => response.json())
  .then((data) => {
    let stockPokemon = document.getElementById("stock-pokemons")
    console.log(data)
    let stockPokemon2 = []
    for (let index = 0; index < 1270; index++) { 
        stockPokemon2.push(data.results[index].name)
    }
    console.log(stockPokemon2)
  });