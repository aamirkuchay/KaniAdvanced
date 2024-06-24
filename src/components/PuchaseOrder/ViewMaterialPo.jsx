import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ReactSelect from 'react-select';
import useMaterialPo from '../../hooks/useMaterialPo';
import MaterialPoModal from '../../hooks/MaterialPoModal';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import flatpickr from 'flatpickr';

const ViewMaterialPo = () => {
    const location = useSelector(state => state?.nonPersisted?.location);
    const supplier = useSelector(state => state?.nonPersisted?.supplier);
    const theme = useSelector(state => state?.persisted?.theme);
    const flatpickrRef = useRef(null);
    const { materialPo, ViewMaterialPo, handleDelete, pagination, handleUpdate, handlePageChange } = useMaterialPo();
    const [showModal, setShowModal] = useState(false);
    const [selectedMaterialPos, setSelectedMaterialPos] = useState([]);
    const [locationSel, setLocationSel] = useState([]);
    const [supplierSel, setSupplierSel] = useState([]);
    const [statusSel, setStatusSel] = useState([]);
    const [dateSelected, setDateSelected] = useState('');
    
    useEffect(() => {
        setLocationSel(formatOptions(location.data, 'address', 'id', 'locationObject'));
        setSupplierSel(formatOptions(supplier.data, 'name', 'id', 'supplierObject'));
        setStatusSel(formatStatusOptions());
    }, [location, supplier]);
    console.log(locationSel,"hyeeeeeeeeeeeee");
    
    useEffect(() => {
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, {
                mode: 'single',
                static: true,
                monthSelectorType: 'static',
                dateFormat: 'Y-m-d\\TH:i:S.Z',
                prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow: '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                onChange: (selectedDates, dateStr) => {
                    setDateSelected(dateStr.split('T')[0]);
                },
            });
        }
    }, [flatpickrRef.current]);

    const formatStatusOptions = () => {
        return [
            { value: 'Approved', label: 'Approved' },
            { value: 'Rejected', label: 'Rejected' },
        ];
    };

    const formatOptions = (data, labelKey, valueKey, objectKey) => {
        return data ? data.map(item => ({
            value: item[valueKey],
            label: item[labelKey],
            [objectKey]: item
        })) : [];
    };

    const customStyles = createCustomStyles(theme?.mode);

    const handleViewMaterialPos = (materialPos) => {
        setSelectedMaterialPos(materialPos);
        setShowModal(true);
    };

    const renderTableRows = () => {
        if (!materialPo || !materialPo.length) {
            return (
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm" colSpan="6">
                        <p className="text-gray-900 text-center whitespace-no-wrap">
                            No Data Found
                        </p>
                    </td>
                </tr>
            );
        }
    
        const startingSerialNumber = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
    
        return materialPo.map((item, index) => (
            <tr key={index} className="bg-white dark:bg-slate-700 dark:text-white">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {startingSerialNumber + index}
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
                    <p className="text-gray-900 whitespace-no-wrap">
                        {new Date(item.date).toLocaleDateString()}
                    </p>
                </td>
                <td className="px-2 py-5 border-b border-gray-200 text-sm md:text-lg">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 w-[100px] md:py-2 md:px-1 text-xs md:text-md rounded"
                        onClick={() => handleViewMaterialPos(item.materialPos)}
                    >
                        View Material
                    </button>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="flex text-gray-900 whitespace-no-wrap">
                        <FiEdit size={17} className="text-teal-500 hover:text-teal-700 mx-2" onClick={(e) => handleUpdate(e, item)} title="Edit Material PO" />  |
                        <FiTrash2 size={17} className="text-red-500 hover:text-red-700 mx-2" onClick={(e) => handleDelete(e, item?.id)} title="Delete Material PO" />
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
                    <div className='flex justify-between mb-8'>
                        <h2 className="text-xl font-semibold leading-tight">VIEW PURCHASE ORDER</h2>
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success dark:bg-white dark:text-slate-800`}
                        >
                            Total PO: {pagination.totalItems}
                        </p>
                    </div>

                    <div>
                        <Formik
                            initialValues={{
                                date: "",
                                address: "",
                                name: "",
                                status: "",
                            }}
                            onSubmit={(values, actions) => {
                                console.log(values,"frommmmmmmmmmmmmm");
                                
                                values.date = dateSelected;
                                // if (!dateSelected) {
                                //     toast.error("Please select a date");
                                //     return;
                                // }
                                ViewMaterialPo(pagination.currentPage, values);
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                  <div className="flex flex-col gap-9">
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
        {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="text-2xl font-semibold leading-tight text-center">
                View Purchase Order
            </h3>
        </div> */}
        
        <div className="mb-4.5 flex flex-wrap gap-6">
            <div className="flex-1 min-w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <Field
                    name="address"
                    component={ReactSelect}
                    options={locationSel}
                    styles={customStyles}
                    placeholder="Select Location"
                    value={locationSel.find(option => option.label === values.address)}
                    onChange={option => setFieldValue("address", option.label)}
                />
            </div>

            <div className="flex-1 min-w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Supplier</label>
                <Field
                    name="name"
                    component={ReactSelect}
                    options={supplierSel}
                    styles={customStyles}
                    placeholder="Select Supplier"
                    value={supplierSel.find(option => option.label === values.name)}
                    onChange={option => setFieldValue("name", option?.label)}
                />
            </div>

            <div className="flex-1 min-w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <Field
                    name="status"
                    component={ReactSelect}
                    options={statusSel}
                    styles={customStyles}
                    placeholder="Select Status"
                    value={statusSel.find(option => option.value === values.status)}
                    onChange={option => setFieldValue("status", option.value)}
                />
            </div>

            <div className="flex-1 min-w-[300px]">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                    <input
                        ref={flatpickrRef}
                        type="text"
                        value={dateSelected}
                        className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage name="date" component="div" className="text-red-500" />
                </div>
            </div>
        </div>
        
        <div className="mt-6 flex justify-center">
            <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                Search
            </button>
        </div>
    </div>
</div>

                                </Form>
                            )}
                        </Formik>
                    </div>

                    <div className="-mx-4 px-4 py-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">S/N</th>
                                        <th scope="col" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                        <th scope="col" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Supplier</th>
                                        <th scope="col" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Material</th>
                                        <th scope="col" className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRows()}
                                </tbody>
                            </table>
                            <div className="px-5 py-5 border-t border-gray-200 bg-white dark:bg-slate-700 dark:text-white dark:border-strokedark flex flex-col xs:flex-row items-center xs:justify-between">
                                <Pagination
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    totalItems={pagination.totalItems}
                                    itemsPerPage={pagination.itemsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>

                    <MaterialPoModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        materialPos={selectedMaterialPos}
                    />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ViewMaterialPo;
