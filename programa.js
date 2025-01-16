// Variables
const patientsList = document.getElementById("patientsList");
const modalTitle = document.getElementById("modalTitle");
const pacienteForm = document.getElementById("pacienteForm");
const guardarPacienteBtn = document.getElementById("guardarPaciente");
const confirmarEliminarBtn = document.getElementById("confirmarEliminar");

let patients = [];
let editingPatientIndex = null;

// Función para renderizar la tabla de pacientes
const renderPatients = () => {
    patientsList.innerHTML = patients
        .map(
            (patient, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${patient.nombres}</td>
            <td>${patient.apellidos}</td>
            <td>${patient.telefono}</td>
            <td>${patient.fechaNacimiento}</td>
            <td>${patient.sexo}</td>
            <td>${patient.email}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editPatient(${index})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="confirmDeletePatient(${index})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="viewPatient(${index})">
                    <i class="bi bi-eye-fill"></i>
                </button>
            </td>
        </tr>`
        )
        .join("");
};

// Función para agregar o editar paciente
const savePatient = () => {
    const newPatient = {
        nombres: document.getElementById("modalNombres").value.trim(),
        apellidos: document.getElementById("modalApellidos").value.trim(),
        telefono: document.getElementById("modalTelefono").value.trim(),
        fechaNacimiento: document.getElementById("modalFechaNacimiento").value.trim(),
        sexo: document.getElementById("modalSexo").value,
        email: document.getElementById("modalEmail").value.trim(),
    };

    // Validación de datos del formulario
    if (
        !newPatient.nombres ||
        !newPatient.apellidos ||
        !newPatient.telefono ||
        !newPatient.fechaNacimiento ||
        !newPatient.sexo ||
        !newPatient.email
    ) {
        alert("Por favor, completa todos los campos antes de guardar.");
        return;
    }

    if (editingPatientIndex !== null) {
        // Editar paciente existente
        patients[editingPatientIndex] = newPatient;
        editingPatientIndex = null;
    } else {
        // Agregar nuevo paciente
        patients.push(newPatient);
    }

    // Actualizar la tabla y cerrar el modal
    renderPatients();
    pacienteForm.reset();
    $('#nuevoPacienteModal').modal('hide');
};

// Función para editar paciente
const editPatient = (index) => {
    editingPatientIndex = index;
    const patient = patients[index];

    document.getElementById("modalNombres").value = patient.nombres;
    document.getElementById("modalApellidos").value = patient.apellidos;
    document.getElementById("modalTelefono").value = patient.telefono;
    document.getElementById("modalFechaNacimiento").value = patient.fechaNacimiento;
    document.getElementById("modalSexo").value = patient.sexo;
    document.getElementById("modalEmail").value = patient.email;

    modalTitle.textContent = "Editar Paciente";
    $('#nuevoPacienteModal').modal('show');
};

// Función para eliminar paciente
const confirmDeletePatient = (index) => {
    confirmarEliminarBtn.onclick = () => {
        patients.splice(index, 1);
        $('#confirmarEliminarModal').modal('hide');
        renderPatients();
    };

    $('#confirmarEliminarModal').modal('show');
};

// Función para ver detalles de un paciente
const viewPatient = (index) => {
    const patient = patients[index];
    alert(`
        Nombres: ${patient.nombres}
        Apellidos: ${patient.apellidos}
        Teléfono: ${patient.telefono}
        Fecha de Nacimiento: ${patient.fechaNacimiento}
        Sexo: ${patient.sexo}
        Email: ${patient.email}
    `);
};

// Eventos
guardarPacienteBtn.addEventListener("click", savePatient);

// Render inicial
renderPatients();
