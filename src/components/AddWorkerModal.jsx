import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const AddWorkerModal = ({ showModal, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
      .max(50, 'No debe exceder los 50 caracteres')
      .required('Campo obligatorio'),
    lastName: Yup.string()
      .max(50, 'No debe exceder los 50 caracteres')
      .required('Campo obligatorio'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('Campo obligatorio'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Número de teléfono inválido')
      .required('Campo obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Campo obligatorio'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Campo obligatorio'),
  
    }), onSubmit: (values) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se guardará el trabajador',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes agregar la lógica para enviar los datos del formulario
          console.log(values);
          closeModal();
        }
      });
    },
  });

  useEffect(() => {
    if (!showModal) {
      formik.resetForm();
    }
  }, [showModal]);

  return (
    showModal && (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center overflow-auto">
        <div id="authentication-modal" className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md px-6">
          <div className="p-8 md:p-4">
            <div className="grid justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p className="font-bold text-2xl text-center text-red-800 mb-3">Trabajador</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <label htmlFor="firstName" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.firstName}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="lastName" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.lastName}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.phone}</div>
                )}
              </div> <div className="mb-2 relative">
                <label htmlFor="password" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-red-800`}></i>
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div className="grid justify-items-end text-red-500 text-sm mt-2">{formik.errors.password}</div>
                )}
              </div>
              <div className="mb-2 relative">
                <label htmlFor="confirmPassword" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Confirmar Contraseña
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-red-800`}></i>
                </button>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="grid justify-items-end text-red-500 text-sm mt-2">{formik.errors.confirmPassword}</div>
                )}
              </div>
              <div className="grid justify-items-center mt-4">
                <button
                  type="submit"
                  className="w-full focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddWorkerModal;