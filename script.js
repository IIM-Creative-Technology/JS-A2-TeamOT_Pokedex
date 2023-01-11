let pokeContain = document.getElementById('pokemon-container')





function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log(event.target.id)
}

function drag(event) {
    event.preventDefault();
}

function dragEnd(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(id));
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
.then((response) => response.json())
.then((data) => { 

    var pokemons = data.results;
    for (var i = 0; i < pokemons.length; i++) {
        let pokemonDiv = document.createElement('div')
        console.log(pokemons[i].name);
        let pokemonName = document.createElement('h2')
        pokemonName.innerHTML = pokemons[i].name
        pokemonDiv.appendChild(pokemonName)
        pokemonDiv.id = pokemons[i].name
        pokemonDiv.className = 'source-div'
        pokemonDiv.setAttribute("draggable", "true")
        fetch(pokemons[i].url)
        .then((response2) => response2.json()
        .then((data2) => {
            var pokemon = data2
            pokemonImage = document.createElement('img')
            pokemonImage.src = pokemon.sprites.front_default
            pokemonDiv.appendChild(pokemonImage)
        }))
        pokeContain.appendChild(pokemonDiv)
    }
    
    const sources = document.getElementsByClassName('source-div')           
    for (const source of sources){
        source.addEventListener("dragstart", dragStart);
        source.addEventListener("drag", drag);
        source.addEventListener("dragend", dragEnd);
    }


    const target = document.getElementById('target-div')
    target.addEventListener("dragenter", dragEnter);
    target.addEventListener("dragover", dragOver);
    target.addEventListener("drop", drop);
})
