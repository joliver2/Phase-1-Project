if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    
    function renderOneCrypto(crypto) {
        let card = document.createElement('li')
        card.className = 'card'
        card.innerHTML = `
        <h2>${crypto.name}</h2>
        <div>
        <p class="info">Current Price: $${crypto.current_price} USD <br>
        Price Change (24hr): $${crypto.price_change_24h}</p>
        <img src=${crypto.image}/>
        </div>
        `

      document.querySelector('#crypto-container').append(card)

  }

    function getAllCrypto() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(res => res.json())
        .then(cryptoData => cryptoData.forEach( function(crypto) { 
       renderOneCrypto(crypto)
    }))
      }

    getAllCrypto();

    function refreshPage() {
      let refreshButton = document.querySelector("#refresh")
      refreshButton.addEventListener('click', function() {
      window.location.reload();
      });
    }

    refreshPage();

    const searchResults = () => {
      const inputForm = document.querySelector('#search-form')
    
      inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.querySelector('#search');
    
        fetch(`https://api.coingecko.com/api/v3/coins/${input.value.toLowerCase()}`)
        .then(response => response.json())
        .then(crypto => {
          let card = document.createElement('li')
          card.className = 'card'
          card.innerHTML = `
          <h2>${crypto.name}</h2>
          <p class="info">Current Price: $${crypto.market_data.current_price.usd} USD <br>
          Price Change (24hr): $${crypto.market_data.price_change_24h_in_currency.usd}</p>
          <img src=${crypto.image.large}/>
          `
        document.body.innerHTML='';
        document.querySelector('body').appendChild(card)
        });
      });
    }
    searchResults();
  });
}
