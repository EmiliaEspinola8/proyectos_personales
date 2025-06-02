const wapperModal = document.querySelector(".modal-wapper");
const modal = document.querySelector(".wapper-form");
const abrirModal = document.getElementById('abrirModal');
const nombre = document.getElementById('nombre');
const costo = document.getElementById('costo');
const precio = document.getElementById('precio');
const codigo = document.getElementById('codigo');
const categoria = document.getElementById('categoria');
const errorNombre = document.querySelector(".error-nombre");
const errorCodigo = document.querySelector(".error-codigo");
const errorCosto = document.querySelector(".error-costo");
const errorPrecio = document.querySelector(".error-precio");
const inputSubmit = document.querySelector(".input-submit");
const form = document.getElementById("form");
const icons = document.querySelectorAll(".icon");
const categorias = document.querySelector(".categorias");
const buttonClose = document.querySelector(".button-close");
const arrayProductos = [];
let idProducto = 0;

abrirModal.addEventListener('click', ()=> {
    wapperModal.classList.remove('hidden');
    modal.classList.remove('hidden');
});

buttonClose.addEventListener('click', ()=> {
    wapperModal.classList.add('hidden');
    modal.classList.add('hidden');
});

//esta función no se usa
/* const filasHTML = (codigo, nombre, categoria, margenPeso, margenPor, costo, precio) =>{
    let id = idProducto ++;

    // Creo todos los elementos de las fila de la tabla 
    const fragment = document.createDocumentFragment();
    const tabla = document.querySelector(".tbody");
    const fila = document.createElement("TR");
    const codigoElemento = document.createElement("TD");
    const nombreElemento = document.createElement("TD");
    const categoriaElemento = document.createElement("TD");
    const costoElemento = document.createElement("TD");
    const margenElemento = document.createElement("TD");
    const margenPorcentajeElemento = document.createElement("TD");
    const precioElemento = document.createElement("TD");
    const estadoElemento = document.createElement("TD");
    const activoElemento = document.createElement("DIV");
    const accionesElemento = document.createElement("TD");
    const editElemento = document.createElement("SPAN");
    const deleteElemento = document.createElement("SPAN");

    // agrego las clases a los elementos
    codigoElemento.classList.add("filas");
    nombreElemento.classList.add("filas");
    categoriaElemento.classList.add("filas");
    costoElemento.classList.add("filas");
    margenElemento.classList.add("filas");
    margenPorcentajeElemento.classList.add("filas");
    estadoElemento.classList.add("filas");
    precioElemento.classList.add("filas");
    accionesElemento.classList.add("filas");

    activoElemento.classList.add("activo");
    editElemento.classList.add("material-symbols-outlined" , "icon");
    deleteElemento.classList.add("material-symbols-outlined" , "icon");

    // agrego el contenido a los elementos
    deleteElemento.textContent = "edit";
    editElemento.textContent = "delete";
    activoElemento.textContent = "activo";

    codigoElemento.textContent = codigo;
    nombreElemento.textContent = nombre;
    categoriaElemento.textContent = categoria;
    margenElemento.textContent = `$ ${margenPeso.toFixed(2)}`;
    margenPorcentajeElemento.textContent = `${margenPor.toFixed(2)} %`;
    costoElemento.textContent = costo;
    precioElemento.textContent = precio;

    deleteElemento.setAttribute("value", id);
    editElemento.setAttribute("value", id);
    fila.classList.add(`.clase_${id}`);

    // agrego los elementos hijos de cada elemento
    estadoElemento.appendChild(activoElemento);
    accionesElemento.appendChild(editElemento);
    accionesElemento.appendChild(deleteElemento);

    fila.appendChild(codigoElemento);
    fila.appendChild(nombreElemento);
    fila.appendChild(categoriaElemento);
    fila.appendChild(costoElemento);
    fila.appendChild(margenElemento);
    fila.appendChild(margenPorcentajeElemento);
    fila.appendChild(precioElemento);
    fila.appendChild(estadoElemento);
    fila.appendChild(accionesElemento);
    
    fragment.appendChild(fila);
    tabla.appendChild(fragment);
} */

const calcularMargenPesos = (p_precio, p_costo)=> {
    resultado = p_precio - p_costo 
    return p_precio - p_costo;
}

const calcularMargenPorcentaje = (p_precio, p_margenPrecio)=> {
    return ((p_margenPrecio) / p_precio) * 100;
}

inputSubmit.addEventListener('click', (e)=>{
    e.preventDefault();

    let esValido = true;

    esValido &= validarCampos(nombre, 5, 50, errorNombre, "nombre");
    esValido &= validarCampos(codigo, 1, 100000000, errorCodigo, "código");
    esValido &= validarCampos(costo, 1, 100000000000, errorCosto, "costo");
    esValido &= validarCampos(precio, 1, 100000000000, errorPrecio, "precio");
    
    if (Boolean(esValido)) {
    let margenPesos = calcularMargenPesos(precio.value, costo.value);
    let margenporcentaje = calcularMargenPorcentaje(precio.value, margenPesos);

    añadirProducto(codigo.value, nombre.value, categorias.value, margenPesos, margenporcentaje, costo.value, precio.value);
    wapperModal.classList.add('hidden');
    modal.classList.add('hidden');
    limpiarCampos();
    }
});

const limpiarCampos = ()=>{
    codigo.value = "";
    nombre.value = "";
    costo.value = "";
    precio.value = "";
    categoria.value = "Cafetería";
}

const añadirProducto = (p_codigo, p_nombre, p_categoria, p_margenPeso, p_margenPor, p_costo, p_precio) =>{
    const tabla = document.querySelector(".tbody");
    let id = idProducto ++;

    let producto = {
        codigo: p_codigo,
        nombre: p_nombre,
        categoria: p_categoria,
        margenPeso: p_margenPeso,
        margenPorcentaje: p_margenPor,
        costo: p_costo,
        precio: p_precio,
        id: id
    }

    arrayProductos.push(producto);

    if (arrayProductos.length <= 6) {
        let htmlCode = `<tr class="clase_${id}">
                <td class="filas">${p_codigo}</td>
                <td class="filas">${p_nombre}</td>
                <td class="filas">${p_categoria}</td>
                <td class="filas">$ ${p_costo}</td>
                <td class="filas">$ ${p_margenPeso.toFixed(2)}</td>
                <td class="filas">${p_margenPor.toFixed(2)} %</td>
                <td class="filas">$ ${p_precio}</td>
                <td class="filas"> <div class="activo"> activo </div></td>
                <td class="filas"> 
                    <div>
                        <button class="material-symbols-outlined icon" value="${id}">edit</button>
                        <button class="material-symbols-outlined icon" value="${id}">delete</button>
                    </div>
                </td>
            </tr>`;
            
    tabla.innerHTML += htmlCode; 
    }else{
        alert("No se permite añadir mas productos");
    }
}

const validarCampos = (campo, min, max, classError, error)=>{

        if(campo.value.length < min || campo.value.length > max){
            classError.classList.remove('hidden')
            classError.innerHTML = `El ${error} no es válido`;
            return false;
        }else{
            classError.classList.add('hidden');
            return true;
        }
}

// Esta funciòn no se usa
/*     icons.forEach(boton => {
    boton.addEventListener('click', (e) => {
            const valor = e.target.value;
            const fila = document.querySelector(`.clase_${valor}`);
            fila.classList.add('hidden');
    });
}); */