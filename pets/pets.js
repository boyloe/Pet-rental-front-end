const userQueryParams = new URLSearchParams(window.location.search)
const userId = userQueryParams.get('user_id')
const hidden = document.querySelector('input[name="user_id"]')
hidden.value = userId

const speciesQueryParams = new URLSearchParams(window.location.search)
const species = speciesQueryParams.get("species")
const form = document.querySelector('.species-action')
form.action = `https://pet-renter.web.app//pets/pets.html?user_id=${userId}`


let baseURL = "https://pet-renter-back-end.herokuapp.com"

if (species) {
    baseURL = `${baseURL}?species=${species}`
}

fetch(`${baseURL}`)
    .then(response => response.json())
    .then(pets => displayPetCard(pets))

const main = document.querySelector('main')
function displayPetCard(pets){
    pets.forEach(pet => {
        petCard = createPetCard()       
        renderPetName(pet,petCard)
        attributeList = createAttributeList(petCard)        
        renderPetBreed(pet,attributeList)
        renderPetAge(pet,attributeList)
        renderPetLovesTo(pet,attributeList)
        renderPetDailyRate(pet,attributeList)
        renderPetImage(pet,attributeList)
    })
}   
function createPetCard(){
    const petCard = document.createElement('section')    
    petCard.classList.add('pet-card')    
    main.appendChild(petCard)
    return petCard    
}

function createAttributeList(petCard){
    const attributeList = document.createElement('ul')
    attributeList.classList.add('attributes')
    petCard.appendChild(attributeList)
    return attributeList
}

function renderPetName(pet, petCard){
    const name = document.createElement('h3')
    name.innerText = pet.name
    petCard.appendChild(name)
}

function renderPetAge(pet, attributeList){
    const age = document.createElement('li')
    age.innerText = `Age: ${pet.age}`
    attributeList.appendChild(age)
} 
function renderPetBreed(pet, attributeList){
    const breed = document.createElement('li')
    breed.innerText = `Breed: ${pet.breed}`
    attributeList.appendChild(breed)
} 
function renderPetLovesTo(pet, attributeList){
    const lovesTo = document.createElement('li')
    lovesTo.innerText = `Loves To: ${pet.loves_to}`
    attributeList.appendChild(lovesTo)
} 
function renderPetDailyRate(pet, attributeList){
    const dailyRate = document.createElement('li')
    dailyRate.innerText = `Daily Rate: $${pet.rate}`
    attributeList.appendChild(dailyRate)
} 
function renderPetImage(pet, attributeList){
    const image = document.createElement('li')
    image.innerHTML = `<a href="../pet/pet.html?pet_id=${pet.id}&user_id=${userId}"><img class="pet-image ${pet.name}" src=${pet.image} alt="A picture of a ${pet.breed}"></a>`
    attributeList.appendChild(image)
} 