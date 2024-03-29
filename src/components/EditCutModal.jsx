import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const EditCutModal = ({ showModalEdit, selectedCut, setShowEditCutModal, setShowOffcanvas }) => {

  const formik = useFormik({
    initialValues: {
      cut: selectedCut.cut || '',
      quantity: selectedCut.quantity || 0,
      price: selectedCut.price || 0,
    },
    validationSchema: yup.object({
      cut:  yup.string()
      .max(50, 'No debe exceder los 50 caracteres')
      .required('Campo obligatorio'),
      quantity: yup.number().min(0, 'Solo números positivos').required('Campo obligatorio'),
      price: yup.number().min(0, 'Solo números positivos').required('Campo obligatorio'),
    }),
    onSubmit: values => {
      Swal.fire({
        title: '¿Guardar cambios?',
        text: '¿Estás seguro de guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Guardado', 'Los cambios han sido guardados correctamente', 'success').then(() => {
            handleCloseEditCutModal();
            setShowOffcanvas(true);
          });
        }
      });
    },
  });

  const handleCloseEditCutModal = () => {
    const isModified = formik.dirty;
    if (!isModified) {
      setShowEditCutModal(false);
      setShowOffcanvas(true);
    } else {
      Swal.fire({
        title: '¿Descartar cambios?',
        text: 'Si cierras el modal, los cambios no se guardarán.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Descartar',
        cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.isConfirmed) {
          formik.resetForm();
          setShowEditCutModal(false);
          setShowOffcanvas(true);
        }
      });
    };
  };

  return (
    <div>
      {showModalEdit && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25">
          <div id="authentication-modal" className="absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 ">
                <div className="grid justify-end">
                  <button
                    onClick={handleCloseEditCutModal}
                    type="button"
                    className="text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <p className="font-bold text-xl text-center text-red-800">Actualizar Corte de Carne</p>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="cut" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                      Corte
                    </label>
                    <input
                      type="text"
                      id="cut"
                      className="effect-shadow-input w-full"
                      {...formik.getFieldProps('cut')}
                    />
                    {formik.touched.cut && formik.errors.cut ? <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.cut}</div> : null}
                  </div>
                  <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                    <div className="">
                      <label htmlFor="quantity" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                        Kilo(s)
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        className="effect-shadow-input w-full"
                        min="0"
                        {...formik.getFieldProps('quantity')}
                      />
                      {formik.touched.quantity && formik.errors.quantity ? <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.quantity}</div> : null}
                    </div>
                    <div className="">
                      <label htmlFor="price" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                        Precio por Kilo
                      </label>
                      <input
                        type="number"
                        id="price"
                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        min="0"
                        pattern="[0-9]*"
                        {...formik.getFieldProps('price')}
                      />
                      {formik.touched.price && formik.errors.price ? <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.price}</div> : null}
                    </div>
                  </div>
                  <div className="grid items-center justify-center w-full">
                    <label className="block mb-1 text-ms font-normal text-gray-900 dark:text-white" htmlFor="image">
                      Subir imagen
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="image_help"
                      id="image"
                      type="file"
                    />
                    <p className="mt-1 text-xs text-gray-500 text-end justify-items-end dark:text-gray-300" id="image_help">
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                  <div className="grid justify-end mt-4">
                    <button
                      type="submit"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mb-4"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCutModal;
