let teamForm = document.getElementById('team-name-form')
let field = document.getElementById('team-name-input')
let fieldSubmit = document.getElementById('team-name-submit')
let currentUser
let myTeam = document.getElementById('my-team')
let username = document.createElement('h1')
let myPokedex = document.createElement('div')

class Team
{
    constructor(username, pokeList)
    {
        this.username = username;
        this.pokeList = pokeList
    }
}

fieldSubmit.onclick = (e) => {
    e.preventDefault()
    currentUser = field.value
    teamForm.style.display = 'none'
    username.innerHTML = currentUser
    myTeam.appendChild(username)
}

let pokeId = [1, 246, 789, 564, 321, 665]



let validation = document.getElementById('validation')

validation.onclick = () => {
    let thisTeam = new  Team(currentUser, pokeId)
    console.log(currentUser)
    console.log(thisTeam)
    localStorage.setItem(currentUser, JSON.stringify(thisTeam))
}
