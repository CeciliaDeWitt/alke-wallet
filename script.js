console.log("Script cargado correctamente");

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let email;
        let password;

        if (window.jQuery) {
            email = $("#email").val();
            password = $("#password").val();
        } else {
            email = document.getElementById("email").value;
            password = document.getElementById("password").value;
        }

        const mensaje = document.getElementById("mensaje");

        if (email === "usuario@gmail.com" && password === "1234") {
            mensaje.innerHTML = `
                <div class="alert alert-success mt-3">
                    Inicio de sesión exitoso. Redirigiendo al menú principal...
                </div>
            `;

            setTimeout(function () {
                window.location.href = "menu.html";
            }, 1500);

        } else {
            mensaje.innerHTML = `
                <div class="alert alert-danger mt-3">
                    Email o contraseña incorrectos.
                </div>
            `;
        }
    });
}
// MENÚ
function redirigir(nombrePantalla, archivo) {
    const mensajeMenu = document.getElementById("mensajeMenu");

    if (mensajeMenu) {
        mensajeMenu.innerHTML = "Redirigiendo a " + nombrePantalla + "...";
    }

    setTimeout(function () {
        window.location.href = archivo;
    }, 1500);
}

// MOSTRAR SALDO EN MENÚ
const saldoMenu = document.getElementById("saldo");

if (saldoMenu) {
    let saldo = Number(localStorage.getItem("saldo")) || 60000;
    saldoMenu.innerHTML = "$" + saldo;
}

// MOSTRAR SALDO EN DEPÓSITO
const saldoActual = document.getElementById("saldoActual");

if (saldoActual) {
    let saldo = Number(localStorage.getItem("saldo")) || 60000;
    saldoActual.innerHTML = "$" + saldo;
}

// DEPÓSITO
const btnDeposito = document.getElementById("btnDeposito");

if (btnDeposito) {
    btnDeposito.addEventListener("click", function () {
        const monto = Number(document.getElementById("montoDeposito").value);

        if (monto <= 0) {
            document.getElementById("mensajeDeposito").innerHTML =
                "Ingrese un monto válido.";
            return;
        }

        let saldo = Number(localStorage.getItem("saldo")) || 60000;
        saldo = saldo + monto;

        localStorage.setItem("saldo", saldo);

        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push("Depósito: $" + monto);
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        document.getElementById("mensajeDeposito").innerHTML = `
            <div class="alert alert-success mt-3">
                Depósito realizado con éxito.<br>
                Monto depositado: $${monto}
            </div>
        `;

        setTimeout(function () {
            window.location.href = "menu.html";
        }, 2000);
    });
}

// AGREGAR CONTACTO
const btnAgregarContacto = document.getElementById("btnAgregarContacto");
const formContacto = document.getElementById("formContacto");
const btnGuardarContacto = document.getElementById("btnGuardarContacto");
const btnCancelarContacto = document.getElementById("btnCancelarContacto");

if (btnAgregarContacto) {
    btnAgregarContacto.addEventListener("click", function () {
        formContacto.style.display = "block";
    });
}

if (btnCancelarContacto) {
    btnCancelarContacto.addEventListener("click", function () {
        formContacto.style.display = "none";
    });
}

if (btnGuardarContacto) {
    btnGuardarContacto.addEventListener("click", function () {

        const nombre = document.getElementById("nombreContacto").value;
        const cbu = document.getElementById("cbuContacto").value;
        const alias = document.getElementById("aliasContacto").value;
        const banco = document.getElementById("bancoContacto").value;

        if (nombre === "" || cbu === "" || alias === "" || banco === "") {

            document.getElementById("mensajeEnviar").innerHTML =
                "Debes completar todos los campos.";

            return;
        }

        document.getElementById("mensajeEnviar").innerHTML =
            "Contacto agregado correctamente: " + nombre;

        formContacto.style.display = "none";
    });
}


// ENVIAR DINERO
const btnEnviarDinero = document.getElementById("btnEnviarDinero");

if (btnEnviarDinero) {
    btnEnviarDinero.addEventListener("click", function () {
        const monto = Number(document.getElementById("montoEnvio").value);
        let saldo = Number(localStorage.getItem("saldo")) || 60000;

        if (monto <= 0) {
            document.getElementById("mensajeEnviar").innerHTML =
                "Ingrese un monto válido.";
        } else if (monto > saldo) {
            document.getElementById("mensajeEnviar").innerHTML =
                "No tienes saldo suficiente.";
        } else {
            saldo = saldo - monto;

            localStorage.setItem("saldo", saldo);

            let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
            movimientos.push("Transferencia: $" + monto);
            localStorage.setItem("movimientos", JSON.stringify(movimientos));

            document.getElementById("mensajeEnviar").innerHTML =
                "Transferencia realizada. Nuevo saldo: $" + saldo;
        }
    });
}

// ÚLTIMOS MOVIMIENTOS
const listaMovimientos = document.getElementById("listaMovimientos");
const filtroMovimientos = document.getElementById("filtroMovimientos");

function limpiarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function mostrarUltimosMovimientos(filtro) {
    if (!listaMovimientos) return;

    listaMovimientos.innerHTML = "";

    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    const filtroLimpio = limpiarTexto(filtro);

    movimientos.forEach(function (movimiento) {
        const movimientoLimpio = limpiarTexto(movimiento);

        if (filtroLimpio === "todos" || movimientoLimpio.includes(filtroLimpio)) {
            const item = document.createElement("li");
            item.textContent = movimiento;
            listaMovimientos.appendChild(item);
        }
    });
}

if (listaMovimientos) {
    mostrarUltimosMovimientos("todos");
}

if (filtroMovimientos) {
    filtroMovimientos.addEventListener("change", function () {
        mostrarUltimosMovimientos(filtroMovimientos.value);
    });
}

if (listaMovimientos) {
    mostrarUltimosMovimientos("todos");
}

if (filtroMovimientos) {
    filtroMovimientos.addEventListener("change", function () {
        mostrarUltimosMovimientos(filtroMovimientos.value);
    });
}
