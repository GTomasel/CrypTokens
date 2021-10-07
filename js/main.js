//Button event actions
const startButton = document.getElementById('startButton')
startButton.onclick = () => getCoins()

const loginButton = document.getElementById('loginButton')
loginButton.onclick = () => openLoginModal()

const okButton = document.getElementById('okButton')
okButton.onclick = () => userCredentials()

const createUserBtn = document.getElementById('createUser')
createUserBtn.onclick = () => createUser()

const searchBtn = document.getElementById('searchBtn')
searchBtn.onclick = () => searchCoin()


//Draw cards from congecko API
async function getCoins(qty = 10) {
    const APIurl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page='+qty+'&page=1&sparkline=false'
    const response = await fetch(APIurl)
    const data = await response.json()
    
    document.getElementById('cards').innerHTML = ""

    for (let i = 0; i < qty; i++){        
        const symbolMayus = data[i].symbol;
        let card = document.createElement('div');      
        card.innerHTML = 
                       `<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                        <div class="card-header">${data[i].name}</div>
                        <div class="card-body flex-column">
                            <span class="title w-100">${symbolMayus.toUpperCase()}</span>
                            <span class="price w-100">$${data[i].current_price}</span>
                        </div>
                        </div>`;
        document.body.appendChild(card);
        document.getElementById('cards').appendChild(card);
    }
}
getCoins()


//Search
async function searchCoin() {
    let resultSearch = document.getElementById("searchField").value;
    let id = resultSearch.toLowerCase();

    const APIurlSearch = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+id+'&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    const response = await fetch(APIurlSearch)
    const data = await response.json()

    if (data[0] == null || id.length == 0){
        document.getElementById('popupModalLabel').innerText = 'No se encontró el token';
        $('#popupModal').modal('show');
        document.getElementById('searchField').value = '';
    } 
    else{
        document.getElementById('cards').innerHTML = ""

        const symbolMayus = data[0].symbol;
        let card = document.createElement('div');   
        card.innerHTML =   `<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                            <div class="card-header">${data[0].name}</div>
                            <div class="card-body flex-column">
                                <span class="title w-100">${symbolMayus.toUpperCase()}</span>
                                <span class="price w-100">$${data[0].current_price}</span>
                            </div>
                            </div>`;
        document.body.appendChild(card);
        document.getElementById('cards').appendChild(card);
        document.getElementById('searchField').value = '';
    }
}


//Dropdown
$(".dropdown-menu li a").click(function(){
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html('<span class="itemsQty">'+selText+'</span>');
    getCoins(selText)
});


//Clear
function clearLoginFields(){
    document.getElementById('userID').value = "";
    document.getElementById('userPass').value = "";
}


// function showUsername(){
//     const user = document.getElementById('userID').value;
//     let showUsername = document.createElement('div');   
//         showUsername.innerHTML = `<img src="../images/user.png" alt="Imagen de perfil de usuario"></img>
//                                  <span>${user}</span>`;
//         document.body.appendChild(card);
        
//         document.getElementById('navbar').appendChild(showUsername);
// }

