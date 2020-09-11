const queryParams = new URLSearchParams(window.location.search)
const userId = queryParams.get('user_id')

const main = document.querySelector('main')
const historyHeader = document.querySelector('.history-header')

fetch(`http://localhost:3000/users/${userId}`)
    .then(response => response.json())
    .then(showUserInfo)
    
function showUserInfo(user) {
    if (user.pets.length === 0) {
        const petsHeader = document.createElement('h2')
        petsHeader.textContent = `Welcome, ${user.name}! You have no rental history.`
        petsHeader.classList.add('history-header-items')
        historyHeader.appendChild(petsHeader)
        newRentalLink(user)
    } else {
        const petsHeader = document.createElement('h2')
        petsHeader.textContent = `Welcome, ${user.name}! Here's your pet rental history!`
        petsHeader.classList.add('history-header-items')
        historyHeader.appendChild(petsHeader)
        newRentalLink(user)
        let uniquePetIds = new Set(user.pets.map(pet => pet.id))
        let idArray = [...uniquePetIds]
        let uniquePets = idArray.map(id => user.pets.find(pet => pet.id === id))
        uniquePets.forEach(pet => {
            const petCard = document.createElement('section')
            petCard.classList.add('pet-card')
            main.appendChild(petCard)
            showPetName(pet, petCard)
            showPetImage(pet, petCard)
        })
    }
}

function showPetName(pet, section) {
    const name = document.createElement('h3')
    name.textContent = pet.name
    section.appendChild(name)
}

function showPetImage(pet, section) {
    const image = document.createElement('a')
    image.classList.add('pet-image')
    image.href = `../pet/pet.html?pet_id=${pet.id}&user_id=${userId}`
    image.innerHTML = `<img class="pet-image ${pet.name}" src=${pet.image} alt="A picture of a ${pet.breed}">`
    section.appendChild(image)
}

function newRentalLink(user) {
    newRental = document.createElement('p')
    newRental.classList.add('history-header-items')
    if (user.pets.length === 0) {
        newRental.innerHTML = `Let's rent you a new <span class="rental-link"><a class="no-previous-rental-link" href="../pets/pets.html?user_id=${user.id}">best friend!</a></span>`
    } else {
        newRental.innerHTML = `<span class="rental-link"><a href="../pets/pets.html?user_id=${user.id}">Rent a new pet</a></span>, or pick a past favorite!`
    }
    historyHeader.appendChild(newRental)
}

