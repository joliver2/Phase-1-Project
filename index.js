// makes sure JavaScript only runs after the window has loaded
if (typeof document !== 'undefined') {
  //Makes sure everything runs only after the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // function to create one card to display cryptocurrency info
    function renderOneCrypto(crypto) {
        let card = document.createElement('li')
        card.className = 'card'
        card.innerHTML = `
        <h2>${crypto.name}</h2>
        <div>
        <p class="info">Current Price: $${crypto.current_price} USD <br>
        Price Change (24hr): $${crypto.price_change_24h} <br>
        Price Change % (24hr): ${crypto.price_change_percentage_24h}%
        </p>
        <img src=${crypto.image}/>
        </div>
        `
      // adds the newly created card 
      document.querySelector('#crypto-container').append(card)

  }
    // function that creates cards for every cryptocurrency using forEach
    function getAllCrypto() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(res => res.json())
        .then(cryptoData => cryptoData.forEach( function(crypto) { 
       renderOneCrypto(crypto)
    }))
      }

    // calls the function that builds all of the crypto cards
    getAllCrypto();
    
    // page refresh button to update crypto pricing and info
    function refreshPage() {
      let refreshButton = document.querySelector("#refresh")
      refreshButton.addEventListener('click', function() {
      window.location.reload();
      });
    }

    // calls the function to refresh the page
    refreshPage();

    // arrow function to return results of searched cryptocurrency
    const searchResults = () => {
      const inputForm = document.querySelector('#search-form')
    
      inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.querySelector('#search');
        
        // if search results dont match a coin name, return "coin not found"
        fetch(`https://api.coingecko.com/api/v3/coins/${input.value.replace(/ /g,"-").toLowerCase()}`)
        .then(response => response.json())
        .then( function(crypto) {
          if (crypto.error === "coin not found") {
          let card = document.createElement('li')
          card.className = 'card'
          card.innerHTML = `
          <h2>Coin not found. Please check your spelling.</h2>
          `
        
        document.getElementById('crypto-container').innerHTML = "";
        document.querySelector('#crypto-container').append(card)

          }
          // fetches data from API and creates card for search results
          else {
          let card = document.createElement('li')
          card.className = 'card'
          card.innerHTML = `
          <h3>${crypto.name}</h3>
          <p class="info">Current Price: $${crypto.market_data.current_price.usd} USD <br>
          Price Change (24hr): $${crypto.market_data.price_change_24h_in_currency.usd} <br>
          High Price (24hr): $ ${crypto.market_data.high_24h.usd} <br>
          Low Price (24hr): $ ${crypto.market_data.low_24h.usd} 
          </p>
          <img src=${crypto.image.large}/>
          `
        
        document.getElementById('crypto-container').innerHTML = "";
        document.querySelector('#crypto-container').append(card)
          }
        });
      });
    }
    // execute search results function
    searchResults();
  });
}

