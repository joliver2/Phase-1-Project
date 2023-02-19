document.addEventListener("DOMContentLoaded", () => {
    
    function renderOneCrypto(crypto) {
        let card = document.createElement('li')
        card.className = 'card'
        card.innerHTML = `
        <h2>${crypto.name}</h2>
        <p id="info">Current Price: $${crypto.current_price} USD <br>
        Price Change (24hr): $${crypto.price_change_24h}</p>
        <img src=${crypto.image}/>
        <div id="extraInfo"></div>
        `

      document.querySelector('body').appendChild(card)

  }

    function getAllCrypto() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(res => res.json())
        .then(cryptoData => cryptoData.forEach( function(crypto) { 
          
        renderOneCrypto(crypto)
        let moreInfo = document.getElementById('info')
        moreInfo.addEventListener('mouseover', function() {
        moreInfo.textContent = `${crypto.total_supply}`;
        
       })
        
    }))
      }

    getAllCrypto();
    
  //   function mouseOver() {
  //   let moreInfo = document.getElementById('moreInfo')
  //   moreInfo.addEventListener('onmouseover', function() {
  //   moreInfo.textContent = `${crypto.total_supply}`
  //   })
  // }

  // mouseOver()

    function refreshPage() {
      let refreshButton = document.querySelector("#refresh")
      refreshButton.addEventListener('click', function() {
      window.location.reload();
      });
    }

    refreshPage();
});
