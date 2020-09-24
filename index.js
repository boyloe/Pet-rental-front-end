const queryParams = new URLSearchParams(window.location.search)
const userId = queryParams.get('user')
const baseURL = "https://pet-renter-back-end.herokuapp.com"

fetch(`${baseURL}/login`)
    .then(response => response.json())
    .then(console.log)



// function userSelection(users) {
//     const select = document.querySelector('#user-select')
//     users.forEach(user => {
//         const option = document.createElement('option')
//         option.value = user.id
//         option.textContent = user.name
//         select.appendChild(option)
//     })
// }
