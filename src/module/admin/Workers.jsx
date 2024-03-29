import React, { useState} from 'react';
import Swal from 'sweetalert2';
import TableComponent from '../../components/TableComponent';
import EditWorkerModal from '../../components/EditWorkerModal';
import AddWorkerModal from '../../components/AddWorkerModal';

function Workers() {
    const [currentClient, setCurrentClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clients, setClients] = useState([
    { id: 1, email: 'anna@gmail.com', name: 'Anna', lastName: 'Garcia', phone: '555-123-4567', status: 'Activo' },
  ]);

  const changeStatus = (client) => {
    setCurrentClient(client);
    Swal.fire({
      title: 'Actualizar estado',
      text: '¿Estás seguro de que quieres cambiar el estado de este trabajador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmStatusChange(client);
        Swal.fire('¡Cambio de estado exitoso!', 'El estado del trebajador ha sido actualizado.', 'success');
      }
    });
  };

  const confirmStatusChange = (client) => {
    setClients(clients.map(c => {
      if (c.id === client.id) {
        return { ...c, status: c.status === 'Activo' ? 'Inactivo' : 'Activo' };
      }
      return c;
    }));
  };

  const confirmDeleteWorker = (client) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que quieres eliminar al trabajador ${client.name} ${client.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar al trabajador
        console.log(`Eliminar trabajador ${client.name} ${client.lastName}`);
        Swal.fire('¡Eliminado!', 'El trabajador a sido eliminado correctamente ', 'success');

      }
    });
  };
  const handleStatusChange = (client) => {
    setCurrentClient(client);
    changeStatus(client);
  };

  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  }
  const openModalEdit = () => {
    setShowModalEdit(true);
  }
  const closeModalEdit = () => {
    setShowModalEdit(false);
  }

  const columns = [
    { label: '#', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Apellidos', accessor: 'lastName' },
    { label: 'Correo Elétronico', accessor: 'email' },
    { label: 'Num. Teléfono', accessor: 'phone' },
    {
      label: 'Estado',
      accessor: 'status',
      render: (client) => (
        <button
          onClick={() => handleStatusChange(client)}
          className={`status-btn ${client.status === 'Activo' ? 'active' : 'inactive'}`}
        >
          {client.status}
        </button>
      )
    },
    {
      label: 'Acciones',
      render: (client) => (
        <div>
          <button
            onClick={() => {
              setEditingClient(client);
              openModalEdit();
            }}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-2.5 py-1.5 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>

          <button
            onClick={() => confirmDeleteWorker(client)}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md text-center px-2.5 py-1.5 mx-3  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      ),
    },
  ];

    return (
        <>
            <p className='text-4xl font-extrabold text-left mb-6 mt-10'>Trabajadores</p>
            <div className="grid justify-items-end">
                <button type="button" onClick={openModal} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                    Añadir Trabajadores
                </button>
            </div>
            <TableComponent
                columns={columns}
                data={clients}
                handler={handleStatusChange}
                PerPage={15}
            />
            <EditWorkerModal showModalEdit={showModalEdit} closeModalEdit={closeModalEdit} clienteEditando={editingClient || {}} /> {/* Cambiado a EditWorkerModal */}
            <AddWorkerModal showModal={showModal} closeModal={closeModal} />

        </>
    )
}

export default Workers