import React, { useState } from 'react';
import Imagen from '../../assets/img/costillas.jpg';
import InventaryCard from '../../components/InventaryCard';
import AddCutModal from '../../components/AddCutModal';
import OffCanvas from '../../components/OffCanvas';

function Inventary() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedCut, setSelectedCut] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedCutId, setSelectedCutId] = useState(null);
    const cuts = [
        { id: 1, cut: 'Costillas', quantity: 100, price: 130, image: Imagen, preparationType: [{ preparation: "Asadas", cost: 20 }] },
        { id: 5, cut: 'Lomo', quantity: 50, price: 200, image: Imagen, preparationType: [{ preparation: "A la parrilla", cost: 15 }] },
        { id: 3, cut: 'Filete', quantity: 75, price: 180, image: Imagen, preparationType: [{ preparation: "Al horno", cost: 10 }] },
        { id: 4, cut: 'Chuleta', quantity: 40, price: 150, image: Imagen, preparationType: [{ preparation: "Frita", cost: 12 }] },
        { id: 2, cut: 'Falda', quantity: 60, price: 120, image: Imagen, preparationType: [{ preparation: "Estofada", cost: 18 }, { preparation: "Al horno", cost: 28 }, { preparation: "A la parrilla", cost: 38 }] },
        { id: 6, cut: 'Otro corte', quantity: 50, price: 100, image: Imagen, preparationType: [{ preparation: "Sin preparación", cost: 0 }] }
    ];
    const handleEditModalToggle = (cut) => {
        setSelectedCut(cut);
        setShowModalEdit(!showModalEdit);
    }

    const handleAddModalToggle = () => {
        setShowModalAdd(!showModalAdd);
    }

    const handleCerrarModalAdd = () => {
        setShowModalAdd(false);
    };

    const handleImageUpload = (event) => {
        const file = event.currentTarget.files[0];
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleOffCanvasToggle = (cut) => {
        setSelectedCut(cut);
        setShowOffcanvas(!showOffcanvas);
    }

    return (
        <div className="container mt-4">
            <div className='grid grid-flex justify-center mb-8'>
                <h2 className='text-4xl font-semibold'>Inventario</h2>
            </div>
            <div>
                <div className="grid justify-items-end">
                    <button type="button" onClick={handleAddModalToggle} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                        Añadir Corte
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 card effect-shadow-div p-4'>
                {cuts.map(cut => (
                    <InventaryCard
                        key={cut.id}
                        selectedCut={cut}
                        setShowOffcanvas={setShowOffcanvas}
                        showOffcanvas={showOffcanvas}
                        handleEditModalToggle={handleEditModalToggle}
                    />
                ))}
            </div>

            <AddCutModal
                showModalAdd={showModalAdd}
                handleCerrarModalAdd={handleCerrarModalAdd}
                handleImageUpload={handleImageUpload}
            />
            {selectedCut && (
                <OffCanvas
                    showOffcanvas={showOffcanvas}
                    setShowOffcanvas={setShowOffcanvas}
                    selectedCut={selectedCut}
                    handleEditModalToggle={handleEditModalToggle}
                />
            )}
        </div>
    );

}

export default Inventary