//get pet_id and user_id passed from pets.html query
const queryParams = new URLSearchParams(window.location.search)
const petId = queryParams.get('pet_id')
const userId = queryParams.get('user_id')


const main = document.querySelector('main')
const rentalForm = document.querySelector('#rental-submission')

fetch(`http://localhost:3000/pets/${petId}`)
    .then(response => response.json())
    .then(displayPetCard)

function displayPetCard(pet) {
    petCard = createPetCard()       
    renderPetName(pet,petCard)
    attributeList = createAttributeList(petCard)        
    renderPetBreed(pet,attributeList)
    renderPetAge(pet,attributeList)
    renderPetLovesTo(pet,attributeList)
    renderPetDailyRate(pet,attributeList)
    renderPetImage(pet,attributeList)
    createRentalButton(userId, petId)
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
    image.innerHTML = `<img src=${pet.image} alt="A picture of a ${pet.breed}">`
    attributeList.appendChild(image)
} 

//create a new rental selector that allows you to pick a date and verifies that date is availble. Then pull user_id and pet_id params from URL.
function createRentalButton(userId,petId){
    const userIdInput = document.createElement('input')
    const petIdInput = document.createElement('input')

    userIdInput.type = "number"
    userIdInput.classList.add('hidden-input')
    userIdInput.value = userId
    userIdInput.name = "user_id"
    petIdInput.type = "number"
    petIdInput.classList.add('hidden-input')
    petIdInput.value = petId
    petIdInput.name = "pet_id"
    rentalForm.appendChild(userIdInput)
    rentalForm.appendChild(petIdInput)
}