for (let i = 0; i < 6; i++) {
    let pokeId = Math.floor(Math.random() * 1154)
    fetch('https://pokeapi.co/api/v2/pokemon' + pokeId)
        .then(result => result.json())
        .then(data => {
            
        })
}