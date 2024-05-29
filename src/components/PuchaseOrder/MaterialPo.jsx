import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import flatpickr from 'flatpickr';
import { useSelector } from 'react-redux';
import useMaterialPo from '../../hooks/useMaterialPo';
import { customStyles as createCustomStyles } from '../../Constants/utils';

const MaterialPo = () => {
    const location = useSelector(state => state?.nonPersisted?.location);
    const supplier = useSelector(state => state?.nonPersisted?.supplier);
    const theme = useSelector(state => state?.persisted?.theme);
    const material = useSelector(state => state?.nonPersisted?.material);
    const [materialPos, setMaterialPos] = useState([{ materialId: null, quantity: '', costPerGram: '', totalPrice: '' }]);
    const [submitted, setSubmitted] = useState(false);

    const [locationSel, setLocationSel] = useState([]);
    const [supplierSel, setSupplierSel] = useState([]);
    const [materialSel, setMaterialSel] = useState([]);
    const [dateSelected, setDateSelected] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (location.data) {
            const formattedOptions = location.data.map(location => ({
                value: location.id,
                label: location.address,
                locationObject: location
            }));
            setLocationSel(formattedOptions);
        }
        if (supplier.data) {
            const formattedSupOptions = supplier.data.map(supplier => ({
                value: supplier.id,
                label: supplier.name,
                supplierObject: supplier
            }));
            setSupplierSel(formattedSupOptions);
        }
        if (material.data) {
            const formattedMatOptions = material.data.map(material => ({
                value: material.id,
                label: material.description,
                materialObject: material
            }));
            setMaterialSel(formattedMatOptions);
        }
    }, [location, material, supplier]);

    const { handleSubmit } = useMaterialPo();

    const flatpickrRef = useRef(null);

    useEffect(() => {
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, {
                mode: 'single',
                static: true,
                monthSelectorType: 'static',
                dateFormat: 'Y-m-d\\TH:i:S.Z', // Display format

                prevArrow:
                    '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow:
                    '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                onChange: (selectedDates, dateStr) => {

                    setDateSelected(dateStr.split('T')[0]); // Update the date for display
                },
            });
        }
    }, [flatpickrRef.current]);

    const addRow = () => {
        setMaterialPos([...materialPos, { materialId: null, quantity: '', costPerGram: '', totalPrice: '' }]);
    };

    const deleteRow = (index, setFieldValue) => {
        const newMaterialPos = materialPos.filter((_, rowIndex) => rowIndex !== index);
        setMaterialPos(newMaterialPos);
        setFieldValue('materialPos', newMaterialPos);
    };

    const handleQuantityChange = (setFieldValue, index, value) => {
        const newMaterialPos = [...materialPos];
        newMaterialPos[index].quantity = value;
        newMaterialPos[index].totalPrice = value * newMaterialPos[index].costPerGram; // Recalculate total price
        setMaterialPos(newMaterialPos);
        setFieldValue(`materialPos[${index}].quantity`, value);
        setFieldValue(`materialPos[${index}].totalPrice`, newMaterialPos[index].totalPrice);
    };

    const handleCostPerGramChange = (setFieldValue, index, value) => {
        const newMaterialPos = [...materialPos];
        newMaterialPos[index].costPerGram = value;
        newMaterialPos[index].totalPrice = value * newMaterialPos[index].quantity; // Recalculate total price
        setMaterialPos(newMaterialPos);
        setFieldValue(`materialPos[${index}].costPerGram`, value);
        setFieldValue(`materialPos[${index}].totalPrice`, newMaterialPos[index].totalPrice);
    };
    const customStyles = createCustomStyles(theme?.mode);
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material/Material PO" />
            <div>
                <Formik
                    initialValues={{
                        date: "",
                        locationId: "",
                        supplierId: "",
                        status: "",
                        materialPos: materialPos
                    }}
                    validate={values => {
                        const errors = {};

                        if (!values.locationId) {
                            errors.locationId = 'Field is required';
                        }
                        if (!values.supplierId) {
                            errors.supplierId = 'Field is required';
                        }
                        if (!dateSelected) {
                            errors.date = 'Field is required';
                        }
                        if (values.materialPos.length === 0) {
                            errors.materialPos = 'At least one material item is required';
                        } else {
                            // Iterate through each material item and validate its fields
                            values.materialPos.forEach((materialItem, index) => {
                                if (!materialItem.materialId) {
                                    if (!errors.materialPos) {
                                        errors.materialPos = [];
                                    }
                                    if (!errors.materialPos[index]) {
                                        errors.materialPos[index] = {};
                                    }
                                    errors.materialPos[index].materialId = 'Material is required';
                                }
                                if (!materialItem.quantity || isNaN(materialItem.quantity) || materialItem.quantity <= 0) {
                                    if (!errors.materialPos) {
                                        errors.materialPos = [];
                                    }
                                    if (!errors.materialPos[index]) {
                                        errors.materialPos[index] = {};
                                    }
                                    errors.materialPos[index].quantity = 'Required';
                                }
                                if (!materialItem.costPerGram || isNaN(materialItem.costPerGram) || materialItem.costPerGram <= 0) {
                                    if (!errors.materialPos) {
                                        errors.materialPos = [];
                                    }
                                    if (!errors.materialPos[index]) {
                                        errors.materialPos[index] = {};
                                    }
                                    errors.materialPos[index].costPerGram = 'Required';
                                }
                            });
                        }
                        return errors;
                    }}

                    onSubmit={(values, actions) => {
                        setSubmitted(true);
                        values.date = dateSelected;
                        handleSubmit(values, actions);
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            CREATE MATERIAL PO
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Date</label>
                                                <input
                                                    placeholder='Select A Date'
                                                    type="text"
                                                    name='date'
                                                    ref={flatpickrRef}
                                                    value={dateSelected.split('T')[0]}
                                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Location</label>
                                                <ReactSelect
                                                    name="locationId"
                                                    value={locationSel.find(option => option.value === values.location)}
                                                    onChange={(option) => setFieldValue('locationId', option.value)}
                                                    options={locationSel}
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Location"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="locationId" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Supplier</label>
                                                <ReactSelect
                                                    name="supplierId"
                                                    value={supplierSel.find(option => option.value === values.supplier)}
                                                    onChange={(option) => setFieldValue('supplierId', option.value)}
                                                    options={supplierSel}
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Supplier"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="supplierId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Status</label>
                                                <Field
                                                    type="text"
                                                    name="status"
                                                    placeholder="Status"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition dark:text-white focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="status" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-15">
                                            <h2 className='text-2xl font-semibold leading-tight text-center'>
                                                Material Items
                                            </h2>


                                            <button
                                                type="button"
                                                onClick={addRow}
                                                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                            >
                                                <IoMdAdd className="mr-2" size={20} />
                                                Add Row
                                            </button>
                                        </div>
                                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4   ">
                                            <div
                                                className="inline-block min-w-full shadow-md rounded-lg"
                                            >
                                                <table className="min-w-full leading-normal shadow-md rounded-lg  ">
                                                    <thead>
                                                        <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Material</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cost per Gram</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Price</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {materialPos.map((material, index) => (
                                                            <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
                                                                <td className="px-2 py-5 border-b border-gray-200 text-sm min-w-[300px] ">
                                                                    <ReactSelect
                                                                        name={`materialPos[${index}].materialId`}
                                                                        value={materialSel.find(option => option.value === material.materialId)}
                                                                        onChange={(option) => {
                                                                            const newMaterialPos = [...materialPos];
                                                                            newMaterialPos[index].materialId = option.value;
                                                                            setMaterialPos(newMaterialPos);
                                                                            setFieldValue(`materialPos[${index}].materialId`, option.value);
                                                                        }}
                                                                        options={materialSel}
                                                                        classNamePrefix="react-select"
                                                                        placeholder="Select Material"
                                                                        styles={customStyles}
                                                                    />

                                                                    <ErrorMessage name={`materialPos[${index}].materialId`} component="div" className="text-red-500" />

                                                                </td>
                                                                <td className="px-2 py-5 border-b border-gray-200 text-sm min-w-[150px]">
                                                                    <Field
                                                                        type="number"
                                                                        name={`materialPos[${index}].quantity`}
                                                                        placeholder="Quantity"
                                                                        value={material.quantity}
                                                                        onChange={(e) => handleQuantityChange(setFieldValue, index, e.target.value)}
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition dark:text-white focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                                    />
                                                                    <ErrorMessage name={`materialPos[${index}].quantity`} component="div" className="text-red-500" />

                                                                </td>
                                                                <td className="px-2 py-5 border-b border-gray-200 text-sm min-w-[150px]">
                                                                    <Field
                                                                        type="number"
                                                                        name={`materialPos[${index}].costPerGram`}
                                                                        placeholder="Cost per Gram"
                                                                        value={material.costPerGram}
                                                                        onChange={(e) => handleCostPerGramChange(setFieldValue, index, e.target.value)}
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition dark:text-white focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                                    />
                                                                    <ErrorMessage name={`materialPos[${index}].costPerGram`} component="div" className="text-red-500" />

                                                                </td>
                                                                <td className="px-2 py-5 border-b border-gray-200 text-sm min-w-[150px]">
                                                                    <Field
                                                                        type="number"
                                                                        name={`materialPos[${index}].totalPrice`}
                                                                        placeholder="Total Price"
                                                                        value={material.totalPrice}
                                                                        readOnly
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition dark:text-white focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                                    />
                                                                </td>
                                                                <td className="px-2 py-5 border-b border-gray-200 text-sm">
                                                                    <div className="flex">
                                                                        <IoMdTrash size={17} className='text-red-500 hover:text-red-700 mx-2 cursor-pointer' onClick={() => deleteRow(index, setFieldValue)} title='Delete Row' />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            {edit ? "Update Material PO" : "Add Material PO"}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

export default MaterialPo;
