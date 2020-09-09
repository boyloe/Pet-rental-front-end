const queryParams = new URLSearchParams(window.location.search)
const userId = queryParams.get('user_id')
console.log(userId)

const main = document.querySelector('main')

fetch(`http://localhost:3000/users/${userId}`)
    .then(response => response.json())
    .then(showUserInfo)
    
function showUserInfo(user) {
    const section = document.querySelector('section')
    const petsHeader = document.createElement('h2')
    petsHeader.textContent = "Your previous pet rentals:"
    section.appendChild(petsHeader)
    user.pets.forEach(pet => {
        showPetName(pet, section)
        showPetImage(pet, section)
    })
    newRentalLink(user)
}

function showPetName(pet, section) {
    const name = document.createElement('h3')
    name.textContent = pet.name
    section.appendChild(name)
    console.log(pet)
}

function showPetImage(pet, section) {
    const image = document.createElement('img')
    image.src = pet.image
    section.appendChild(image)
}

function newRentalLink(user){
    newRental = document.createElement('a')
    newRental.textContent = "Find A Pet!"
    newRental.href = `../pets/pets.html?user_id=${user.id}`
    document.body.appendChild(newRental)
}

