var selectElem = document.getElementById("types")
var p = document.getElementById("pElem")
var stockPokedex = document.getElementById("stock-pokedex")

selectElem.addEventListener('change', function() {
    var index = selectElem.value;
    // Rapporter cette donnée au <p>
    pElem.innerHTML = 'Selected Type : ' + index;
    pElem.classList.add("font-bold")

    while (stockPokedex.firstChild) {
        stockPokedex.removeChild(stockPokedex.firstChild);
      }

    fetch('https://pokeapi.co/api/v2/type/' + index)

        .then(result => result.json())
        .then(data => {
            data.pokemon.forEach(element => {
                fetch('https://pokeapi.co/api/v2/pokemon/' + element.pokemon.name)
                    .then(result => result.json())
                    .then(data => {
                        let img = document.createElement("img")
                        img.src = data.sprites.front_default
                        if (data.sprites.front_default) {
                            let div = document.createElement("div")
                            div.classList.add("border-2","border-black","min-w-[20%]","flex","flex-col")
                            let p = document.createElement("p")
                            p.classList.add("font-bold","text-center")
                            p.innerHTML = element.pokemon.name
                            div.appendChild(p)
                            div.appendChild(img)
                            stockPokedex.appendChild(div)
                        }
                    })

            });
        })
        .catch((error) => {

        })

  })

