auth.onAuthStateChanged(user =>{
    console.log(user);//saber si hay algun cambio con los usuarios

    

    if (user){

        if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition( position => {
                
                var pos = { 
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
    
                db.collection('usuarios').doc(uid).update({
                    coordenadas : {
                        latitude :  position.coords.latitude,
                        longitude : position.coords.longitude
                    }
                });
    
    
            });
    
        }

        db.collection('usuarios').onSnapshot(snapshot =>{
            obtieneAmigos(snapshot.docs);
            configurarMenu(user);
        }, err => {
            console.log(err.message);
        });

        var name, email, photoUrl, uid, emailVerified;

        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  
        
        console.log('UID:',uid);
        
        
        db.collection('platillos').onSnapshot(snapshot =>{
            obtienePlatillos(snapshot.docs);
        });
        configurarMenu(user);
    }else {
        obtienePlatillos([]);//arreglo vacio
        obtieneAmigos([]);
        configurarMenu();
        console.log('Usuario salió');
    }
});

const formaingresar = document.getElementById('formaingresar');

formaingresar.addEventListener('submit', (e) =>{
    e.preventDefault();//evitar que se recarge

    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo, contrasena).then(cred =>{
        console.log('entrar');
        //cerrar modal despues de inicar sesion
        $('#miingresa').modal('hide');
        //resetear el formulario
        formaingresar.reset();
        formaingresar.querySelector('.error').innerHTML='';

    }).catch(err =>{
        formaingresar.querySelector('.error').innerHTML=mensajeError(err.code);
        console.log (err);
    });
});

function mensajeError(codigo) {
    let mensaje = ' ';
    switch (codigo) {
        case 'auth/wrong-password':
            mensaje = 'Contraseña invalida';
            break;
        case 'auth/user-not-found':
            mensaje = 'Usuario no encontrado';
            break;
        case 'auth/weak-password':
            mensaje = 'La contraseña es débil';
            break;
        default:
            mensaje = 'Algo salio mal';
    }
    return mensaje;
}

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then ( ()=>{
        alert('Se ha cerrado sesión');
    });
});

const formaregistro = document.getElementById('formaregistro');

formaregistro.addEventListener('submit', (e)=>{
    e.preventDefault();

    const correo = formaregistro['rcorreo'].value;
    const contrasena = formaregistro['rcontrasena'].value;

    auth.createUserWithEmailAndPassword(correo, contrasena).then( cred =>{//then es cuando no sabemos cuanto va a tardar y funciona como una promesa
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaregistro['rnombre'].value,
            telefono: formaregistro['rtelefono'].value,
            direccion: formaregistro['rdireccion'].value
        });
    }).then( ()=>{
        $('#miregistro').modal('hide');
        formaregistro.reset();
        formaregistro.querySelector('.error').innerHTML='';
    }).catch( err=>{
        formaregistro.querySelector('.error').innerHTML=mensajeError(err.code);
    });
});

entrarGoogle = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);
        var user = result.user;

            console.log(user);
            const html = `
            <div class="container-fluid text-center">
                <h3 style="margin-top:10px">Datos de usuario</h3>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: ${ user.displayName }</li>
                    <li class="list-group-item">Correo: ${ user.email}</li>
                    <li class="list-group-item"><img src="${ user.photoURL }" width="50px"></li>
                </ul>
            </div>
            `;
            datosdelacuenta.innerHTML = html;
            $('#miingresa').modal('hide');
            formaingresar.reset();
            formaingresar.querySelector('.error').innerHTML = '';
        }).catch(function(error) {
            console.log(error);
    });
}