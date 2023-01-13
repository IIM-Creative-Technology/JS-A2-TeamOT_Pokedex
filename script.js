Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
// Creé la function random

let ListePoke = []
// Crée la liste qui contiendra les noms des pokemons

let btn = document.getElementById("test")
btn.addEventListener("click",e => {
    GenerateRandomTeam()
})
// Récupères le bouton principal et executes la fonction GenerateRandomteam au clic

for (let index = 0; index < 6; index++) {
    GenerateRandomPoke(ListePoke)
}
// Boucle de 6 itérations qui va appeler GenerateRandomPoke

function GenerateRandomPoke(ListePoke){
    if (ListePoke.length < 6) {
        let pokeId = Math.floor(Math.random() * 1154)
        // PokeID est égal à un nombre alétoire entre 1 et 1154

        fetch('https://pokeapi.co/api/v2/pokemon/' + pokeId)
        // fetch l'api en prenant comme paramètre pokeId généré aléatoirement précedemment

        .then(result => result.json())
        .then(data => {
            if(data.forms[0].name){
                ListePoke.push(data.forms[0].name)
            }
            // Si le pokemon possède un nom , met ce nom dans Liste Poke
        })
        .catch((error) => {

        })
    }
}
// Fonction qui ajoutes des noms de pokemons aléatoirement dans ListePoke

let max = 6
// Création variable max

function GenerateRandomTeam(){
    DisplayInfo(ListePoke,max)
}
// Fonction qui est appelée lorsque l'on clique sur le bouton sur index.html et qui
// appelle la fonction DisplayInfo avec comme paramètres ListePoke qui est maintenant remplie
// de pokemons et max qui est égal à 6


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
    

    
}