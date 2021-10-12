function User(name, pass, favorites, logged, id) {
    this.name = name;
    this.pass = pass;
    this.favorites = favorites;
    this.logged = logged;
    this.id = id;
}

//Load logged user on site load
function addUserProfileIfLogged() {

    const localStorageContent = lsContent();

    const loggedUserCredentials = localStorageContent.find(item => item.logged == 1);


    if (loggedUserCredentials !== undefined && loggedUserCredentials.logged == 1) {

        const userID = loggedUserCredentials.name;

        document.getElementById('loginButton').innerText = 'Salir';
        document.getElementById('userProfile').innerHTML =
            `<span id="userProfileName" class="text-white mr-1">${userID}</span>
            <img class="profileImg mr-2" src="media/user.svg"></img>`;
    }
}

addUserProfileIfLogged()


//Create user modal modifier
function createUser() {
    document.getElementById('userID').placeholder = 'Ingrese nombre de usuario';
    document.getElementById('userPass').placeholder = 'Ingrese su contraseña';
    document.getElementById('modalTitle').innerText = 'Crear nuevo usuario';
}


//Login Modal
function openLoginModal() {
    const loginButton = document.getElementById('loginButton').innerText;
    if (loginButton == 'Salir') {
        document.getElementById('loginButton').innerText = 'Ingresar';
        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = '¡Hasta la proxima!';
        $('#popupModal').modal('show');
        getCoins();

        const loggedUserName = document.getElementById('userProfileName').innerHTML

        const localStorageContent = lsContent();

        let loggedUserCredentials = localStorageContent.find(item => item.name === loggedUserName);
        loggedUserCredentials.logged = 0;

        const loggedUserJSON = JSON.stringify(loggedUserCredentials);
        localStorage.setItem('User' + loggedUserCredentials.id, loggedUserJSON);

        document.getElementById('userProfile').innerHTML = "";
    }
    else {
        $('#loginModal').modal('show');
        $(function () {
            document.getElementById('userID').placeholder = 'Usuario';
            document.getElementById('userPass').placeholder = 'Contraseña';
            document.getElementById('modalTitle').innerText = 'Ingresar';
            clearLoginFields();
            $('[data-toggle="tooltip"]').tooltip();
        })
    }
};


//Login
function userCredentials() {

    const modalTitle = document.getElementById('modalTitle').innerText;

    const userID = document.getElementById('userID').value;
    const userPass = document.getElementById('userPass').value;
    const userFavorites = [];

    const localStorageContent = lsContent();
    let localStorageLenght = localStorage.length;

    const user = new User(userID, userPass, userFavorites, 1, localStorageLenght);
    const userJSON = JSON.stringify(user);

    var checkUserExist = localStorageContent.find(item => item.name === userID);

    function addUserProfile() {
        document.getElementById('loginButton').innerText = 'Salir';
        document.getElementById('userProfile').innerHTML =
            `<span id="userProfileName" class="text-white mr-1">${userID}</span>
            <img class="profileImg mr-2" src="media/user.svg"></img>`;
    }

    //Create User
    if (modalTitle == 'Crear nuevo usuario' && checkUserExist == null) {

        localStorage.setItem('User' + localStorageLenght, userJSON);

        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = '¡Usuario creado con éxito!';
        $('#popupModal').modal('show');
        document.getElementById('loginButton').innerText = 'Salir';

        clearLoginFields();
        addUserProfile();
        getCoins();

        //Username already exist
    } else if (modalTitle == 'Crear nuevo usuario' && checkUserExist !== null) {

        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = 'El nombre de usuario ya existe';
        $('#popupModal').modal('show');

        //User login doesn't exist
    } else if (checkUserExist == null) {
        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = 'Usuario o contraseña incorrectos';
        $('#popupModal').modal('show');

        //User login success
    } else if (checkUserExist.name == userID && checkUserExist.pass == userPass && modalTitle !== 'Crear nuevo usuario') {

        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = '¡Bienvenido nuevamente!';
        $('#popupModal').modal('show');
        addUserProfile();
        getCoins();

        checkUserExist.logged = 1;
        let loggedUserJSON = JSON.stringify(checkUserExist);
        localStorage.setItem('User' + checkUserExist.id, loggedUserJSON);

    } else {
        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = 'Usuario o contraseña incorrectos';
        $('#popupModal').modal('show');
    }
}

enterKeyEvent("userID", userCredentials);
enterKeyEvent("userPass", userCredentials);




