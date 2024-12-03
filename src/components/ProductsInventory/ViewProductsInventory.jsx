import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import useInventoryMaterial from '../../hooks/useInventoryMaterial';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { customStyles as createCustomStyles } from '../../Constants/utils';

const ViewProductsInventory = () => {
    // const location = useSelector(state => state?.nonPersisted?.location);
    // const description = useSelector(state => state?.nonPersisted?.material);
    // const theme = useSelector(state => state?.persisted?.theme);

    // const [locationValue, setLocationValue] = useState(null);
    // const [descriptionValue, setDescriptionValue] = useState(null);

    // const { inventoryMaterial, ViewInventory, handleDelete, handleUpdate, handlePageChange, pagination } = useInventoryMaterial();

    // const [locationSel, setLocationSel] = useState([]);
    // const [descriptionSel, setDescriptionSel] = useState([]);

    // useEffect(() => {
    //     if (location?.data) {
    //         setLocationSel(formatOptions(location.data, 'address', 'id', 'locationObject'));
    //     }
    //     if (description?.data) {
    //         setDescriptionSel(formatOptions(description.data, 'description', 'id', 'materialObject'));
    //     }
    // }, [location, description]);

    // const customStyles = createCustomStyles(theme?.mode);

    // const formatOptions = (data, labelKey, valueKey, objectKey, placeholder) => {
    //     return [{ label: "Select" , value: ''}]
    //         .concat(data ? data.map(item => ({
    //             value: item[labelKey],
    //             label: item[labelKey],
    //             [objectKey]: item
    //         })) : []);
    // };
    // useEffect(() => {
    //     ViewInventory();
    // }, []);

    // const handleSearchChange = () => {
    //     // Get the selected values
    //     const locationLabel = locationValue ? locationValue.value : null;
    //     const descriptionLabel = descriptionValue ? descriptionValue.value : null;
        
    //     console.log(locationLabel,"hey");
    //     // Call ViewInventory with the selected values, or no filter if both are null
    //     ViewInventory(1, locationLabel, descriptionLabel);
    // };

    // const renderTableRows = () => {
    //     if (!inventoryMaterial || !inventoryMaterial.length) {
    //         return (
    //             <tr className='bg-white dark:bg-slate-700 dark:text-white'>
    //                 <td colSpan="6" className="px-5 py-5 border-b border-gray-200 text-sm">
    //                     <p className="text-gray-900 whitespace-no-wrap text-center">No Data Found</p>
    //                 </td>
    //             </tr>
    //         );
    //     }

    //     const startingSerialNumber = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;

       
        
        
    //   return    inventoryMaterial.map((item, index) => (
    //         <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
    //             <td className="px-5 py-5 border-b border-gray-200 text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">
    //                     {startingSerialNumber + index}
    //                 </p>
    //             </td>
    //             <td className="px-5 py-5 border-b border-gray-200 text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">
    //                     {item.location.address}
    //                 </p>
    //             </td>
    //             <td className="px-5 py-5 border-b border-gray-200 text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">
    //                     {item.material?.description}
    //                 </p>
    //             </td>
    //             <td className="px-5 py-5 border-b border-gray-200 text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">
    //                     {item.quantity}
    //                 </p>
    //             </td>
    //             <td className="px-5 py-5 border-b border-gray-200 text-sm">
    //                 <p className="text-gray-900 whitespace-no-wrap">
    //                     {item.minimum}
    //                 </p>
    //             </td>
    //             <td className="px-5 py-5 border-b border-gray-200 text-sm">
    //                 <p className="flex text-gray-900 whitespace-no-wrap">
    //                     <FiEdit size={17} className='text-teal-500 hover:text-teal-700 mx-2' onClick={(e) => handleUpdate(e, item)} title='Edit Inventory' />  |
    //                     <FiTrash2 size={17} className='text-red-500 hover:text-red-700 mx-2' onClick={(e) => handleDelete(e, item?.id)} title='Delete Material PO' />
    //                 </p>
    //             </td>
    //         </tr>
    //     ));
    // };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material Inventory/ View Material Inventory" />
            <div className="container mx-auto px-4 sm:px-8 bg-white dark:bg-slate-800">
                <div className="pt-5">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-semibold leading-tight">View Material Inventory</h2>
                        <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success dark:bg-white dark:text-slate-800`}>
                            Total PO: {pagination.totalItems}
                        </p>
                    </div>
                    <div className='items-center justify-center'>
                        <div className="mb-4.5 flex flex-wrap gap-6 mt-12">
                            <div className="flex-1 min-w-[300px]">
                                <label className="mb-2.5 block text-black dark:text-white">Location</label>
                                <ReactSelect
                                    name="locationId"
                                    value={locationValue}
                                    onChange={option => setLocationValue(option)}
                                    options={locationSel}
                                    styles={customStyles}
                                    placeholder="Select Location"
                                />
                            </div>
                            <div className="flex-1 min-w-[300px]">
                                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                                <ReactSelect
                                    name="description"
                                    value={descriptionValue}
                                    onChange={option => setDescriptionValue(option)}
                                    options={descriptionSel}
                                    styles={customStyles}
                                    placeholder="Select Description"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleSearchChange}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-12 w-[150px] rounded-lg"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SNO</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Opening Balance</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purchase</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sale (Branch Transfer Inward)</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Branch Transfer Outward</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Closing Balance (Sale+Transfer)</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">In Progress Orders</th>

                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRows()}
                                </tbody>
                            </table>
                        </div>
                        <Pagination totalPages={pagination.totalPages} currentPage={pagination.currentPage} handlePageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ViewProductsInventory;
