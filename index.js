
document.addEventListener("DOMContentLoaded", () => {
    
    function renderOneCrypto(crypto) {
        let card = document.createElement('li')
        card.className = 'card'
        card.innerHTML = `
        <h2>${crypto.name}</h2>
        <p id="info">Current Price: $${crypto.current_price} USD <br>
        Price Change (24hr): $${crypto.price_change_24h}</p>
        <img src=${crypto.image}/>
        `
      document.querySelector('body').appendChild(card)
    }

    function getAllCrypto() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(res => res.json())
        .then(cryptoData => cryptoData.forEach(crypto => renderOneCrypto(crypto)))
      }

    getAllCrypto();

    let moreInfo = document.getElementById('info')
    moreInfo.addEventListener('mouseover', () => {
      moreInfo.textContent = `${crypto.total_supply}`
    })

});
