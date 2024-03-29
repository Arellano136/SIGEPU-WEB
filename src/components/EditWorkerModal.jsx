import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditWorkerModal = ({ showModalEdit, closeModalEdit, clienteEditando }) => {
    console.log(clienteEditando)
    const formik = useFormik({
        initialValues: {
            nombre: clienteEditando.name, 
            apellido: clienteEditando, 
            correo: clienteEditando.email, 
            telefono: clienteEditando.phone,
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
            .max(50, 'No debe exceder los 50 caracteres')
            .required('Campo obligatorio'),
            apellido: Yup.string()
            .max(50, 'No debe exceder los 50 caracteres')
            .required('Campo obligatorio'),
            correo: Yup.string().email('Correo electrónico inválido').required('Campo obligatorio'),
            telefono:  Yup.string()
            .matches(/^\d{10}$/, 'Número de teléfono inválido')
            .required('Campo obligatorio')
        }),
        onSubmit: (values) => {
            // Aquí puedes manejar la lógica para enviar los datos del formulario
            console.log(values);
        },
    });

    return (
        showModalEdit && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center">
                <div id="authentication-modal" className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
                    <div className="p-8 md:p-4">
                        <div className="grid justify-end">
                            <button
                                onClick={closeModalEdit}
                                type="button"
                                className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <p className="font-bold text-2xl  text-center text-red-800 mb-3">Actualizar información</p>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.nombre && formik.errors.nombre ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.nombre}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="apellido" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        name="apellido"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        value={formik.values.apellido}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.apellido && formik.errors.apellido ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.apellido}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="correo" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Correo Elétronico
                                    </label>
                                    <input
                                        type="text"
                                        id="correo"
                                        name="correo"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        value={formik.values.correo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.correo && formik.errors.correo ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.correo}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="telefono" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Telefono
                                    </label>
                                    <input
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        value={formik.values.telefono}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.telefono && formik.errors.telefono ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.telefono}</div>
                                    ) : null}
                                </div>

                                <div className="grid justify-items-center mt-4">
                                    <button
                                        type="submit"
                                        className="w-full focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default EditWorkerModal