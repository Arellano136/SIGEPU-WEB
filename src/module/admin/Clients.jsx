import React, { useState } from 'react';
import TableComponent from '../../components/TableComponent';
import Swal from 'sweetalert2';

function Clients() {
    const [clientes, setClientes] = useState([
        { id: 1, usuario: 'Usuario1', nombre: 'Anna', apellido: 'Garcia', telefono: '555-123-4567', direccion: 'Avenida Independencia', estatus: 'Activo' },
      ]);
    
      const [currentCliente, setCurrentCliente] = useState(null);
    
      const changeStatus = (cliente) => {
        setCurrentCliente(cliente);
        Swal.fire({
          title: 'Confirmación',
          text: '¿Estás seguro de que quieres cambiar el estado de este cliente?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            confirmStatusChange(cliente); // Pasamos el cliente como argumento
          }
        });
      };
    
      const confirmStatusChange = (cliente) => { // Recibimos el cliente como argumento
        setClientes(clientes.map(c => {
          if (c.id === cliente.id) { // Usamos el cliente pasado como argumento
            return { ...c, estatus: c.estatus === 'Activo' ? 'Inactivo' : 'Activo' };
          }
          return c;
        }));
      };
    
      const handleStatusChange = (cliente) => {
        setCurrentCliente(cliente);
        changeStatus(cliente);
      };
    
      const columns = [
        { label: 'Usuario', accessor: 'usuario' },
        { label: 'Nombre', accessor: 'nombre' },
        { label: 'Apellido', accessor: 'apellido' },
        { label: 'Num. Teléfono', accessor: 'telefono' },
        { label: 'Dirección', accessor: 'direccion' },
        {
          label: 'Estado',
          accessor: 'estatus',
          render: (cliente) => (
            <button
              onClick={() => handleStatusChange(cliente)}
              className={`status-btn ${cliente.estatus === 'Activo' ? 'active' : 'inactive'}`}
            >
              {cliente.estatus}
            </button>
          )
        }
      ];    
  return (
    <>
        <p className='text-4xl font-extrabold text-left mb-6 mt-10'>Clientes</p>
        <TableComponent
          columns={columns}
          data={clientes}
          handler={handleStatusChange}
          PerPage={15}
        />
      </>
  )
}

export default Clients