//get pet_id and user_id passed from pets.html query
const queryParams = new URLSearchParams(window.location.search)
const petId = queryParams.get('pet_id')
const userId = queryParams.get('user_id')

const label = document.querySelector('.rental-label')
const main = document.querySelector('main')
const rentalForm = document.querySelector('#rental-submission')

fetch(`http://localhost:3000/pets/${petId}`)
    .then(response => response.json())
    .then(displayPetCard)

function displayPetCard(pet) {
    const title = document.querySelector('#title')
    title.innerHTML = `Rent ${pet.name} Today!`
    label.textContent = `How many days would you like to rent ${pet.name}?`
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

function renderPetImage(pet, section) {
    const image = document.createElement('img')
    image.classList.add("pet-image")
    image.classList.add(pet.name)
    image.src = pet.image
    image.alt = `A picture of a ${pet.breed}`
    section.appendChild(image)
}

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
function getDays(){
    startDate = new Date(document.querySelector("#start-date").value);
    endDate = new Date(document.querySelector("#end-date").value);
    return Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(1000 * 60 * 60 * 24))
    }

const days = document.querySelector('#hidden-days')
let startDate = document.querySelector('#start-date')
let endDate = document.querySelector('#end-date')

startDate.addEventListener('change', function(){ 
    days.value = getDays()
})

endDate.addEventListener('change', function(){ 
    days.value = getDays()
})

