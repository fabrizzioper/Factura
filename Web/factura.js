const formDetalle = document.getElementById("formDetalle");
const selectDescripcion = document.getElementById("selectDescripcion");
const inputCantidad = document.getElementById("inputCantidad");
const inputPUnitario = document.getElementById("inputPUnitario");
const inputPTotal = document.getElementById("inputPTotal");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const btnGuardar = document.getElementById("btnGuardar");
const inputNombre = document.getElementById("inputNombre");
const inputRuc = document.getElementById("inputRuc");
const inputNro = document.getElementById("inputNro");
const inputDireccion = document.getElementById("inputDireccion");
const inputFecha = document.getElementById("inputFecha");
const formCabecera = document.getElementById("formCabecera");

const apiUrl = "http://localhost:5199/api"; // Asegúrate de que el puerto es correcto

const isValidName = name => /^[a-zA-Z]{4,40}$/.test(name);
const containsNumbers = str => /\d/.test(str);
const containsSpecialChars = str => /[^a-zA-Z]/.test(str);
const isValidRuc = ruc => /^\d{10}$/.test(ruc);
const isValidNumber = number => /^\d+$/.test(number);
const isValidDireccion = direccion => /^[a-zA-Z0-9\-_/]{10,}$/.test(direccion);

let arregloDetalle = [];
let facturas = [];
let arregloProductos = [
    { id: 1, nombre: "Manzana", precio: 15.00 },
    { id: 2, nombre: "Pera", precio: 10.00 },
    { id: 3, nombre: "Platano", precio: 18.00 },
    { id: 4, nombre: "Uva", precio: 7.00 }
];

const llenarProductos = () => {
    arregloProductos.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.id;
        option.innerHTML = p.nombre;
        selectDescripcion.appendChild(option);
    });
};
llenarProductos();

const getNombreProductoByID = (id) => {
    const objProducto = arregloProductos.find((p) => {
        return p.id === +id;
    });
    return objProducto ? objProducto.nombre : '';
};

const getPrecioProductoByID = (id) => {
    const objProducto = arregloProductos.find((p) => {
        return p.id === +id;
    });
    return objProducto ? objProducto.precio : 0;
};

const redibujarTabla = () => {
    cuerpoTabla.innerHTML = "";
    arregloDetalle.forEach((detalle) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${getNombreProductoByID(detalle.descripcion)}</td>
                          <td>${detalle.cant}</td>
                          <td>${detalle.pUnit}</td>
                          <td>${detalle.pTotal}</td>`;
        let tdEliminar = document.createElement("td");
        let botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "btn-danger");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = () => {
            eliminarDetalleByID(detalle.descripcion);
        };
        tdEliminar.appendChild(botonEliminar);
        fila.appendChild(tdEliminar);
        cuerpoTabla.appendChild(fila);
    });
};

const eliminarDetalleByID = (id) => {
    arregloDetalle = arregloDetalle.filter((detalle) => {
        return +id !== +detalle.descripcion;
    });
    redibujarTabla();
};

const agregarDetalle = (objDetalle) => {
    const resultado = arregloDetalle.find((detalle) => {
        return +objDetalle.descripcion === +detalle.descripcion;
    });

    if (resultado) {
        arregloDetalle = arregloDetalle.map((detalle) => {
            if (+detalle.descripcion === +objDetalle.descripcion) {
                return {
                    cant: +detalle.cant + +objDetalle.cant,
                    descripcion: detalle.descripcion,
                    pTotal: (+detalle.cant + +objDetalle.cant) * +detalle.pUnit,
                    pUnit: +detalle.pUnit,
                };
            }
            return detalle;
        });
    } else {
        arregloDetalle.push(objDetalle);
    }
};

formDetalle.onsubmit = (e) => {
    e.preventDefault();

    const objDetalle = {
        descripcion: selectDescripcion.value,
        cant: inputCantidad.value,
        pUnit: inputPUnitario.value,
        pTotal: inputPTotal.value,
    };

    if (validateInputsDetalle()) {
        agregarDetalle(objDetalle);
        formDetalle.reset();
        redibujarTabla();
    }
};

const saveEmpresa = async (empresa) => {
    try {
        const response = await fetch(`${apiUrl}/empresa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(empresa)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al guardar la empresa: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en saveEmpresa:", error);
        throw error;
    }
};

const saveBoleta = async (boleta) => {
    try {
        const response = await fetch(`${apiUrl}/boleta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boleta)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al guardar la boleta: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en saveBoleta:", error);
        throw error;
    }
};

const saveDetalleBoleta = async (detalle) => {
    try {
        const response = await fetch(`${apiUrl}/detalleBoleta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detalle)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al guardar el detalle de la boleta: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en saveDetalleBoleta:", error);
        throw error;
    }
};

const generatePDF = (factura) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("COMERCIAL ELECTRONICS S.A.C", 10, 10);
    doc.text("Av. Separadora Industrial 1595 Ate vitarte - Lima", 10, 20);
    doc.text(`RUC: ${factura.ruc}`, 150, 10);
    doc.text(`Boleta`, 150, 20);
    doc.text(`N° ${factura.nro}`, 150, 30);
    doc.text(`Fecha: ${factura.fecha}`, 150, 40);

    doc.text(`Señor: ${factura.nombre}`, 10, 40);
    doc.text(`Dirección: ${factura.direccion}`, 10, 50);

    doc.text("Cantidad", 10, 60);
    doc.text("Descripción", 50, 60);
    doc.text("P. Unit", 130, 60);
    doc.text("Importe", 160, 60);

    let y = 70;
    factura.detalle.forEach(item => {
        doc.text(`${item.cant}`, 10, y);
        doc.text(`${getNombreProductoByID(item.descripcion)}`, 50, y);
        doc.text(`${item.pUnit}`, 130, y);
        doc.text(`${item.pTotal}`, 160, y);
        y += 10;
    });

    doc.text(`TOTAL S/: ${factura.detalle.reduce((acc, item) => acc + parseFloat(item.pTotal), 0).toFixed(2)}`, 160, y + 10);

    doc.save(`Factura_${factura.nro}.pdf`);
};

btnGuardar.onclick = async () => {
    if (validateInputs()) {
        const empresa = {
            razonSocial: inputNombre.value,
            ruc: inputRuc.value,
            direccion: inputDireccion.value
        };

        try {
            const savedEmpresa = await saveEmpresa(empresa);

            const boleta = {
                empresaID: savedEmpresa.empresaID,
                fecha: inputFecha.value,
                nro: inputNro.value
            };

            const savedBoleta = await saveBoleta(boleta);

            for (const detalle of arregloDetalle) {
                await saveDetalleBoleta({
                    boletaID: savedBoleta.boletaID,
                    productoID: detalle.descripcion,
                    cantidad: detalle.cant,
                    precioUnitario: detalle.pUnit,
                    total: detalle.pTotal
                });
            }

            const factura = {
                nombre: inputNombre.value,
                direccion: inputDireccion.value,
                fecha: inputFecha.value,
                nro: inputNro.value,
                ruc: inputRuc.value,
                detalle: arregloDetalle
            };

            generatePDF(factura);

            formDetalle.reset();
            formCabecera.reset();
            arregloDetalle = [];
            redibujarTabla();
            alert("Factura guardada y PDF generado exitosamente");
        } catch (error) {
            console.error("Error al guardar la factura:", error);
            alert("Hubo un error al guardar la factura. Verifica la consola para más detalles.");
        }
    }
};

selectDescripcion.onchange = () => {
    if (selectDescripcion.value == "0") {
        formDetalle.reset();
        return;
    }

    const precio = getPrecioProductoByID(selectDescripcion.value);
    if (precio) {
        inputPUnitario.value = precio;
        calcularTotal();
    }
};

const calcularTotal = () => {
    const cantidad = +inputCantidad.value;
    const pUnit = +inputPUnitario.value;
    const total = cantidad * pUnit;
    inputPTotal.value = total.toFixed(2);
};

inputCantidad.onclick = calcularTotal;
inputCantidad.onkeyup = calcularTotal;

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputsDetalle = () => {
    let isValid = true;
    const inputCantidadValue = inputCantidad.value.trim();
    if (+inputCantidadValue <= 0) {
        setError(inputCantidad, 'Ingrese cantidad');
        isValid = false;
    } else {
        setSuccess(inputCantidad);
    }
    return isValid;
};

const validateInputs = () => {
    let isValid = true;

    const inputRucValue = inputRuc.value.trim();
    const inputNombreValue = inputNombre.value.trim();
    const inputNroValue = inputNro.value.trim();
    const inputFechaValue = inputFecha.value.trim();
    const inputDireccionValue = inputDireccion.value.trim();

    if (inputRucValue === '') {
        setError(inputRuc, 'El RUC es obligatorio');
        isValid = false;
    } else if (!isValidRuc(inputRucValue)) {
        setError(inputRuc, 'El RUC debe tener 10 caracteres numéricos');
        isValid = false;
    } else {
        setSuccess(inputRuc);
    }


    /*
    if (inputNombreValue === '') {
        setError(inputNombre, 'Es obligatorio llenar este cuadro');
        isValid = false;
    } else if (inputNombreValue.length < 4) {
        setError(inputNombre, 'Mínimo 4 caracteres');
        isValid = false;
    } else if (containsNumbers(inputNombreValue)) {
        setError(inputNombre, 'No se permiten números');
        isValid = false;
    } else if (containsSpecialChars(inputNombreValue)) {
        setError(inputNombre, 'No se aceptan caracteres especiales');
        isValid = false;
    } else {
        setSuccess(inputNombre);
    }*/

    const caracteresPermitidosNombre = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
    const caracteresPermitidosDireccion = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .-';


    function isAllowedChars(str) {
        for (let i = 0; i < str.length; i++) {
            if (!caracteresPermitidosNombre.includes(str[i])) {
                return false;
            }
        }
        return true;
    }

    if (inputNombreValue === '') {
        setError(inputNombre, 'Es obligatorio llenar este cuadro');
        isValid = false;
    } else if (inputNombreValue.length < 4) {
        setError(inputNombre, 'Mínimo 4 caracteres');
        isValid = false;
    } else if (!isAllowedChars(inputNombreValue)) {
        setError(inputNombre, 'Solo se permiten letras, números y espacios');
        isValid = false;
    } else {
        setSuccess(inputNombre);
    }


    if (inputNroValue === '') {
        setError(inputNro, 'El número es obligatorio');
        isValid = false;
    } else if (!isValidNumber(inputNroValue)) {
        setError(inputNro, 'Solo se permiten números');
        isValid = false;
    } else {
        setSuccess(inputNro);
    }

    /*if (inputDireccionValue === '') {
        setError(inputDireccion, 'La dirección es obligatoria');
        isValid = false;
    } else if (inputDireccionValue.length < 10) {
        setError(inputDireccion, 'Mínimo 10 caracteres');
        isValid = false;
    } else if (/[^a-zA-Z0-9\-_/]/.test(inputDireccionValue)) {
        setError(inputDireccion, 'No se aceptan caracteres especiales excepto -_/');
        isValid = false;
    } else {
        setSuccess(inputDireccion);
    }
    */

    function isAllowedCharsDireccion(str) {
        for (let i = 0; i < str.length; i++) {
            if (!caracteresPermitidosDireccion.includes(str[i])) {
                return false;
            }
        }
        return true;
    }

    if (inputDireccionValue === '') {
        setError(inputDireccion, 'La dirección es obligatoria');
        isValid = false;
    } else if (inputDireccionValue.length < 10) {
        setError(inputDireccion, 'Mínimo 10 caracteres');
        isValid = false;
    } else if (!isAllowedCharsDireccion(inputDireccionValue)) {
        setError(inputDireccion, 'Solo se permiten letras, números, espacios y .-');
        isValid = false;
    } else {
        setSuccess(inputDireccion);
    }

    if (inputFechaValue === '') {
        setError(inputFecha, 'La fecha es obligatoria');
        isValid = false;
    } else {
        setSuccess(inputFecha);
    }


    

    return isValid;
};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};
