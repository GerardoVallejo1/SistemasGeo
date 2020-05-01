const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');
const datosdelacuenta = document.querySelector('.datosdelacuenta');
const titulo = document.querySelector('.titulo-fondo');
const fondo = document.querySelector('.fondo');

const configurarMenu = (user) => {

    if(user){
        db.collection('usuarios').doc(user.uid).get().then( doc=>{

            const html = `
            <div class="container-fluid text-center">
                <h3 style="margin-top:10px">Datos de usuario</h3>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: ${doc.data().nombre}</li>
                    <li class="list-group-item">Correo: ${user.email}</li>
                    <li class="list-group-item">Teléfono: ${doc.data().telefono}</li>
                    <li class="list-group-item">Dirección: ${doc.data().direccion}</li>
                </ul>
            </div>
            `;
            datosdelacuenta.innerHTML = html;
        });
        listaloggedin.forEach( item => item.style.display='block');
        listaloggedout.forEach( item => item.style.display='none');
        titulo.style.display='none';
        fondo.style ='background: #E5E5E5;';
    }else {
        fondo.style='background: linear-gradient(180deg, rgba(0,0,0,0.3225665266106442) 0%, rgba(0,0,0,0.3225665266106442) 48%, rgba(0,0,0,0.29175420168067223) 100%), url(imagenes/fondo.jpg);height: 92vh;background-size: cover;';
        listaloggedin.forEach( item => item.style.display='none');
        listaloggedout.forEach( item => item.style.display='block');
    }
};

const listadeplatillos = document.getElementById('listadeplatillos');
const obtienePlatillos = (data) => {
    if(data.length){
        let html = ``;
        data.forEach(doc=>{

            const platillo = doc.data();
            const columna = `
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="card">
                        <img class="card-img-top" src="imagenes/${platillo.imagen}" alt="${platillo.nombre}">
                        <div class="card-body" style="padding-bottom: 0;">
                            <h5 class="card-title">${platillo.nombre}</h5>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <a href="https://www.paypal.me/grupohernandezalba/${platillo.precio}" target="_blank"
                                    class="btn btn-social btn-google btn-outline-secondary" style="margin: 0px 0px 10px 0px !important;
                                    border-radius: 21px; padding-left: 20px;">Pagar Ahora</a>
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">$${platillo.precio}</small>
                        </div>
                    </div>
                </div>
            `;

            html += columna;
        });

        listadeplatillos.innerHTML = html;
    } else {
        listadeplatillos.innerHTML = ''
        titulo.style.display='block';
    }

}