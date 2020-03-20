function muestraRegistros(doc){
            
    var registro = new Registro(doc.id,doc.data().nombre,doc.data().codigo);
        
    let li = document.createElement("li");
    li.setAttribute("id", registro.id);

    let nombre = document.createElement("input");
    nombre.type = "text";
    nombre.value = registro.nombre;
    nombre.className = "nombre";
    nombre.disabled = "disabled";

    let nombre2 = document.createElement("label");
    nombre2.textContent = "Nombre: ";

    let codigo2 = document.createElement("label");
    codigo2.textContent = "Codigo: ";

    let codigo = document.createElement("input");
    codigo.type = "text";
    codigo.value = registro.codigo;
    codigo.className = "codigo ";
    codigo.disabled = "disabled";

    let borrar = document.createElement("button");
    borrar.className = "btn btn-danger m-3";
    borrar.textContent = "Borrar";

    let editar = document.createElement("button");
    editar.className = "btn btn-success m-3 botones ";
    editar.textContent = "Editar";
    editar.setAttribute("data-toggle", "modal");
    editar.setAttribute("data-target", "#ventanaeditar");

    li.appendChild(nombre2);
    li.appendChild(nombre);
    li.appendChild(codigo2);
    li.appendChild(codigo);
    
    li.appendChild(borrar);
    li.appendChild(editar);

    productoslista.appendChild(li);

    borrar.addEventListener("click", (e) => {   
        let id = e.target.parentElement.getAttribute("id");             
        registro.borrar(id);
    });

    editar.addEventListener("click", (e) => {   
        let id = e.target.parentElement.getAttribute("id");   
        registro.editar(id);
    });

}