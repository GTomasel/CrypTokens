function User(name, pass, favorites) {
    this.name = name;
    this.pass = pass;
    this.favorites = favorites;
}


//Create user modal modifier
function createUser(){
    document.getElementById('userID').placeholder = 'Ingrese nombre de usuario';
    document.getElementById('userPass').placeholder = 'Ingrese su contraseña';
    document.getElementById('modalTitle').innerText = 'Crear nuevo usuario';
}


//Login Modal
function openLoginModal() { 
    const loginButton = document.getElementById('loginButton').innerText;   
    if (loginButton == 'Salir'){
        document.getElementById('loginButton').innerText = 'Ingresar';
        $('#loginModal').modal('hide');
        document.getElementById('popupModalLabel').innerText = 'Hasta la proxima!';
        $('#popupModal').modal('show');
        document.getElementById('userProfile').innerHTML = "";
    }
    else{         
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
function userCredentials(){

    const modalTitle = document.getElementById('modalTitle').innerText;

    const userID = document.getElementById('userID').value;
    const userPass = document.getElementById('userPass').value;
    const userFavorites = "";

    const user = new User (userID, userPass, userFavorites);
    const userJSON = JSON.stringify(user);  

    const localStorageLenght = localStorage.length;
    var localStorageContent = new Array;

    for (let i = 0; i < localStorageLenght; i++){
        let JSONparse = JSON.parse(localStorage.getItem('User'+i));
        localStorageContent.push(JSONparse);
    }
    var checkUserExist = localStorageContent.find(item => item.name === userID);

    function addUserProfile(){
        document.getElementById('loginButton').innerText = 'Salir';            
        document.getElementById('userProfile').innerHTML = 
            `<span class="text-white mr-1">${userID}</span>
            <img class="profileImg mr-2" src="../media/user.svg"></img>`; 
    }
   
    //Create User
    if (modalTitle == 'Crear nuevo usuario' && checkUserExist == null){             
    
    localStorage.setItem('User'+localStorageLenght, userJSON);
    
    $('#loginModal').modal('hide');
    document.getElementById('popupModalLabel').innerText = 'Usuario creado con éxito!';
    $('#popupModal').modal('show');
    document.getElementById('loginButton').innerText = 'Salir';

    clearLoginFields();
    addUserProfile();
    
    //Username already exist
    }else if (modalTitle == 'Crear nuevo usuario' && checkUserExist !== null){

        $('#loginModal').modal('hide');    
        document.getElementById('popupModalLabel').innerText = 'El nombre de usuario ya existe';
        $('#popupModal').modal('show');
        
        //User login doesn't exist
        }else if (checkUserExist == null){
            $('#loginModal').modal('hide');    
            document.getElementById('popupModalLabel').innerText = 'Usuario o contraseña incorrectos';
            $('#popupModal').modal('show');

            //User login success
            }else if(checkUserExist.name == userID && checkUserExist.pass == userPass && modalTitle !== 'Crear nuevo usuario'){

                $('#loginModal').modal('hide');
                document.getElementById('popupModalLabel').innerText = 'Bienvenido nuevamente!';
                $('#popupModal').modal('show');
                addUserProfile()          
        
                }else{
                    $('#loginModal').modal('hide');    
                    document.getElementById('popupModalLabel').innerText = 'Usuario o contraseña incorrectos';
                    $('#popupModal').modal('show');
                    }
}




