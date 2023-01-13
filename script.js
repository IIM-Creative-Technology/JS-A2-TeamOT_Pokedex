// Partie Nathan
let teamForm = document.getElementById('team-name-form')
let field = document.getElementById('team-name-input')
let fieldSubmit = document.getElementById('team-name-submit')
let currentUser
let myTeam = document.getElementById('my-team')
let username = document.createElement('h1')
let myPokedex = document.createElement('div')


window.onload = adamFetch();
// Class Team pour le stockage en local storage
class Team
{
    constructor(username, pokeList)
    {
        this.username = username;
        this.pokeList = pokeList
    }
}
// =====================================================================================================================

// Class TeamStats pour le calcul des points finaux
class TeamStats
{
    constructor($urls, $hp, $attack, $defense, $score) {
        this.urls = $urls;
        this.hp = $hp;
        this.attack = $attack;
        this.defense = $defense;
        this.score = $score
    }
}
// =====================================================================================================================

// Génére le nom d'utilisateur
fieldSubmit.onclick = (e) => {
    e.preventDefault()
    currentUser = field.value
    teamForm.style.display = 'none'
    username.innerHTML = currentUser
    myTeam.appendChild(username)
}
// =====================================================================================================================

let pokeId = [1, 246, 789, 564, 321, 665]

let validation = document.getElementById('validation')

// Au clique, crée une nouvelle Team avec le username et la liste des id des pokemons de son équipe, stocké en Localstorage
validation.onclick = () => {
    let thisTeam = new  Team(currentUser, pokeId)
    localStorage.setItem(currentUser, JSON.stringify(thisTeam))
    scoreCalcul(myTeamStats, autoGeneratedTeamStats)
}
// =====================================================================================================================

// Génére une nouvelle TeamStats avec la liste des urls a fetch des pokemons de son équipe et les autres clés à 0 par défaut
let myTeamUrl = [

]

let myTeamStats = new TeamStats(myTeamUrl, 0, 0, 0, 0)

let autoGeneratedTeamUrl = [
    'https://pokeapi.co/api/v2/pokemon/102',
    'https://pokeapi.co/api/v2/pokemon/168',
    'https://pokeapi.co/api/v2/pokemon/220',
    'https://pokeapi.co/api/v2/pokemon/922',
    'https://pokeapi.co/api/v2/pokemon/852',
    'https://pokeapi.co/api/v2/pokemon/354'
]

let autoGeneratedTeamStats  = new TeamStats(autoGeneratedTeamUrl, 0, 0, 0, 0)

// =====================================================================================================================

// Fonction qui affecte les stats cumulés des pokemons aux stats de l'équipe
async function teamBattle($team) {
    await Promise.all($team.urls)
        .then(result => Promise.all(result.map(values => fetch(values)
        .then(pokemon => pokemon.json())
        .then(data => () => {
            for (let i = 0; i < data.length; i++) {
                let stats = data[i].stats
                $team.hp += parseInt(stats[0].base_stat)
                $team.attack += parseInt(stats[1].base_stat)
                $team.defense += parseInt(stats[2].base_stat)
            }
        }))))
}

window.onload = teamBattle(myTeamStats)
window.onload = teamBattle(autoGeneratedTeamStats)

// =====================================================================================================================

// Fonction qui compares les valeurs des 2 équipes et leur affectes un score chacun
function scoreCalcul($myTeam, $autoTeam) {
    for (let i = 0; i < 3; i++) {
        let myCurrentStat
        let autoCurrentStat
        if (i === 0) {
            myCurrentStat = $myTeam.hp
            autoCurrentStat = $autoTeam.hp
        } else if (i === 1) {
            myCurrentStat = $myTeam.attack
            autoCurrentStat = $autoTeam.attack
        } else {
            myCurrentStat = $myTeam.defense
            autoCurrentStat = $autoTeam.defense
        }

        if (myCurrentStat === autoCurrentStat) {
            $myTeam.score += 2
            $autoTeam.score += 2
        } else if (myCurrentStat > autoCurrentStat) {
            $myTeam.score += 2
        } else {
            $autoTeam.score += 2
        }
    }

    if ($myTeam.score > $autoTeam.score) {
        console.log('myTeam Winner')
    } else {
        console.log('autoTeam Winner')
    }
}
// =====================================================================================================================

// Connexion au fichier excel
// let data = {
//     "name": "John Smith",
//     "age": 35,
//     "address": {
//         "street": "123 Main St",
//         "city": "Anytown",
//         "state": "CA",
//         "zip": "12345"
//     }
// };
//
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'data.json', true);
// xhr.responseType = 'json';
// xhr.onload = function() {
//     if (xhr.status === 200) {
//         let dataFromFile = xhr.response
//         Object.assign(dataFromFile, data)
//         let jsonData = JSON.stringify(dataFromFile)
//     }
// };
// xhr.send();
// Fin partie Nathan

// Partie Adam
let pokeContain = document.getElementById('pokemon-container')
let a = 0
let currentPokemonId
let maxChildren = 2

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    currentPokemonId = event.target.id
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
    if(a > 5){
        alert('Maximum de pokémon atteint')
        return
    }
    a++
    const id = event.dataTransfer.getData("text");
    document.getElementById('target-div').appendChild(document.getElementById(id));
    myTeamUrl.push(currentPokemonId)
    console.log(myTeamUrl)
}

let currentImage = 'front_default'
function adamFetch(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1200')
    .then((response) => response.json())
    .then((data) => { 
        const target = document.getElementById('target-div')
        let pokemons = data.results;
        for (let i = 0; i < pokemons.length; i++) {
            let pokemonDiv = document.createElement('div')
            let pokemonName = document.createElement('h2')
            pokemonName.innerHTML = pokemons[i].name
            pokemonDiv.appendChild(pokemonName)
            pokemonDiv.id = pokemons[i].url
            pokemonDiv.className = 'source-div'
            pokemonDiv.setAttribute("draggable", "true")
            fetch(pokemons[i].url)
            .then((response2) => response2.json()
            .then((data2) => {
                let pokemon = data2
                pokemonImage = document.createElement('img')
                pokemonImage.classList.add('image-poke')
                pokemonImage.src = pokemon['sprites'][currentImage]
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

        target.addEventListener("dragenter", dragEnter);
        target.addEventListener("dragover", dragOver);
        target.addEventListener("drop", drop);
        

    })
}


// Fin partie Adam

// Partie Ambre
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
    for (let index = 0; index < 6; index++) {
        fetch(myTeamUrl[index])
        .then((response) => response.json())
        .then((data) => {
            let pokemon = data.results;
            console.log(pokemon)
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
}


// supprime la fonction getPokemon pour avoir une liste de pokemonShiny

function removePokemon() {
    document.getElementById('pokemon-container').innerHTML = "";
    currentImage = 'front_shiny'
    adamFetch();
}

// avoir une liste de pokemonShiny

/*    function getPokemonShiny() {
        for (let index = 0; index < 6; index++) {
            fetch(myTeamUrl[index])
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
    }
*/ 

// konami code
const touche = [];
const codeSecret = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

window.addEventListener("keyup", (e) => {
    console.log(e.key);
    touche.push(e.key);
    console.log(touche);

    if (touche.join("").includes(codeSecret)) {
        alert("✨it's glitter time!✨");
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
const dragSpeed = 0.075;
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
        confetto.velocity.x -= confetto.velocity.x * dragSpeed;
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
// Fin partie Ambre

// Partie Armand
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
    // récupères le stockage dans index.html

    while (stock_equipe_random.firstChild) {
        stock_equipe_random.removeChild(stock_equipe_random.firstChild);
    }
    // boucle qui vide ce stoackage

    for (let index = 0; index !=max; index++) {
        // boucle qui va de 0 à 6

        await fetch('https://pokeapi.co/api/v2/pokemon/' + ListePoke[index])
            .then(result => result.json())
            .then(data => {
                let div = document.createElement("div")
                div.classList.add("flex","flex-col","w-[33.333%]","boder-solid","border-2","border-black")
                // div qui stock la data des pokemons

                let p = document.createElement("p")
                p.classList.add("text-black","text-2xl","font-bold","m-auto")
                // p qui stock le nom des pokemons

                let p2 = document.createElement("p")
                p2.classList.add("text-black","text-xl","m-auto")
                p2.innerHTML = "Type : "+data.types[0].type.name
                // p qui stock le type des pokemons

                let img = document.createElement("img")
                img.classList.add("images-poke")
                // img qui stock l'image des pokemons

                let btnInfos = document.createElement("p")
                btnInfos.innerHTML = "Infos"
                btnInfos.classList.add("bg-red-600","p-2","text-white","font-bold","m-auto","w-[30%]","text-center","btnPoke","mt-4","mb-4")
                btnInfos.setAttribute("id",index)
                // btn qui va afficher les infos des pokemons en plus

                let modal = document.createElement("div")
                modal.classList.add("modal")
                modal.setAttribute("id","x"+index)
                modal.classList.add("p-2")
                let Stats = document.createElement("p")
                Stats.innerHTML="Pokemon Name : "+ListePoke[index].toUpperCase()
                Stats.classList.add("font-bold")
                modal.appendChild(Stats)
                // Setup popup modal avec les infos

                let abilitiesStock = document.createElement("div")
                let abilities = data.abilities
                // stock des abilities

                let p4 = document.createElement("p")
                p4.innerHTML ="Abilities : "
                p4.classList.add("font-bold")
                abilitiesStock.appendChild(p4)
                abilities.forEach(element => {
                    p3 = document.createElement("p")
                    p3.innerHTML ="- "+element.ability.name
                    abilitiesStock.appendChild(p3)
                });
                // affiche les capacités dans le stock de capacités

                if (data.sprites.front_default) {
                    img.src = data.sprites.front_default
                    p.innerHTML = ListePoke[index]
                    // test si l'image existe , si c'est le cas utilise l'image de l'api

                } else {
                    img.src = "unknown.png"
                    p.innerHTML = ListePoke[index]
                }
                // sinon utilise unknown.png

                div.appendChild(p)
                div.appendChild(img)
                div.appendChild(p2)
                div.appendChild(btnInfos)
                modal.appendChild(abilitiesStock)
                div.appendChild(modal)
                stock_equipe_random.appendChild(div)
                // met tous les elements dans le html

            })
            // Ce then data s'execute si l'api réussi bien à recuperer le pokemon par son nom
            // (ce qui peut buger pour certains noms)

            .catch((error) => {
                ListeBug = ["pangoro","medicham","sneasler","passimian","pikachu","venonat","starmie","wurmple","kartana","banette"]
                // Crée une liste composée de certains pokemons

                Poke = ListeBug.random()
                // Utilise la fonction random pour récupérer aléatoirement un nom dans ListeBug

                ListePoke.push(Poke)
                // Ajoute à ListePoke le pokemon choisit aléatoirement

                let div = document.createElement("div")
                div.classList.add("flex","flex-col","w-[33.333%]","boder-solid","border-2","border-black")
                // div pour stocker la data du pokemon

                let p = document.createElement("p")
                p.classList.add("text-black","text-2xl","font-bold","m-auto")
                // p pour stocker le nom du pokemon

                let p2 = document.createElement("p")
                p2.classList.add("text-black","text-xl","m-auto")
                // p pour stocker le type du pokemon

                let img = document.createElement("img")
                img.classList.add("images-poke")
                // img pour stocker l'image du pokemon

                let btnInfos = document.createElement("p")
                btnInfos.innerHTML = "Infos"
                btnInfos.classList.add("bg-red-600","p-2","text-white","font-bold","m-auto","w-[30%]","text-center","btnPoke","mt-4","mb-4")
                btnInfos.setAttribute("id",index)
                // images pour afficher les infos en plus des pokemons

                let modal = document.createElement("div")
                modal.classList.add("modal")
                modal.setAttribute("id","x"+index)
                modal.classList.add("p-2")
                let Stats = document.createElement("p")
                Stats.innerHTML="Pokemon Name : "+Poke.toUpperCase()
                Stats.classList.add("font-bold")
                modal.appendChild(Stats)
                // Setup de la popup modal avec les infos

                let abilitiesStock = document.createElement("div")
                let p4 = document.createElement("p")
                p4.innerHTML ="Abilities : "
                p4.classList.add("font-bold")
                abilitiesStock.appendChild(p4)
                // Stock dans la modal avec les capacités des pokemons

                fetch('https://pokeapi.co/api/v2/pokemon/' + Poke)
                    .then(result => result.json())
                    .then(data => {
                        let abilities = data.abilities
                        abilities.forEach(element => {
                            p = document.createElement("p")
                            p.innerHTML ="- "+element.ability.name
                            abilitiesStock.appendChild(p)
                        });
                        img.src = data.sprites.front_default
                        p2.innerHTML = "Type : "+data.types[0].type.name
                    })
                // récupères le type et l'image du pokemon choisit dans aléatoirement ListeBug avec l'api

                p.innerHTML = Poke
                // Définit le nom du pokemon comme étant égal au Pokemon choisit
                // aléatoirement dans ListeBug

                div.appendChild(p)
                div.appendChild(img)
                div.appendChild(p2)
                div.appendChild(btnInfos)
                modal.appendChild(abilitiesStock)
                div.appendChild(modal)
                stock_equipe_random.appendChild(div)
                // mets tous les childs dans le html

            })
    }
    // Cette boucle va permettre d'afficher uniquement 6 pokemons

    let images = document.querySelectorAll(".images-poke")
    // Crée une variable images qui contient tous les elments qui ont la classe images-poke

    let k = 0
    // Crée une variable k que l'on utilise pour "compter" les scroll

    images.forEach(element => {
        // va boucler sur le nombre d'images présentent dans le fichier html avec la classe images-poke (donc 6 fois)

        element.addEventListener("wheel",e=>{
            // en cas de scroll sur l'image , va effectuer les lignes suivantes

            if (k%2==1) {
                // Modulo 2 pour effectuer la fonction 1 scroll sur 2

                element.src=element.src.replace("pokemon/","pokemon/back/")
                // remplace le sprite standard par celui back

                k++
                // k+=1

            } else if (k%2==0) {
                // Modulo 2 pour effectuer la fonction 1 scroll sur 2

                element.src=element.src.replace("pokemon/back/","pokemon/")
                // remplace le sprite back par le standard

                k++
                // k+=1
            }
        })
    });

    let btn1 = document.getElementById("0")
    let btn2 = document.getElementById("1")
    let btn3 = document.getElementById("2")
    let btn4 = document.getElementById("3")
    let btn5 = document.getElementById("4")
    let btn6 = document.getElementById("5")

    let modalSelect1 = document.getElementById("x0")
    let modalSelect2 = document.getElementById("x1")
    let modalSelect3 = document.getElementById("x2")
    let modalSelect4 = document.getElementById("x3")
    let modalSelect5 = document.getElementById("x4")
    let modalSelect6 = document.getElementById("x5")

    let btnClose = document.querySelectorAll(".close-btn")
    btn1.addEventListener("mouseover",()=>{
        modalSelect1.style.display="block"
    })
    btn1.addEventListener("mouseout",()=>{
        modalSelect1.style.display="none"
    })

    btn2.addEventListener("mouseover",()=>{
        modalSelect2.style.display="block"
    })
    btn2.addEventListener("mouseout",()=>{
        modalSelect2.style.display="none"
    })

    btn3.addEventListener("mouseover",()=>{
        modalSelect3.style.display="block"
    })
    btn3.addEventListener("mouseout",()=>{
        modalSelect3.style.display="none"
    })

    btn4.addEventListener("mouseover",()=>{
        modalSelect4.style.display="block"
    })
    btn4.addEventListener("mouseout",()=>{
        modalSelect4.style.display="none"
    })

    btn5.addEventListener("mouseover",()=>{
        modalSelect5.style.display="block"
    })
    btn5.addEventListener("mouseout",()=>{
        modalSelect5.style.display="none"
    })

    btn6.addEventListener("mouseover",()=>{
        modalSelect6.style.display="block"
    })
    btn6.addEventListener("mouseout",()=>{
        modalSelect6.style.display="none"
    })


    btnClose.forEach(element => {
        element.addEventListener("click",()=>{
            modalSelect1.style.display="none"
            modalSelect2.style.display="none"
            modalSelect3.style.display="none"
            modalSelect4.style.display="none"
            modalSelect5.style.display="none"
            modalSelect6.style.display="none"
        })
    });
    ListePoke.forEach(element => {
        autoGeneratedTeamUrl.push('https://pokeapi.co/api/v2/pokemon/' + element)
    });
    console.log(autoGeneratedTeamStats)
    console.log(ListePoke)
}

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

// Fin partie Armand