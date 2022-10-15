//funcion exportada
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

//arrays
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

//opjetos
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo  correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraceña no puede estar vacio",
        patternMismatch: "Por favor digite al menos 6 caracteres, maximo 12, debe contener al menos una latra minúscula, una letra mayúscula, un numero, no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento no puede estar vacio",
        customError: "Deve tener almenos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "El formato requerido es xxxxxxxxxx 10 números"
    },
    direccion: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "La direccion debe tever entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "La ciudad debe tever entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "El estado debe tever entre 10 a 40 caracteres"
    },



}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

//funciones
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""

    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error)
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "De teter almenos 18 años de edad"
    };


    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;

}