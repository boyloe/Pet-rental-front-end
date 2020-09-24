// const queryParams = new URLSearchParams(window.location.search)
// const userId = queryParams.get('user')
// const baseURL = "https://pet-renter-back-end.herokuapp.com"
const baseURL = `http://localhost:3001`

const loginForm = document.querySelector('.existing-user')
const createUserForm = document.querySelector('.new-user')

loginForm.addEventListener('submit', loginUser)
// createUserForm.addEventListener('submit', createNewUser)

function loginUser(event) {
    event.preventDefault()
    const loginInfo = new FormData(event.target)
    const name = loginInfo.get("name")
    const password = loginInfo.get("password")
    const user = {name, password}
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(user => storeUserInfo(user))
        .then(user => window.location.replace(`${baseURL}/user/user.html?user_id=${user.user.id}`))
}

function storeUserInfo(user) {
    localStorage.setItem("token", user.token)
    return user
}
// function createNewUser(event) {

// }


// fetch(`${baseURL}/login`)
//     .then(response => response.json())
//     .then(console.log)



// function userSelection(users) {
//     const select = document.querySelector('#user-select')
//     users.forEach(user => {
//         const option = document.createElement('option')
//         option.value = user.id
//         option.textContent = user.name
//         select.appendChild(option)
//     })
// }
