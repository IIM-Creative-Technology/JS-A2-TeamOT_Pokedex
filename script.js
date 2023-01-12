Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }


let ListePoke = []
let btn = document.getElementById("test")
btn.addEventListener("click",e => {
    GenerateRandomTeam()
})

for (let index = 0; index < 6; index++) {
    GenerateRandomPoke(ListePoke)
}   

function GenerateRandomPoke(ListePoke){
    if (ListePoke.length < 6) {
        let pokeId = Math.floor(Math.random() * 1154)
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokeId)
        .then(result => result.json())
        .then(data => {
            if(data.forms[0].name){
                ListePoke.push(data.forms[0].name)
            }
        })
        .catch((error) => {

        })
    } else {

    }
}

let max = 6

function GenerateRandomTeam(){
    DisplayInfo(ListePoke,max)
}
async function DisplayInfo(ListePoke,max){
    
    let stock_equipe_random = document.getElementById("stock-equipe-random")

    while (stock_equipe_random.firstChild) {
        stock_equipe_random.removeChild(stock_equipe_random.firstChild);
      }


    for (let index = 0; index !=max; index++) {
        await fetch('https://pokeapi.co/api/v2/pokemon/' + ListePoke[index])
        .then(result => result.json())
        .then(data => {
            // div to store pokemon data
            let div = document.createElement("div")
            div.classList.add("flex","flex-col","w-[33.333%]","boder-solid","border-2","border-black")

            // p to store pokemon name
            let p = document.createElement("p")
            p.classList.add("text-black","text-2xl","font-bold","m-auto")

            // p to store type
            let p2 = document.createElement("p")
            p2.classList.add("text-black","text-xl","m-auto")
            p2.innerHTML = "Type : "+data.types[0].type.name

            // img to store pokemon image
            let img = document.createElement("img")

            // if the image exist , add image from api
            if (data.sprites.front_default) {
                img.src = data.sprites.front_default
                p.innerHTML = ListePoke[index]

            // else , use unknown.png instead
            } else {
                img.src = "unknown.png"
                p.innerHTML = ListePoke[index]
            }

            // append all childs to hmtl
            div.appendChild(p)
            div.appendChild(img)
            div.appendChild(p2)
            stock_equipe_random.appendChild(div)
        })
        .catch((error) => {
            ListeBug = ["pangoro","medicham","sneasler","passimian","pikachu","venonat"]
            Poke = ListeBug.random()
            ListePoke.push(Poke)
            let div = document.createElement("div")
            div.classList.add("flex","flex-col","w-[33.333%]","boder-solid","border-2","border-black")

            // p to store pokemon name
            let p = document.createElement("p")
            p.classList.add("text-black","text-2xl","font-bold","m-auto")

            // p to store type
            let p2 = document.createElement("p")
            p2.classList.add("text-black","text-xl","m-auto")

            // img to store pokemon image
            let img = document.createElement("img")

            // yikes

            fetch('https://pokeapi.co/api/v2/pokemon/' + Poke)
                .then(result => result.json())
                .then(data => {
                    img.src = data.sprites.front_default
                    p2.innerHTML = "Type : "+data.types[0].type.name
                })
            p.innerHTML = Poke

            // append all childs to hmtl
            div.appendChild(p)
            div.appendChild(img)
            div.appendChild(p2)
            stock_equipe_random.appendChild(div)

        })
    }
    console.log(ListePoke)
}