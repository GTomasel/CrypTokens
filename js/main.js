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

const favoritesBtn = document.getElementById('favoritesBtn')
favoritesBtn.onclick = () => favoritesButton()


//Draw cards from congecko API
async function getCoins(qty = 20, currency = 'usd') {
    const APIurl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency='+currency+'&order=market_cap_desc&per_page='+qty+'&page=1&sparkline=false'
    const response = await fetch(APIurl)
    const data = await response.json()
    
    document.getElementById('cards').innerHTML = ""

    for (let i = 0; i < qty; i++){  
        const symbolMayus = data[i].symbol;
        let card = document.createElement('div');      
        card.innerHTML = 
                       `<div id="card${i}" class="card text-white bg-dark mb-3">
                            <div class="d-flex flex-row-reverse">
                                <div class="card-header">${data[i].name}</div>
                                <label class="idHidden d-flex"><input id="favCheckbox${i}" type="checkbox">${data[i].id}<svg id="favStar${i}" class="favStar" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 329.942 329.942" xml:space="preserve">
                                <path id="XMLID_16_" d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
                                    c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
                                    c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
                                    c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723l85.711-45.059
                                    l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15c0-1.152-0.13-2.275-0.376-3.352
                                    l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"/>
                                </label>
                            </div>
                            <div class="card-body flex-column">
                                <span class="title w-100">${symbolMayus.toUpperCase()}</span>
                                <span class="price w-100">$${data[i].current_price}</span>
                            </div>
                        </div>`;

        const coinID = data[i].id;
        const favCheckboxId = 'favCheckbox'+i;
        const favStar = 'favStar'+i;

        document.body.appendChild(card);
        document.getElementById('cards').appendChild(card);

        let localStorageLenght = localStorage.length;
        let localStorageContent = new Array;
    
        for (let i = 0; i < localStorageLenght; i++){
            let JSONparse = JSON.parse(localStorage.getItem('User'+i));
            localStorageContent.push(JSONparse);
        }
    
        const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);  
    
        if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1){

                
            for (let i = 0; i < loggedUserCredentials.favorites.length; i++){

                if(loggedUserCredentials.favorites[i] == coinID){

                document.getElementById(favCheckboxId).checked = true;  
                document.getElementById(favStar).classList.add('favStarChecked'); 
                document.getElementById(favStar).classList.remove('favStar');          

                }
            }
        }

        const checkbox = document.getElementById("favCheckbox"+i);

        checkbox.addEventListener("click", e => {
            if(e.target.checked == true){

                document.getElementById(favStar).classList.add('favStarChecked'); 
                document.getElementById(favStar).classList.remove('favStar');     

                let localStorageLenght = localStorage.length;
                let localStorageContent = new Array;
            
                for (let i = 0; i < localStorageLenght; i++){
                    let JSONparse = JSON.parse(localStorage.getItem('User'+i));
                    localStorageContent.push(JSONparse);
                }
            
                const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);  
            
                if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1){
            
                    const favoritesCheckedLocalStorage = loggedUserCredentials.favorites;
                    favoritesCheckedLocalStorage.push(checkbox.nextSibling.data);
                    loggedUserCredentials.favorites = favoritesCheckedLocalStorage;

                    const loggedUserJSON = JSON.stringify(loggedUserCredentials);
                    localStorage.setItem('User'+loggedUserCredentials.id, loggedUserJSON);

                }


            }else if (e.target.checked == false){

                document.getElementById(favStar).classList.remove('favStarChecked'); 
                document.getElementById(favStar).classList.add('favStar');     

                let localStorageLenght = localStorage.length;
                let localStorageContent = new Array;
            
                for (let i = 0; i < localStorageLenght; i++){
                    let JSONparse = JSON.parse(localStorage.getItem('User'+i));
                    localStorageContent.push(JSONparse);
                }
            
                const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);  
            
                if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1){

                    const favoritesCheckedLocalStorage = loggedUserCredentials.favorites;
            
                    for(let i = 0; i < favoritesCheckedLocalStorage.length; i++){ 

                        if ( favoritesCheckedLocalStorage[i] == checkbox.nextSibling.data) { 
                    
                            favoritesCheckedLocalStorage.splice(i, 1); 
                        }
                    
                    }
    
                    loggedUserCredentials.favorites = favoritesCheckedLocalStorage;                    

                    const loggedUserJSON = JSON.stringify(loggedUserCredentials);
                    localStorage.setItem('User'+loggedUserCredentials.id, loggedUserJSON);

                }
                
            }
        });
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
        card.innerHTML = 
                        `<div id="card${0}" class="card text-white bg-dark mb-3">
                            <div class="d-flex flex-row-reverse">
                                <div class="card-header">${data[0].name}</div>
                                <label class="idHidden d-flex"><input id="favCheckbox${0}" type="checkbox">${data[0].id}<svg id="favStar${0}" class="favStar" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 329.942 329.942" xml:space="preserve">
                                <path id="XMLID_16_" d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
                                    c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
                                    c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
                                    c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723l85.711-45.059
                                    l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15c0-1.152-0.13-2.275-0.376-3.352
                                    l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"/>
                                </label>
                            </div>
                            <div class="card-body flex-column">
                                <span class="title w-100">${symbolMayus.toUpperCase()}</span>
                                <span class="price w-100">$${data[0].current_price}</span>
                            </div>
                        </div>`;

        const coinID = data[0].id;
        const favCheckboxId = 'favCheckbox'+0;
        const favStar = 'favStar'+0;

        document.body.appendChild(card);
        document.getElementById('cards').appendChild(card);

        let localStorageLenght = localStorage.length;
        let localStorageContent = new Array;
    
        for (let i = 0; i < localStorageLenght; i++){
            let JSONparse = JSON.parse(localStorage.getItem('User'+i));
            localStorageContent.push(JSONparse);
        }
    
        const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);  
    
        if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1){

            for (let i = 0; i < loggedUserCredentials.favorites.length; i++){

                if(loggedUserCredentials.favorites[i] == coinID){

                document.getElementById(favCheckboxId).checked = true;                    
                document.getElementById(favStar).classList.add('favStarChecked'); 
                document.getElementById(favStar).classList.remove('favStar');  
                }

            }

        }

        const checkbox = document.getElementById("favCheckbox"+0);

        checkbox.addEventListener("click", e => {
            if(e.target.checked == true){

                document.getElementById(favStar).classList.add('favStarChecked'); 
                document.getElementById(favStar).classList.remove('favStar');  

                let localStorageLenght = localStorage.length;
                let localStorageContent = new Array;
            
                for (let i = 0; i < localStorageLenght; i++){
                    let JSONparse = JSON.parse(localStorage.getItem('User'+i));
                    localStorageContent.push(JSONparse);
                }
            
                const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);  
            
                if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1){
            
                    const favoritesCheckedLocalStorage = loggedUserCredentials.favorites;
                    favoritesCheckedLocalStorage.push(checkbox.nextSibling.data);
                    loggedUserCredentials.favorites = favoritesCheckedLocalStorage;

                    const loggedUserJSON = JSON.stringify(loggedUserCredentials);
                    localStorage.setItem('User'+loggedUserCredentials.id, loggedUserJSON);

                }


            }else if (e.target.checked == false){

                document.getElementById(favStar).classList.remove('favStarChecked'); 
                document.getElementById(favStar).classList.add('favStar');  

                let localStorageLenght = localStorage.length;
                let localStorageContent = new Array;
            
                for (let i = 0; i < localStorageLenght; i++){
                    let JSONparse = JSON.parse(localStorage.getItem('User'+i));
                    localStorageContent.push(JSONparse);
                }
            
                const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);  
            
                if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1){

                    const favoritesCheckedLocalStorage = loggedUserCredentials.favorites;
            
                    for(let i = 0; i < favoritesCheckedLocalStorage.length; i++){ 

                        if ( favoritesCheckedLocalStorage[i] == checkbox.nextSibling.data) { 
                    
                            favoritesCheckedLocalStorage.splice(i, 1); 
                        }
                    
                    }
    
                    loggedUserCredentials.favorites = favoritesCheckedLocalStorage;

                    const loggedUserJSON = JSON.stringify(loggedUserCredentials);
                    localStorage.setItem('User'+loggedUserCredentials.id, loggedUserJSON);

                }
            }
        });

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