import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import useMaterialPo from '../../hooks/useMaterialPo';
import MaterialPoModal from '../../hooks/MaterialPoModal';  // Import the modal component
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
const ViewMaterialPo = () => {
    const { materialPo, ViewMaterialPo,handleDelete,pagination,handlePageChange } = useMaterialPo();
    const [showModal, setShowModal] = useState(false);
    const [selectedMaterialPos, setSelectedMaterialPos] = useState([]);

    useEffect(() => {
        ViewMaterialPo();
    }, [ViewMaterialPo]);

    const handleViewMaterialPos = (materialPos) => {
        setSelectedMaterialPos(materialPos);
        setShowModal(true);
    };

    const renderTableRows = () => {
        if (!materialPo || !materialPo.content) return null;

        return materialPo.content.map((item, index) => (
            <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.location.address}, {item.location.city}, {item.location.pinCode}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.supplier.name}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{new Date(item.date).toLocaleDateString()}</p>
                </td>
                <td className="px-2 py-5 border-b border-gray-200 text-sm md:text-lg">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 w-[100px] md:py-2 md:px-1 text-xs md:text-md rounded"
                        onClick={() => handleViewMaterialPos(item.materialPos)}
                    >
                        View Material
                    </button>
                </td>
                <td className="px-5 py-5  border-b border-gray-200  text-sm">
                    <p className="flex text-gray-900 whitespace-no-wrap">
                        <FiEdit size={17} className='text-teal-500 hover:text-teal-700 mx-2' onClick={(e) => handleUpdate(e, item)} title='Edit Material PO' />  |
                        <FiTrash2 size={17} className='text-red-500  hover:text-red-700 mx-2' onClick={(e) => handleDelete(e, item?.id)} title='Delete Material PO' />
                    </p>
                </td>
            </tr>
        ));
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material/ View Material PO" />
            <div className="container mx-auto px-4 sm:px-8 bg-white dark:bg-slate-900">
                <div className="pt-5">
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-semibold leading-tight text-center">VIEW PURCHASE ORDER</h2>
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                            bg-success text-success  dark:bg-white dark:text-slate-800`}
                        >
                            Total {materialPo && materialPo.content ? materialPo.
totalElements: 0}
                        </p>
                    </div>
                    <div className="-mx-29  md:mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                        <th>Location</th>
                                        <th>Supplier</th>
                                        <th>Date</th>
                                        <th>Material POs</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRows()}
                                </tbody>
                                <Pagination
                                                    totalPages={pagination.totalPages}
                                                    currentPage={pagination.currentPage}
                                                    handlePageChange={handlePageChange}
                                                />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <MaterialPoModal
                show={showModal}
                onClose={() => setShowModal(false)}
                materialPos={selectedMaterialPos}
            />
        </DefaultLayout>
    );
};

export default ViewMaterialPo;