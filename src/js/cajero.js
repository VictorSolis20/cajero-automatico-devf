const contenido = document.querySelector('.contenido');
const templateLogin = document.getElementById('template-informacionLogin').content;
const templateMovimientoCuenta = document.getElementById('template-movimientoCuenta').content;
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const botonUsuarios = templateCard.querySelector('button'); //Selecciona el botón seleccionar que esta en la interfaz usuarios
const seleccionaUsuarios = document.querySelector('.usuarios');
const botonInicio = templateLogin.querySelector('.botonInicio');
const btnCerrarSesion = templateMovimientoCuenta.getElementById('cerrarSesion');
const fragment = document.createDocumentFragment();
// Declaración de variables
var idUsuarioSeleccionado;
var saldoUsuarioSeleccionado;
var imgUsuarioSeleccionado;
var nombreUsuarioSeleccionado;
var usuarioContrasenaUsuarioSeleccionado;
var usuarioFormulario;
var contrasenaFormulario;
var usuarioContrasenaFormulario;
let cantidadRetiro;
let cantidadDeposito;
let saldoActualizado;

//Verifica si el documento HTML inicial se ha cargado y analizado por completo.
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); //Extrae los elementos del api.json
})

//Aplica el evento click a los elementos del div con el id items.
items.addEventListener('click', e => {
    addBotonSeleccionarUsuario(e); //Función para realizar operaciones al presionar el botón seleccionar usuario.
})

//Aplica el evento click a los elementos del div con la clase contenido.
contenido.addEventListener('click', e => {
    addBotonInicio(e); //Función para realizar operaciones al presionar el botón ingresar.
    addBotonDepositar(e); //Función para realizar operaciones al presionar el botón depositar.
    addBotonRetirar(e); //Función para realizar operaciones al presionar el botón retirar.
    addBotonCerrarSesion(e); //Función para el botón de cerrar sesión
})

//Función para extraer los elementos del api.json
const fetchData = async () => {
    try {
        const res = await fetch('api.json'); //Se crea la constante res que recibe la información del api.json
        const data = await res.json(); //Se crea la constante data la cual recibe el array de datos.
        pintarCards(data); //Función para crear las tarjetas con los datos de cada usuario.
    } catch (error) {
        console.log(error);
    }
}

//Función en la cual se asignan los valores extraidos del api.json a las tarjeta de cada usuario.
const pintarCards = data => {
    data.forEach(usuario => {
        templateCard.querySelector('h5').textContent = usuario.nombre;
        templateCard.querySelector('h5').dataset.name = usuario.saldo;
        templateCard.querySelector('h5').dataset.id = usuario.ImagenUrl;
        templateCard.querySelector('img').setAttribute("src", usuario.ImagenUrl);
        templateCard.querySelector('.btn-primary').dataset.id = usuario.id;
        templateCard.querySelector('.btn-primary').name = usuario.usuario + usuario.contrasena; //Crea un name con el usuario y contraseña
        const clone = templateCard.cloneNode(true); //Se crea la constante clone en la cual se almacena un clon del templateCard.
        fragment.appendChild(clone); //Se le aplica al fragment el appendChild con el parámetro clone.
    })
    items.appendChild(fragment); //Se le aplica al items el appendChild con el parámetro fragment.
}

//Función para seleccionar los elementos del botón seleccionar.
const addBotonSeleccionarUsuario = e => {
    //Evalua si existe un elemento con la clase btn-primary 
    if (e.target.classList.contains('btn-primary')) {
        elementosBotonSeleccionarUsuario(e.target.parentElement);
        contenido.innerHTML = ''; //Elimina todos los elemntos que contiene la etiqueta div con la clase contenido en el HTML.
        llamaLogin();
    }
    e.stopPropagation(); //Evita la propagación adicional del evento actual en las fases de captura y bubbling.
}

//Función para extraer el valor de los elementos que se obtuvieron al dar click en el botón seleccionar.
const elementosBotonSeleccionarUsuario = objeto => {
    //Se le asigna a los atributos del objeto usuario el valor de los elementos del usuario seleccionado.
    const usuario = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        img: objeto.querySelector('h5').dataset.id,
        saldo: objeto.querySelector('h5').dataset.name,
        usuarioContrasena: objeto.querySelector('.btn-primary').name,
    }

    //Se le asigna el valor del usuario seleccionado a las variables.
    idUsuarioSeleccionado = usuario.id;
    nombreUsuarioSeleccionado = usuario.nombre;
    imgUsuarioSeleccionado = usuario.img;
    saldoUsuarioSeleccionado = usuario.saldo;
    usuarioContrasenaUsuarioSeleccionado = usuario.usuarioContrasena;
    saldoActualizado = usuario.saldo;
}

//Función para crear a la interfaz del login.
function llamaLogin() {
    const clone = templateLogin.cloneNode(true); //Crea a la constante clone la cual recibe el clon del nodo templateLogin.
    fragment.appendChild(clone); //Se le aplica al fragment el appendChild con el parámetro clone.
    contenido.appendChild(fragment); //Se le aplica al contenido el appendChild con el parámetro fragment.
}

//Función para seleccionar los elementos del botón ingresar.
function addBotonInicio(e) {
    //Evalua si existe un elemento con la clase botonInicio
    if (e.target.classList.contains('botonInicio')) {
        elementosBotonInicio(e.target.parentElement);
        llamaMovimientoCuenta();
    }
}

//Función para extraer el valor de los elementos que se obtuvieron al dar click en el botón ingresar.
const elementosBotonInicio = objeto => {
    const elementosLogin = {
        usuario: objeto.getElementsByTagName('input')[0].value,
        contrasena: objeto.getElementsByTagName('input')[1].value
    }
    usuarioFormulario = elementosLogin.usuario;
    contrasenaFormulario = elementosLogin.contrasena;
    usuarioContrasenaFormulario = usuarioFormulario + contrasenaFormulario;
}

//Función para evaluar el texto ingresado en el formulario del login.
function llamaMovimientoCuenta() {
    if (usuarioFormulario == "" || contrasenaFormulario == "") {  //Evalua que ningún input del formulario este vacio.
        alert("🚫 No se pueden dejar campos sin rellenar 🚫");
    } else if (usuarioContrasenaFormulario == usuarioContrasenaUsuarioSeleccionado) { //Evalua el usuario y contraseña ingresado con el guardado del usuario seleccionado.
        contenido.innerHTML = ''; //Elimina todos los elemntos que contiene la etiqueta div con la clase contenido en el HTML.
        actualizarDatosMovimientoCuenta(); //Actualiza los datos de la cuenta con los datos del usuario seleccionado.
        const clone = templateMovimientoCuenta.cloneNode(true); //Crea a la constante clone la cual recibe el clon del nodo templateMovimientoCuenta.
        fragment.appendChild(clone); //Se le aplica al fragment el appendChild con el parámetro clone.
        contenido.appendChild(fragment); //Se le aplica al contenido el appendChild con el parámetro fragment.
    } else {
        alert("⚠ Usuario y/o contraseña incorrectos ⚠");
    }
}

//Función para actualizar los datos de la cuenta del usuario seleccionado.
function actualizarDatosMovimientoCuenta() {
    const valor = templateMovimientoCuenta.querySelector('.navbar-brand');
    const saldo = templateMovimientoCuenta.querySelector('.saldoDisponible');
    valor.querySelector('img').setAttribute("src", imgUsuarioSeleccionado);
    valor.querySelector('span').textContent = nombreUsuarioSeleccionado;
    if (localStorage.getItem(String(idUsuarioSeleccionado))) { //Evalua si existe un valor guardado en el localStorage con el identificador del id del usuario seleccionado.
        let valorSaldoGuardado = localStorage.getItem(String(idUsuarioSeleccionado)); //Se asigana el valor guardado en el localStorage a la variable valorSaldoGuardado
        saldo.querySelector('p').textContent = "$ " + valorSaldoGuardado; //Asigna el valor del saldo para mostrarlo en pantalla
        saldoActualizado = valorSaldoGuardado; //Se le asigna a la valiable saldoActualizado el valor del saldo guardado.
    } else {
        saldo.querySelector('p').textContent = "$ " + saldoUsuarioSeleccionado; //En caso de que no haiga ningun valor guardado con el identificador del id del usuario seleccionado.
    }
}

// --------------- Operaciones para hacer un deposito de dinero ---------------

//Función para seleccionar los elementos del botón depositar.
function addBotonDepositar(e) {
    //Evalua si existe un elemento con la clase depositar.
    if (e.target.classList.contains('depositar')) {
        elementosBotonDepositar(e.target.parentElement);
        operacionDeposito(e.target.parentElement); //El atributo que recibe es para poder recibir el valor del input
    }
}

//Función para extraer el valor de los elementos que se obtuvieron al dar click en el botón depositar.
const elementosBotonDepositar = objeto => {
    const elementosDeposito = {
        montoDeposito: objeto.querySelector('input').value
    }
    cantidadDeposito = elementosDeposito.montoDeposito;
}

//Función para realizar las operaciones de deposito del usuario seleccionado.
//Se aplica la regla de negocio, una cuenta no debe de tener más de $990 y menos de $10.
function operacionDeposito(valorInput) {
    const saldo = contenido.querySelector('.saldoDisponible');
    let suma = parseFloat(saldoActualizado) + parseFloat(cantidadDeposito);
    let resta;
    if (cantidadDeposito <= 0) {
        alert("🚫 La cantidad del deposito debe ser mayor a $0.00 🚫");
    } else if (saldoActualizado == 990) {
        alert("⚠ Lo sentimos no se puede realizar el deposito debido a que su cuenta tiene un saldo de $990.00 ⚠");
    } else if (suma > 990) {
        resta = 990 - saldoActualizado;
        alert(`⚠ El deposito no debe ser mayor a $${resta} por que no puede tener un saldo mayor a $990.00 ⚠`);
    } else if (suma <= 990) {
        saldoActualizado = suma;
        alert(`✅ El depósito se realizó con éxito ✅ \nMonto depositado: $${parseFloat(cantidadDeposito)} \nSaldo disponible: $${parseFloat(saldoActualizado)}`);
        saldo.querySelector('p').textContent = "$ " + parseFloat(saldoActualizado);
    }
    valorInput.querySelector('input').value = "";
    cantidadDeposito = 0;
    suma = 0;
    resta = 0;
}

// --------------- Operaciones para hacer un retiro de dinero ---------------

//Función para seleccionar los elementos del botón retirar.
function addBotonRetirar(e) {
    //Evalua si existe un elemento con la clase retirar.
    if (e.target.classList.contains('retirar')) {
        elementosBotonRetirar(e.target.parentElement);
        operacionRetirar(e.target.parentElement); //El atributo que recibe es para poder recibir el valor del input
    }
}

//Función para extraer el valor de los elementos que se obtuvieron al dar click en el botón retirar.
const elementosBotonRetirar = objeto => {
    const elementosRetiro = {
        montoRetiro: objeto.querySelector('input').value
    }
    cantidadRetiro = elementosRetiro.montoRetiro;
}

//Función para realizar las operaciones de retiro del usuario seleccionado.
//Se aplica la regla de negocio, una cuenta no debe de tener más de $990 y menos de $10.
function operacionRetirar(valorInput) {
    const saldo = contenido.querySelector('.saldoDisponible');
    let resta = parseFloat(saldoActualizado) - parseFloat(cantidadRetiro);
    let sugerenciaResta;
    if (cantidadRetiro <= 0) {
        alert("🚫 La cantidad a retirar debe ser mayor a $0.00 🚫");
    } else if (saldoActualizado == 10) {
        alert("⚠ Lo sentimos no se puede realizar el retiro de efectivo debido a que su cuenta tiene un saldo de $10.00 ⚠");
    } else if (resta < 10) {
        sugerenciaResta = saldoActualizado - 10;
        alert(`⚠ El retiro no debe ser mayor a $${sugerenciaResta} por que no puede tener un saldo menor a $10.00 ⚠`);
    } else if (resta >= 10) {
        saldoActualizado = resta;
        alert(`✅ El retiro se realizó con éxito ✅ \nMonto retirado: $${parseFloat(cantidadRetiro)} \nSaldo disponible: $${parseFloat(saldoActualizado)}`);
        saldo.querySelector('p').textContent = "$ " + parseFloat(saldoActualizado);
    }
    valorInput.querySelector('input').value = "";
    cantidadRetiro = 0;
    resta = 0;
}

// ----------- Operaciones para poder cerrar sesión con el botón -----------------

//Función para seleccionar los elementos del botón cerrar sesión.
function addBotonCerrarSesion(e) {
    //Evalua si existe un elemento con la clase cerrarSesion.
    if (e.target.classList.contains('cerrarSesion')) {
        //Al dar click en el botón cerrar sesión se guarda en el localStorage
        //el valor del saldo actualizado con el identificador del id del usuario seleccionado.
        localStorage.setItem(String(idUsuarioSeleccionado), saldoActualizado);
        location.reload(); //Este método hace que la página se vuelva a cargar.
    }
}

