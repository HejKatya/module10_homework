// select elements
const submitBtn = document.querySelector('.btn-submit')
const geoBtn = document.querySelector('.btn-geo')
const chatWindow = document.querySelector('.chat-window')

// put the ws url into a variable
const wsUrl = 'wss://echo-ws-service.herokuapp.com'

let websocket

// function for dusplaying user message
const displayUserMessage = message => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'user')
    messageBox.innerHTML = message
    chatWindow.appendChild(messageBox)
}

// function for displaying server message
const displayServerMessage = message => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'server')
    messageBox.innerHTML = message
    chatWindow.appendChild(messageBox)
}

// function for displaying geolocation
const displayGeolocation = url => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'user')
    if (url) {
        let geoLink = document.createElement('a')
        geoLink.classList.add('geo-link')
        geoLink.innerHTML = 'Ваша геолокация'
        geoLink.href = url
        geoLink.target = '_blank'
        messageBox.appendChild(geoLink)
        chatWindow.appendChild(messageBox)
    } else {
        messageBox.innerHTML = 'Геолокация не доступна'
        chatWindow.appendChild(messageBox)
    }

}

//setting up websocket as the page loads
document.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(wsUrl)
    websocket.onopen = function (evt) {
        displayServerMessage('Привет! Я твое эхо.')
    }
    // event listener for submit btn
    submitBtn.addEventListener('click', () => {
        const inputField = document.querySelector('.message-text')
        const userMessage = document.querySelector('.message-text').value
        if (userMessage) {
            displayUserMessage(userMessage)
            const serverResponce = displayServerMessage(userMessage)
            websocket.send(serverResponce)
            inputField.value = ''
        }
    })

})

// setting up geo location display
geoBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        displayServerMessage('Подождите секунду, мы вас ищем...')
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const mapUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
            displayGeolocation(mapUrl)
            websocket.send(coords)
        })
    }
})
