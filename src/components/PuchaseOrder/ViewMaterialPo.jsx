import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import useMaterialPo from '../../hooks/useMaterialPo';
import MaterialPoModal from '../../hooks/MaterialPoModal';  // Import the modal component
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
const ViewMaterialPo = () => {

    const { materialPo, ViewMaterialPo, handleDelete, pagination, handleUpdate, handlePageChange } = useMaterialPo();
    const [showModal, setShowModal] = useState(false);
    const [selectedMaterialPos, setSelectedMaterialPos] = useState([]);

    useEffect(() => {
        ViewMaterialPo();
    }, []);

    const handleViewMaterialPos = (materialPos) => {
        setSelectedMaterialPos(materialPos);
        setShowModal(true);
    };

    const renderTableRows = () => {
        if (!materialPo || !materialPo) return;

        return materialPo.map((item, index) => (
            <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {index + 1}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.location.address}, {item.location.city}, {item.location.pinCode}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.supplier?.name}
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
            <div className="container mx-auto px-4 sm:px-8 bg-white dark:bg-slate-800">
                <div className="pt-5">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-semibold leading-tight  ">VIEW PURCHASE ORDER</h2>
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                            bg-success text-success  dark:bg-white dark:text-slate-800`}
                        >
                            Total PO: {pagination.totalItems}

                        </p>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                        <th

                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >SNO</th>

                                        <th

                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >Location</th>
                                        <th

                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >Supplier</th>
                                        <th

                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >Date</th>
                                        <th

                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >Material POs</th>
                                        <th

                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRows()}
                                </tbody>

                            </table>
                        </div>

                        <Pagination
                            totalPages={pagination.totalPages}
                            currentPage={pagination.currentPage}
                            handlePageChange={handlePageChange}
                        />
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