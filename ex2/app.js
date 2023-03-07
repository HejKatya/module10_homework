const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    const width = window.screen.width
    const height = window.screen.height
    alert(`Your screen is ${width} pixels wide and ${height} pixels tall`)
})