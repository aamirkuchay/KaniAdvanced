import React, { useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
import useStockJournal from '../../hooks/useStockJournel';

const ViewStockJournel = () => {
    const { stockJournal, ViewStock, handleDelete, handleUpdate, handlePageChange, pagination } = useStockJournal();

    useEffect(() => {
        ViewStock();
    }, []);

    const renderTableRows = () => {
        if (!stockJournal) return null;

        const startingSerialNumber = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;

        return stockJournal.map((item, index) => (
            <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{startingSerialNumber + index}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.sourceMaterial.description}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.sourceLocation?.address}</td>
                {/* <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.sourceQuantity}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.sourcePrice}</td> */}
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.destinationMaterial.description}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.destinationLocation.address}</td>
                {/* <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.destinationQuantity}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.destinationPrice}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.additionalCharges}</td> */}
                <td className="px-5 py-5 border-b border-gray-200 text-sm">{item.journalStatus}</td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <div className="flex items-center">
                        <FiEdit
                            size={17}
                            className='text-teal-500 hover:text-teal-700 mx-2'
                            onClick={(e) => handleUpdate(e, item)}
                            title='Edit Inventory'
                        />
                        <FiTrash2
                            size={17}
                            className='text-red-500 hover:text-red-700 mx-2'
                            onClick={(e) => handleDelete(e, item.id)}
                            title='Delete Material PO'
                        />
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Stock Journal / View Stock Journal" />
            <div className="container mx-auto px-4 sm:px-8 bg-white dark:bg-slate-800">
                <div className="pt-5">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-semibold leading-tight">View Stock Journal</h2>
                        <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success dark:bg-white dark:text-slate-800">
                            Total PO: {pagination.totalItems}
                        </p>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Serial No.</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source Material</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source Location</th>
                                        {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source Quantity</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source Price</th> */}
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Destination Material</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Destination Location</th>
                                        {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Destination Quantity</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Destination Price</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Additional Charges</th> */}
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Journal Status</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
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
        </DefaultLayout>
    );
};

export default ViewStockJournel;
